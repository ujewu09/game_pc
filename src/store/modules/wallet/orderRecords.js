// 前缀必须是文件名
import utils from '../../../utils/common';
export const SETTLED_DATA = 'SETTLED_DATA';
export const UNSETTLED_DATA = 'UNSETTLED_DATA';

export default {
    state: {
        settled_data: {}, //已结算数据
        unsettled_data: {}, //未结算数据
    },
    getters: {

    },
    mutations: {
        [SETTLED_DATA](state, data) {
            if (data) {
                state.settled_data = data;
            }
        },
        [UNSETTLED_DATA](state, data) {
            if (data) {
                state.unsettled_data = data;
            }
        },
    },
    // 异步操作
    actions: {
        [SETTLED_DATA]() {
            return new Promise((resolve) => {
                utils.request('get_settled_order', arguments[1], 'orderSrv').then(response => {
                    resolve(response.data);
                });
            })
        },
        [UNSETTLED_DATA]() {
            return new Promise((resolve) => {
                utils.request('get_unsettle_order', arguments[1], 'orderSrv').then(response => {
                    resolve(response.data);
                });
            })
        }
    }
}