<template>
    <div class="page-payment">
        <div class="content">
            <div class="row1" v-if="$route.query.page == 'order' && shopInfo.status == 0" :style="shopInfo.goods_type == 1 ? 'border-width:0' : ''">
                {{time}}
            </div>
            
            <div class="address" v-if="shopInfo.goods_type == 2">
                <div class="list">
                    <div class="name"><span style="color: #0386B6;padding-right:3px">*</span><span style="letter-spacing:4.5px;">收件人</span>：</div>
                    <div class="value"><input :disabled="$route.query.page == 'orderDetail'" ref="name" type="text" :class="{'pattern-style' : address.name.pattern}" v-model="address.name.val" placeholder="请输入收件人名字" /></div>
                </div>
                <div class="list">
                    <div class="name"><span style="color: #0386B6;padding-right:3px">*</span><span style="letter-spacing:4.5px;">手机号</span>：</div>
                    <div class="value"><input :disabled="$route.query.page == 'orderDetail'" maxlength="11" ref="phone" type="text" :class="{'pattern-style' : address.phone.pattern}" v-model="address.phone.val" placeholder="请输入收件人手机号" /></div>
                </div>
                <div class="list">
                     <div class="name"><span style="color: #0386B6;padding-right:3px">*</span>详细地址：</div>
                    <div class="value"><input :disabled="$route.query.page == 'orderDetail'" ref="location" type="text" :class="{'pattern-style' : address.location.pattern}" v-model="address.location.val" placeholder="请输入收件人地址" /></div>
                </div>
            </div>

            <div class="row2">
                <div class="top">
                    <div class="left">商品</div>
                    <div class="right">金额</div>
                </div>
                <div class="goods">
                    <div class="info">
                        <div class="head">
                            <img width="68" height="68" :src="shopInfo.thumb_img" />
                        </div>
                        <slot name="sex"></slot>
                        <div class="name">
                            <h3>{{shopInfo.goods_name}}</h3>
                            <p>x1</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="price">{{this.shopInfo.price}}</div>
                        <div class="text">竞猜币</div>
                    </div>
                </div>
            </div>

            <div class="row3">
                <div v-if="$route.query.page == 'orderDetail'">
                    <div class="list">
                        <div class="left">订单号</div>
                        <div class="right">{{shopInfo.order_sn}} 
                            <span
                            v-clipboard:copy="shopInfo.order_sn"
                            v-clipboard:success="onCopy"
                            style="color:#FFFFFF"
                            >
                                <img src="../../assets/common/cope.png" />
                            </span></div>
                    </div>
                    <div class="list">
                        <div class="left">创建时间</div>
                        <div class="right">{{shopInfo.created_at}}</div>
                    </div>
                    <div class="list">
                        <div class="left">支付时间</div>
                        <div class="right">{{shopInfo.pay_time}}</div>
                    </div>
                </div>

                <div class="list shop-price"  v-if="$route.query.page != 'orderDetail'">
                    <div class="left">商品总付</div>
                    <div class="right"><span>{{shopInfo.price}}</span>竞猜币</div>
                </div>
                <div class="button"  v-if="$route.query.page != 'orderDetail'">
                    <el-button @click="onOrder(shopInfo.price)" :disabled="submit">立即支付</el-button>
                </div>
            </div>
        </div>
        <div class="bottom">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            shopInfo: {},
            address: {
                name: {
                    val: '',
                    pattern: false
                },
                phone: {
                    val: '',
                    pattern: false
                },
                location: {
                    val: '',
                    pattern: false
                },
            },
            time: '等待支付，订单将在 00:30:00 关闭',
            orderTime: false,
            submit: false,
        };
    },
    mounted() {
        let { id, account, page, order_sn } = this.$route.query;
        if (page == 'detail') {
            this.$http
            .post(this.config.HOST+ 'api/order/confirm', {
                goods_id: id,
                account: account ? account : undefined 
            }).then(response => {
                let result = response.data;
                if (result.code == 0) {
                    let { data } = result;
                    if (JSON.stringify(data) != "{}") {
                        this.shopInfo = data;
                    } else {
                        this.shopInfo = null;
                    }
                } else {
                    this.$router.go(-1);
                }
            });
        } else if (page == 'order' || page == 'orderDetail') {
            if (page == 'order') {
                this.$http
                .post(this.config.HOST + "api/order/buy", {
                    order_sn: order_sn,
                })
            }
            // 是否底部导航支付内容
            this.type = page;
            this.$http
            .post(this.config.HOST + "api/order/order_info", {
                order_sn: order_sn,
            })
            .then(response => {
                let result = response.data;
                if (result.code == 0) {
                    let { data } = result;
                    if (JSON.stringify(data) != "{}") {
                        data.thumb_img = data.goods_thumb_img;
                        this.shopInfo = data;
                        if (this.shopInfo && JSON.stringify(this.shopInfo) != '{}') {
                            // 赋值地址
                            this.address.name.val = this.shopInfo.receipt_name;
                            this.address.phone.val = this.shopInfo.receipt_mobile;
                            this.address.location.val = this.shopInfo.receipt_address;
                            // 是否有账号
                            if (this.shopInfo.account) {
                                this.accountShow = true;
                            }
                            if (this.shopInfo.created_at && this.shopInfo.status == 0) {
                                // 计算订单是否过期 
                                let orderDatetime = new Date(this.shopInfo.created_at);
                                    orderDatetime.setMinutes(orderDatetime.getMinutes() + 30);
                                    orderDatetime = orderDatetime.getTime();
                                let currentDatetime = new Date().getTime();
                                let datetime = orderDatetime - currentDatetime;
                                if (datetime <= 0) {
                                    // 下单时间过期了
                                    this.orderTime = false;
                                     this.time = "订单已过期"
                                } else {
                                    // let second = parseInt(datetime / 1000);
                                    // let minute = Math.floor(second / 60);
                                    // 倒计时函数
                                    this.countDown(this.shopInfo.created_at);
                                    this.orderTime = true;
                                }
                            }
                        }
                    } else {
                        this.shopInfo = null;
                    }
                }
            });
        }
    },
    methods: {
        onCopy() {
            this.$message({
                showClose: true,
                message: '复制成功',
                type: 'success',
            });
        },
        onOrder(price) {
            if (!this.orderTime && this.shopInfo.status == 0) {
                // 订单已过期
                this.$message({
                    showClose: true,
                    message: '订单已过期',
                    type: 'error',
                    onClose:() => {
                        this.$router.replace({ path: 'order' });
                    }
                });
                return;
            }
            if (this.shopInfo.goods_type == 2) {
                if (!this.address.name.val) {
                    this.address.name.pattern = true;
                    this.$refs.name.focus();
                    return;
                }
                if (!this.address.phone.val || !(/^1[3456789]\d{9}$/.test(this.address.phone.val))) {
                    this.$message({
                        showClose: true,
                        message: '手机号码有误',
                        type: 'error'
                    });
                    this.$refs.phone.focus();
                    this.address.phone.pattern = true;
                    return;
                }
                if (!this.address.location.val) {
                    this.$refs.location.focus();
                    this.address.location.pattern = true;
                    return;
                }
            }
            
            let { id, goods_id, account } = this.shopInfo;
            
            
            if (this.submit) return;
            this.submit = true;
            
            this.$http
            .post(this.config.HOST + "api/order/create", {
                goods_id: id ? id : goods_id,
                account: account,
                receipt_name: this.shopInfo.goods_type == 2 ? this.address.name.val : undefined,
                receipt_mobile: this.shopInfo.goods_type == 2 ? this.address.phone.val : undefined,
                receipt_address: this.shopInfo.goods_type == 2 ? this.address.location.val : undefined,
            })
            .then(response => {
                this.submit = false;
                let result = response.data;
                if (result.code == 0) {
                    if (result.code == 0) {
                        this.$http
                        .post(this.config.HOST + "api/order/pay", {
                            order_sn: result.order_sn
                        })
                        .then(response => {
                            let result = response.data;
                            if (result.code == 0) {
                                if (result.code == 0) {//兑换成功
                                 this.$emit('dataRefresh',price)
                                    this.$message({
                                        showClose: true,
                                        message: '已兑换成功',
                                        type: 'success',
                                        onClose:() => {
                                            this.$router.replace({ path: 'order' });
                                        }
                                    });
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: '兑换失败',
                                        type: 'error',
                                        onClose() {
                                            this.$router.replace({ path: 'order' });
                                        }
                                    });
                                }
                            }
                        });
                    } else { 
                        this.$message({
                            showClose: true,
                            message: '兑换失败',
                            type: 'error',
                            onClose() {
                                this.$router.replace({ path: 'order' });
                            }
                        });
                    }
                }
            });
        },
        addZero (i) {
            return i < 10 ? "0" + i: i + "";
        },
        countDown(date) {
            var nowtime = new Date();
            var endtime = new Date(date);
            var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
            // var d = parseInt(lefttime / (24*60*60))
            var h = parseInt(lefttime / (60 * 60) % 24);
            var m = parseInt(lefttime / 60 % 60);
            var s = parseInt(lefttime % 60);
            // d = addZero(d)
            h = this.addZero(h);
            m = this.addZero(m);
            s = this.addZero(s);
            this.time = `等待支付，订单将在 ${h}:${m}:${s} 关闭`;
            if (lefttime <= 0) {
                this.time = "订单已过期"
                return;
            }
            setTimeout(() => {
                this.countDown(date);
            }, 1000);
        }
    }
};
</script>

<style lang="less" scoped>
 @import url('../../assets/style.less');
    .page-payment {
        width: 940px;
        // 内容部分
        .content {
            .row1 {
                color: #01bcfd;
                text-align: center;
                padding: 40px 0;
                border-bottom: 1px solid #262f40;
                font-size: 20px;
            }
            /* 地址 */
            .address{
                display: flex;
                flex-direction: column;
                padding: 40px 60px;
                font-size: 16px;                
                .list{
                    display: flex;
                    padding: 8px 0;
                    .name {
                        color: @color-used;
                    }
                    .value {
                        flex: 1;
                        margin-left: 10px;
                        input {
                            border: 0;
                            background: transparent;
                            color: #ffffff;
                            line-height: 25px;
                            // margin: 1px 0px 3px 8px;
                            font-size: 16px;
                            width: 100%;
                            outline: none;
                        }
                        input:hover {
                            border: 0;
                        }
                        input::-webkit-input-placeholder {
                            color: @color-two-level;
                            font-size: 16px;
                        }
                        input.pattern-style::-webkit-input-placeholder {
                            color: red;
                        }
                    }
                }
            }

            // 商品图片
            .row2 {
                padding: 0 60px;
               .top {
                   font-size: 14px;
                   background-color: #141926;
                   display: flex;
                   text-align: center;
                   color: @color-two-level;
                   height: 35px;
                   line-height: 35px;
                   .left {
                       flex: 1;
                   }
                   .right {
                       width: 194px;
                   }
               }
               .goods {
                    display: flex;
                    padding: 24px 0 24px 40px;
                    border: 1px solid #141926;
                    .info {
                        position: relative;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        .head {
                            width: 68px;
                            height: 68px;
                            line-height: 45px;
                            border-radius: 50%;
                            // overflow: hidden;
                            img {
                                width: 100%;
                            }
                        }
                        .name {
                            position: relative;
                            width: 80px;
                            margin: 0 0 0 30px;
                            color: #FFFFFF;
                            font-size: 16px;
                            h3 {
                                font-size: 14px;
                                margin: 0;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            p {
                                margin: 15px 0 0 0;
                                color:@color-used;
                                font-size: 12px;
                            }
                            .float {
                                position: absolute;
                                top: 0;
                                right: 0;
                                transform: translate(100%);
                            }
                        }
                    }
                    .right {
                        width: 194px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: @color-used;
                        font-size: 20px;
                        .price {
                            font-size: 20px;
                        }
                        .text {
                            font-size: 14px;
                        }
                    }
               }
            }
        }

        .row3 {
            margin-top: 48px;
            padding: 0 60px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            color: @color-two-level;
            font-size: 16px;
            .list{
                display: flex;
                padding: 3px 0;
                 width: 300px;
                .left{
                    flex: 1;
                }
                .right {
                    span {
                        cursor: pointer;
                    }
                }
            }
            .shop-price {
                padding: 48px 0 0 0;
                span {
                    color: #27F3CB;
                    font-size: 20px;
                    padding: 0 10px 0 0;
                }
            }
            .button {
                padding: 35px 0 0 0;
                button {
                    outline: none;
                    cursor: pointer;
                    height: 40px;
                    line-height: 40px;
                    width: 200px;
                    padding: 0 8px;
                    border: transparent;
                    background-image: linear-gradient(-90deg, #00abf4, #00d3da);
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    border-radius: 3px;
                    &[disabled="disabled"]{
                        background-image:none;
                        background-color: transparent;
                        border:1px solid #3b465f;
                        color: @color-two-level;
                    }
                }
                
            }
        }
    }
</style>

