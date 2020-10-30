<template>
    <div class="page-detail">
        <section class="goods_info">
            <div class="info_left">
                <div class="main_picture">
                    <img v-if='goods_info.goods_img' :src=goods_info.goods_img[imgIndex] />
                </div>
                <ul class="preview_picture">
                    <li v-for="(img,index) in goods_info.goods_img" :key="index" @click="preview(index)" :class=" imgIndex == index ? 'actived' : ''" >
                        <img :src=img />
                    </li>
                </ul>
            </div>
            <div class="info_right">
                <div class="goods_title">
                    <span class="status" v-if="goods_info.goods_type == 1" >虚拟</span><span class="status shiwu" v-else>实物</span>
                    <p class="title">{{goods_info.goods_name}}</p>
                </div>
                <div class="goods_price">
                    <span class="price">{{goods_info.price}}</span><span class="type">竞猜币</span>
                </div>
                <div class="user_balance">
                   <P>竞猜币余额:{{goods_info.gold == null ? 0 : goods_info.gold}}</P>
                </div>
                <div class="goods_stock">
                   <P>库存:{{goods_info.stock}}</P>
                </div>
                <div class="user_account" v-if="goods_info.is_account == 1" >
                   <P><span>*</span><span>账号</span></P>
                   <input v-model="account" class="account actived" placeholder="请输入账号，如QQ号、YY号、爱奇艺号等" />
                </div>
                <button class="btn" :style="{ 'margin-top': goods_info.is_account == 1 ? '30px' : '110px' }" @click="submit(goods_info.id)">
                    立即兑换
                </button>
            </div>
        </section>
        <section class="goods_detail">
            <h3>商品详情</h3>
            <div class="detail" v-for="(image,index) in goods_info.goods_detail" :key="index">
                <img :src=image />
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:this.$route.query.id,
            goods_info:{},
            imgIndex:0,
            account:''
        }
    },
    created(){
       this.getDetails()
    },
    methods:{
        getDetails(){  
            this.$http.post(this.config.HOST + "api/goods/detail",{
                id:this.id
            })
            .then(response => {
                if(response.data.code == 0 ){
                    this.goods_info = response.data.data;
                }else{
                    console.error('获取数据失败')
                }
            })
        },
        //查看预览图
        preview(index){
            this.imgIndex = index;
        },
        submit(id){
            this.$router.push({
                path:'payment',
                query:{
                    id:id,
                    account:this.account,
                    page:'detail'
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
 @import url('../../assets/style.less');
.page-detail{
    width:940px;
    margin:auto;
    .goods_info{
        padding:50px 50px 40px 60px;
        border-bottom: 1px solid @color-line;
        height:390px;
        display:flex;
        justify-content: flex-start;
        .info_left{
            display: flex;
            flex-direction: column;
            width:320px;
            margin-right: 40px;
            .main_picture{
                width:320px;
                height:320px;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .preview_picture{
                white-space: nowrap;
                margin-top: 8px;
                width: 320px;
                overflow-y: hidden;
                overflow-x: auto;
                li {
                    display: inline-block;
                    margin: 0 7px 0 0px;
                    width: 55px;
                    height: 55px;
                    overflow: hidden;
                    border: 1px solid;
                    img {
                        width:100%;
                        height: 100%;
                    }
                }
                .actived {
                    border:1px solid #00d3da;
                }
                &::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                &::-webkit-scrollbar-thumb{
                    border-radius: 5px;
                    box-shadow: inset 0 0 5px #00d3da;
                    background: #00d3da
                        // background-image: linear-gradient(-90deg,, #00d3da);
                }
                &::-webkit-scrollbar-track {
                    box-shadow:inset 0 0 5px @color-line;
                    border-radius:0;
                    background: @color-line;
                }
            }
        }
        .info_right{
            height:325px;
            display: flex;
            flex-direction: column;
            .goods_title{
                display: flex;
                color:#fff;
                align-items: center;
                .status{
                    display: inline-block;
                    width:38px;
                    height:20px;
                    background:#e25f2b;
                    border-radius: 2px;
                    text-align: center;
                    font-size: 12px;
                    margin-right: 10px;
                }
                .shiwu{
                    background:green;
                }
                .title{
                    font-size: 20px;
                }
            }
            .goods_price{
                margin-top: 15px;
                .price{
                    color:@color-select;
                    font-size: 34px;
                    font-family: 'DIN';
                    margin-right: 10px;
                }
                .type{
                    color:@color-used;
                    font-size: 16px;
                }
            }
            .user_balance{
                margin: 20px 0 16px 0;
                font-size: 14px;
                color:@color-two-level;
            }
            .goods_stock{
                font-size: 14px;
                color:@color-two-level;
            }
            .user_account{
                display: flex;
                align-items: center;
                margin-top:50px;
                p{
                    display: flex;
                    font-size: 14px;
                    span:nth-of-type(1){
                        color:#01bcfd;
                        margin-top: 5px;
                    }
                    span:nth-of-type(2){
                        margin: 0 8px;
                        color:#fff;
                    }
                }
                .account{
                    width:385px;
                    border:1px solid #697088;
                    border-radius: 2px;
                    height: 35px;
                    background:none;
                   padding-left: 30px;
                   color:#fff;
                   font-size: 12px;
                }
                // .actived{
                //     border:1px solid #28ffd4;
                // }
            }
            .btn{
                background-image: linear-gradient(-90deg, #00abf4, #00d3da);
                border:none;
                height:50px;
                color:#fff;
                width:470px;
                outline: none;
                align-self:flex-end;
            }
        }
    }
    .goods_detail{
        padding:40px 0 0 0px;       
        h3 {
            color:#fff;
            font:18px normal;
            margin-bottom: 24px;
            padding-left:30px;
        }
        .detail {
            text-align: center;
            img {
                vertical-align: middle;
                max-width: 100%;
                // height: 100%;
                // margin-left: 25px;
            }
        }
        
    }
}
</style>