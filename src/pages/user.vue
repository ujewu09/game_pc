<template>
    <div class="page-user">
        <div class="page_left">
            <div class="userInfo">
                <div class="avatar">
                    <!-- {{modifyInfo}} -->
                   <img :src="require('../assets/avatar/'+modifyInfo.head_portrait+'.png')"/>
                </div> 
                <div class="vip">
                   <img :src="require('../assets/vip/'+user.vip_level+'.png')" />
                </div>
                <div class="username" v-text=modifyInfo.nickname>

                </div>
                <div class="code">
                    邀请码<span class="mycode" >{{user.rCode}}</span>
                    <img  class="copy" src="../assets/common/cope.png" 
                    v-clipboard:copy='user.rCode'
                    v-clipboard:success="copy"/>
                </div>
            </div>
            <div class="userDetail">
                <div class="balance">
                    <span>{{utils.ThousandNum(this.$store.state.user.userData.platform_money)}}</span>
                    <img src="../assets/common/mem_icon.png"/>
                    <span>{{utils.ThousandNum(this.$store.state.user.userData.money)}}</span>
                </div>
                <div class="currency">
                    <div class="pingtai"><img src="../assets/wallet/coin_flat.png"/><span>平台币</span></div>
                    <div class="jingcai"><img src="../assets/wallet/coin_quizzes.png"/><span>竞猜币</span></div>
                </div>
                <div class="cooperate">
                    <button class="chongzhi" @click="goskip('/user/wallet/recharge')">充值</button><button class="zhuangRu" @click="goskip('/user/wallet/exchange')">转入</button><button @click="goskip('/shop/goods')" class="duihuan">商城兑换</button>
                </div>
            </div>
            <div class="pageNav">
                <el-tabs tab-position=left v-model="activeName"  @tab-click="routerSkip" >
                    <el-tab-pane v-for="(item,index) in pageList" :key="index" :label=item.title :name=item.name >   
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="page_right">
            <router-view :data="this.tabName" />
        </div>
    </div>
</template>

<script>
import utils from '../utils/common'
export default {  
    data() {
        return {
            pageList:[
                {
                    title:'钱包',
                    name:'wallet/recharge'
                },
                {
                    title:'邀请招募',
                    name:'invite/myInvite'
                },
                 {
                    title:'优惠活动',
                    name:'active'
                },
                 {
                    title:'任务中心',
                    name:'task'
                },
                 {
                    title:'消息中心',
                    name:'news/systemMsg'
                },
                 {
                    title:'个人设置',
                    name:'my/myInfo'
                }
            ],
            activeName:this.$router.app._route.name.slice(6),
            tabName:'',
            mycode:'',
            user:{},
        }
    },
    computed: {
        modifyInfo() {
            let modifyInfo = this.$store.state.myInfo.modifyInfo;
            let gameUserInfo = Object.assign(this.utils.gameUserInfo());
            if( gameUserInfo.data != '{}'){
                gameUserInfo.data.nickname = modifyInfo.nickname;
                gameUserInfo.data.head_portrait = modifyInfo.head_portrait;
                gameUserInfo.data.sex = modifyInfo.sex;
                sessionStorage.setItem("data", JSON.stringify(gameUserInfo));
            }
            return this.$store.state.myInfo.modifyInfo;
        }
    },
    created(){
        let gameUserInfo = Object.assign(this.utils.gameUserInfo());
        if( gameUserInfo.data != '{}'){
            this.user = utils.gameUserInfo().data;
        }


       var a = this.$router.app._route.name.slice(6);
       var b = a.lastIndexOf('/')
       var c = a.substring(0,b)
        switch(c){
            case 'wallet':
                this.activeName = 'wallet/recharge';
                break;
            case 'invite':
                this.activeName = 'invite/myInvite';
                break;
            case 'news':
                this.activeName = 'news/systemMsg';
                break;
            case 'my':
                this.activeName = 'my/myInfo';
                break;
        }
    },
    methods:{
        routerSkip(tab){
           this.$router.replace('/user/'+tab.name);
        },
        goskip(router){
            this.$router.replace(router);
            var index = router.lastIndexOf('/');
            var two_level = router.substring(index+1);
            this.tabName = two_level;
        },
        copy(){
            this.$message.success('复制成功');
        },
        
        
    },
    watch:{
        $route:function(now){
            this.activeName = now.name.slice(6);
            var index = this.activeName.lastIndexOf('/');
            var two_level = this.activeName.substring(0,index)
            switch(two_level){
                case 'wallet':
                    this.activeName =  'wallet/recharge';
                    break;
                case 'invite':
                    this.activeName =  'invite/myInvite';
                    break;
                case 'news':
                    this.activeName =  'news/systemMsg';
                    break;
                case 'my':
                    this.activeName =  'my/myInfo';
                    break;
            }
        }
    }
}
</script>
<style lang="less" scpoed>
  @import url('../assets/style.less');
  .page-user{
      width:1240px;
      margin:0 auto;
      display: flex;
      .page_left{
          width:310px;
          background:#1c2236;
          height:1000px;
        .userInfo{
            display:flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            .avatar{
                margin:35px 0 0 0;
                width:95px;
                height:95px;
                font-size: 10px;
                img{
                    width:100%;
                }
            }
            .vip{
                width:90px;
                margin:10px 0 13px 0;
                img {
                    width:100%;
                }
            }
            .username{
                font-size:20px;
                color:#fff;
                font-weight:bold;
                margin:0 0 10px 0;
            }
            .code{
                font-size:16px;
                color:@color-tip;
                .mycode{
                    margin: 0 8px 0 12px;
                }
            }
        }
        .userDetail{
            display:flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin:35px 0 0 0;
            .balance{
                font-size:22px;
                color:#fff;
                font-family:'DIN';
                img{
                    margin:0 15px;
                }
            }
            .currency{
                display:flex;
                flex-direction:row;
                margin:10px 0 26px 0;
                padding: 0 5px;
                font-size:14px;
                width:210px;
                color:@color-tip;
                justify-content:space-between;
                .pingtai,.jingcai{
                    display: flex;
                    align-items: center;
                    span{
                        margin: 0 3px;
                    }
                }
            }
            .cooperate{
                button{
                    width:65px;
                    height:28px;
                    color:@color-used;
                    font-size:12px;
                    outline:none;
                    background:none;
                    border:1px solid @color-used;
                }
                .chongzhi{
                    margin: 0 40px 0 0;
                }
                .zhuangRu{
                    margin: 0 10px 0 0;
                }
               button:focus{
                    color:@color-click;
                    border:1px solid @color-click;
               }
            }
        }
        .pageNav{
            margin:55px 0 0 0;
           /deep/ .el-tabs--left .el-tabs__item.is-left{
                height:58px;
                line-height:58px;
                width:310px;
                text-align:center;
                font-size:18px;
                color:#fff;
            }
           /deep/ .el-tabs__item.is-active{
                background:#263046;
                color:@color-select !important;
                border-left: 2px solid @color-select;
            }
            /deep/ .el-tabs__nav-wrap::after{
                 display: none;
            }
           /deep/ .el-tabs__active-bar{
                display:none;
            }
        }
      }
      .page_right{
          width:924px;
          margin: 0 0 0 6px;
      }
  }
</style>
