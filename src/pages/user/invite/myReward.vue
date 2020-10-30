<template>
    <div class="user-invite-myReward">
        <div class="myReward_top">
            <p class="myReward_top_p">我的邀请</p>
            <div class="div">
                <ul class="one">
                    <li>
                        <div class="one_1">
                            <p v-html=reward_data.user_id></p>
                            <p>我的ID</p>
                        </div>
                    </li>
                    <li>
                        <div class="one_2">
                            <p v-if="reward_data.parent_id == 0"> 暂无</p>
                            <p v-else> {{reward_data.parent_id}}</p>
                            <p>上级ID</p>
                        </div>
                    </li>
                    <li>
                        <div class="one_3">
                            <p v-html=reward_data.child_count></p>
                            <p>直系好友</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="div1">
                <p class="myReward_top_p">流水数据</p>
                <div class="two">
                    <ul class="two_ul">
                        <li>
                            <ul class="two_ul1">
                                <li>当前可领取奖励<span>(竞猜币)</span></li>
                                <li v-html=reward_data.current_amount></li>
                                <li :class="{'receive' : reward_data.current_amount != 0}">领取</li>
                            </ul>
                        </li>
                        <li>
                           <p>累计奖励</p>
                           <p v-html=reward_data.total_amount></p>
                        </li>
                        <li>
                           <p>昨日奖励</p>
                           <p v-html=reward_data.last_amount></p>
                        </li>
                        <li>
                           <p>累计领取</p>
                           <p v-html=reward_data.draw_amount></p>
                        </li>
                    </ul>
                </div>
                <div class="sex">
                    <!-- 我的奖励 -->
                    <ul class="reward">
                        <li>我的奖励</li>
                        <li id="li1" @click="choose(0)">
                            <img :src="flag==0?img1:img2" alt="" id="img1">
                            <span id="span1" :class="flag==0?span1:span2">流水详情</span>
                        </li>
                        <li id="li2" @click="choose(1)">
                            <img :src="flag==1?img1:img2" alt="" id="img2">
                            <span id="span2" :class="flag==1?span1:span2">每日记录</span>
                        </li>
                        <li id="li3" @click="choose(2)">
                            <img :src="flag==2?img1:img2" alt="" id="img3">
                            <span id="span3" :class="flag==2?span1:span2">领取记录</span>
                        </li>
                    </ul>
                    <ul class="transaction" v-if="flag != 2">
                        <li>交易时间</li>
                        <li>
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </li>
                        <li @click="age=0">
                            <div :class="age==0?bj1:bj2" style="margin: 0 0 0 11px" @click="query(reward_data.user_id)">查询</div>
                        </li>
                    </ul>
                    <ul class="subordinate" v-if="flag != 2">
                        <li>下级ID</li>
                        <li>
                            <input type="text" v-model="id" placeholder="请输入下级ID">
                        </li>
                        <li @click="age=1">
                            <div :class="age==1?bj1:bj2" @click="query(id)">查询</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="div2" v-if="flag == 0">
                <div class="five">
                    <p>流水详情</p>
                    <table id="table" >
                        <tr v-for="(item,index) in table1" :key="index">
                            <td>{{item.name}}</td>
                            <td>{{item.register}}</td>
                            <td>{{item.personal}}</td>
                        </tr>
                        <tr v-for="(item,index) in flow_data" :key="index+1">
                            <td>{{item.user_id}}</td>
                            <td>{{item.r_time}}</td>
                            <td>{{item.flow}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="div2" v-if="flag == 1">
                <div class="five">
                    <p>每日记录</p>
                    <table id="table" class="table2" >
                        <tr v-for="(item,index) in table2" :key="index">
                            <td>{{item.name}}</td>
                            <td>{{item.follow1}}</td>
                            <td>{{item.follow2}}</td>
                            <td>{{item.follow3}}</td>
                        </tr>
                        <tr>
                            <td>{{every_record.user_id}}</td>
                            <td>{{every_record.flow}}</td>
                            <td>{{every_record.rate}}</td>
                            <td>{{every_record.total_amount}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="div2" v-if="flag == 2">
                <div class="five">
                    <p>领取记录</p>
                    <table id="table" class="table3" >
                        <tr v-for="(item,index) in table3" :key="index">
                            <td>{{item.time}}</td>
                            <td>{{item.record}}</td>
                        </tr>
                        <tr v-for="(item,index) in receive_record" :key="index+1">
                            <td>{{item.time}}</td>
                            <td>{{item.amount}}</td>
                        </tr>
                    </table>
                </div>
            </div>    
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        flag:0,
        age:0,
        img1: require('../../../assets/images/player_icon_recharge_selected.png'),
        img2: require('../../../assets/images/player_icon_recharge_normal.png'),
        span1:"biao",
        span2:"haiyuan",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        id:'',
        value1:'',
        buttom:"transaction_blue",
        bj1:"transaction_bj",
        bj2:"subordinate_bj",
        table1:[
            {
                name:"玩家ID",register:"注册时间",personal:"个人流水"
            },
        ],
         table2:[
            {
                name:"玩家ID",follow1:"团队总流水",follow2:"每万流水返竞猜币",follow3:"团队总返竞猜币"
            },
        ],
        table3:[
            {
                time:"领取时间",record:"领取记录"
            },
        ]
      }
    },
    computed:{
        reward_data(){
            return this.$store.state.myReward.reward_data;
        },
        flow_data(){
            return this.$store.state.myReward.flow_data;
        },
        every_record(){
            return this.$store.state.myReward.every_record;
        },
        receive_record(){
            return this.$store.state.myReward.receive_record
        }
        
    },
    created(){
        this.$store.dispatch('REWARD_DATA',{}).then(responese=>{
            if(responese.code == 200 && responese.data !={}){
                this.$store.commit("REWARD_DATA",responese.data)
            }
        })
    },
    methods:{
        query(id){
            if(this.flag == 0){
                this.$store.dispatch('FLOW_DATA',{
                    p:1,
                    date:this.value1,
                    user_id:Number(id)
                }).then(responese=>{
                    if(responese.code == 200 && responese.data.length > 0){
                        this.$store.commit('FLOW_DATA',responese.data)
                    }else{
                        this.$message({
                            type:'warning',
                            message:"当前暂无数据"
                        })
                    }
                })
            }else if(this.flag == 1){
                this.$store.dispatch('EVERY_DATA',{
                    p:1,
                    date:this.value1,
                    user_id:Number(id)
                }).then(responese=>{
                    if(responese.code == 200 && responese.data != '[]'){
                        this.$store.commit('EVERY_DATA',responese.data.info)
                    }else{
                        this.$message({
                            type:'warning',
                            message:"当前暂无数据"
                        })
                    }
                })
            }
        },
        choose(e){
            this.flag = e;
            if(this.flag == 2){
                this.$store.dispatch('RECEIVE_RECORD',{}).then(responese=>{
                    if(responese.code == 200 && responese.data.length > 0){
                        this.$store.commit('RECEIVE_RECORD',responese.data)
                    }else{
                        this.$message({
                            type:'warning',
                            message:'当前暂无领取记录'
                        })
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .user-invite-myReward{
        width: 921px;
        height: 798px;
        background: #0b0e1a;
        border: 1px #262933 solid;
        white-space: nowrap;
        .myReward_top{
            margin:  40px 0 0 60px;

            .myReward_top_p{
                color: #fff;
                font-size: 16px;
            }
            .div{
                margin-top: 16px;

                .one li{
                    display: inline-block;
                    margin: 0 6px;
                }
                .one_1{
                    background: url(../../../assets/images/wodeid.png)no-repeat;
                    width: 264px;
                    height: 123px;
                    text-align: center;
                }
                .one_1 P:nth-last-of-type(2){
                    color: white;
                    font-size: 36px;
                    font-weight: bold;
                    line-height: 36px;
                    padding-top: 24px;
                    cursor: pointer;
                }
                .one_1 P:nth-last-of-type(1){
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .one_2{
                    background: url(../../../assets/images/wodeshangji.png)no-repeat;
                    width: 264px;
                    height: 123px;
                    text-align: center;
                }
                .one_2 P:nth-last-of-type(2){
                    color: white;
                    font-size: 36px;
                    font-weight: bold;
                    line-height: 36px;
                    padding-top: 24px;
                    cursor: pointer;
                }
                .one_2 P:nth-last-of-type(1){
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .one_3{
                    background: url(../../../assets/images/zhixihaoyou.png)no-repeat;
                    width: 264px;
                    height: 123px;
                    text-align: center;
                }
                .one_3 P:nth-last-of-type(2){
                    color: white;
                    font-size: 36px;
                    font-weight: bold;
                    line-height: 36px;
                    padding-top: 24px;
                    cursor: pointer;
                }
                .one_3 P:nth-last-of-type(1){
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                }
            }

            .div1{
                margin: 41px 0 0 0;
                .two{
                    margin: 16px 0 0 0;
                    .two_ul>li{
                        display: inline-block;
                        margin: 0 7px;
                        border-radius: 2px;
                    }
                    .two_ul>li:nth-last-of-type(4){
                        width: 196px;
                        height: 115px;
                        background: #141926;
                    }
                    .two_ul1{
                        margin: 16px 0 0 0;
                        text-align: center;
                    }
                    .two_ul1 span{
                        color: #7086ae;
                        font-size: 12px;
                    }
                    .two_ul1 li:nth-last-of-type(3){
                        font-size: 12px;
                        color: #bacef1;
                    }
                    .two_ul1 li:nth-last-of-type(2){
                        margin-top: 10px;
                        font-size: 20px;
                        color: #fff;
                    }
                    .two_ul1 li:nth-last-of-type(1){
                        margin: 12px 0 0 64px;
                        font-size: 12px;
                        color: #fff;
                        background:#7086ae;
                        width: 68px;
                        border-radius: 2px;
                        height: 24px;
                        line-height: 24px;
                        cursor: pointer;
                    }
                    .receive{
                        background: url(../../../assets/images/renwulingqu.png)no-repeat;
                    }
                    .two_ul>li:nth-last-of-type(3){
                        width: 196px;
                        height: 115px;
                        background: #141926;
                        text-align: center;
                        // line-height: 36px;
                        position: relative;
                        top: -56px;
                    }
                    .two_ul>li:nth-last-of-type(3) p:nth-last-of-type(2){
                        color: #7086ae;
                        font-size: 14px;
                        position: relative;
                        top: 36px;
                    }
                    .two_ul>li:nth-last-of-type(3) p:nth-last-of-type(1){
                        color: #ffffff;
                        font-size: 20px;
                        top: 40px;
                        position: relative;
                    }
                    .two_ul>li:nth-last-of-type(2){
                        width: 196px;
                        height: 115px;
                        background: #141926;
                        text-align: center;
                        // line-height: 36px;
                        position: relative;
                        top: -56px;
                    }
                    .two_ul>li:nth-last-of-type(2) p:nth-last-of-type(2){
                        color: #7086ae;
                        font-size: 14px;
                        position: relative;
                        top: 36px;
                    }
                    .two_ul>li:nth-last-of-type(2) p:nth-last-of-type(1){
                        color: #ffffff;
                        font-size: 20px;
                        top: 40px;
                        position: relative;
                    }
                    .two_ul>li:nth-last-of-type(1){
                        width: 196px;
                        height: 115px;
                        background: #141926;
                        text-align: center;
                        // line-height: 36px;
                        position: relative;
                        top: -56px;
                    }
                    .two_ul>li:nth-last-of-type(1) p:nth-last-of-type(2){
                        color: #7086ae;
                        font-size: 14px;
                        position: relative;
                        top: 36px;
                    }
                    .two_ul>li:nth-last-of-type(1) p:nth-last-of-type(1){
                        color: #ffffff;
                        font-size: 20px;
                        top: 40px;
                        position: relative;
                    }
                }
                .reward li{
                    display: inline-block;
                    margin: 0 10px;
                }
                .reward li img{
                    vertical-align: middle;
                }
                .reward li span{
                    vertical-align: middle;
                    margin: 0 12px;
                    cursor: pointer;
                }
                .biao{
                    color: turquoise;
                }
                .haiyuan{
                    color: #566788;
                }
                /deep/.el-input__inner{
                    width: 230px;
                    height: 34px;
                    background: #0b0e1a;
                    border: 1px #2c364a solid;
                    color: #fff;
                    text-align: left;
                }
                /deep/.el-input__icon{
                    position: absolute;
                    /* right: -51px; */
                    left: 190px;
                    /* size: 21px; */
                    font-size: 17px;
                    top: -1px;
                }
                /deep/.el-input__suffix-inner>.el-input__icon{
                    display: none;
                }
                .transaction{
                    margin-top: 25px;
                }
                .transaction li{
                    display: inline-block;
                    margin: 0 10px;
                }
                .transaction_bj{
                    background: url(../../../assets/images/anniuxuanzhong.png)no-repeat;
                    width: 95px;
                    height: 34px;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 36px;
                    color: #01bcfd;
                    cursor: pointer;
                }
                .subordinate{
                    margin-top: 25px;
                }
                .subordinate li{
                    display: inline-block;
                    margin: 0 10px;
                }
                .subordinate li>input{
                    width: 230px;
                    height: 32px;
                    margin: 0 0 0 12px;
                    border-radius: 2px;
                    background: #0b0e1a;
                    border: 1px #2c364a solid;
                    color: #fff;
                    text-indent: 2em;
                }
                .subordinate_bj{
                    background: url(../../../assets/images/anniumoren.png)no-repeat;
                    width: 95px;
                    height: 34px;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 36px;
                    color: #b2c5e7;
                    cursor: pointer;
                }
            }
            
            .div2{
                border-top: 1px #222637 solid;
                width: 921px;
                height: 185px;
                margin: 15px 0 0 0;
                /* float: left; */
                position: relative;
                left: -61px;
                .table2{
                    tr{
                        color:#9ba3bc;
                        font-size: 14px;
                        td{
                            width: 200px;
                        }
                        td:nth-of-type(3){
                            width:250px;
                            margin-left: 0 !important;
                        }
                         td:nth-of-type(4){
                            margin-left: 0 !important;
                        }
                    }
                }
                .table3{
                    tr{
                        color:#9ba3bc;
                        font-size: 14px; 
                    }
                    td{
                        width: 300px;
                        margin-left: 0 !important;
                    }
                }
                    .five{
                    margin: 17px 69px;
                }
                .five>P{
                    color: white;
                }
                #table{
                    margin: 10px 0;
                }
                #table tr{
                    margin: 5px 0;
                    display: block;
                }
                #table{
                   tr{
                        color:#9ba3bc;
                        font-size: 14px;
                        td{
                            width: 200px;
                        }
                        td:nth-of-type(3){
                            width:250px;
                            margin-left: 0 !important;
                        }
                         td:nth-of-type(4){
                            margin-left: 0 !important;
                        }
                    }
                }
            }
        }
    }
</style>