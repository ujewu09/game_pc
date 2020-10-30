<template>
    <div class="page-help">
        <div class="help_left">
            <el-tabs tab-position=left  v-model="activeName"  >
                <el-tab-pane v-for="(item,index) in questList" :key="index" :label=item.title :name=item.name>
                    <div class="help_right">
                        <h5 class="title">{{item.title}}</h5>
                        <div class="text">
                           <p>{{item.answer1}}</p>
                           <p v-if="item.answer2">{{item.answer2}}</p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName:'1',
            questList:[
                {
                    title:'如何更换手机号绑定？',
                    name:'1',
                    answer1:'1、可登录APP后点击“我的”-“设置”-“修改手机”，在密码输入框输入登录密码，在手机号输入框输入新手机号码，点击“获取验证码”后验证码会发送至原手机号，在验证码输入框输入正确的验证码后点击“确认”即可更换手机号。',
                    answer2:'2、请使用自己的手机号以免造成账号被非法盗取或APP的某些功能不能正常使用。'
                },
                 {
                    title:'如何修改密码？',
                    name:'2',
                    answer1:'可登录APP后点击“我的”-“设置”-“修改密码”，在修改密码页面输入手机账号，点击“获取验证码”后验证码会发送至手机，在验证码输入框输入正确的验证码，在新密码输入框输入新密码，在确认密码输入框处再次输入新密码，点击“确认”即可修改密码成功。',
                },
                 {
                    title:'忘记密码了怎么办？',
                    name:'3',
                    answer1:'可点击登录页面的“忘记密码”，在修改密码页面输入忘记密码的手机号，点击“获取验证码”后验证码会发送至手机，在验证码输入框输入正确的验证码，在新密码输入框输入新密码，点击“找回密码”即可修改密码成功，返回登录页面输入新改的密码即可重新登录。',
                },
                 {
                    title:'如何进行赛事预测？',
                    name:'4',
                    answer1:'1、赛事预测就是在APP内对未开始或进行中的比赛事件预测结果，为了增加趣味性加入了竞猜币奖惩机制，猜对了按预测选项的赔率奖励竞猜币，猜错了则扣除预测时缴纳的竞猜币。',
                    answer2:'2、进入APP后可在比赛列表查看不同游戏的比赛情况，点击比赛面板进入赛事预测页面，选择喜欢的玩法事件，点击自己觉得正确的事件结果按钮，在弹出的输入框中输入投注金额（也可以去“投注”页面进行投注），点击“确认投注”即可参与预测。'
                },
                 {
                    title:'赛事不能预测怎么办?',
                    name:'5',
                    answer1:'已结束的比赛或平台主动关闭的比赛事件玩法不能进行预测，在APP上能看到事件结果按钮上有“锁”标记。因网络或服务器异常等原因不能预测则会在预测时弹出提示框提醒，刷新比赛或重新登录APP可再次尝试预测，若还是不能正常预测可联系在线客服咨询解决。',
                },
                 {
                    title:'如何邀请好友参加赛事预测?',
                    name:'6',
                    answer1:'可邀请好友下载安装APP，注册时输入你的推荐码即可完成绑定关系；APP的下载链接、二维码以及你的推荐码可登录APP后点击“我的”-“推荐好友”，进入推荐好友页面查看。',
                },
                 {
                    title:'成功投注的预测在哪里查看？',
                    name:'7',
                    answer1:'可登录APP后点击APP底部的“投注”按钮进入注单页面，点击注单页面顶部的页签按钮可切换查看不同状态的注单；未结算的注单是需要平台审核比赛结果等待结算的注单；已结算的注单是平台已审核通过且奖励已发放的注单。',
                },
                 {
                    title:'结算是按投注时的赔率还是按最终赔率计算？',
                    name:'8',
                    answer1:'成功投注后会生成一个注单凭证，注单凭证会记录并展示投注信息，如：投注金额、赔率等，赔率是生成注单时的赔率，结算时就按注单上的赔率进行计算。',
                },
                 {
                    title:'注单多久才进行结算？',
                    name:'9',
                    answer1:'注单的结算时间会受比赛和数量影响，正常情况下比赛结束后的24小时内即可完成结算，若延时未结算可联系在线客服咨询。',
                },
                 {
                    title:'注单结算后，竞猜币多久到账?',
                    name:'10',
                    answer1:'已结算的注单，竞猜币会即时发放到个人账户，可在“我的”页面查看账户余额，若余额未更新可重新登录APP查看，若余额还是有误可联系在线客服咨询。',
                },
            ]
        }
    },
    
}
</script>
<style lang="less" scoped>
    .page-help{
        width: 1240px;
        margin: auto;
        display: flex;
        .help_left{
            width:310px;
            background-color: #1c2236;
            height: 800px;
            position: relative;
            &::v-deep .el-tabs--left .el-tabs__item.is-left{
                text-align: left;
                font-size: 18px;
                color:#fff;
                height: 58px;
                line-height: 58px;
                width: 310px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            &::v-deep .el-tabs__item:hover{
                color:#28ffd4;
            }
            &::v-deep .el-tabs__item.is-active{
                background:#263046;
                color:#28ffd4 !important;
                border-left: 2px solid #28ffd4;
            }
             &::v-deep .el-tabs__nav-wrap::after{
                 display: none;
            }
            &::v-deep .el-tabs__item{
                padding: 0 15px;
            }
            &::v-deep .el-tabs__content{
                width: 840px;
                padding:40px 60px;
                position: absolute;
                height: 720px;
                left: 314px;
                background:#0B0E1A;
            }
            &::v-deep .el-tabs__active-bar{
                display: none ;
            }
            .help_right{
                .title{
                    font-size: 16px;
                    margin-bottom: 16px;
                    color:#fff;
                    font-size: 16px;
                }
                .text{
                    font-size: 14px;
                    color:#7086ae;
                    line-height: 22px;
                    p{
                        margin:5px 0;
                    }
                }
            }
        }
    }
</style>