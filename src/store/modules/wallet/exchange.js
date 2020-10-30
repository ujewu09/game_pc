// 前缀必须是文件名
import utils from '../../../utils/common';
export const EXCHANGE = 'EXCHANGE';
export default {
    state: {
        result: '', //储存相关数据
    },
    getters: {

    },
    mutations: {
        [EXCHANGE](state, data) {
            if (data) { console.log() }
        },
    },
    // 异步操作
    actions: {
        [EXCHANGE]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('transform', data).then(response => {
                    resolve(response.data);
                });
                commit(EXCHANGE, data)
            })
        }
    }
}