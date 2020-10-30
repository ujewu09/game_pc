// 前缀必须是文件名
import utils from '../../../utils/common';
export const RECHARGE = 'RECHARGE';
export default {
    state: {
        result: '', //储存相关数据
    },
    getters: {

    },
    mutations: {
        [RECHARGE](state, data) {
            if (data) { console.log() }
        },
    },
    // 异步操作
    actions: {
        [RECHARGE]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('recharge', data).then(response => {
                    resolve(response.data);
                });
                commit(RECHARGE, data)
            })
        }
    }
}