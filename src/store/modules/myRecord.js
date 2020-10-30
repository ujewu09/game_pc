// 前缀必须是文件名
import utils from '../../utils/common';
export const RECORD_DATA = 'RECORD_DATA'
export const FOLLOW_DATA = 'FOLLOW_DATA'
export const EVERY_DATA = 'EVERY_DATA'
export const RECEIVE_RECORD = 'RECEIVE_RECORD'
export default {
    state: {
        result: {},
    },
    getters: {

    },
    mutations: {
        [RECORD_DATA](state, data) {
            if (data) { console.log() }
        },
        [FOLLOW_DATA](state, data) {
            if (data) { console.log() }
        },
        [EVERY_DATA](state, data) {
            if (data) { console.log() }
        },
        [RECEIVE_RECORD](state, data) {
            if (data) { console.log() }
        },

    },
    actions: {
        //奖励数据
        [RECORD_DATA]({ commit }, data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/home', 'get', data).then(response => {
                    resolve(response.data);
                });
                commit(RECORD_DATA, data)
            })

        },
        //流水详情
        [FOLLOW_DATA]({ commit }, data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/balance_detail', 'post', data).then(response => {
                    resolve(response.data);
                });
                commit(FOLLOW_DATA, data)
            })

        },
        //每日记录
        [EVERY_DATA]({ commit }, data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/balance', 'post', data).then(response => {
                    resolve(response.data);
                });
                commit(EVERY_DATA, data)
            })

        },
        //奖励记录
        [RECEIVE_RECORD]({ commit }, data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/log', 'post', data).then(response => {
                    resolve(response.data);
                });
                commit(RECEIVE_RECORD, data)
            })
        },

    }
}