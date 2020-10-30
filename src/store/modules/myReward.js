// 前缀必须是文件名
import utils from '../../utils/common';
export const REWARD_DATA = 'REWARD_DATA'
export const FLOW_DATA = 'FLOW_DATA'
export const EVERY_DATA = 'EVERY_DATA'
export const RECEIVE_RECORD = 'RECEIVE_RECORD'
export default {
    state: {
        reward_data: {}, //奖励数据
        flow_data: {}, //流水数据
        every_record: {}, //每日记录
        receive_record: {}, //领取记录
    },
    getters: {

    },
    mutations: {
        [REWARD_DATA](state, data) {
            if (data) {
                state.reward_data = data;
            }
        },
        [FLOW_DATA](state, data) {
            if (data) {
                state.flow_data = data;
            }
        },
        [EVERY_DATA](state, data) {
            if (data) {
                state.every_record = data;
            }
        },
        [RECEIVE_RECORD](state, data) {
            if (data) {
                state.receive_record = data;
            }
        },

    },
    actions: {
        //奖励数据
        [REWARD_DATA](data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/home', 'get', data).then(response => {
                    resolve(response.data);
                });
            })

        },
        //流水详情
        [FLOW_DATA](data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/balance_detail', 'post', data).then(response => {
                    resolve(response.data);
                });
            })

        },
        //每日记录
        [EVERY_DATA](data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/balance', 'post', data).then(response => {
                    resolve(response.data);
                });
            })

        },
        //奖励记录
        [RECEIVE_RECORD](data) {
            return new Promise((resolve) => {
                utils.ask('v1/invite/log', 'post', data).then(response => {
                    resolve(response.data);
                });
            })
        },

    }
}