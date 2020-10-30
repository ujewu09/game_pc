<template>
    <div class="page-home">
        <component-carousel></component-carousel>
        <div class="platformData">
            <div class="left">
                <div class="status">
                    <ul>
                        <li>
                            <el-radio v-model="gameStatus" @change="toggleGameStatus" :label="1">
                                今日
                                <!-- <span>37</span> -->
                            </el-radio>
                        </li>
                        <li>
                            <el-radio v-model="gameStatus" @change="toggleGameStatus" :label="0">
                                未开始
                                <!-- <span>37</span> -->
                            </el-radio>
                        </li>
                        <li>
                            <el-radio v-model="gameStatus" @change="toggleGameStatus" :label="2">
                                已结束
                                <!-- <span>37</span> -->
                            </el-radio>
                        </li>
                    </ul>
                </div>
                <div class="currency">
                    <div class="price"><img src="./../assets/wallet/coin_flat.png" />平台币 {{utils.ThousandNum(this.$store.state.user.userData.platform_money)}}</div>
                    <div class="price"><img src="./../assets/wallet/coin_quizzes.png" />竞猜币 {{utils.ThousandNum(this.$store.state.user.userData.money)}}</div>
                    <div class="refresh"><img src="./../assets/wallet/refresh1.png" /></div>
                </div>
            </div>
            <div class="right">
                <div class="record">下单记录</div>
                <div class="rule">玩法规则</div>
            </div>
        </div>

        <div class="content">
            <div class="left">
                <div class="game-type">
                    <div v-for="item in gameTypeList" :key="item.id" class="block">
                        <el-radio v-model="gameType" @change="toggleGameType" :label="item.id">
                            <div class="image">
                                <!-- src="./../assets/home/logo/homelogo.png"  -->
                                <!-- <img :src="item.game_logo" /> -->
                                <el-image class="image" :src="item.game_logo">
                                    <div slot="placeholder" class="image-placeholder">
                                        <i class="el-icon-loading"></i>
                                    </div>
                                    <div slot="error" class="image-error">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </div>
                            <div class="text">
                                {{item.name}}
                                <!-- <span>37</span> -->
                            </div>
                        </el-radio>
                    </div>
                </div>
                <div class="game-list">
                    <router-view />
                </div>
            </div>
            <div class="right">
                <el-tabs v-model="tabsActive" @tab-click="handleClick">
                    <el-tab-pane label="我的下单" name="first">
                        <div class="myOrder">
                            <div v-if="orderList.length > 0">
                                <div v-for="item in orderList" :key="item.bet_id">
                                    <div class="orderHead">
                                        <div class="match" v-if="item.auto_data_type == 1">比赛盘</div>
                                        <div class="match color" v-else>彩池盘</div>
                                        <div class="title">
                                            <div class="name">{{item.auto_option}} <span>{{item.tag}}</span></div>
                                            <div class="num">{{item.auto_name}}</div>
                                        </div>
                                        <div class="image"><img @click="deleteOrder(item)" src="./../assets/common/close_icon.png" /></div>
                                    </div>
                                    <div class="orderContent">
                                        <ul>
                                            <li>{{item.auto_match_name}}</li>
                                            <li><span v-if="item.auto_data_type == 1">@{{item.odds}}</span></li>
                                            <li>{{item.auto_team[0].team_name}} - VS - {{item.auto_team[1].team_name}}</li>
                                            <li>
                                                <div>
                                                    <span v-if="item.auto_data_type == 1">预计返还 200</span>
                                                </div>
                                                <div class="price"><input type="text" @input="validity(item)" v-model="item.auto_input" /></div>
                                            </li>

                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="betting">
                                    <div class="text">已选 <span>{{orderList.length}}</span> 注</div>
                                    <div class="button" @click="betting">
                                        已投注 {{price}}
                                    </div>
                                </div>
                            </div>
                            
                            <div v-show="orderList.length <= 0" class="noData">
                                <img src="../assets/home/noData.png" />
                                <p>您的投注单是空的</p>
                                <p>请添加投注以开始投注</p>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="订单列表" name="second">
                        <div class="orderList">
                            <div v-show="orderListNo.length > 0" v-for="order in orderListNo" :key="order.bet_id">
                                <div class="orderHead">
                                    <div class="match" v-if="order.play_mode == 1">比赛盘</div>
                                    <div class="match color" v-else>彩池盘</div>
                                    <div class="name">{{order.gameplay_name}} <span>{{order.bet_name}}</span></div>
                                    <div class="num">{{order.segmentation_name}}</div>
                                    <!-- <div class="image"><img src="./../assets/common/close_icon.png" /></div> -->
                                </div>
                                <div class="orderContent">
                                    <ul>
                                        <li>{{order.match_name}}</li>
                                        <li>{{order.team_vs}}</li>
                                        <li>下单时间：{{utils.timestampToTime(order.match_seq_start_time)}}</li>
                                        <li>下单数量：{{order.total_bet_amount}}</li>
                                        <li class="orderNum" @click="showOrderList(order)">共{{order.bet_list.length}}笔></li>
                                        <li></li>
                                    </ul>
                                </div>
                                <div class="order" v-if="order.flag == true">
                                    <div v-for="orderItem in order.bet_list" :key="orderItem.order_id">
                                        <div class="top">
                                            <div>下单数量：<span style="color: #28ffd4">{{orderItem.bet_amount}}</span></div>
                                            <!-- <div>订单回报：倍</div> -->
                                        </div>
                                        <ul>
                                            <li>订单号：{{orderItem.order_id}}</li>
                                            <li>订单时间：{{utils.timestampToTime(orderItem.bet_time)}}</li>
                                            <li class="copy" v-clipboard:copy='orderItem.order_id' v-clipboard:success="copy">复制订单 <img src="./../assets/home/copeOrder.png" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div v-show="orderListNo.length <= 0" class="noData">
                                <img src="../assets/home/noData.png" />
                                <p>您的投注单是空的</p>
                                <p>请添加投注以开始投注</p>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import ComponentCarousel from './../components/ComponentCarousel';
import { sendWSPush  } from './../websocket/websocket.js';
export default {
    components: {
        ComponentCarousel,
    },
    data() {
        return {
            tabsActive: 'first',
            gameStatus: this.$store.state.home.homeGameStatus,
            gameType: this.$store.state.home.homeGameType,
        }
    },
    computed: {
        orderList() {
            return this.$store.state.websocket.orderList;
        },
        orderListNo() {
            return this.$store.state.websocket.orderListNo;
        },
        price() {
            let orderList = this.$store.state.websocket.orderList;
            let num = 0;
            orderList.map(item => {
                num+=item.auto_input;
            });
            return num;
        },
        gameTypeList() {
            return this.$store.state.home.gameTypeList;
        }
    },
    mounted() {
        // 跑马灯，游戏类型
        this.$store.dispatch("HOME_HORSE");

        //  获取订单列表
        this.$store.dispatch("WEBSOCKET_ORDER_LIST_NO", { page: 1 });
    },
    methods: {
        handleClick() { },
        load () { },
        copy(){
            this.$message.success('复制成功');
        },
        toggleGameStatus() {
            // 游戏状态切换
            if (this.gameTypeList <= 0) {
                return;
            }
            let game_type_ids = [];
            this.gameTypeList.map(item => {
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
                    game_status: parseInt(this.gameStatus),
                    data_type: this.config.PLAY_MODE
                }
            });

            this.$store.commit('HOME_STATUS', parseInt(this.gameStatus));
            this.$router.push({
                path: '/home/match'
            });
        },
        toggleGameType() {
            this.$store.commit('HOME_TYPE', parseInt(this.gameType));
            this.$router.push({
                path: '/home/match'
            });
        },
        deleteOrder(order) {
            order.flag = false;
            this.$root.event.$emit("deleteOrder", order);
            // 未加载赛事详情需要执行这里才会把订单删除
            this.$store.commit("WEBSOCKET_ORDER_LIST", order);
        },
        showOrderList(order) {
            if (order.flag == undefined) order.flag = false;
            order.flag = !order.flag;
            this.$forceUpdate();
        },
        validity(data) {
            this.$forceUpdate();
            if (data.auto_input && parseFloat(data.auto_input).toString() != 'NaN') {
                data.auto_input = parseFloat(data.auto_input);
            } else {
                data.auto_input = 0;
                return;
            }
            let userInfo = this.utils.gameUserInfo();
            // eslint-disable-next-line no-unused-vars
            if (JSON.stringify(userInfo) != '{}') {
                let { bet_limit } = userInfo.data;
                // if (data.auto_input < data.bet_limit[0]) {
                //     data.auto_input = 10;
                // }
                if (data.auto_input > bet_limit) {
                    data.auto_input = bet_limit;
                }                
            }

        },
        // 提交订单
        betting() {
            let subArr = [];
            this.orderList.map((item, index) => {
                item.auto_index = index + 1;
                subArr.push({
                    index: item.auto_index,
                    play_mode: this.config.PLAY_MODE, // (1、赔率模式， 2、奖池模式)
                    bet_id: item.bet_id,
                    currency: this.config.CURRENCY, // (0、竞猜币；1、平台币)
                    bet_amount: this.utils.priceFilter(item.auto_input)
                });
            });
            
            this.$store.dispatch("WEBSOCKET_ORDER_SUBMIT", {
                bet_list: subArr
            })
            .then(result => {
                let { cmd, data, code } = result;
                if (JSON.stringify(data) != "{}" && cmd == "place_order") {
                    data.success_list.map(item => {
                        this.$root.event.$emit("deleteOrder", item);
                    });
                } 
                if (code == 30104) {
                    this.$msgbox.confirm(
                        '请先登录', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            dangerouslyUseHTMLString: true,
                            center: true,
                            customClass: 'message-box'
                        }).then(() => {
                        this.$router.push({ path: '/login' });
                    });
                }
                console.log(result);
            });
        }
    },
}
</script>
<style lang="less" scoped>
    @import url('./../assets/style.less');
    .page-home {
       max-width: 1246px;
        width: 1246px;
        margin: 0 auto;
        // 子导航
        .platformData {
            height: 48px;
            display: flex;
            font-size: 14px;
            color: @color-used;
            background-color: #141926;
            margin: 3px 0;
            .left {
                display: flex;
                width: 966px;
                .status, .currency {
                    display: flex;
                    align-items: center;
                    flex: 1;
                }
                .status {
                    ul {
                        display: flex;
                        list-style: none;
                        li {
                            position: relative;
                            width: 115px;
                            text-align: center;
                            height: 48px;
                            line-height: 48px;
                            cursor: pointer;
                            label {
                                display: block;
                                height: 48px;
                                line-height: 48px;
                                color: #76839F;
                                &::v-deep .el-radio__input {
                                    display: none;
                                }
                                &::v-deep .el-radio__label {
                                    padding-left: 0;
                                    span {
                                        color: #2c3e50;
                                        padding: 0 0 0 6px;
                                    }
                               }
                            }
                            // 选中的状态
                            label[aria-checked="true"]::v-deep .el-radio__label{
                                font-weight: bold;
                                color: #FFFFFF !important;
                                span {
                                    color: @color-select;
                                }
                                &::after {
                                    content: " ";
                                    position: absolute;
                                    left: 50%;
                                    bottom: 0;
                                    transform: translateX(-50%);
                                    height: 2px;
                                    width: 70px;
                                    background: @color-select;
                                }
                            }
                        }
                    }
                }
                .currency {
                    justify-content:flex-end;
                    .price {
                        width: 160px;
                        img {
                            vertical-align: middle;
                        }
                    }
                    .price:first-child {
                        img {
                            margin: -1px 4px 0 0;
                        }
                    }
                    .price:nth-child(2) {
                        img {
                            margin: -2px 4px 0 0;
                        }
                    }
                    .refresh {
                        margin: 2px 0 0 0;
                    }
                }
            }
            .right {
                display: flex;
                margin-left: 6px;
                width: 268px;
                align-items: center;
                justify-content: center;
                .record, .rule {
                    width: 80px;
                    // flex: 1;
                    text-align: center;
                    color: @color-tip;
                }
            }
        }

        .content {
            display: flex;
            & > .left{
                width: 966px;
                .game-type {
                    display: flex;
                    padding: 10px 0;
                    background-color: #1C2236;
                    margin: 0 0 3px 0;
                    .block {
                        font-size: 14px;
                        cursor: pointer;
                        box-sizing: border-box;
                        // padding: 0 15px;
                        // height: 80px;
                        margin: 0px 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        // border: 2px solid transparent;
                        // border-radius: 4px;
                        .image {
                            width: 30px;
                            height: 30px;
                            padding-bottom: 8px;
                            margin: 0 auto;
                            img {
                                max-width: 100%;
                            }
                        }
                        .text {
                            color: #76839F;
                            span {
                                padding: 0 0 0 6px;
                                color: #2c3e50;
                            }
                        }
                        &:hover {
                            background-color: #141926;
                        }

                        label {
                            display: block;
                            color: #76839F;
                            width: 100%;
                            height: 100%;
                            padding: 15px;
                            // margin: 0px 15px;
                            text-align: center;
                            border: 2px solid transparent;
                            border-radius: 4px;
                            box-sizing: border-box;
                            &::v-deep .el-radio__input {
                                display: none;
                            }
                            &::v-deep .el-radio__label {
                                padding-left: 0;
                                span {
                                    color: #2c3e50;
                                    padding: 0 0 0 6px;
                                }
                            }
                        }
                        label[aria-checked="true"]{
                            border-color: @color-select;
                            &::v-deep .el-radio__label{
                                font-weight: bold;
                                color: #FFFFFF;
                                .text {
                                    color: #FFFFFF;
                                    font-weight: bold;
                                    span {
                                        color: @color-select;
                                    }
                                }
                                
                            }
                        }
                        // 选中的状态
                    }
                }
                .game-list {
                    background-color: @color-bg;
                }
            }

            & > .right {
                margin-left: 6px;
                background-color: #0C1220;
                color: #667CA0;
                font-size: 12px;
                max-width: 279px;
                box-sizing: border-box;
                .orderList, .myOrder {
                    .orderHead {
                        position: relative;
                        display: flex;
                        align-items: center;
                        color: #FFFFFF;
                        height: 42px;
                        background-color: @color-bg;
                        overflow: hidden;
                        .match {
                            color: #00A2F1;
                            position: absolute;
                            top: 0;
                            left: -15px;
                            background-color: #173054;
                            width: 60px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            transform: rotate(-40deg);
                        }
                        .match.color {
                            color: #FF0044;
                            background-color: #3A1821;
                        }
                        .name {
                            text-align: center;
                            flex: 1;
                            span {
                                font-weight: bold;
                            }
                        }
                        .num {
                            padding: 0 15px 0 0;
                        }
                        .image {
                            padding: 0 8px 0 0;
                            img {
                                width: 15px;
                                vertical-align: middle;
                            }
                        }
                    }
                    .orderContent {
                        font-size: 12px;
                        background-color: #1B2436;
                        ul {
                            position: relative;
                            padding: 10px;
                            border-bottom: 1px solid #2A3450;
                            li {
                                padding: 4px 0 10px 0;
                                &:last-child {
                                    position: absolute;
                                    top: 5px;
                                    right: 5px;
                                    cursor: pointer;
                                    img {
                                        max-width: 10px;
                                    }
                                }
                            }
                        }
                    }
                    .noData {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 150px 0 0 0;
                        img {
                            max-width: 160px;
                            padding: 0 0 35px 0;
                        }
                        p {  
                            line-height: 25px;
                            color: #43526F;
                            &:nth-child(2) {
                                color: #9FB2D2;
                                font-size: 15px;
                                font-weight: bold;
                            }
                        }
                    }
                    .betting {
                        .text {
                            text-align: center;
                            line-height: 30px;
                            height: 30px;
                            span {
                                color: #FFFFFF;
                            }
                        }
                        .button {
                            text-align: center;
                            cursor: pointer;
                            height: 54px;
                            line-height: 54px;
                            color: #FFFFFF;
                            font-size: 18px;
                            font-weight: bold;
                            background: linear-gradient(90deg, #06DAC9, #05A7E2);
                        }
                    }
                    
                    
                }
                .myOrder {
                    .orderHead {
                        height: 50px;
                        line-height: 20px;
                        .title {
                            flex: 1;
                            padding-left: 55px;
                            .name {
                                text-align: left;
                            }
                            .num {
                                text-align: left;
                            }
                        }
                        img {
                            cursor: pointer;
                            max-width: 12px;
                        }
                    }
                    .orderContent {
                        ul {
                            position: relative;
                            li {
                                padding: 0 0 5px 0;
                                &:nth-child(2) {
                                    position: absolute;
                                    top: 10px;
                                    right: 5px;
                                    color: #28ffd4;
                                }
                                &:nth-child(4) {
                                    display: flex;
                                    padding: 20px 0 0 0;
                                    div:first-child {
                                        padding: 5px 0 0 0;
                                        flex: 1;
                                    }
                                    .price {
                                        input {
                                            background: #131825;
                                            border:1px solid #2A324F;
                                            outline: none;
                                            border: 0;
                                            width: 60px;
                                            height: 25px;
                                            line-height: 25px;
                                            text-align: center;
                                            color: #FFFFFF;
              
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .orderList {
                    ul {
                        position: relative;
                        padding: 10px 10px 0 10px !important;
                        li.orderNum {
                            position: absolute;
                            right: 15px;
                            bottom: 0px;
                            cursor: pointer;
                        }
                    }
                    .order {
                        padding: 10px 10px 0 10px !important;
                        background-color: #1B2436;
                        .top {
                            display: flex;
                            div {
                                flex: 1;
                            }
                        }
                        ul {
                            padding: 8px 0 !important;
                            border-bottom: 1px dashed #2A3450;
                            margin: 0 0 10px 0;
                            position: relative;
                            li {
                                line-height: 25px;
                            }
                            .copy {
                                position: absolute;
                                bottom: 8px;
                                right: 0;
                                cursor: pointer;
                                img {
                                    vertical-align: middle;
                                    margin-top: -3px;
                                }
                            }
                        }
                    }
                        
                }

                &::v-deep .el-tabs__header {
                        margin: 0;
                    }
                    &::v-deep .el-tabs__nav {
                        width: 100%;
                        left: 50%;
                        transform: translateX(-50%) !important;
                        background: #1B2436;
                        border-bottom: 1px solid @color-line;
                        .el-tabs__item {
                            text-align: center;
                            color: #B1C4E6;
                            padding: 0;
                            width: 137px;
                        }
                        .el-tabs__active-bar {
                            background-color: @color-select;
                        }
                    }
                    &::v-deep .el-tabs__nav-wrap::after {
                        height: 0 !important;
                    }
            }
        }
    }
</style>
