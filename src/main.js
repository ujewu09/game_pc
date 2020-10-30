import Vue from 'vue';

import { Button, Dropdown, Select, Option, Pagination, Input, Message, DropdownMenu, Popover, DropdownItem, Tabs, TabPane, Carousel, CarouselItem, Radio, DatePicker, Collapse, Table, TableColumn, Tooltip, Image, Breadcrumb, BreadcrumbItem, Progress, Alert, MessageBox, Dialog, Upload } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueClipboard from 'vue-clipboard2'
import router from './router';
import utils from './utils/common.js';
import config from './config.js';
import axios from 'axios';
import store from './store/index';
import VueVideoPlayer from 'vue-video-player';
// import Video from 'video.js';
import 'videojs-contrib-hls';
import 'videojs-flash';
import 'video.js/dist/video-js.css';
import { createSocket } from './websocket/websocket.js';
// import SWF_URL from 'videojs-swf/dist/video-js.swf';//此处用const会报错
// Video.options.flash.swf = SWF_URL;

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Collapse)
Vue.use(Popover)
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Image)
Vue.use(Input)
Vue.use(VueClipboard);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Progress);
Vue.use(Alert);
Vue.use(Dialog);
Vue.use(Upload)
    // 播放视频插件
Vue.use(VueVideoPlayer);

// 路由跳转前
router.beforeEach((to, from, next) => {
    let userInfo = utils.gameUserInfo();
    let uriIndex = to.fullPath.indexOf("?");
    let uri = to.fullPath.substring(0, uriIndex != -1 ? uriIndex : to.fullPath.length);
    // 存储过去到的session数据
    if (to.query.session) {
        sessionStorage.setItem("session", to.query.session);
    }
    // 已经登录则不能再进入登录注册
    if (JSON.stringify(userInfo) != '{}' && (
            uri == '/register' ||
            uri == '/login' ||
            uri == '/retrievePassword')) {
        next(false);
        return;
    }
    // 限制不登录的情况下路由跳转
    if (uri != '/register' &&
        uri != '/login' &&
        uri != '/retrievePa ssword' &&
        uri != '/home/match' &&
        uri != '/retrievePassword') {
        if (JSON.stringify(userInfo) == '{}') {
            MessageBox.confirm(
                '请先登录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    center: true,
                    customClass: 'message-box'
                }).then(() => {
                router.push({ path: '/login' });
            });
            next(false);
            return;
        }
    }
    next();
    return;
});

// 连接websocket
createSocket(config.GAME_WSS);

// 拦截器
axios.interceptors.request.use((config) => {
    // 请求拦截
    // 默认添加参数session
    if (sessionStorage.getItem("session")) {
        config.data.session = sessionStorage.getItem("session");
    }
    return config;
});

Vue.prototype.$message = Message;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.config = config;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
axios.defaults.crossDomain = true;

axios.interceptors.response.use((response) => {
    if (response && response.data) {
        // 处理错误提示
        if (response.data.code != 0 && response.data.code != 200) {
            if (response.data.code == 2102 || response.data.code == 10001) {
                let userInfo = utils.gameUserInfo();
                if (JSON.stringify(userInfo) != '{}') {
                    MessageBox.confirm(
                        '登录已过期，请重新登录', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            dangerouslyUseHTMLString: true,
                            center: true,
                            customClass: 'message-box'
                        }).then(() => {
                        sessionStorage.clear();
                        router.push({ path: '/login' });
                    });
                }
            } else {
                Message({
                    showClose: true,
                    message: response.data.msg,
                    type: 'error',
                });
            }

        }
        return response;
    } else {
        return response;
    }
}, function(error) {
    return Promise.reject(error);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data: {
        event: new Vue()
    }
});