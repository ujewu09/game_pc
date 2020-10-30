<template>
    <div class="page-wallet-recharge">
        <div class="coinBox">
            <div class="coin">
                <p><img src="../../../assets/wallet/coin_flat.png" /><span>平台币</span></p>
                <span class="coinNum">{{utils.ThousandNum(this.$store.state.user.userData.platform_money)}}</span>
            </div>
            <div class="beVip" @click="$router.push({path:'/vip'})">成为VIP,充值更优惠</div>
        </div>
        <div class="mainBox">
            <div class="rechargeNum">
                <p class="recharge_title">充值金额<span>(1平台币/个)</span></p>
                <div class="recharge_input">
                    <span>￥</span>
                    <input v-model="value" />
                </div>
                <div class="fixedNum">
                    <button  @click="fn(100)">100</button> <button @click="fn(200)">200</button> <button @click="fn(500)">500</button> <button @click="fn(1000)">1000</button> <button @click="fn(2000)">2000</button>
                </div>
                <h6>单笔限额 100-2000(个)</h6>
            </div>
            <div class="recharge_mothods">
                <span>充值方式</span>
                <div class="methods">
                    <div class="methods1">
                        <img :src="flag==1?img1:img2" id="img1" @click="choose(1)" ><img class="zfb" src="../../../assets/wallet/player_icon_alipay.png" /><span>支付宝</span>
                    </div>
                    <div class="methods2">
                        <img :src="flag==2?img1:img2" id="img1" @click="choose(2)"><img class="wx" src="../../../assets/wallet/player_icon_wechat.png" /><span>微信</span>
                    </div>
                </div>
            </div>
            <div class="recharge_tips">
                <span>充值提示:</span>
                <div class="tips">
                    <p>1、本产品只支持金币进行游戏娱乐体验，充值可获得金币，具体兑换比例以实际到账为准。</p>
                    <p>2、充值受第三方影响可能会出现失败的情况，若充值失败可尝试重新充值或联系客服处理，给您带来的不便敬请谅解！</p>
                </div>
            </div>
        </div>
        <div class="btnBox">
            <button class="btn" :class="{'active':value}" @click="recharge()" :disabled='!value'>确认</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            radio:'支付宝',
            value:'',
            flag:1,
            money:'',
            img1: require('../../../assets/images/player_icon_recharge_selected.png'),
            img2: require('../../../assets/images/player_icon_recharge_normal.png'),
        }
    },
    methods:{
        fn(money){
            this.value = money;
        },
        choose(e){
            this.flag = e;
        },
        //充值
        recharge(){
             this.$store.dispatch('RECHARGE',{
                money:Number(this.value),
             }).then(Response=>{
                if(Response.code == 200){
                    this.$message.success('充值成功！');
                    this.value = '';
                    //更新数据
                    this.$store.commit('MODIFY_PLATFORM_MONEY',Response.data.money)
                }else{
                    this.$message({
                        type:"error",
                        message:Response.msg
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/style.less');
.page-wallet-recharge{
    padding:40px 60px 100px 0px;
    .coinBox{
        height:86px;
        display: flex;
        background-color:#141926;
        flex-direction: row;
        padding:20px 60px 16px 16px;
        .coin{
            flex: 1;
            display: flex;
            flex-direction: column;
            p{
                font-size:14px;
                color:@color-tip;
                display: flex;
                align-items: center;
                margin:0 0 20px 0;
                img{
                    width: 20px;
                    margin:0 5px 0 0;
                }
            }
            .coinNum{
                font-size:40px;
                font-family: 'DIN';
                color:#fff;
            }
        }
        .beVip{
            display: flex;
            align-items: flex-end;
            color:@color-click;
            font-size:14px;
            cursor: pointer;
        }
    }
    .mainBox{
        margin-top:40px;
        .rechargeNum{
            .recharge_title{
                font-size:16px;
                color:#fff;
                margin:0 0 16px 0;
                span{
                    color:@color-tip;
                    font-size:14px;
                    margin:0 0 0 5px;
                }
            }
            .recharge_input{
                border-bottom: 1px solid #1c2236;
                margin-bottom: 16px;
                height: 50px;
                padding:0 0 10px 0;
                span{
                    font-size:30px;
                    color:#fff;
                }
                input{
                    background: none;
                    border:none;
                    outline:none;
                    height: 50px;
                    width:750px;
                    font-size:48px;
                    padding-left: 15px;
                    color:@color-select;
                }
            }
            .fixedNum{
                margin-bottom: 16px;
                button:nth-of-type(1){
                    margin-left: 0px;
                }
                button{
                    width:100px;
                    height:40px;
                    text-align: center;
                    line-height: 40px;
                    outline: none;
                    margin:0 8px;
                    background:#242f43;
                    border:1px solid #248d9c;
                    font-size: 18px;
                    color:@color-used;
                }
                button:focus{
                    color:#28ffd4;
                    background:linear-gradient(#00ffba,#0096ff);
                    border:1px solid #00f8f9;
                }
            }
            h6{
                font-size:14px;
                color:@color-tip;
            }
        }
        .recharge_mothods{
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            span{
                font-size: 16px;
                color:#fff;
                margin:0 40px 0 0;
            }
            .methods{
                display: flex;
                flex-direction: column;
                .methods1,.methods2{
                   display: flex;
                   align-items: center;
                }
                .methods2{
                    margin-top: 40px;
                }
                #img1{
                    width: 16px;
                    height: 16px;
                }
                .zfb,.wx{
                    width: 22px;
                    height:22px;
                    margin: 0 15px;
                }
                /deep/.el-radio__inner{
                     width:14px;
                    height:14px;
                }
                /deep/.el-radio{
                    color:@color-used;
                    display: flex;
                }
                /deep/.el-radio__input.is-checked .el-radio__inner{
                    background-color: @color-select;
                }
                /deep/.el-radio__input.is-checked+.el-radio__label{
                    color:@color-used;
                }
                /deep/.el-cascader-node>.el-radio, .el-radio:last-child{
                    margin-top:28px;
                }
                /deep/.el-radio__label{
                    display: flex;
                    align-items: center;
                }
                /deep/.el-radio__input{
                     display: flex;
                    align-items: center;
                }
            }
        }
        .recharge_tips{
            display: flex;
            flex-direction: row;
            font-size: 14px;
            color:@color-tip;
            margin: 40px 0 55px 0;
            span{
                margin:0 6px 0 0;
            }
            .tips{
                display: flex;
                flex-direction: column;
                p:nth-of-type(1){
                    margin:0 0 5px 0;
                }
            }
        }
    }
    .btnBox{
        display: flex;
        justify-content: center;
        .btn{
            outline:none;
            border:none;
            width:262px;
            height: 54px;
            font-size:18px;
            color:#fff;
            font-weight: bold;
            background:#1d374b;
        }
        .active{
            background: linear-gradient(#07e2c6,#069ee7);
        }
    }
}
</style>