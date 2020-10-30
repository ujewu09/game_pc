import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import home from './modules/home';
import register from './modules/register';
import login from './modules/login';
import task from './modules/user/task';
import common from './modules/common';
import retrievePassword from './modules/retrievePassword'
import mySetting from './modules/my/mySetting';
import myInfo from './modules/my/myInfo';
import recharge from './modules/wallet/recharge';
import exchange from './modules/wallet/exchange';
import dealRecords from './modules/wallet/dealRecords';
import orderRecords from './modules/wallet/orderRecords';
import pay from './modules/wallet/pay';
import active from './modules/user/active';
import news from './modules/news/news';
import myReward from './modules/myReward';
import websocket from './modules/websocket';
import vip from './modules/vip'
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
})
export default new Vuex.Store({
    //模块引入
    modules: {
        user,
        home,
        register,
        common,
        mySetting,
        myInfo,
        login,
        retrievePassword,
        recharge,
        exchange,
        dealRecords,
        orderRecords,
        pay,
        task,
        active,
        news,
        myReward,
        websocket,
        vip
    },
    plugins: [vuexLocal.plugin]
});