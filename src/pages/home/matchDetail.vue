<template>
    <div class="page-match-detail">
        <component-match-info :gameInfo="gameInfo">
            <template #data>
                <div class="middle-vs">
                    <div class="data">{{gameInfo.top_option.bet_nums[0].score}}</div>
                    <div class="data">:</div>
                    <div class="data">{{gameInfo.top_option.bet_nums[1].score}}</div>
                </div>
            </template>
            <template #live>
                <img @click="openLive" src="./../../assets/home/liveIcon.png" />
            </template>
            <template #close>
                <img @click="$router.back()" src="./../../assets/common/close_icon.png" />
            </template>
        </component-match-info>
        <!--   -->
        <div v-if="gameInfo.have_live != 0" v-show="showPlayer">
            <video-player class="video-player-box"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @statechanged="playerStateChanged($event)"
                @ready="playerReadied"

                @canplaythrough="onPlayerCanplaythrough($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @canplay="onPlayerCanplay($event)"
                @playing="onPlayerPlaying($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @waiting="onPlayerWaiting($event)"
                >
            </video-player>
        </div>
        <div class="tabs">
            <div class="wrap" ref="wrap">
                <div class="tab">
                    <div class="blo" 
                        :class="{'active': active1 === index}" 
                        v-for="(item, index) in list" :key="index" 
                        @click="clickHandle(item.option, index)"
                    >
                        <span>{{item.values}}</span>
                    </div>
                </div>
                <div class="match-content">
                    <div v-for="parentItem in gameList.segmentations" :key="parentItem.segmentation" ref="matchList" class="list">
                        <div class="title">{{parentItem.segmentation_name}}</div>
                        <div v-for="item in parentItem.bet_option" :key="item.option_id" class="match">
                            <div class="top">
                                <div class="left">
                                    <div class="text">{{item.option}}</div>
                                    <div class="prize">总奖池：</div>
                                </div>
                                <div class="right">
                                    {{utils.priceFilter(sum(item.bet_nums), 'de')}} 万
                                </div>
                            </div>
                            
                            <div class="middle">
                                <!-- active -->
                                <div :data-flag="block.bets_status == 2 || block.status != 0 || gameList.game_status == 2 || gameList.game_status == 4" v-for="block in item.bet_nums" :key="block.bet_id" @click="pushOrder($event, block)" class="left" :class="{'active': block.flag == true}">
                                    <div class="name">{{block.tag}}</div>
                                    <div class="price">瓜分{{utils.priceFilter(block.pond, 'de')}}万</div>
                                    <div v-if="block.status == 1" class="label">胜</div>
                                    <div v-if="block.status == 2" class="label lost">负</div>
                                    <div v-if="block.bets_status == 2 && block.status == 0" style="position:absolute;top:11px;right:11px">
                                        <i class="el-icon-lock"></i>
                                    </div>
                                </div>
                                <!-- <div class="right">
                                    <div class="label">负</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="name">88rising</div>
                                </div> -->
                            </div>
                            <div class="scroll" v-if="item.bet_nums.length == 2">
                                <!-- 7 / 10 * 100 -->
                                <el-progress :stroke-width="15" :text-inside="true" :percentage="percentage(item.bet_nums)" color="#409eff"></el-progress>
                            </div>
                        </div>
                        <!-- <div class="match">
                            <div class="top">
                                <div class="left">
                                    <div class="text">输赢</div>
                                    <div class="prize">总奖池：</div>
                                </div>
                                <div class="right">
                                    1000万
                                </div>
                            </div>
                            <div class="middle">
                                <div class="left">
                                    <div class="name">88rising</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="label">胜</div>
                                </div>
                                <div class="right">
                                    <div class="label">负</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="name">88rising</div>
                                </div>
                            </div>
                            <div class="scroll">
                                <el-progress :stroke-width="15" :text-inside="true" :percentage="20" color="#409eff"></el-progress>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div ref="one" class="list">
                        <div class="title">第一局</div>
                        <div class="match">
                            <div class="top">
                                <div class="left">
                                    <div class="text">输赢</div>
                                    <div class="prize">总奖池：</div>
                                </div>
                                <div class="right">
                                    1000万
                                </div>
                            </div>
                            <div class="middle">
                                <div class="left">
                                    <div class="name">88rising</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="label">胜</div>
                                </div>
                                <div class="right">
                                    <div class="label">负</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="name">88rising</div>
                                </div>
                            </div>
                            <div class="scroll">
                                <el-progress :stroke-width="15" :text-inside="true" :percentage="20" color="#409eff"></el-progress>
                            </div>
                        </div>
                    </div>
                    <div ref="two" class="list">
                        <div class="title">第二局</div>
                        <div class="match">
                            <div class="top">
                                <div class="left">
                                    <div class="text">输赢</div>
                                    <div class="prize">总奖池：</div>
                                </div>
                                <div class="right">
                                    1000万
                                </div>
                            </div>
                            <div class="middle">
                                <div class="left">
                                    <div class="name">88rising</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="label">胜</div>
                                </div>
                                <div class="right">
                                    <div class="label">负</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="name">88rising</div>
                                </div>
                            </div>
                            <div class="scroll">
                                <el-progress :stroke-width="15" :text-inside="true" :percentage="20" color="#409eff"></el-progress>
                            </div>
                        </div>
                    </div>
                    <div ref="three" class="list">
                        <div class="title">第三局</div>
                        <div class="match">
                            <div class="top">
                                <div class="left">
                                    <div class="text">输赢</div>
                                    <div class="prize">总奖池：</div>
                                </div>
                                <div class="right">
                                    1000万
                                </div>
                            </div>
                            <div class="middle">
                                <div class="left">
                                    <div class="name">88rising</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="label">胜</div>
                                </div>
                                <div class="right">
                                    <div class="label">负</div>
                                    <div class="price">瓜分176万</div>
                                    <div class="name">88rising</div>
                                </div>
                            </div>
                            <div class="scroll">
                                <el-progress :stroke-width="15" :text-inside="true" :percentage="20" color="#409eff"></el-progress>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ComponentMatchInfo from './../../components/ComponentMatchInfo';
import { sendWSPush, sendReqPing  } from './../../websocket/websocket.js';
export default {
    components: {
        ComponentMatchInfo
    },
    name: "matchDetail",
    data() {
        return {
            tabsActive: 'first',
            playerOptions: {
                techOrder: ['html5', 'flash'], // 兼容顺序,使用flash播放，可以播放flv格式的文件
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放
                notSupportedMessage: '此视频暂无法播放!', // 无法播放时显示的信息
                sourceOrder: true,
                loop: false, // 导致视频一结束就重新开始。
                // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                muted: false, // 默认情况下将会消除任何音频。
                // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                hls: true,  //启用hls？
                flash: {
                    hls: { withCredentials: false },
                    //swf: '/videojs/video-js.swf'//放在static或着public下面文件夹中的videojs文件夹中 当引入js文件中统一定义时此处可省略
                },
                html5: { hls: { withCredentials: false } },
                sources: [
                    {
                        src: ''
                        // src: "https://txdirect.hls.huya.com/huyalive/1560182566-1560182566-6700933096759361536-3120488588-10057-A-0-1.m3u8?wsSecret=1ecd317ce8f3dede240975e9e95d1a9c&wsTime=5f25431d&fm=RFdxOEJjSjNoNkRKdDZUWV8kMF8kMV8kMl8kMw%3D%3D&ctype=tars_mobile&fs=bgct&t=103"
                        // src: "http://live-tx-hdlp.huomaotv.cn/live/2emwAL38404_8000p.flv?t=1596181495&r=622769502931&stream=2emwAL38404&rid=oubvc2y3v&token=be7967d4c71beb23da3fcef9eaf0d27e&url=http%3A%2F%2Flive-tx-hdlp.huomaotv.cn%2Flive%2F2emwAL38404_8000p.flv&from=huomaoh5room"
                        // src: "https://56972e8bd3345.streamlock.net/TRPP_live/smil:bcffcc98-ac2f-4b73-b0a5-ad1bfb96d845_all.smil/chunklist_w1418321773_b227000_slita.m3u8"
                    }
                ],
                poster: 'path', // 你的封面地址
                width: 966,
                // width: document.documentElement.clientWidth,
                height: this.fileAreaHeight, // 设置高度，fluid需要设置成flase
                // 配置控制栏
                controlBar: {
                    volumePanel: {
                            inline: false,//音量调节是否水平
                    },
                    timeDivider: true, // 时间分割线
                    currentTimeDisplay:true,//当前播放位置
                    durationDisplay: true, // 总时间
                    progressControl: true, // 进度条
                    remainingTimeDisplay: false, // 剩余时间
                    fullscreenToggle: true // 全屏按钮
                }
            },

            list: [],
            active1: 0,
            gameList: [],
            showPlayer: false,
            // orderList:  
            // gameInfo: 
            videoUrl: ''
        }
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        },
        orderList() {
            return this.$store.state.websocket.orderList;
        },
        gameInfo() {
            return this.$store.state.websocket.gameInfo;
        }
    },
    mounted() {
        /*
        this.list = [
            {
                values: '全场',
                active: true,
                // option: this.$refs.all.offsetTop - this.$refs.wrap.offsetTop
            },
            // {
            //     values: '第一局',
            //     active: false,
            //     option: this.$refs.one.offsetTop - this.$refs.wrap.offsetTop
            // },
            // {
            //     values: '第二局',
            //     active: false,
            //     option: this.$refs.two.offsetTop - this.$refs.wrap.offsetTop
            // },
            // {
            //     values: '第三局',
            //     active: false,
            //     option: this.$refs.three.offsetTop - this.$refs.wrap.offsetTop
            // }
        ]
        this.$refs.wrap.addEventListener('scroll', this.handleScroll, false);
        */

        // home父页面，删除订单执行该方法
        this.$root.event.$on('deleteOrder', (order) => {
            let { segmentations } = this.gameList;
            let flag = true;
            // console.log(this.gameList);
            for (let i = 0; i < segmentations.length; i++) {
                let { bet_option } = segmentations[i];
                for(let f = 0; f < bet_option.length; f++) {
                    let { bet_nums } = bet_option[f];
                    for (let g = 0; g < bet_nums.length; g++) {
                        if (bet_nums[g].bet_id == order.bet_id) {
                            this.closeOrder(bet_nums[g]);
                            flag = false;
                            break;
                        }
                    }
                }
            }
            if (flag) {
                this.closeOrder(order);
            }
        });

        // websocket连接
        this.websocket();
    },
    methods: {
        handleClick(item) {
            console.log(item);
        },
         // listen event
        onPlayerPlay(player) {
            console.log('player play!', player)
        },
        onPlayerPause(player) {
            console.log('player pause!', player)
        },
        // ...player event

        // or listen state event
        playerStateChanged(playerCurrentState) {
            console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
            console.log('the player is readied', player)
            // you can use it to do something...
            // player.[methods]
        },
        onPlayerCanplaythrough(data) {
            console.log("onPlayerCanplaythrough", data);
        },
        onPlayerLoadeddata(data) {
            console.log("onPlayerLoadeddata", data);
        },
        onPlayerCanplay(data) {
            console.log("onPlayerCanplay", data);
        },
        onPlayerPlaying(data) {
            console.log("onPlayerPlaying", data);
        },
        onPlayerTimeupdate(data) {
            console.log("onPlayerTimeupdate", data);
        },
        onPlayerWaiting(data) {
            console.log("onPlayerWaiting", data);
        },
        clickHandle (top, index) {
            this.active1 = index
            this.$refs.wrap.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        },
        handleScroll () {
            const aa = this.$refs.wrap.scrollTop;
            if (this.clear) {
                clearTimeout(this.clear);
            }
            this.clear = setTimeout(() => {
                this.active1 = this.active;
                const arr = [...this.list].reverse();
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].option <= aa) {
                        this.active1 = arr.length - 1 - i;
                        break;
                    }
                }
            }, 100);
        },
        sum(arr) {
            let price = 0;
            arr.map(i => {
                price += i.pond;
            });
            return price;
        },
        pushOrder(e, order) {
            if (e.currentTarget.dataset.flag == "true") return;
            if (order.flag == undefined) order.flag = false;
            order.flag = !order.flag;
            order.auto_input = 0;
            this.$store.commit("WEBSOCKET_ORDER_LIST", order);
            this.$forceUpdate();
        },
        closeOrder(order) {
            order.flag = false;
            this.$store.commit("WEBSOCKET_ORDER_LIST", order);
            this.$forceUpdate();
        },
        percentage(arr) {
            if (arr[0].pond == arr[1].pond) {
                return 50;
            }
            return arr[0].pond / (arr[0].pond + arr[1].pond) * 100;
        },
        websocket() {
            let { match_seq_num, match_id, data_type, game_type_id } = this.gameInfo;

            sendWSPush({
                cmd: 'match_detail',
                group: 'gameinfo',
                seq: 0,
                data: {
                    utype: 0,
                    game_type_id: game_type_id,
                    channel_id: 1,
                    data_type: data_type,
                    match_id: match_id,
                    match_seq_num: match_seq_num,
                }
            });

// {
//     "game_type_id":1,
//     "data_type":2,
//     "match_id":1,
//     "match_seq_num":12,
//     "channel_id":1,// 渠道id
//     "utype":1       //   0 获取数据，1.保持连接状态， 2.关闭连接李斯特
// }

            // 发送心跳
            // window.addEventListener("connecting", () => {
                sendReqPing(1000 * 30, {
                    cmd: 'match_ping',
                    group: 'gameinfo',
                    seq: 0,
                    data: {
                            utype: 1,
                            game_type_id: game_type_id,
                            channel_id: 1,
                            data_type: data_type,
                            match_id: match_id,
                            match_seq_num: match_seq_num,
                        }
                });
            // });

            window.addEventListener("onmessageWS", (e) => { 
                if (!e.detail && !e.detail.data) return;
                let result = JSON.parse(e.detail.data);
                let { code, cmd, data } = result;
                if (code == 200 && cmd == "match_detail") {
                    this.gameList = data;
                    if (this.gameList.live_url.length > 0) {
                        this.playerOptions.sources[0].src = this.gameList.live_url[0].url;
                    }
                    console.log(this.gameList);
                    // 选中订单中的数据
                    let { segmentations } = this.gameList;
                    for (let i = 0; i < segmentations.length; i++) {
                        let { bet_option } = segmentations[i];
                        for(let f = 0; f < bet_option.length; f++) {
                            let { bet_nums } = bet_option[f];
                            for (let g = 0; g < bet_nums.length; g++) {
                                bet_nums[g].auto_data_type = this.gameList.data_type;
                                bet_nums[g].auto_match_name = this.gameList.match_name;
                                bet_nums[g].auto_team = this.gameList.team;
                                bet_nums[g].auto_name = segmentations[i].segmentation_name;
                                bet_nums[g].auto_option = bet_option[f].option;
                                bet_nums[g].auto_input = 0;
                                for(let b = 0; b < this.orderList.length; b++) {
                                    if (bet_nums[g].bet_id == this.orderList[b].bet_id) {
                                        bet_nums[g].flag = this.orderList[b].flag;
                                    }
                                }
                            }
                        }
                    }

                    // tab 标签实现
                    setTimeout(() => {
                        let arr = [];
                        for (let t = 0; t < segmentations.length; t++) {
                            arr.push({
                                values: segmentations[t].segmentation_name,
                                active: t == 0 ? true : false,
                                option: (this.$refs.wrap && this.$refs.matchList[t]) && this.$refs.matchList[t].offsetTop - this.$refs.wrap.offsetTop
                            });
                        }
                        this.list = arr;
                        this.$refs.wrap && this.$refs.wrap.addEventListener('scroll', this.handleScroll, false);
                    }, 500);
                }

                if (cmd == 'match_update') {
                    console.log('match_update', data);

                    let { segmentations } = this.gameList;
                    let { options, header  } = data;
                    if (options && options.length > 0) {
                        for (let i = 0; i < segmentations.length; i++) {
                            let { bet_option } = segmentations[i];

                            // 处理 option 数据变动
                            if (options && options.length > 0) {
                                for(let s = 0; s < options.length; s++) {
                                    if (options[s].segmentation == segmentations[i].segmentation) {
                                        if (options[s].utype == 0) {
                                            for(let f = 0; f < bet_option.length; f++) {
                                                let { bet_nums } = bet_option[f];
                                                if (options[s].option_id == bet_option[f].option_id) {
                                                    if (options[s].status != undefined) 
                                                        bet_option[f].status = options[s].status;

                                                    for (let n = 0; n < options[s].bet_nums.length; n++) {
                                                        for (let g = 0; g < bet_nums.length; g++) {
                                                            // bet_nums 数据变动
                                                            if (options[s].bet_nums[n].bet_id == bet_nums[g].bet_id) {

                                                                if (options[s].bet_nums[n].bet_limit != undefined) 
                                                                    bet_nums[g].bet_limit = options[s].bet_nums[n].bet_limit;

                                                                if (options[s].bet_nums[n].bets_status != undefined) 
                                                                    bet_nums[g].bets_status = options[s].bet_nums[n].bets_status;

                                                                if (options[s].bet_nums[n].last_update != undefined) 
                                                                    bet_nums[g].last_update = options[s].bet_nums[n].last_update;

                                                                if (options[s].bet_nums[n].odds != undefined) 
                                                                    bet_nums[g].odds = options[s].bet_nums[n].odds;

                                                                if (options[s].bet_nums[n].personal != undefined) 
                                                                    bet_nums[g].personal = options[s].bet_nums[n].personal;

                                                                if (options[s].bet_nums[n].pond != undefined) 
                                                                    bet_nums[g].pond = options[s].bet_nums[n].pond;

                                                                if (options[s].bet_nums[n].status != undefined) 
                                                                    bet_nums[g].status = options[s].bet_nums[n].status;

                                                                if (options[s].bet_nums[n].tag != undefined) 
                                                                    bet_nums[g].tag = options[s].bet_nums[n].tag;
                                                                
                                                                if (options[s].bet_nums[n].total != undefined) 
                                                                    bet_nums[g].total = options[s].bet_nums[n].total;
                                                                
                                                                if (options[s].bet_nums[n].trend != undefined) 
                                                                    bet_nums[g].trend = options[s].bet_nums[n].trend;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (options[s].utype == 1) {
                                            // 添加
                                            segmentations[i].bet_option.push(options[s]);
                                            delete options[s].utype;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    if (header && JSON.stringify(header) != '{}') {
                        /*
                            game_logo_url: "http://120.24.67.21:7015/group1/M00/00/00/eBhDFV4Sm4KAB8ZFAAANT9smVWE296.png?t=0"
                            game_status: 0
                            live_url: (2) [{…}, {…}]
                            match_start_time: 1596523988
                            team: (2) [{…}, {…}]

                            bet_nums: 9
                            data_type: 2
                            game_logo_url: "http://120.24.67.21:7015/group1/M00/00/00/eBhDFV4Sm4KAB8ZFAAANT9smVWE296.png?t=3"
                            game_name: "SEta"
                            game_status: 1
                            game_status_end_time: 0
                            game_type_id: 4
                            have_live: 1
                            is_pwrr: 0
                            live_url: Array(2)
                            match_id: 2
                            match_name: "aa vs bb"
                            match_seq_num: 88260
                            match_start_time: 1596524079
                            round: "BO170"
                            segmentations: Array(1)
                            team: Array(2)
                            uniq_id: ""
                            version: "1.0.2"

                        */
                        if (header.bet_nums != undefined) 
                            this.gameList.bet_nums = header.bet_nums;
                        
                        if (header.data_type != undefined) 
                            this.gameList.data_type = header.data_type;
                        
                        if (header.game_logo_url != undefined) 
                            this.gameList.game_logo_url = header.game_logo_url;
                            
                        if (header.game_name != undefined) 
                            this.gameList.game_name = header.game_name;
                        
                        if (header.game_status != undefined) 
                            this.gameList.game_status = header.game_status;
                        
                        if (header.game_status_end_time != undefined) 
                            this.gameList.game_status_end_time = header.game_status_end_time;
                        
                        if (header.have_live != undefined) 
                            this.gameList.have_live = header.have_live;
                        
                        if (header.is_pwrr != undefined) 
                            this.gameList.is_pwrr = header.is_pwrr;
                        
                        if (header.live_url != undefined) 
                            this.gameList.live_url = header.live_url;
                        
                        if (header.match_id != undefined) 
                            this.gameList.match_id = header.match_id;
                        
                        if (header.match_name != undefined) 
                            this.gameList.match_name = header.match_name;
                        
                        if (header.match_seq_num != undefined) 
                            this.gameList.match_seq_num = header.match_seq_num;
                        
                        if (header.match_start_time != undefined) 
                            this.gameList.match_start_time = header.match_start_time;
                        
                        if (header.round != undefined) 
                            this.gameList.round = header.round;
                        
                        // if (header.segmentations != undefined) 
                        //     this.gameList.segmentations = header.segmentations;
                        
                        if (header.team != undefined) 
                            this.gameList.team = header.team;

                    }
                    this.$store.commit("WEBSOCKET_ITEM_SAVE", this.gameList);
                }
            });
        },
        openLive() {
            // 打开直播
            let { have_live } = this.gameInfo;
            if (have_live != 0) {
                this.showPlayer = true;
                this.$refs.videoPlayer.player.play();
            }
            
        }
    },
    watch: {
        // $route(to) {
            // 第二次进入执行
            // if (to.name == "/home/matchDetail") {
                // this.websocket();
            // }
        // }
    },
    destroyed () {
        // this.$refs.wrap.removeEventListener('scroll', this.handleScroll, false);
    }
}
</script>
<style lang="less" scoped>
@import url('./../../assets/style.less');
    .wrap {
        height: 800px;
        overflow: auto;
        .tab {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            display: flex;
            justify-content: center;
            text-align:center;
            z-index:2;
            font-size: 14px;
            background-color: #0b0e1a;
            .blo {
                width: 80px;
                height: 40px;
                line-height: 40px;
                color: #526583;
                transition: all 0.5s;
                border-bottom: 2px solid transparent;
                cursor: pointer;
                &.active {
                    // &::after {
                    //     display: block;
                    //     width: 80px;
                    //     content: '';
                        border-color: #28ffd4;
                    // }
                }
            }

        }
        // 隐藏滚动条，但是可以滚动
        &::-webkit-scrollbar {
            display: none;
        }
    }

.page-match-detail {
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
    // 投注
    .tabs {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        .match-content {
            display: flex;
            flex-direction: column;
            color: @color-two-level;
            width: 600px;
            margin: 0 auto;
            //  padding-top: 400px;
            padding-bottom: 600px;
            .list {
                .title {
                    text-align: center;
                    padding: 0 0 25px 0;
                }
                .match {
                    padding: 0 0 25px 0;
                    .top {
                        display: flex;
                        padding: 0 0 8px 0;
                        .left, .right {
                            flex: 1;
                        }
                        .left {
                            display: flex;
                            .text {
                                flex: 1;
                                color: #FFFFFF;
                            }
                            // .prize {}
                        }
                        .right {
                            margin: 0 0 0 5px;
                        }
                    }
                    .middle {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        .left, .right{
                            position: relative;
                            display: flex;
                            // flex: 1;
                            background: #161B2F;
                            padding:  8px 20px;
                            border-radius: 2px;
                            margin: 0 5px 0 0;
                            border: 1px solid @color-select;
                            width: 295px;
                            box-sizing: border-box;
                            cursor: pointer;
                            .name, .price {
                                flex: 1;
                            }
                            .label {
                                font-size: 12px;
                                position: absolute;
                                top: 0;
                                width: 20px;
                                height: 30px;
                                text-align: center;
                                line-height: 25px;
                                color: #FFFFFF;
                            }
                            // .label.lost {
                            //     // background: red;
                            // }
                        }
                        .active {
                            color: #FFFFFF;
                            background-image: linear-gradient(90deg, #098177, #085C89);
                        }
                        .left {
                            margin: 0 5px 0 0;
                            .label {
                                right: 24px;
                                background: url(./../../assets/home/shen.png) no-repeat;
                                background-size: contain;
                            }
                            .label.lost {
                                background: url(./../../assets/home/negative.png) no-repeat;
                            }
                        }
                        .right {
                            text-align: right;
                            margin: 0 0 0 5px;
                            .label {
                                left: 24px;
                                background: url(./../../assets/home/negative.png) no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                    .scroll {
                        padding: 10px 0 0 0;
                        &::v-deep .el-progress-bar__outer {
                            border-radius: 0;
                            background-color: #48151E;
                            .el-progress-bar__inner {
                                border-radius: 0;
                                background-color: #082957 !important;
                                .el-progress-bar__innerText{
                                    display: none;
                                }
                            }
                        }
                    }
                }
                
            }
            

        }

        &::v-deep .el-tabs__nav {
            left: 50%;
            transform: translateX(-50%) !important;
            .el-tabs__item {
                text-align: center;
                color: @color-two-level;
                padding: 0;
                width: 80px;
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


</style>
