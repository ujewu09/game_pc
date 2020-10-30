<template>
    <div class="page-shop">
       <div class="left">
           <div class="user-info">
                <div class="avatar">
                   <img :src="require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png')" />
                </div>
                <div class="vip">
                   <img :src="require('../assets/vip/'+userInfo.vip_level+'.png')"/>
                </div>
                <div class="username">
                   {{this.$store.state.myInfo.modifyInfo.nickname}}
                </div>
                <div class="coin">
                    竞猜币额度：<b>{{gold}}</b>
                </div>
                <div class="today">
                    今日还可兑换<b> {{num}} </b>次
                </div>
                <div class="btn">
                    <el-button @click="$router.push({ path: '/shop/order' })" class="button">我的兑换</el-button>
                </div>
                <div class="btn">
                    <el-tooltip 
                        popper-class="rules"
                        effect="dark" 
                        enterable
                        visible-arrow="true"
                        placement="right">
                        <div slot="content">
                            <div class="row">
                                <h3 class="title">非实物商品(虚拟商品)兑换</h3>
                                <div class="content">
                                    1、可以用多个竞猜币兑换为非实物商品。<br />
                                    2、兑换生效后，如有使用期限的，请在商品有效期内使用，商品有效期以兑换当时最新活动公告或官方信息为准，超过有效期未使用，商品将自动失效；无使用期限的无需理会。<br />
                                    3、确认兑换支付竞猜币后，除系统不能自动发放的商品，开心电竞官方客服会在3个工作日内联系您，并发放商品。如遇节假日，顺延并给您兑换相关商品。 <br />
                                </div>
                            </div>

                            <div class="row">
                                <h3 class="title">实物商品兑换</h3>
                                <div class="content">
                                    1、商品数量有限，先兑先得，兑完即止。商品一经兑换成功后，会扣除相应竞猜币，概不退换。<br />
                                    2、提交收货信息后，工作人员将在信息提交后的一周内派发商品；若需修改个人收货信息需联系在线客服，已派发的商品不可修改。<br />
                                    3、兑换成功后，您可以到“我的兑换”中查询已兑换商品。<br />
                                    4、竞猜币兑换的礼品以开心电竞平台上的资料为准，如遇不可抗力因素，竞猜币保留更换其它等值奖项的权利。<br />
                                    5、您的收货信息是保证物品顺利邮寄的关键，请一定要谨慎填写，包括您的姓名、电话、邮编、邮寄地址（仅限中国大陆，新疆、西藏等偏远地区由于快递原因无法送达，建议兑换虚拟商品）。<br />                                
                                </div>
                            </div>

                            <div class="row">
                                <h3 class="title">注意事项</h3>
                                <div class="content">
                                    1、在商城兑换，只能使用竞猜币，若竞猜币不足，请到钱包页面，由平台币转换至竞猜币后，再兑换商品。<br />
                                    2、开心电竞官方不会主动向您索要任何银行账户密码，身份信息请勿泄露，陌生电话请勿轻信，涉及到钱财需小心。<br />
                                    3、对于存在作弊、不良交易、不良注册、发送垃圾消息、欺诈等不良行为的账号及其相关联的账号，以及已被冻结的账号及其相关联的账号，开心电竞官方有权对其做扣除金豆处理。<br />
                                    4、以上所有规则最终解释权归开心电竞官方所有。<br />            
                                </div>
                            </div>
                        </div>
                        <el-button class="button btnRules" >兑换规则</el-button>
                    </el-tooltip>
                </div>
           </div>
            <div class="vip">
                <h3 class="text">
                    VIP兑换榜
                </h3>
                <div v-for="item in vipList" :key="item.id" class="user-block">
                    <component-user-head
                        :userID="item.id"
                        :avatar="utils.avatarFilter(item.user_icon)"
                        :nickName="item.nickname"
                    >
                        <template #float>
                            <img height="20" :src="require('../assets/vip/'+userInfo.vip_level+'.png')" />
                        </template>
                        <!-- <template #time>
                            腾讯视频会员
                        </template> -->
                        <template #right>
                            <img width="50" height="50" :src="item.goods_thumb_img" />
                        </template>
                    </component-user-head>
                </div>
           </div>
       </div>
       <div class="right">
            <router-view  @dataRefresh="dataRefresh" />
       </div>
    </div>
</template>

<script>
import ComponentUserHead from '../components/ComponentUserHead';
export default {
    components: {
        ComponentUserHead
    },
    data() {
        return {
            vipList: [],
            PRICE: 0,
            COUNT: 0,
            userInfo: {},
            gold:0,
            num:0,
        };
    },
    mounted() {
        this.utils.userInfo().then((response) => {
            let { data } = response;
            if (data.code == 0) {
                this.userInfo = data.data;
                this.gold = this.$store.state.user.userData.money;
                this.num = this.userInfo.num;
            }
        });
        this.$http
        .post(this.config.HOST + 'api/order/log', {})
        .then(response => {
             let result = response.data;
            if (result.code == 0) {
                let { data } = result;
                this.vipList = data;
            }
        });
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        dataRefresh(value){
            this.gold = this.gold - value;
            this.$store.commit('MODIFY_GUESS_MONEY',this.gold)
            this.num --;
        }
        
    }
}
</script>
<style lang="less" scoped>
    @import url('../assets/style.less');
    .page-shop {
        width: 1234px;
        margin: auto;
        display: flex;
        .left {
            width: 310px;
            min-height:950px;
            .user-info {
                background-color: @color-line;
                height: 413px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                .avatar {
                    padding: 30px 0 0 0;
                    img {
                        width: 95px;
                        height: 95px;
                        border-radius: 50%;
                    }
                }
                .vip{
                    width:80px;
                    img{
                        width: 100%;
                    }
                }
                .username {
                    padding: 10px 0 20px 0;
                    color: #fff;
                }
                .coin, .today {
                    font-size: 14px;
                    color: @color-used;
                    margin: 0 0 10px 0;
                    b {
                        color: #27F3CB;
                    }
                }
                .today {
                    margin: 0 0 35px 0;
                }
                .btn {
                    margin: 0 0 10px 0;
                    .button {
                        width: 125px;
                        height: 28px;
                        padding: 0;
                        border-style:none;
                        border: 1px solid @color-two-level;
                        border-radius: 2px;
                        background-color: transparent;
                        color: #00b3f1;
                        font-size: 12px;
                        color: @color-used;
                        
                    }
                    .btnRules:hover {
                        border-color: @color-click;
                        color: @color-click;
                    }
                }
            }
            .vip {
                
                .text {
                    margin: 3px 0 0 0;
                    height: 48px;
                    line-height: 48px;
                    background-color: @color-line;
                    text-align: center;
                    color: #fff;
                    font-weight: normal;
                }
                .user-block {
                    background-color: #0C0F1A;
                    border-bottom: 1px solid @color-line;
                }
            }
        }
        .right {
            margin-left: 6px;
            background-color: @color-bg;
        }
    }
</style>
