<template>
    <div class="page-wallet-orderRecords">
        <div class="records_header">
            <span class="query_title">交易类型</span>
                <li @click="choose(0)">
                    <img :src="flag==0?img1:img2">
                    <span :class="{'span1':flag == 0}">未结算</span>
                </li>
                <li @click="choose(1)">
                    <img :src="flag==1?img1:img2"  @click="Unsettled(1)">
                    <span :class="{'span1':flag == 1}">已结算</span>
                </li>
        </div>
        <!-- 未结算订单 -->
        <div v-if="flag == 0">
            <div class="records_list unsettled"  v-for="item in settled_data" :key="item.BetId">
                <div class="record_time">
                    {{utils.formatDate(item.start_betting_time)}}
                </div>
                <div class="order_info">
                    <div class="game_type" v-if="item.data_type == 2">彩池盘</div>
                    <div class="game_type game" v-if="item.data_type == 1">比赛盘</div>
                    <div class="order_content">
                    <div class="content_left">
                        <div class="title">
                            <img src="../../../assets/wallet/lol.png"/>
                            <h5>{{item.bet_options}} ({{item.tag}}) </h5>
                            <span v-html=item.match_num></span>
                        </div>
                        <div class="tips" v-html=item.match_name></div>
                        <div class="name" v-html=item.team_vs></div>
                        <div class="nums">总下单金额：<span v-html=item.total_bet_score></span></div>
                    </div>
                    <div class="content_right">
                        <span class="state">待开奖</span>
                        <div class="begin_time">下单时间:{{utils.getLocalTime(item.start_betting_time)}}</div>
                        <p  @click="showList($event)">共{{item.detail_list.length}}笔<img src="../../../assets/wallet/right.png" /><img style="display:none" src="../../../assets/wallet/bottom.png" /></p>
                    </div>
                    </div>
                    <div class="details" style="display:none">
                        <div class="order_details" v-for="(data,index) in item.detail_list" :key="index">
                            <div class="details_left">
                                <div class="orders_info">
                                    <span>订单号:{{data.order_num}}</span>
                                    <img class="copy" src="../../../assets/common/cope.png"
                                        v-clipboard:copy='data.order_num'
                                        v-clipboard:success="copy" />
                                    <span>订单时间:{{utils.getLocalTime(data.bet_time)}}</span>
                                </div>
                                <div class="orders_data">
                                    <p class="order_num">下单金额：<span v-html=data.bet_score></span></p>
                                    <p class="pAndl">盈利：<span v-html=data.profit_score></span></p>
                                </div>
                            </div>
                            <div class="details_right">
                                <button>未结算</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 已结算订单 -->
        <div v-else>
            <div class="records_list settled" v-for="(item,index) in unsettled_data" :key="index">
                <div class="record_time">
                    {{utils.formatDate(item.start_betting_time)}}
                </div>
                <div class="order_info">
                    <div class="game_type" v-if="item.data_type == 2">彩池盘</div>
                    <div class="game_type game" v-if="item.data_type == 1">比赛盘</div>
                    <div class="order_content">
                    <div class="content_left">
                        <div class="title">
                            <img src="../../../assets/wallet/lol.png"/>
                            <h5>{{item.bet_options}} ({{item.tag}})  </h5>
                            <span v-html=item.match_num></span>
                        </div>
                        <div class="tips" v-html=item.match_name></div>
                        <div class="name" v-html=item.team_vs></div>
                    </div>
                    <div class="content_right">
                        <img class="status" v-if="item.bet_match_state ==1" src="../../../assets/wallet/victory.png" />
                        <img class="status" v-if="item.bet_match_state ==2" src="../../../assets/wallet/fail.png" />
                        <p class="zhuxiao" v-if="item.bet_match_state ==3">注销预测</p>
                        <div class="begin_time">开始时间:{{utils.getLocalTime(item.start_betting_time)}}</div>
                    </div>
                    </div>
                    <div class="order_details">
                        <div class="details_left">
                            <div class="orders_info">
                                <span>订单号:{{item.order_num}}</span>
                                <img class="copy" src="../../../assets/common/cope.png"
                                    v-clipboard:copy='item.order_num'
                                    v-clipboard:success="copy" />
                                <span>订单时间:{{utils.getLocalTime(item.order_time)}}</span>
                            </div>
                            <div class="orders_data">
                                <p class="order_num">下单金额：<span v-html=item.bet_score></span></p>
                                <p class="pAndl">盈利：<span v-html=item.profit_score></span></p>
                                <!-- <p class="pAndl" style="marginLeft:25px">返还金额：<span v-html=item.ret_gold></span></p> -->
                            </div>
                        </div>
                        <div class="details_right">
                            <button v-if="item.bet_match_state !=3" >已结算</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination" v-if="(settled_data.length >0 ||unsettled_data.length >0)" >
                <el-pagination
                :page-size="5"
                :current-page= page
                @current-change="changePage"
                layout="prev, pager, next"
                :total= total>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
// import utils from '../../../utils/common'
export default {
    data(){
        return{
            img1: require('../../../assets/images/player_icon_recharge_selected.png'),
            img2: require('../../../assets/images/player_icon_recharge_normal.png'),
            flag:0,
            settledList:{},
            total:0,
            page:1
        }
    },
    created(){
        //获取未结算的下单数据
        this.$store.dispatch('UNSETTLED_DATA',{
            page:this.page
        }).then(responese=>{
            if(responese.code == 200 && responese.data != {}){
                this.$store.commit('SETTLED_DATA',responese.data.no_settlement_list)
            }
        })
    },
    computed:{
        settled_data(){
            return this.$store.state.orderRecords.settled_data;
        },
        unsettled_data(){
            return this.$store.state.orderRecords.unsettled_data;
        }
    },
    methods:{
        showList(e){
           var details = e.currentTarget.parentElement.parentElement.nextElementSibling;
           var right = e.currentTarget.firstElementChild;
           var bottom = e.currentTarget.firstElementChild.nextElementSibling;
            if(details.style.display == 'block'){
                details.style.display = 'none';
                right.style.display = 'block';
                bottom.style.display = 'none';
            }else{
                details.style.display = 'block';
                bottom.style.display = 'block';
                right.style.display = 'none';
            }
        },
        choose(e){
            this.flag = e;
        },
        //
        Unsettled(page){
            this.$store.dispatch('SETTLED_DATA',{
                page:page,    
            }).then(responese=>{
                if(responese.code == 200 && responese.data.all_record_len != 0){
                    this.$store.commit('UNSETTLED_DATA',responese.data.betRecordList)
                    this.total = responese.data.all_record_len;
                }
            })
        },
        changePage(currentPage){
            this.$store.dispatch('SETTLED_DATA',{
                page:currentPage,
            }).then(responese=>{
                if(responese.code == 200 && responese.data.all_record_len != 0){
                    this.$store.commit('UNSETTLED_DATA',responese.data.betRecordList)
                }
            })
        },
        copy(){
            this.$message.success('复制成功');
        },
    }
}
</script>
<style lang="less" scoped>
@import url('../../../assets/style.less');
.page-wallet-orderRecords{
    .records_header{
        padding:40px 0 40px 60px;
        display: flex;
        align-items: center;
        .query_title{
            font-size:16px;
            color:#fff;
            margin:0 25px 0 0;
        }
        li{
            width:100px;
            display: flex;
            align-items: center;
            img{
                width: 16px;
                height: 16px;
            }
            span{
                font-size: 14px;
                margin:0 0 0 10px;
                color:@color-used;
            }
            .span1{
                color:@color-select;
            }
        }
    }
    .records_list{
        margin-left: -40px;
        .record_time{
            height:40px;
            background:#10141f;
            line-height: 40px;
            font-size:18px;
            padding-left:30px;
            color:@color-used;
        }
        .order_info{
            background:#141926;
            position: relative;
            .game_type{
                position: absolute;
                top:15px;
                transform:rotate(-45deg);
                border-bottom: 25px solid red;
                opacity: 0.5;
                color:@color-used;
                border-left: 25px solid transparent;
                border-right: 25px solid transparent; 
                height: 0; 
                left:-23px;
                width: 50px;
            }
            .order_content{
                display: flex;
                height:126px;
                padding:0 20px 0 60px;
                border-bottom: 1px solid #1c2236;
                .content_left{
                    flex:1;
                    .title{
                        display: flex;
                        align-items: center;
                        margin:16px 0 0 0;
                        h5{
                            font-size:16px;
                            color:#fff;
                            margin:0 20px 0 8px;
                        }
                        span{
                            color:@color-two-level;
                            font-size:16px;
                        }
                    }
                    .tips,.name{
                        font-size:12px;
                        color:@color-two-level;
                        margin:10px 0 0 0;
                    }
                    .name{
                        margin:5px 0 0 0;
                    }
                    .nums{
                        margin:10px 0 0 0;
                        font-size: 12px;
                        color:@color-two-level;
                        span{
                            font-size:18px;
                            font-family: "DIN";
                            color:@color-select;
                        }
                    }
                }
                .content_right{
                    display: flex;
                    flex-direction: column;
                    .status{
                        display: flex;
                        width: 28px;
                        height: 40px;
                        align-self: flex-end;
                        margin: 0 30px 0 0 ;
                    }
                    .zhuxiao{
                        color:@color-select;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .begin_time{
                        display: flex;
                        align-items: flex-end;
                        font-size: 14px;
                        color:@color-two-level;
                        margin:25px 0 0 0;
                    }
                    p{
                        display: flex;
                        align-self: flex-end;
                        align-items: center;
                        margin: 10px 30px 0 0 ;
                        font-size: 14px;
                        color:@color-two-level;
                        img{
                            width: 14px;
                            height:14px;
                            margin:0 0 0 5px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .order_details{
                display: flex;
                padding:10px 20px 16px 60px;
                background:#141926;
                border-bottom: 1px solid #1c2236;
                .details_left{
                    flex:1;
                    .orders_info,.orders_data{
                        font-size: 14px;
                        color:@color-two-level;
                    }
                    .orders_info{
                        .copy{
                            margin: 0 40px 0 8px;
                            cursor: pointer;
                        }
                    }
                    .orders_data{
                        display: flex;
                        margin:15px 0 0 0;
                        p:nth-of-type(1){
                            margin:0 40px 0 0;
                        }
                        span{
                            font-size: 18px;
                            color:@color-select;
                        }
                    }
                }
                .details_right{
                    display: flex;
                    align-items: flex-end;
                    button{
                        outline: none;
                        border:1px solid @color-tip;
                        background:none;
                        width:58px;
                        height:24px;
                        font-size: 12px;
                        color:@color-tip;
                    }
                    
                }
            }
        }
    }
    .unsettled{
        .order_info{
            .game{
                border-bottom:25px solid blue;
            }
            .order_content{
                .content_right{
                    .state{
                        display: flex;
                        flex-direction: row-reverse;
                        height:40px;
                        line-height: 60px;
                        align-self: center;
                        font-size: 16px;
                        color:@color-select;
                    }
                }
            }
        }
    }
    .settled{
        .order_info{
            .game{
                border-bottom:25px solid blue;
            }
            .order_content{
                height: 96px;
            }
        }     
    }
    .pagination{
        padding: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>