<template>
    <div class="user-invite-myInvite">
        <div class="myInvite-top" >
            <div class="extension">
                <div style="padding-top:30px">
                    <div class="extension_bj" @click="goCourse">查看推广教程</div>
                    <div class="Threesteps">
                        <div>
                            <div class="one">
                                <div class="one1" style="margin-top: 10px;"></div>
                                <div class="one2" style="margin-left: 30px;">
                                    <ul class="oneul">
                                        <li>01</li>
                                        <li>
                                            <p>第一步</p>
                                            <p>让好友下载</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oneone">
                            <div class="one">
                                <div class="one1" style="margin-top: 10px;"></div>
                                <div class="one2" style="margin-left: 30px;">
                                    <ul class="oneul">
                                        <li>02</li>
                                        <li>
                                            <p>第二步</p>
                                            <p>让好友注册玩家</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="oneone">
                            <div class="one">
                                <div class="one1" style="margin-top: 10px;"></div>
                                <div class="one2" style="margin-left: 30px;">
                                    <ul class="oneul">
                                        <li>03</li>
                                        <li>
                                            <p>第三步</p>
                                            <p>好友玩游戏</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step">
                        <p>步骤详细说明</p>
                        <ul class="step_ul">
                            <li>(1) 复制连接发给好友，或者好友直接扫描二维码;</li>
                            <li>(2) 好友下载APP并注册成功;</li>
                            <li>(3) 好友玩游戏，不管输赢，都会增加您的推广流水。</li>
                        </ul>
                    </div>
                    <div class="invitation">
                        <p>我的邀请推广</p>
                        <div class="code">
                            <div>
                                <span>手机网页二维码</span>
                                <div class="erweima">
                                    <img src="../../../assets/common/phoneQR.png"/>
                                </div>
                            </div>
                            <div>
                                <span style="marginLeft:28px">扫码下载APP</span>
                                <div class="erweima">
                                    <img class="appQR" src="../../../assets/common/appQR.png"/>
                                </div>
                            </div>
                        </div>
                        <div class="bj">
                            <div class="bjdiv1">
                                <span>下载App</span>
                                <span>{{app_spreadUrl}}</span>
                                <button v-clipboard:copy='app_spreadUrl'
                                    v-clipboard:success="copy">复制</button>
                            </div>
                        </div>
                        <div class="bj1">
                            <div class="bjdiv1">
                                <span>推广链接</span>
                                <span>{{h5_spreadUrl}}</span>
                                <button v-clipboard:copy='h5_spreadUrl'
                                    v-clipboard:success="copy">复制</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>
<script>
import utils from '../../../utils/common'
export default {
    data(){
        return{
           h5_spreadUrl:'',
           app_spreadUrl:'',
        }
    },
    created(){
        let gameUserInfo = Object.assign(this.utils.gameUserInfo());
        if( gameUserInfo.data != '{}'){
            this.h5_spreadUrl = utils.gameUserInfo().data.h5_spreadUrl;
            this.app_spreadUrl = utils.gameUserInfo().data.app_spreadUrl
        }
    },
    methods:{
        goCourse(){
            this.$router.replace('course')
        },
        copy(){
           this.$message.success('复制成功'); 
        }
    }
}

</script>
<style lang="less" scoped>
    .user-invite-myInvite{
        width: 921px;
        height: 798px;
        background: #0b0e1a;
        border: 1px #262933 solid;
        .myInvite-top{
             width: 921px;
             margin: 25px 50px;

            .extension{
                width: 810px;
                height: 152px;
                background:url(../../../assets/common/bg.png);
                .extension_bj{
                    background: url(../../../assets/images/chakantuiguangjiaocheng.png)no-repeat;
                    width: 128px;
                    height: 34px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                    cursor: pointer;
                    line-height: 36px;
                    margin-left: 326px;
                    text-align: center;
                }

                .Threesteps{
                    margin-top: 28px;
                    // float: left;
                }
                .Threesteps>div{
                    display: inline-block;
                    width:  266px;
                    height: 60px;
                    background: #1b273b;
                }

                .Threesteps div:nth-last-of-type(1){
                    margin: 0 3px;
                }
                .Threesteps div:nth-last-of-type(2){
                    margin: 0 3px;
                }
                .oneone{
                    position: relative;
                    left: 3px;
                }
                .one1{
                    width: 3px;
                    height:  40px;
                    display: inline-block;
                    background: #28ffd4;
                }
                .oneul li{
                    display: inline-block;
                }
                .oneul li:nth-last-of-type(2){
                    font-size: 40px;
                    color: #7086ae;
                }
                .oneul li:nth-last-of-type(1){
                    padding-left: 30px;
                }
                .oneul li:nth-last-of-type(1) P:nth-last-of-type(2){
                    font-size: 12px;
                    color: #bacef1;
                    position: relative;
                    top: -5px;
                }
                .oneul li:nth-last-of-type(1) P:nth-last-of-type(1){
                    font-size: 16px;
                    color: #bacef1;
                    position: relative;
                    top: 2px;
                }
                .one2{
                    display: inline-block;
                    position: relative;
                    top: -4px;
                }
                .step{
                    margin-top: 40px;
                }
                .step p{
                    color: #fff;
                    font-size: 16px;
                }
                .step_ul{
                    margin-top: 16px;
                }
                .step_ul li{
                    list-style: none;
                    color: #7086ae;
                    font-size: 14px;
                    line-height: 24px ;
                }
                .invitation{
                    margin-top: 40px;
                }
                .invitation p{
                    color: #fff;
                    font-size: 16px;
                }
                .code{
                   display: flex;
                   justify-content: center;
                }
                .code span{
                    color: #7086ae;
                    font-size: 14px;
                    padding-left: 10px;
                }
                .erweima{
                    width: 120px;
                    height: 120px;
                    margin-top: 10px;
                }
                .appQR{
                    margin:-7px 0 0 15px;
                }
                .bj{
                    width: 810px;
                    margin-top: 30px;
                    background: #141926;
                    height: 48px;
                    border-radius: 2px;
                }
                .bj1{
                    width: 810px;
                    margin-top: 10px;
                    background: #141926;
                    height: 48px;
                    border-radius: 2px;
                }
                .bjdiv1{
                    padding: 13px 0 0 30px;
                }
                .bjdiv1 span:nth-last-of-type(2){
                    font-size: 14px;
                    color: #fff;
                }
                .bjdiv1 span:nth-last-of-type(1){
                    font-size: 14px;
                    color: #bacef1;
                    padding-left: 40px;
                    cursor: pointer;
                }
                button{
                    float: right;
                    width: 70px;
                    outline: none;
                    text-align: center;
                    cursor: pointer;
                    height: 25px;
                    font-size: 12px;
                    background: #263046;
                    border: 1px #307699 solid;
                    border-radius: 2px;
                    color: #ffffff;
                    margin: -2px 30px 0 0px;
                }
                button:hover{
                    background: linear-gradient(#07e2c6, #069ee7);
                }
            }
        }
    }
</style>