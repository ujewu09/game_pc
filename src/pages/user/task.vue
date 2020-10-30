<template>
    <div class="page-task">
        <h2 class="task-h2">任务中心</h2>
        <div class="task_div" v-for="item in taskList" :key="item.assignId">
            <ul class="task_ul1" >
                <li v-if="item.assignId == 1" >首充红利</li>
                <li v-if="item.assignId == 2">注册有礼</li>
                <li v-if="item.assignId == 3" >推荐好友</li>
                <li v-if="item.assignId == 4">累计有效投注</li>
                <li v-if="item.assignId == 5" >累计充值</li>
                <li v-if="item.assignId == 6">累计投注</li>      
                <li>任务奖励</li>
                <li>完成度</li>
                <li>任务状态</li>
            </ul>
            <ul class="task_ul2" v-for="data in item.typeList" :key="data.taskID" >
                <li>{{data.target}}</li>
                <li>{{data.reward}}</li>
                <li>({{data.schedule}}/{{data.team}})</li>
                <button @click="gofinish(item.assignId)" ref="receive" v-if="data.status == 0" :class="{'unfinishe' : data.status == 0}">去完成</button>
                <button @click="receive(item,data)" v-if="data.status == 1" :class="{'unreceive' : data.status == 1}">领取奖励</button>
                <button v-if="data.status == 2" :class="{'received' : data.status == 2}">已领取</button>
            </ul>
        </div>
    </div>
</template>
<script>
import utils from '../../utils/common'
    export default {
        data() {
            return {
            }
        },
        computed:{
            taskList(){
                return this.$store.state.task.taskList;
            }
        },
        created(){
            this.$store.dispatch('TASK_DATA',{
                username:utils.gameUserInfo().data.nickname
            }).then(responese=>{
                if(responese.code == 200 && responese.data.taskList !={}){
                    this.$store.commit('TASK_DATA', responese.data.taskList)
                }
            })
        },
        methods: {
            receive(item,e){
                this.$store.dispatch('RECEIVE',{
                    username:utils.gameUserInfo().data.nickname,
                    assignId:item.assignId,
                    taskId:e.taskID,
                }).then(responese=>{
                    if(responese.code == 200){
                        this.$message.success("领取成功！")
                        //更新数据
                        this.$store.commit('MODIFY_GUESS_MONEY',responese.data.money)
                        e.status = 2;
                    }
                })
            },
            gofinish(id){
                switch(id){
                    case 1 :
                        this.$router.replace('wallet/recharge');
                    break;
                    case 3:
                        this.$router.replace('invite/myInvite');
                    break;
                    case 4:
                        this.$router.replace('/home/match');
                    break;
                    case 5:
                        this.$router.replace('wallet/recharge');
                    break;
                     case 6:
                        this.$router.replace('/home/match');
                    break;
                }
            }
        },
    }
</script>
<style lang="less" scoped>
    .page-task {
        background: #141926;
        padding: 40px 0 0 60px;
        min-height: 960px;
        .task-h2 {
            color: #fff;
            font-size: 40px;
        }
        .task_div {
            padding: 40px 0 0 60px;
            .task_ul1 {
                display: flex;
                flex-direction: row;
                margin: 0 0 0 -60px;
                cursor: pointer;
                color: #7086ae;
                font-size: 12px;
                text-align: left;
                li:nth-of-type(1){
                    width:220px;
                }
                li:nth-of-type(2),li:nth-of-type(3){
                    width:200px;
                    text-align: center;
                }
                li:nth-of-type(4){
                    width: 245px;
                    text-align: center;
                }
            }
            .task_ul2 {
                margin: 10px 0 0 -60px;
                display: flex;
                color: #bacef1;
                font-size: 14px;
                li:nth-of-type(1){
                    list-style: none;
                    width:220px;
                }
                li:nth-of-type(2),li:nth-of-type(3){
                    width:200px;
                    text-align: center;
                }
                button{
                    width: 68px;
                    height: 24px;
                    color: #526583;
                    font-size: 12px;
                    margin: auto;
                    outline: none;
                    border:none;
                    background:none;
                    cursor: pointer;
                }
                .unfinishe{
                   border:1px solid #01bcfd;
                   color:#01bcfd;
                }
                .unreceive{
                    background: linear-gradient(#07e2c6, #069ee7);
                    color:#Fff;
                }
                .received{
                    color:#506583;
                    border:1px solid #384460;
                }
            }
        }
    }
</style>
