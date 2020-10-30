<template>
    <div class="component-nav">
        <div class="nav">
            <div class="row">
                <div class="logo">
                    <router-link :to="{ path:'/home/match' }">
                        <img src="./../assets/common/logo.png" />
                    </router-link>
                </div>
                <div class="block">
                    <ul v-if="$route.name != '/register' && $route.name != '/login' && $route.name != '/retrievePassword'">
                        <!-- <li class="gameMode" :class="{'active': $route.name == '/home/match' || $route.name == '/home/matchDetail'}">
                            <el-select v-model="gameMode" @change="goHome" placeholder="请选择">
                                <el-option label="奖池模式" value="1">
                                    <div style="display: block">奖池模式</div>
                                </el-option>
                                <el-option label="比例模式" value="2">
                                    <div style="display: block">比例模式</div>
                                </el-option>
                            </el-select>
                        </li> -->
                        <li><router-link to="/home/match">奖池模式</router-link></li>
                        <li><router-link to="/shop/goods">商城兑换</router-link></li>
                        <li><router-link to="/user/active">优惠活动</router-link></li>
                        <li><router-link to="/user/invite/myInvite">邀请招募</router-link></li>
                    </ul>
                </div>
                <div class="personal">
                     <!-- v-if="(!gameUserInfo) && ($route.name != '/register' && $route.name != '/login' && $route.name != '/retrievePassword')" class="vip" -->
                    <div  class="vip" @click="vip">
                        <img src="./../assets/common/vip.png" />
                    </div>
                    <div v-if="!gameUserInfo" class="noLogin">
                        <el-button class="register" @click="register">
                            注册
                        </el-button>
                        <el-button class="login" @click="login">
                            登录
                        </el-button>
                    </div>
                    <div v-if="gameUserInfo" class="loginInfo">
                        <div class="text"><router-link to="/user/my/myInfo">个人中心</router-link></div>
                        <div class="menu">
                            <el-dropdown trigger="click">
                                <span class="btn">
                                    <img class="avatar" :src="require('./../assets/avatar/' + this.$store.state.myInfo.modifyInfo.head_portrait + '.png')" />
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                                <el-dropdown-menu class="nav-menu-list" slot="dropdown">
                                    <el-dropdown-item>{{this.$store.state.myInfo.modifyInfo.nickname}}</el-dropdown-item>
                                    <el-dropdown-item>
                                        <div>{{utils.ThousandNum(this.$store.state.user.userData.platform_money)}}</div>
                                        <p>平台币</p>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <div>{{utils.ThousandNum(this.$store.state.user.userData.money)}}</div>
                                        <p>竞猜币</p>
                                    </el-dropdown-item>
                                    <router-link style="color:#fff" to="/user/wallet/recharge"><el-dropdown-item divided><img src="./../assets/common/price.png" /> 充值</el-dropdown-item></router-link>
                                    <router-link style="color:#fff" to="/user/wallet/exchange"><el-dropdown-item><img src="./../assets/common/transfer.png" /> 转账</el-dropdown-item></router-link>
                                    <router-link style="color:#fff"  to="/user/news/systemMsg"><el-dropdown-item><img src="./../assets/common/message.png" /> 消息中心</el-dropdown-item></router-link>
                                    <el-dropdown-item divided>
                                        <div @click="logOut"><img src="./../assets/common/logout.png" /> 退出登录</div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            gameUserInfo: null,
            gameMode: '1',
            imgIndex: '',
            nickName: '',
            userData:{}
        }
    },
    computed: {
        modifyInfo() {
            return this.$store.state.myInfo.modifyInfo;
        }
    },
    methods: {
        register(){
            this.$router.push('/register')
        },
        login(){
            this.$router.push('/login')
        },
        logOut() {
            sessionStorage.clear();
            this.$router.push('/login');
        },
        goHome() {
            this.$router.replace({
                path: '/home/match',
                query: {
                    ...this.$route.query,
                    mode: this.gameMode
                }
            });
        },
        getUserInfo(){
            this.$store.dispatch('USER_DATA',{}).then(response=>{
                if(response.code == 200){
                    //将用户信息保存到store中
                    this.$store.commit('SAVE_DATA',response.data)
                    this.userData = response.data;
                }
            })
        },
        vip(){
            this.$router.push('/vip');
        }
    },
    watch:{
        $route(to){
            let gameUserInfo = this.utils.gameUserInfo();
            let { mode } = this.$route.query;
            if (JSON.stringify(gameUserInfo) != '{}') {
                this.gameUserInfo = gameUserInfo;
                //退出登录，同时刷新登录成功后的数据
                this.$store.commit('SAVE_INFO',this.gameUserInfo.data);
            } else {
                this.gameUserInfo = null;
            }
            if (mode) {
                this.gameMode = mode;
            }
            // if (to.name == '/home/match' || (to.matched[0].path && (to.matched[1].path == '/user/my' || to.matched[0].path == '/shop'))) {
            //     this.getUserInfo();
            // }
            if (to.name == '/home/match' ) {
                this.getUserInfo();
            }
        }
    }
}
</script>
<style lang="less">
@import url('../assets/style.less');
.component-nav {
    .nav {
        background-color: #090C15;
        .row {
            display: flex;
            width: 1246px;
            height: 80px;
            margin: 0 auto;
            align-items: center;
            .logo {
                width: 310px;
                img {
                    max-width: 200px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .block {
                flex: 1;
                color: #7086aa;
                font-size: 18px;
                ul {
                    list-style: none;
                    li {
                        cursor: pointer;
                        padding: 15px 0 15px 0;
                        margin: 0 78px 0 0;
                        display: inline-block;
                    }
                    .router-link-active{
                        color:#28ffd4;
                        font-weight: bold;
                    }
                }
                .gameMode {
                    .el-input__inner {
                        width: 100px !important;
                        color: #7086ae;
                        background-color: transparent;
                        border-width: 0;
                        padding: 0;
                        width: auto;
                        font-size: 18px;
                        
                    }
                }
                .gameMode.active {
                    .el-input__inner {
                        color:#28ffd4;
                        font-weight: bold;
                    }
                }
            }
        }
        .personal {
            display: flex;
            align-items: center;


            .noLogin {
                .register, .login {
                    border-width: 0;
                    height: 34px;
                    width: 90px;
                    padding: 0;
                    color: #FFFFFF;
                    
                }
                .register {
                    background-color: #1A2335;
                    &:active {
                        background: rgba(26, 35, 53, 0.8);
                    }
                }
                .login {
                    background-color: #26B1BF;
                    &:active {
                        background: rgba(38, 177, 191, 0.8);
                    }
                }
            }
            .vip {
                margin: 0 55px 0 0;
            }
            .loginInfo {
                display: flex;
                align-items: center;
                img.avatar {
                    width: 46px;
                    vertical-align: middle;
                    border-radius: 50%;
                    padding: 0 0 0 8px;
                }
                .text {
                    font-size: 18px;
                    margin: 0 20px 0 0;
                    a{
                        color: #07e9f1;
                    }
                }
                .menu {
                    .btn {
                        color: #07e9f1;
                    }
                }
            }
        }
    }
}
</style>
