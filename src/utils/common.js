import axios from 'axios';
import config from '../config.js';

/**
 * 过滤头像地址
 * @param {String} uri 该参数由接口提供
 * @returns {String} http://www.***.png 或者 ./../asset/avatar/***.png 
 */
function avatarFilter(uri) {
    if (/^[0-9]+/.test(uri)) {
        return require("../assets/avatar/" + uri + ".png");
    }
    return uri
}

/**
 * 商城有使用到
 */
function userInfo() {
    // 获取用户信息
    return axios.post(config.HOST + "api/user/info", {
        user_type: 1,
    });
}

/**
 * 获取短信接口
 * @param {Object} 请求参数 
 * @return {Promise}
 */
function getMessage(data) {
    if (!data) return false;
    return axios.post(config.MESSAGE_IP + 'v1/sms', data);
}

/**
 * 工作服接口workSrv
 * @param {String} 请求命令
 * @param {Object} 请求参数
 * @return {Promise}
 */
function request(cmd, data, mode = 'workSrv') {
    if (!cmd && !data) return false;
    let userInfo = gameUserInfo();
    if (JSON.stringify(userInfo) != '{}' && userInfo.data) {
        data.sessionId = data.sessionId ? data.sessionId : userInfo.data.sessionId;
    }
    return axios.post(config.GAME_HOST + 'api/v1/user/common_router', {
        group: mode,
        seq: 0,
        cmd: cmd,
        data: data
    });
}

function http(url, data) {
    if (!url) return false;
    let userInfo = gameUserInfo();
    if (JSON.stringify(userInfo) != '{}' && userInfo.data) {
        data.sessionId = data.sessionId ? data.sessionId : userInfo.data.sessionId;
    }
    return axios.post(config.MESSAGE_IP + url, {
        ...data,
        headers: {
            authorization: "Bearer " + data.sessionId
        }
    });
}

/**
 * 邀请接口
 * @param {url} 请求地址
 * @param {Object} 请求参数
 * @return {Promise}
 */
function ask(url, methods = "post", data) {
    if (!url) return false;
    let userInfo = gameUserInfo();
    if (JSON.stringify(userInfo) != '{}' && userInfo.data && methods == 'get') {
        data.sessionId = data.sessionId ? data.sessionId : userInfo.data.sessionId;
    }
    return axios({
        method: methods,
        url: config.MESSAGE_IP + url,
        headers: {
            authorization: "Bearer " + sessionStorage.getItem('session')
        },
        data: data
    });
}




/**
 * 转换千元符
 * @param {number} 钱  
 */
function ThousandNum(num) {
    if (typeof(num) === 'number') {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


/**
 * js时间戳转换成yy-mm-dd-hh-mm-ss
 * @param {date} 时间
 */
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{3,4}$/, ' ');
}


/**
 * js时间戳转换成yy-mm-dd
 * @param {date} 时间
 */
function formatDate(now) {
    var date = new Date(now * 1000)
    var y = date.getFullYear(); //取得4位数的年份
    var m = date.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
    var d = date.getDate(); //返回日期月份中的天数（1到31）
    return y + "-" + m + "-" + d;
}

/**
 * 时间戳转换时分秒
 */
function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let strDate = Y + M + D + h + m + s;
    return strDate;
}

/**
 * 获取游戏用户数据
 * @return {Object} 返回登录成功后获取的数据 
 */
function gameUserInfo() {
    if (sessionStorage.getItem("data")) {
        let data = JSON.parse(sessionStorage.getItem("data"));
        return data;
    }
    return {};
}

/**
 * 改变路由参数
 * @param {Object} that vue对象。例：this
 * @param {Object} param URL参数。例：{ param: 4 }
 */
function modifyURIParam(that, param) {
    if (typeof that == 'object' && typeof param == 'object') {
        let query = that.$route.query;
        let path = that.$route.path;
        query = JSON.parse(JSON.stringify(query));
        let modifyParam = Object.assign(query, param);
        that.$router.replace({ path, query: modifyParam });
    }
}

/**
 * 按照接口规范过滤钱
 * @param {*} num 
 */
function priceFilter(num) {
    /*
    if (typeof num == 'number') {
        if (type == 'de') {
            return num / 100;
        }
        return num * 100;
    }*/
    return num;
}

export default {
    avatarFilter,
    userInfo,
    ThousandNum,
    getMessage,
    request,
    gameUserInfo,
    modifyURIParam,
    http,
    getLocalTime,
    formatDate,
    ask,
    timestampToTime,
    priceFilter
}