<template>
    <div class="component-goods-detail">
        <div class="record_info">
            <p>
                <span class="time">{{data.updated_at}}</span>
                <span class="orderNum">订单号:{{data.order_sn}}</span>
                <img src="../assets/common/cope.png"
                    v-clipboard:copy='data.order_sn'
                    v-clipboard:success="onCopy"
                 />
            </p>
        </div>
        <div class="record_detail">
            <div class="goods_img">
                <img :src=data.goods_thumb_img />
            </div>
            <div class="goods_name" @click="goPayment(data)">
                <div class="name" >{{data.goods_name}}</div>
                <div class="num"><span>x</span> 1</div>
            </div>
            <div class="goods_price">
                <div class="price">{{data.price}}</div>
                <div class="unit">竞猜币</div>
            </div>
            <div class="status">
                <span v-if="data.status == 0">待兑换</span>
                <span v-if="data.status == 1">待发货</span>
                <span v-if="data.status == 2">已发货</span>
                <span v-if="data.status == 3">已完成</span>
                <span v-if="data.status == 4">已取消</span>
            </div>
            <div class="btn" @click="secondChange(data)">
                <button class="pay" v-if="data.status == 0">去支付</button>
                <button class="duihuan" v-else >再次兑换</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
           
        }
    },
    methods:{
        //复制订单号
        onCopy(){
            this.$message.success('复制成功')
            // console.log(e.text)
        },
        goPayment(item){
            this.$router.push({
                path:'payment',
                query:{
                    page:'orderDetail',
                    order_sn:item.order_sn,
                }
            })
        },
        //再次兑换
        secondChange(item){
            this.$router.push({
                path:'payment',
                query:{
                    page:'order',
                    order_sn:item.order_sn,
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.component-goods-detail{
    height:214px;
    width:920px;
    border:1px solid #262933;
    margin:3px 0;
    .record_info{
        padding:0 0 0 40px;
        height:47px;
        background-color: #0a0c16;
        line-height: 47px;
        color:#526583;
        font-size: 16px;
        p{
            .orderNum{
                margin:0 10px 0 16px ;
            }
            img{
                width:14px;
                height: 14px;
            }
        }
    }
    .record_detail{
        display: flex;
        height:167px;
        background:#0B0E1A;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0 52px 0 40px;
        .goods_img{
            margin: 0 30px 0 0;
            img{
                width:68px;
                height:68px;
            }
        }
        .goods_name{
            width: 360px;
            font-size: 14px;
            .name{
                color:#fff;
                margin:0 0 8px 0;
                width:200px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                 -webkit-line-clamp: 1;
                line-clamp: 1;
            }
            .num{
                color:#bacef1;
            }
        }
        .goods_price{
            width:100px;
            text-align: center;
            .price{
                font:22px 'DIN';
                color:#28ffd4 ;
            }
            .unit{
                color:#bacef1;
                font-size: 14px;
            }
        }
        .status{
            width:180px;
            color:#bacef1;
            font-size: 16px;
            text-align: center;
        }
        .btn{
            .pay{
                border:none;
                outline:none;
                height: 34px;
                width:94px;
                color:#fff;
                font-size:14px;
                background-image: linear-gradient(-90deg, #00abf4, #00d3da);
            }
            .duihuan{
                outline: none;
                border:1px solid #01bcfd;
                background:none;
                height: 34px;
                width:94px;
                color:#01bcfd;
                font-size:14px;
            }
        }
    }
}
</style>