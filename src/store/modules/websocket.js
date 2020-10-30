// 前缀必须是文件名
import utils from '../../utils/common.js';
export const WEBSOCKET_ITEM = 'WEBSOCKET_ITEM';
export const WEBSOCKET_ORDER_LIST = 'WEBSOCKET_ORDER_LIST';
export const WEBSOCKET_ORDER_SUBMIT = 'WEBSOCKET_ORDER_SUBMIT';
export const WEBSOCKET_ORDER_LIST_NO = 'WEBSOCKET_ORDER_LIST_NO';
export const WEBSOCKET_ITEM_SAVE = 'WEBSOCKET_ITEM_SAVE';
export default {
    state: {
        gameInfo: {}, //储存相关数据
        orderList: [],
        orderListNo: []
    },
    getters: {

    },
    mutations: {
        [WEBSOCKET_ITEM](state, data) {
            if (data) {
                state.gameInfo = data;
            }
        },
        [WEBSOCKET_ITEM_SAVE](state, data) {
            if (data) {
                let gameInfo = JSON.parse(JSON.stringify(state.gameInfo));
                gameInfo.data_type = data.data_type;
                gameInfo.game_logo_url = data.game_logo_url;
                gameInfo.game_name = data.game_name;
                gameInfo.have_live = data.have_live;
                gameInfo.match_id = data.match_id;
                gameInfo.match_name = data.match_name;
                gameInfo.match_seq_num = data.match_seq_num;
                gameInfo.match_start_time = data.match_start_time;
                gameInfo.round = data.round;
                gameInfo.top_option.bet_nums = data.team;
                // 复制改变
                state.gameInfo = gameInfo;
            }
        },
        [WEBSOCKET_ORDER_LIST](state, data) {
            let deleteID = -1;
            if (data.flag == true) {
                state.orderList.push(data);
            } else {
                for (let i = 0; i < state.orderList.length; i++) {
                    if (state.orderList[i].bet_id == data.bet_id) {
                        deleteID = i;
                        break;
                    }
                }
                if (deleteID != -1) state.orderList.splice(deleteID, 1);
            }
        },
        [WEBSOCKET_ORDER_LIST_NO](state, data) {
            if (data) {
                state.orderListNo = data;
            }
        }
    },
    // 异步操作
    actions: {
        [WEBSOCKET_ITEM]() {
            return new Promise((resolve) => {
                utils.request('userinfo', arguments[1]).then(response => {
                    resolve(response.data);
                });
            })
        },
        [WEBSOCKET_ORDER_SUBMIT]() {
            return new Promise((resolve) => {
                utils.request('place_order', {
                    ...arguments[1]
                }, 'orderSrv').then(response => {
                    let { data } = response;
                    resolve(data);
                });
            })
        },
        [WEBSOCKET_ORDER_LIST_NO]({ commit }, data) {
            return new Promise(() => {
                utils.request('get_unsettle_order', {
                    ...data
                }, 'orderSrv').then(response => {
                    let result = response.data;
                    let { data, code } = result;
                    if (code == 200) {
                        commit(WEBSOCKET_ORDER_LIST_NO, data);
                    }
                });
            })
        },

    }
}