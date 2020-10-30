

// ======================================== 本地地址 ========================================
// 商城地址
const HOST = "http://192.168.1.242:8088/";
// 游戏地址
const GAME_HOST = "https://192.168.1.241:8081/";
// websocket地址
const GAME_WSS = "wss://192.168.1.241:8081/api/v1/auth_user/wss";
// 发送短信地址
const MESSAGE_IP = "http://192.168.1.200:9005/";
// ======================================== end ========================================


/*
// ======================================== 香港地址 ========================================
// 商城地址
const HOST = "https://hk-shop.winbet888.net/";
// 游戏地址
const GAME_HOST = "https://hk-gw.winbet888.net:8081/";
// websocket地址
const GAME_WSS = "wss://hk-gw.winbet888.net:8081/api/v1/auth_user/wss";
// 发送短信地址
const MESSAGE_IP = "https://kong-api.winbet888.net/";
// ======================================== end ========================================
*/
/*
// ======================================== 新加坡地址 ========================================
// 商城地址
const HOST = "https://sg-shop.winbet888.net/";
// 游戏地址
const GAME_HOST = "https://winbet888.net:8081/";
// websocket地址
const GAME_WSS = "wss://winbet888.net:8081/api/v1/auth_user/wss";
// 发送短信地址
const MESSAGE_IP = "https://api.winbet888.net/";
// ======================================== end ========================================
*/

// ======================================== 常量配置 ========================================
// (1、赔率模式， 2、奖池模式)
const PLAY_MODE = 2;
 // (0、竞猜币；1、平台币)
const CURRENCY = 0;
// ======================================== end ========================================


export default {
    HOST,
    MESSAGE_IP,
    GAME_HOST,
    GAME_WSS,
    PLAY_MODE,
    CURRENCY
}
