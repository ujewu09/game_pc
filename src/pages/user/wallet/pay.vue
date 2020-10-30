<template>
    <div class="page-wallet-pay">
        <div class="payBox">
            <div class="user">
                <div class="userHeader">
                    <img src="../../../assets/common/header.png"/>
                </div>
                <div class="userDetails">
                    <div class="userName">
                        <span class="name">小不点</span>
                        <button class="miaochong">秒充</button>
                    </div>
                    <div class="payMethods">
                        <li>
                            <img src="../../../assets/wallet/player_icon_yinlianpay.png"/>
                            <img class="weichat" src="../../../assets/wallet/player_icon_wechat.png"/>
                            <img src="../../../assets/wallet/player_icon_alipay.png"/>
                        </li>
                    </div>
                </div>
            </div>
            <div class="recharge">
                <div class="official">官方认证</div>
                <button class="btn" :disabled="flag" :class="{'hasRight': flag == 1}">充值</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            flag:0
        }
    },
    created(){
        this.$store.dispatch('PAY_RIGHT',{}).then(responese=>{
            if(responese.code == 200){
               this.flag = responese.data.extractSwitch;
            }
        })
    },
}
</script>
<style lang="less" scoped>
@import url('../../../assets/style.less');
.page-wallet-pay{
    padding:40px 60px 0px 0px;
    .payBox{
        background-color:#141926;
        height:137px;
        padding:0 40px;
        display: flex;
        .user{
            display: flex;
            flex-direction: row;
            align-items: center;
            flex:1;
            .userHeader{
                width:82px;
                height:82px;
                margin:0 12px 0 0;
                img{
                    width:100%;
                }
            }
            .userDetails{
                display: flex;
                flex-direction: column;
                height:86px;
                line-height:46px;
                .userName{
                    .name{
                        font-size:22px;
                        color:@color-used;
                        margin:0 10px 0 0;
                    }
                    .miaochong{
                        background:#f93741;
                        width:44px;
                        height:22px;
                        font-size:13px;
                        color:#fff;
                        border-radius: 10px;
                        border:none;
                        outline:none;
                    }
                }
                .payMethods{
                    li {
                        img{
                           width:30px;
                          height:26px;
                        }
                        .weichat{
                            margin:0 10px;
                        }
                    }
                }
            }
        }
        .recharge{
            .official{
                width:100px;
                height:34px;
                background-color:#263046;
                color:@color-select;
                font-weight: bold;
                font-size:16px;
                line-height:34px;
                text-align: center;
                border-bottom-right-radius:6px;
                border-bottom-left-radius:6px;
                margin:0 0 25px 15px;
            }
            .btn{
                width:130px;
                height:48px;
                border-radius: 2px;
                font-size:22px;
                color:#fff;
                outline:none;
                border:1px soild #fff;
            }
            .hasRight{
                background: linear-gradient(#07e2c6, #069ee7);
                border:none;
            }
        }
    }
}
</style>