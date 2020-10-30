// 前缀必须是文件名
import utils from '../../../utils/common';
export const DEAL_DATA = 'DEAL_DATA';
export default {
    state: {
        billList: {}, //账单数据
    },
    getters: {

    },
    mutations: {
        [DEAL_DATA](state, data) {
            if (data) {
                state.billList = data;
            }
        },
    },
    // 异步操作
    actions: {
        [DEAL_DATA]() {
            return new Promise((resolve) => {
                utils.request('web_get_bill', arguments[1]).then(response => {
                    resolve(response.data);
                });
            })
        }
    }
}