<template>
    <div class="page-wallet-exchange">
        <div class="coinNum">
           <div class="coin1">
               <img src="../../../assets/wallet/coin_flat.png"/>
               <span>平台币</span>
               <span>{{utils.ThousandNum(this.$store.state.user.userData.platform_money)}}</span>
           </div>
            <div class="coin2">
               <img src="../../../assets/wallet/coin_quizzes.png"/>
               <span>竞猜币</span>
               <span>{{utils.ThousandNum(this.$store.state.user.userData.money)}}</span>
            </div>
            <img src="../../../assets/wallet/refresh1.png" />
        </div>
        <div class="coin_exchange">
            <div class="exchange_title">
                <p class="flat"><img src="../../../assets/wallet/coin_flat.png" />平台币</p>
                <img class="men_icon" src="../../../assets/common/mem_icon.png"/>
                <p class="quizzes"><img src="../../../assets/wallet/coin_quizzes.png" />竞猜币</p>
            </div>
            <div class="exchange_input">
                <p class="tips"><img src="../../../assets/wallet/coin_flat.png" />平台币数量</p>
                <input class="exchange" v-model="value1"  placeholder="转账数量只能转换为整数" />
                <span class="allexchange" @click="allexchange" >全部转账</span>
            </div>
            <div class="exchange_num"><img src="../../../assets/wallet/coin_quizzes.png" /><p>获得竞猜币数量 <span>{{this.value2}}</span></p></div>
        </div>
        <div class="exchange_btn">
            <button @click="exchange" :class="{'active':value1 }" :disabled="!value1">确定转账</button>
            <p>1平台币=100竞猜币</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value1:'',
            value2:0
        }
    },
    watch:{
        value1:function(){
            this.value2 = this.value1*100;
        }
    },
    methods:{
        allexchange(){
            this.value1 = this.$store.state.user.userData.platform_money
        },
        exchange(){
            this.$store.dispatch('EXCHANGE',{
                type:1,
                num:Number(this.value1)
            }).then(responese=>{
                if(responese.code == 200){
                    this.$message.success('转账成功！')
                    //更新数据
                    this.$store.commit('MODIFY_PLATFORM_MONEY',responese.data.platform_money);
                    this.$store.commit('MODIFY_GUESS_MONEY',responese.data.gold);
                     this.value1 = '';
                }else{
                    this.$message({
                        type:'error',
                        message:responese.msg
                    })
                }
            })
        }
    }

}
</script>
<style lang="less" scoped>
@import url('../../../assets/style.less');
.page-wallet-exchange{
    padding:0 60px 0 20px;
    .coinNum{
       height:60px;
       background:#1c2236; 
       margin: 0 -60px;
       display: flex;
       justify-content: center;
       align-items:center;
       color:@color-tip;
       font-size:14px;
       img{
           width:18px;
           height: 18px;
       }
       .coin1,.coin2{
           display: flex;
           align-items: center;
           margin:0 30px 0 0;
           span:nth-of-type(1){
               margin:0 6px;
           }
       }
    }
    .coin_exchange{
        margin:50px 0 0 0;
        .exchange_title{
            display: flex;
            flex-direction: row;
            font-size:16px;
            color:@color-tip;
            margin:0 0 40px 0;
            .flat,.quizzes{
                display: flex;
                align-items: center;
                img{
                    width:16px;
                    height:16px;
                    margin:0 5px 0 0;
                }
            }
            .men_icon{
                width:24px;
                align-self: center;
                height: 16px;
                margin:0 10px;
            }
        }
        .exchange_input{
            display: flex;
            flex-direction: row;
            font-size:14px;
            padding-bottom:10px;
            border-bottom: 1px solid #1c2236;
            .tips{
                font-size: 16px;
                display: flex;
                align-items: center;
                color:@color-used;
                img{  
                    width:21px;
                    height:21px;
                    margin:0 5px 0 0;
                }
            }
            .exchange{
                height: 30px;
                border:none;
                background:none;
                padding-left: 20px;
                color:@color-tip;
                outline:none;
                width:600px;
                font-size: 20px;
            }
            input::-webkit-input-placeholder { /* WebKit browsers */
                color:#697088;
                font-size: 14px;
            }
            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color:#697088;
            }
            .allexchange{
                display: flex;
                align-items: flex-end;
                color:@color-click;
                cursor: pointer;
            }
        }
        .exchange_num{
            margin:10px 0 55px 0;
            font-size:14px;
            color:@color-tip;
            display: flex;
            img{
                width: 21px;
                height: 21px;
            }
            p{
                display: flex;
                align-items: center;
                margin:0 0 0 5px;
                span{
                    margin:0 0 0 30px;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
    }
    .exchange_btn{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin:0 auto;
        button{
            width:262px;
            height: 54px;
            font-size:18px;
            font-weight: bold;
            color:#fff;
            background:#1d374b;
            border-radius: 2px;
            border:none;
            outline: none;          
        }
        .active{
            background: linear-gradient(#07e2c6, #069ee7)
        }
        p{
            margin:16px 0 0 0;
            font-size: 14px;
            color:@color-tip;
        }
    }
}
</style>