<template>
    <div class="user-invite-course">
        <div class="course">
            <p class="course_p">推广教程</p>
            <div class="div">
                <p>全民推广采用流水逐级返豆模式</p>
                <img src="../../../assets/images/Loss_image.png" alt="">
                <ul class="course_ul">
                    <li>(1) 好友A和好友B是自己的直属;</li>
                    <li>(2) A1、A2、B1、B2及其以下是自己的从属</li>
                    <li>(3) 自己及所有下级为自己的团队</li>
                    <li>(4) 自己的团队流水=自己及所有下级成员的有效流水总和</li>
                </ul>
                <p style="margin-top:40px">奖励计算方法</p>
                <ul class="course_ul">
                    <li>您的奖励=您的团队奖励-每个直属的团队奖励</li>
                    <li>团队奖励=团队总流水*每万流水反竞猜币</li>
                </ul>
                <table id="table">
                    <tr v-for="(item,index) in array" :key="index">
                        <td>{{item.name}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.month}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            array:[
                {
                    name:"推广等级",total:"团队总流水",month:"每月流水返回竞猜币"
                },
                {
                    name:"新手玩家",total:"1万≤X<5万",month:"100"
                },
                {
                    name:"普通玩家",total:"5万≤X<10万",month:"120"
                },
                {
                    name:"资深玩家",total:"10万≤X<15万",month:"140"
                },
                {
                    name:"超级玩家",total:"15万≤X<20万",month:"180"
                },
                {
                    name:"青铜玩家",total:"20万≤X<30万",month:"200"
                },
                {
                    name:"白银玩家",total:"30万≤X<40万",month:"220"
                },
                {
                    name:"黄金玩家",total:"40万≤X<50万",month:"240"
                },
                {
                    name:"钻石玩家",total:"X<50万",month:"260"
                },
            ],
        }
    },
}
</script>
<style lang="less" scoped>
    @import url('../../../assets/style.less');
    .user-invite-course{
        width: 921px;
        height: 798px;
        background: #0b0e1a;
        border: 1px #262933 solid;
        white-space: nowrap;

        .course{
            margin:  40px 0 0 60px;

            .course_p{
                font-size: 16px;
                cursor: pointer;
                color: #fff;
            }
        }
        
        .div{
            margin-top: 16px;

            .course_ul{
                margin-top: 16px;
            }
            .course_ul li{
                margin: 8px 0px;
                font-size: 14px;
                color: #7086ae;
                cursor: pointer;
            }
            #table{
                width: 370px;
                height: 286px;
                background: #141926;
                cursor: pointer;
            }
            #table tr{
                display: block;
                height: 30px;
                line-height: 30px;
            }
            #table tr:nth-last-of-type(9){
                background:#115a6d;
                color: #fff;
                font-size: 12px;
                padding-left: 20px;
            }
            #table tr:nth-last-of-type(9) td:nth-last-of-type(2){
                padding-left: 70px;
            }
            #table tr:nth-last-of-type(9) td:nth-last-of-type(1){
                padding-left: 40px;
            }
            #table tr:nth-last-of-type(8){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(8) td:nth-last-of-type(2){
                padding-left: 57px;
            }
            #table tr:nth-last-of-type(8) td:nth-last-of-type(1){
                padding-left: 80px;
            }
            #table tr:nth-last-of-type(7){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(7) td:nth-last-of-type(2){
                padding-left: 55px;
            }
            #table tr:nth-last-of-type(7) td:nth-last-of-type(1){
                padding-left: 75px;
            }
            #table tr:nth-last-of-type(6){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(6) td:nth-last-of-type(2){
                padding-left: 50px;
            }
            #table tr:nth-last-of-type(6) td:nth-last-of-type(1){
                padding-left: 72px;
            }
            #table tr:nth-last-of-type(5){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(5) td:nth-last-of-type(2){
                padding-left: 50px;
            }
            #table tr:nth-last-of-type(5) td:nth-last-of-type(1){
                padding-left: 72px;
            }
            #table tr:nth-last-of-type(4){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(4) td:nth-last-of-type(2){
                padding-left: 50px;
            }
            #table tr:nth-last-of-type(4) td:nth-last-of-type(1){
                padding-left: 72px;
            }
            #table tr:nth-last-of-type(3){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(3) td:nth-last-of-type(2){
                padding-left: 50px;
            }
            #table tr:nth-last-of-type(3) td:nth-last-of-type(1){
                padding-left: 72px;
            }
            #table tr:nth-last-of-type(2){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(2) td:nth-last-of-type(2){
                padding-left: 50px;
            }
            #table tr:nth-last-of-type(2) td:nth-last-of-type(1){
                padding-left: 72px;
            }
            #table tr:nth-last-of-type(1){
                color: #bacef1;
                font-size: 14px;
                padding-left: 18px;
            }
            #table tr:nth-last-of-type(1) td:nth-last-of-type(2){
                padding-left: 70px;
            }
            #table tr:nth-last-of-type(1) td:nth-last-of-type(1){
                padding-left: 90px;
            }
        }
        .div>p{
            color: #ffffff;
            font-size: 16px;
        }
        .div img{
            margin: 16px 0 0 150px;
        }
    }   
</style>