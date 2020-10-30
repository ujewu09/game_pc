<template>
    <div class="page-vip">
        <div class="maste">
            <ul class="vip_12">
                <li>是兄弟就来砍我获得VIP12体验金</li>
                <li>是兄弟就来砍我获得VIP12体验金</li>
                <li>是兄弟就来砍我获得VIP12体验金</li>
                <li>是兄弟就来砍我获得VIP12体验金</li>
                <li>是兄弟就来砍我获得VIP12体验金</li>
                <li><img style="width:85px;position:absolute" :src="require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png')" /></li>
                <li>{{this.$store.state.myInfo.modifyInfo.nickname}}</li>
                <!-- <li v-for="(items,indexx) in vipDataTQ.privilege" :key="indexx">
                    {{items.vip_privilege_type}}
                </li> -->
                <!-- <li>{{vipDataTQ}}</li> -->
            </ul>
        <div v-for="(items,indexxx) in vipDataTQ.privilege" :key="indexxx">
            <div v-show="Indexes===index" v-for="(item,index) in userObject" :key="index" >
                <img src="../assets/vip/left.png" alt="" class="left_img" @click="left(index--)">
                <img src="../assets/vip/right.png" alt="" class="right_img" @click="right(index++)">
                <div class="two">
                    <div :class="[Class[index],tow_11]" >
                        <div class="two_btn" @click="recharge()">前去存款</div>
                        <div class="two_2"><img style="width:75px;position:absolute" :src="item.img1" alt=""></div>
                        <div class="two_3">
                            <img :src="require('../assets/vip/'+user.vip_level+'.png')"/>
                            <span :class="SpanClass[index]">尊敬的 {{item.text1}} 您好！</span>
                        </div>
                        <div class="two_4">
                            <p :class="SpanClass[index]" style="top:29px;left:-53px">存款还需{{item.text2}}</p>
                            <p :class="SpanClass[index]" style="top:52px;left:-53px">流水还需{{item.text3}}</p>
                        </div>
                    </div>
                    <div class="three">
                        <p>提示：等级晋升后开启保级期(90天)，保级期内完成存款和流水要求则保级成功，未完成则降一级。</p>
                        <img src="../assets/images/d3fad906-712a-4ebb-9f03-7a8458e8884c.png" alt="">
                        <div class="three_img"></div>
                        <ul class="three_ul" id="three_ul">
                            <li v-for="(item,index) in keep_level.vip_info" :key="index">VIP{{item.vip}}</li>
                        </ul>
                        <ul class="three_ul2">
                            <li v-for="(item,index) in keep_level.vip_info" :key="index">{{item.vip_name}}</li>
                        </ul>
                        <div class="three_div">升级保级表</div>
                    </div>
                    <div class="four">
                        <p style="font-weight: bold;position:absolute;left:799px;top:-39px;width:150px">VIP{{item.text6}} 可享特权优惠</p>
                        <div class="four_div" v-if="items.vip_privilege_type == 0">
                            <div :class="[FourClass[index],four_1]" v-for="(itemm,indexx) in item.qiaotao" :key="indexx">
                                <p>{{itemm.name}}</p>
                                <p>{{itemm.money}}</p>
                                <p>{{itemm.Withdrawal}}</p>
                                <div :class="[huo[index],fourr]"><p class="div-p">申请领取</p></div>
                            </div>
                        </div>
                        <div class="four_div" v-if="items.vip_privilege_type == 1">
                            <div :class="[FourClass[index],four_1]" v-for="(itemm,indexx) in item.qiaotao1" :key="indexx">
                                <p>{{itemm.name}}</p>
                                <p>{{itemm.money}}</p>
                                <p>{{itemm.Withdrawal}}</p>
                                <div :class="[huo[index],fourr]"><p class="div-p">申请领取</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="five">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="VIP专属优惠" name="0">
                    <div class="five_div" style="background-color: #262933;">
                        <table class="table_one" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width: 120px;" :class="td">等级</td>
                                <td v-for="(item,index) in exclusive.vip_info" :key="index">VIP{{item.vip}}</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">单日提款额度</td>
                                <td v-for="(item,index) in exclusive.vip_info" :key="index">{{item.day_withdraw}}元</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">生日礼金</td>
                                <td v-for="(item,index) in exclusive.vip_info" :key="index">{{item.birthday_gift}}台币</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">晋级礼金</td>
                                <td v-for="(item,index) in exclusive.vip_info" :key="index">{{item.up_gift}}元</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">专属客服</td>
                                <td v-for="(item,index) in exclusive.vip_info" :key="index">{{item.live}}</td>
                            </tr>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="VIP月存优惠" name="1">
                    <div class="five_div2" style="background-color: #262933;">
                        <table class="table_one" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width: 120px;" :class="td">等级</td>
                                <td v-for="(item,index) in deposit.vip_info" :key="index">
                                    VIP{{item.vip}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">最高彩金</td>
                                <td v-for="(item,index) in deposit.vip_info" :key="index">
                                    {{item.max_gold_reward}}元
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">单笔要求</td>
                                <td v-for="(item,index) in deposit.vip_info" :key="index">
                                    {{item.single_recharge}}元
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">优惠比例</td>
                                <td v-for="(item,index) in deposit.vip_info" :key="index">
                                    {{item.discount_rate}}%
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">流水要求</td>
                                <td v-for="(item,index) in deposit.vip_info" :key="index">
                                    {{item.bet_limit}}
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="VIP月体验金" name="2">
                    <div class="five_div3" style="background-color: #262933;">
                        <table class="table_one" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width: 120px;" :class="td">等级</td>
                                <td v-for="(item,index) in experience.vip_info" :key="index">
                                    VIP{{item.vip}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">体验金</td>
                                <td v-for="(item,index) in experience.vip_info" :key="index">
                                    {{item.experience_gold}}元
                                </td>
                            </tr>
                            <tr style="width: 120px;" :class="td">
                                <td style="border-bottom: 1px solid #48516b;border-left:1px solid #48516b;">流水要求</td>
                                <td colspan="9" style="border-bottom: 1px solid #48516b;">全站3倍有效流水</td>
                                <td colspan="4" style="border-bottom: 1px solid #48516b;">≧2000元</td>
                            </tr>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="VIP月救援金" name="3">
                    <div class="five_div" style="background-color: #262933;">
                        <table class="table_one" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width: 120px;" :class="td">等级</td>
                                <td v-for="(item,index) in relief.vip_info" :key="index">
                                    VIP{{item.vip}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">月总负盈利</td>
                                <td v-for="(item,index) in relief.vip_info" :key="index">
                                    {{item.month_win}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">救援金比例</td>
                                <td v-for="(item,index) in relief.vip_info" :key="index">
                                    {{item.relief_rate}}%
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">救援金最高</td>
                                <td v-for="(item,index) in relief.vip_info" :key="index">
                                    {{item.relief_max}}元
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;" :class="td">流水要求</td>
                                <td colspan="13">全站1倍有效流水</td>
                            </tr>
                        </table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="six">
            <p class="p">活动规则</p>
            <ul class="six_ul1" v-show="yi">
                <li v-for="items in username" :key="items.id" class="six_p">
                    {{items}}
                </li>
                <!-- <li v-for="items in exclusive" :key="items.id" class="six_p">{{exclusive.text}}</li> -->
            </ul>
            <ul class="six_ul1" v-show="er">
                <li v-for="items in username2" :key="items.id" class="six_p">
                    {{items}}
                </li>
            </ul>
            <ul class="six_ul1" v-show="san">
                <li v-for="items in username3" :key="items.id" class="six_p">
                    {{items}}
                </li>
            </ul>
            <ul class="six_ul1" v-show="si">
                <li v-for="items in username4" :key="items.id" class="six_p">
                    {{items}}
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>
import utils from '../utils/common'
    export default {
        data() {
            return {
                activeName: '0',
                yi: true,
                er: false,
                san: false,
                si: false,
                ling:true,
                user:{},
                username:{},
                userstr:{},
                username2:{},
                username3:{},
                username4:{},
                Indexes:0,
                td:"td",
                userObject:[
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"0",
                        qiaotao:[{
                                name:"生日礼金",
                                money:"188平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"1",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"188平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"8元",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                            {
                                name:"月存优惠",
                                money:"最高8元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            }
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"2",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"188平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                            
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"8元",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                            {
                                name:"月存优惠",
                                money:"最高8元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            }
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"3",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"188平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                            
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"288元",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                            {
                                name:"月体验金",
                                money:"8元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            }
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"4",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"188平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"288元",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258平台币",
                                Withdrawal:"提现流水要求(24元)"
                            },
                            {
                                name:"月体验金",
                                money:"8元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            }
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"5",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"588平台币",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                            
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"28元",
                                Withdrawal:"提现流水要求(24元)"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"6",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"588平台币",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"28元",
                                Withdrawal:"提现流水要求(24元)"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                        ]
                        //img2:require('../assets/vip/'+this.user.vip_level+'.png')
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"7",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"588平台币",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"28元",
                                Withdrawal:"提现流水要求(84元)"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                            {
                                name:"月体验金",
                                money:"12元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                        ]
                        //img2:require('../assets/vip/'+this.user.vip_level+'.png')
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"8",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"588平台币",
                                Withdrawal:"生日当天开始七日内领取有效"
                            }, 
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"28元",
                                Withdrawal:"提现流水要求(84元)"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                            {
                                name:"月体验金",
                                money:"12元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                        ]
                        //img2:require('../assets/vip/'+this.user.vip_level+'.png')
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"9",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"588平台币",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"28元",
                                Withdrawal:"提现流水要求(84元)"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                            {
                                name:"月体验金",
                                money:"12元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"10",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"588平台币",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"晋级礼金",
                                money:"28元",
                                Withdrawal:"提现流水要求(84元)"
                            },
                            {
                                name:"月存优惠",
                                money:"最高258元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                            {
                                name:"月体验金",
                                money:"12元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"11",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"38元",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                        ],
                        qiaotao1:[
                            {
                                name:"月存优惠",
                                money:"最高558元",
                                Withdrawal:"本月单笔存款 ≧ 1000即可领取"
                            },
                            {
                                name:"月体验金",
                                money:"38元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                            {
                                name:"专属客服",
                                money:"一对一服务",
                            },
                            {
                                name:"月救援金",
                                money:"最高888元",
                                Withdrawal:"上月总负盈利 ≧ 200000即可领取"
                            },
                            {
                                name:"晋级礼金",
                                money:"58元",
                                Withdrawal:"提现流水要求(174元)"
                            },
                        ]
                    },
                    {
                        img1:require('../assets/avatar/'+this.$store.state.myInfo.modifyInfo.head_portrait+'.png'),
                        text1:this.$store.state.myInfo.modifyInfo.nickname,
                        text2:" 1,000",
                        text3:" 1,000",
                        text6:"12",
                        qiaotao:[
                            {
                                name:"生日礼金",
                                money:"38元",
                                Withdrawal:"生日当天开始七日内领取有效"
                            },
                            
                        ],
                        qiaotao1:[
                            {
                                name:"月存优惠",
                                money:"最高558元",
                                Withdrawal:"本月单笔存款 ≧ 1000即可领取"
                            },
                            {
                                name:"月体验金",
                                money:"38元",
                                Withdrawal:"本月单笔存款 ≧ 500即可领取"
                            },
                            {
                                name:"专属客服",
                                money:"一对一服务",
                            },
                            {
                                name:"月救援金",
                                money:"最高888元",
                                Withdrawal:"上月总负盈利 ≧ 200000即可领取"
                            },
                            {
                                name:"晋级礼金",
                                money:"58元",
                                Withdrawal:"提现流水要求(174元)"
                            },
                        ]
                    }
                ],
                Class:[
                    "ling_1",
                    "yi_1",
                    "yi_1",
                    "san_1",
                    "san_1",
                    "wu_1",
                    "wu_1",
                    "qi_1",
                    "qi_1",
                    "qi_1",
                    "qi_1",
                    "yiyi",
                    "yiyi",
                ],
                tow_11:"two_11",
                four_1:"four_1",
                FourClass:[
                    "ling_0",
                    "yi_1",
                    "yi_1",
                    "san_3",
                    "san_3",
                    "wu_5",
                    "wu_5",
                    "qi_7",
                    "qi_7",
                    "qi_7",
                    "qi_7",
                    "yiyi_1",
                    "yiyi_1",
                ],
                SpanClass:[
                    "ling_span",
                    "yi_span",
                    "yi_span",
                    "san_span",
                    "san_span",
                    "wu_span",
                    "wu_span",
                    "qi_span",
                    "qi_span",
                    "qi_span",
                    "qi_span",
                    "yiyi_span",
                    "yiyi_span",
                ],
                huo:[
                    "huo1",
                    "huo2",
                    "huo2",
                    "huo3",
                    "huo3",
                    "huo4",
                    "huo4",
                    "huo5",
                    "huo5",
                    "huo5",
                    "huo5",
                    "huo6",
                    "huo6",
                ],
                fourr:"fourrr"
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                if (tab.name == '0') {
                    this.yi = true
                    this.er = false;
                    this.san = false;
                    this.si = false;
                    console.log(1111)
                } else if (tab.name == '1') {
                    this.yi = false
                    this.er = true;
                    this.san = false;
                    this.si = false;
                } else if (tab.name == '2') {
                    this.yi = false
                    this.er = false;
                    this.san = true;
                    this.si = false;
                } else if (tab.name == '3') {
                    this.yi = false
                    this.er = false;
                    this.san = false;
                    this.si = true;
                }
            },
            recharge(){
                this.$router.push("/user/wallet/recharge");
            },
            right(){
                this.Indexes++;
                if(this.Indexes >= 12){
                    this.Indexes = 12
                    console.log("不能加啦");
                }
                console.log(this.Indexes)
            },
            left(){
                this.Indexes--;
                if(this.Indexes <= 0){
                    this.Indexes = 0
                    console.log("不能减啦");
                }
                console.log(this.Indexes)
            },         
        },
        computed: {
            exclusive() { //vip专属优惠
                return this.$store.state.vip.exclusive;
                //this.exclusive.text.split("↵")
            },
            deposit() { //vip月存优惠
                return this.$store.state.vip.deposit;
            },
            experience() { //vip体验金
                return this.$store.state.vip.experience;
            },
            relief() { //vip救济金
                return this.$store.state.vip.relief;
            },
            vipData() { //vip全部
                return this.$store.state.vip.vipData;
            },
            keep_level() { //vip升级保级
                return this.$store.state.vip.keep_level;
            },
            vipDataTQ() { //vip获取特权信息
                return this.$store.state.vip.vipDataTQ;
            },
            vipDataTQLQ(){  // 领取vip特权
                return this.$store.state.vip.vipDataTQLQ;
            },
        },
        mounted() {
            this.$store.dispatch("VIP_MGS", {})
            // vip 特权获取
            this.$store.dispatch("VIP_TQ", {})
            // 领取vip特权
            this.$store.dispatch("VIP_TQLQ", {})
            this.utils.userInfo().then((response) => {
                let { data } = response;
                if (data.code == 0) {
                    this.userInfo = data.data;
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
        created() {
            // var ulArr = this.$refs.loi;
            // console.log(ulArr)
            // console.log(this.i = 1+2)
            var strs = "A↵B↵C↵D".split("↵")
            //console.log(strs)
            this.userstr = strs

            var str = this.exclusive.text.split("↵")
            this.username = str
            // this.username = str[0]
            //console.log(this.username)

            var strr = this.deposit.text.split("↵")
            this.username2 = strr

            var strrr = this.experience.text.split("↵")
            this.username3 = strrr

            var strrrr = this.relief.text.split("↵")
            this.username4 = strrrr
            
            let gameUserInfo = Object.assign(this.utils.gameUserInfo());
            if( gameUserInfo.data != '{}'){
                this.user = utils.gameUserInfo().data;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import url('./../assets/style.less');
    .page-vip {
        height: 1820px;
        width: 1900px;
        display: flex;
        // align-items: center;
        margin: 0 auto;
        background: url(../assets/images/vipbj.jpg);
        background-repeat: no-repeat;
        background-size: 100%;
        .maste{
            position: relative;
            .left_img{
                position: absolute;
                top: 794px;
                left: 981px;
                width: 10px;
                cursor: pointer;
            }
            .right_img{
                position: absolute;
                top: 794px;
                left: 1226px;
                width: 10px;
                cursor: pointer;
            }
            .vip_12 {
                margin: 490px 0 0 435px;
                li {
                    color: #5f6f93;
                    font-size: 12px;
                    cursor: pointer;
                    display: inline-block;
                    padding: 0 19px;
                    line-height: 36px;
                }
            }
            .two{
                margin-left: 444px;
                .ling_1{
                     background: url(../assets/vip/0_0.png)no-repeat;
                     .two_btn{
                        background-color: #f2dcb7;
                        color: #000;
                    }
                }
                .yi_1{
                    background: url(../assets/vip/1_1.png)no-repeat;
                    .two_btn{
                        background-color: #f2dcb7;
                        color: #7d4a37;
                    }
                }
                .san_1{
                     background: url(../assets/vip/vip3.png)no-repeat;
                    .two_btn{
                        background-color: #8e5649;
                        color: #fff;
                    }
                }
                .wu_1{
                    background: url(../assets/vip/vip5.png)no-repeat;
                    .two_btn{
                        background-color: #4e4c5a;
                        color: #fff;
                    }
                }
                .qi_1{
                    background: url(../assets/vip/vip7.png)no-repeat;
                    .two_btn{
                        background-color: #514b79;
                        color: #fff;
                    }
                }
                .yiyi{
                    background: url(../assets/vip/vip11.png)no-repeat;
                    .two_btn{
                        background-color: #f2dcb7;
                        color: #7d4a37;
                    }
                }
                .two_11 {
                    display: inline-block;
                    width: 364px;
                    height: 203px;
                    background-size: 324px;
                    .two_btn{
                        width: 87px;
                        position: relative;
                        height: 32px;
                        border-radius: 15px;
                        left: 218px;
                        top: 129px;
                        text-align: center;
                        font-size: 14px;
                        line-height: 32px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .two_2 {
                        width: 75px;
                        display: inline-block;
                        height: 75px;
                        margin: -11px 0 0 30px;
                    }
                    .two_3 {
                        display: inline-block;
                        position: relative;
                        img {
                            width: 88px;
                            height: 38px;
                            // width: 93px;
                            // height: 39px;
                            position: absolute;
                            top: -70px;
                            left: 7px;
                        }
                        span {
                            font-size: 13px;
                            position: absolute;
                            top: -22px;
                            width: 230px;
                            left: 16px;
                        }
                    }
                    .two_4 {
                        display: inline-block;
                        position: relative;
                        p {
                            width: 112px;
                            position: absolute;
                            cursor: pointer;
                            font-size: 13px;
                        }
                    }
                    .ling_span{color: #fff;}
                    .yi_span{color: #7b4b35;}
                    .san_span{color: #8e5649;}
                    .wu_span{color: #4e4c5a;}
                    .qi_span{color: #514b79;}
                    .yiyi_span{color: #fbe9be;}
                }
                .three {
                    display: inline-block;
                    position: relative;
                    top: 46px;
                    left: -4px;
                    p {
                        color: #b0b3b3;
                    }
                    img {
                        margin-top: 15px;
                        width: 700px;
                    }
                    .three_img {
                        background: url(../assets/images/download.png);
                        width: 35px;
                        height: 18px;
                        position: absolute;
                        top: 31px;
                        left: 0px;
                    }
                    .three_ul {
                        margin: 0 0 0 -21px;
                        position: relative;
                        top: 5px;
                        li{
                            display: inline-block;
                            color: #23c5a6;
                            padding: 0 20px;
                            cursor: pointer;
                            position: relative;
                        }
                        li:nth-child(1) {
                            left: 0;
                        }
                        li:nth-child(2) {
                            left: -9px;
                        }
                        li:nth-child(3) {
                            left: -20px;
                        }
                        li:nth-child(4) {
                            left: -28px;
                        }
                        li:nth-child(5) {
                            left: -38px;
                        }
                        li:nth-child(6) {
                            left: -47px;
                        }
                        li:nth-child(7) {
                            left: -57px;
                        }
                        li:nth-child(8) {
                            left: -67px;
                        }
                        li:nth-child(9) {
                            left: -77px;
                        }
                        li:nth-child(10) {
                            left: -87px;
                        }
                        li:nth-child(11) {
                            left: -97px;
                        }
                        li:nth-child(12) {
                            left: -116px;
                        }
                        li:nth-child(13) {
                            left: -132px;
                        }
                    }
                    .three_ul2 {
                        margin: 0 0 0 39px;
                        position: relative;
                        top: 5px;
                        li{
                            display: inline-block;
                            color: #23c5a6;
                            padding: 0 20px;
                            cursor: pointer;
                            position: relative;
                        }
                        li:nth-child(1) {
                            left: -59px;
                        }
                        li:nth-child(2) {
                            left: -66px;
                        }
                        li:nth-child(3) {
                            left: -77px;
                        }
                        li:nth-child(4) {
                            left: -89px;
                        }
                        li:nth-child(5) {
                            left: -104px;
                        }
                        li:nth-child(6) {
                            left: -117px;
                        }
                        li:nth-child(7) {
                            left: -132px;
                        }
                        li:nth-child(8) {
                            left: -147px;
                        }
                        li:nth-child(9) {
                            left: -161px;
                        }
                        li:nth-child(10) {
                            left: -167px;
                        }
                        li:nth-child(11) {
                            left: -188px;
                        }
                        li:nth-child(12) {
                            left: -203px;
                        }
                        li:nth-child(13) {
                            left: -211px;
                            color: red;
                        }
                    }
                    .three_div {
                        width: 94px;
                        height: 30px;
                        display: inline-block;
                        position: absolute;
                        top: -9px;
                        right: 220px;
                        border-radius: 20px;
                        background-image: linear-gradient(to right, #01ecc6, #00acef);
                        color: #fff;
                        text-align: center;
                        line-height: 31px;
                    }
                }
            }
            .four {
                position: absolute;
                left: 446px;
                top: 833px;
                .ling_0{
                    background: url(../assets/vip/000.png);
                    p {color: #fff;}
                    p:nth-child(3) {color: #adb0b7;}
                }
                .yi_1{
                    background: url(../assets/vip/1_1_1.png);
                    p {color: #7a4c35;}
                    p:nth-child(3) {color: #aaa386;}
                }
                .san_3{
                    background: url(../assets/vip/vip33.png);
                    p {color: #8e5647;}
                    p:nth-child(3) {color: #b98f81;}
                }
                .wu_5{
                    background: url(../assets/vip/vip55.png);
                    p {color: #4d4b59;}
                    p:nth-child(3) {color: #929197;}
                }
                .qi_7{
                    background: url(../assets/vip/vip77.png);
                    p {color: #514b79;}
                    p:nth-child(3) {color: #837ca5;}
                }
                .yiyi_1{
                    background: url(../assets/vip/vip111.png);
                    p {color: #fbe9be;}
                    p:nth-child(3) {color: #aaa386;}
                }
                p {
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    margin: 0px 0 0 -208px;
                    position: relative;
                    top: -20px;
                }
                .four_1 {
                    width: 292px;
                    height: 149px;
                    display: inline-block;
                    position: relative;
                    p {
                        position: absolute;
                        left: 225px;
                    }
                    p:nth-child(1) {
                        font-size: 18px;
                        font-weight: bold;
                        top: 19px;
                    }
                    p:nth-child(2) {
                        font-size: 16px;
                        top: 52px;
                    }
                    p:nth-child(3) {
                        font-size: 12px;
                        top: 89px;
                    }
                    .fourrr{
                        position: relative;
                        width: 38px;
                        height: 114px;
                        left: 207px;
                        top: 14px;
                        font-weight: 600;
                        border-radius: 33px;
                        cursor: pointer;
                    }
                    .div-p{
                        width:10px !important;
                        font-size:17px !important;
                        position: absolute;left: 219px !important;
                        top:10px !important;
                    }
                    .huo1{background: #3b4056;border: 2px #9c9fa8 solid;}
                    .huo2{background: #deb683;border: 2px #9a6650 solid;}
                    .huo3{background: #d1a58c;border: 2px #af7c69 solid;}
                    .huo4{background: #a09fa7;border: 2px #76747f solid;}
                    .huo5{background: #8e84b9;border: 2px #6d6596 solid;}
                    .huo6{background: #8e84b9;border: 2px #6d6596 solid;}
                    .huo6{background: #383838;border: 2px #9a9087 solid;}
                }
                .four_div div {margin-left: 20px;}
                .four_div div:nth-child(5){
                    margin-top: 15px;
                    p:nth-child(2){font-size: 20px;}
                }
            }
            .five {
                width: 1159px;
                height: 327px;
                position: absolute;
                left: 420px;
                top: 1250px;
                .five_div {
                    width: 1159px;
                    height: 269px;
                }
                .five_div2 {
                    width: 1159px;
                    height: 269px;
                }
                .five_div3 {
                    width: 1159px;
                    height: 177px;
                }
                .table_one {
                    width: 100%;
                    text-align: center;
                    tr td{
                        border: 1px #48516b solid;
                        font-size: 14px;
                        border-left: 0px;
                        border-bottom: 0px;
                        width: 80px;
                        height: 48px;
                        color: #bababa;
                    }
                    .td{
                        font-size: 16px;
                        height: 48px;
                        border-bottom: 0px solid;
                        border-left: 1px solid #48516b;
                    }
                    tr:nth-child(5) td {
                        border-bottom: 1px #48516b solid;
                    }
                }
                /deep/.el-tabs__item {
                    font-size: 16px;
                    color: #FFFFFF;
                    padding: 0px 100px
                }
                /deep/.el-tabs__active-bar {
                    background-color: #28ffd4;
                    width: 210px;
                }
                /deep/.el-tabs__nav {
                    background-color: #000000;
                }
            }
            .six {
                position: absolute;
                left: -43px;
                top: 1612px;
                    .six_p{
                        color: #FFFFFF;
                        font-size: 16px;
                        text-align: center;
                        display: inline-block;
                        width: 1157px;
                    }
                    .p {
                        color: #FFFFFF;
                        text-align: center;
                        font-size: 16px;
                        margin: 0 0 0 471px;
                    }
                    ul {
                        margin: 24px 0 0 460px;
                    }
                }
            }
    }
</style>