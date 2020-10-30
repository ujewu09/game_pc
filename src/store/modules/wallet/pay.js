// 前缀必须是文件名
import utils from '../../../utils/common';
export const PAY_RIGHT = 'PAY_RIGHT';
export default {
    state: {
        result: '', //储存相关数据
    },
    getters: {

    },
    mutations: {
        [PAY_RIGHT](state, data) {
            if (data) { console.log() }
        },
    },
    // 异步操作
    actions: {
        [PAY_RIGHT]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('getUserArg', data).then(response => {
                    resolve(response.data);
                });
                commit(PAY_RIGHT, data)
            })
        }
    }
}