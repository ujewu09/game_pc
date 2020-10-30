<template>
    <div class="page-match">
        <div v-for="item in gameList" 
            :key="item.top_option.option_id" 
            v-show="gameType == item.game_type_id || gameType == -1"
            class="list" 
            @click="goGameDetail(item)">
            <component-match-info :gameInfo="item">
                <template #data>
                    <div class="middle-vs">
                        <div class="data">{{item.top_option.bet_nums[0].score}}</div>
                        <div class="data">{{item.round}}</div>
                        <div class="data">{{item.top_option.bet_nums[1].score}}</div>
                    </div>
                </template>
            </component-match-info>
        </div>
    </div>
</template>

<script>
import ComponentMatchInfo from './../../components/ComponentMatchInfo';
import { sendWSPush, sendReqPing } from './../../websocket/websocket.js';
export default {
    components: {
        ComponentMatchInfo
    },
    name: 'match',
    data() {
        return {
            gameList: [],
            gameStatus: this.$store.state.home.homeGameStatus,
        }
    },
    computed: {
        gameType() {
            return this.$store.state.home.homeGameType;
        },
        gameTypeList(){
            return this.$store.state.home.gameTypeList;
        } 
    },
    mounted() {
        // 请求 websocket 数据
        this.requestWebsocket(this.gameTypeList);

        // websocket 返回事件
        window.addEventListener("onmessageWS", (e) => { 
            if (!e.detail && !e.detail.data) return;
            let result = JSON.parse(e.detail.data);
            let { code, cmd, data } = result;

            if(code == 200 && cmd == "match_list") {
                this.gameList = data;
            } else if (cmd == "list_update") {
                 // 更新操作
                //  “utype":  0 //  0 变化，1 新增 2 删除
                for(let g = 0; g < data.length; g++) {
                    if (data[g].utype == 0) {
                        for (let i = 0; i < this.gameList.length; i++) {
                            if (data[g].data_type == this.gameList[i].data_type && 
                                data[g].game_type_id == this.gameList[i].game_type_id && 
                                data[g].match_seq_num == this.gameList[i].match_seq_num) {
                                //  修改字段
                                if (data[g].bet_nums != undefined) 
                                    this.gameList[i].bet_nums = data[g].bet_nums;
                     
                                if (data[g].game_logo_url != undefined) 
                                    this.gameList[i].game_logo_url = data[g].game_logo_url;
                                
                                if (data[g].game_name != undefined) 
                                    this.gameList[i].game_name = data[g].game_name;

                                if (data[g].game_status != undefined) 
                                    this.gameList[i].game_status = data[g].game_status;

                                if (data[g].have_live != undefined) 
                                    this.gameList[i].have_live = data[g].have_live;
                                
                                if (data[g].match_name != undefined) 
                                    this.gameList[i].match_name = data[g].match_name;

                                if (data[g].match_start_time != undefined) 
                                    this.gameList[i].match_start_time = data[g].match_start_time;

                                if (data[g].round != undefined) 
                                    this.gameList[i].round = data[g].round;
                                

                                if (data[g].top_option != undefined) {
                                    if (data[g].top_option.option != undefined) 
                                        this.gameList[i].top_option.option = data[g].top_option.option;

                                    if (data[g].top_option.segmentation_name != undefined) 
                                        this.gameList[i].top_option.segmentation_name = data[g].top_option.segmentation_name;
                                    
                                    if (data[g].top_option.status != undefined) 
                                        this.gameList[i].top_option.status = data[g].top_option.status;
                                    
                                    if (data[g].top_option.bet_nums.length > 0) {
                                        for (let a = 0; a < data[g].top_option.bet_nums.length; a++) {
                                            if (data[g].top_option.bet_nums[a].odds != undefined)
                                                this.gameList[i].top_option.bet_nums[a].odds = data[g].top_option.bet_nums[a].odds;
                                            
                                            if (data[g].top_option.bet_nums[a].pond != undefined)
                                                this.gameList[i].top_option.bet_nums[a].pond = data[g].top_option.bet_nums[a].pond;
                                            
                                            if (data[g].top_option.bet_nums[a].score != undefined)
                                                this.gameList[i].top_option.bet_nums[a].score = data[g].top_option.bet_nums[a].score;
                                            
                                            if (data[g].top_option.bet_nums[a].status != undefined)
                                                this.gameList[i].top_option.bet_nums[a].status = data[g].top_option.bet_nums[a].status;
                                            
                                            if (data[g].top_option.bet_nums[a].tag != undefined)
                                                this.gameList[i].top_option.bet_nums[a].tag = data[g].top_option.bet_nums[a].tag;
                                            
                                            if (data[g].top_option.bet_nums[a].team_logo_url != undefined)
                                                this.gameList[i].top_option.bet_nums[a].team_logo_url = data[g].top_option.bet_nums[a].team_logo_url;
                                            
                                            if (data[g].top_option.bet_nums[a].team_name != undefined)
                                                this.gameList[i].top_option.bet_nums[a].team_name = data[g].top_option.bet_nums[a].team_name;
                                            
                                            if (data[g].top_option.bet_nums[a].total != undefined)
                                                this.gameList[i].top_option.bet_nums[a].total = data[g].top_option.bet_nums[a].total;
                                            
                                            if (data[g].top_option.bet_nums[a].trend != undefined)
                                                this.gameList[i].top_option.bet_nums[a].trend = data[g].top_option.bet_nums[a].trend;
                                            
                                        }
                                    }
                                }
                            }
                        }
                    } else if (data[g].utype == 1) {
                        // 添加
                        this.gameList.push(data[g]);
                    } else if (data[g].utype == 2) {
                        for (let i = 0; i < this.gameList.length; i++) {
                            if (data[g].data_type == this.gameList[i].data_type && 
                                data[g].game_type_id == this.gameList[i].game_type_id && 
                                data[g].match_seq_num == this.gameList[i].match_seq_num) {
                                this.gameList.splice(i, 1);
                            }
                        }
                    }
                }
                
            }
            this.$forceUpdate();
        });
        
    },
    methods: {
        goGameDetail(data) {
            this.$store.commit("WEBSOCKET_ITEM", data);
            this.$router.push({ path: '/home/matchDetail' });
        },
        requestWebsocket(list) {
            if (list.length <= 0) {
                setTimeout(() => {
                    this.requestWebsocket(this.gameTypeList);
                }, 1000);
            } else {
                let game_type_ids = [];
                list.map(item => {
                    if (item.id != -1) {
                        game_type_ids.push(item.id);
                    }
                })

                sendWSPush({
                    cmd: 'match_list',
                    group: 'gameinfo',
                    seq: 0,
                    data: {
                        utype: 0,
                        game_type_ids: game_type_ids,
                        channel_id: 1,
                        game_status: this.gameStatus,
                        data_type: this.config.PLAY_MODE
                    }
                });

                // 发送心跳 match_list 心跳
                sendReqPing(1000 * 30, {
                    cmd: 'list_ping',
                    group: 'gameinfo',
                    seq: 0,
                    data: {
                        utype: 1,
                        game_type_ids: game_type_ids,
                        channel_id: 1,
                        game_status: this.gameStatus,
                        data_type: this.config.PLAY_MODE
                    }
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
    @import url('./../../assets/style.less');
    .page-match {
        .middle-vs {
            margin: 50px 0 0 0;
            display: flex;
            font-weight: bold;
            font-size: 25px;
            .data {
                flex: 1;
                &:first-child {
                    text-align: left;
                }
                &:last-child {
                    text-align: right;
                }
            }
        }
        .list {
            margin-bottom: 3px;
            cursor: pointer;
            &::v-deep .game {
                border: 1px solid @color-line;
                .top {
                    background: transparent !important;
                }
                .game-data {
                    margin: -60px 0 0 0;
                    .top-vs {
                        visibility: hidden;
                    }
                }
            }
        }


        .list {
            position: relative;
            width: 966px;
            height: 189px;
        }
        .list:before,.list:after{
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 2px solid transparent;
            box-sizing: border-box;
            position: absolute;
        }
        .list:before {
            top:0;
            left:0;
            // transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s, height 0.2s ease-in 0.4s;
        }
        .list:after{
            right: 0;
            bottom: 0;
            // transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s, height 0.2s ease-in;
        }
        
        .list:hover:before{
            width: 100%;
            height: 100%;
            transition: width 0.2s ease-in, height 0.2s ease-in 0.2s;
            border-top-color: #28ffd4;
            border-right-color: #28ffd4;
        }
        .list:hover:after{
            width:100%;
            height:100%;
            transition:  width 0.2s ease-in, height 0.2s ease-in 0.2s;
            border-bottom-color: #28ffd4;
            border-left-color:#28ffd4;
        }


    }
</style>
