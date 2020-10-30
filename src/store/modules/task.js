// 前缀必须是文件名
import utils from '../../utils/common';
export const TASK_DATA = 'TASK_DATA';
export const RECEIVE = 'RECEIVE';

export default {
    state: {
        taskList: {}, //储存相关数据
    },
    getters: {

    },
    mutations: {
        [TASK_DATA](state, data) {
            if (data) { console.log() }
        },
        [RECEIVE](state, data) {
            if (data) { console.log() }
        },
    },
    // 异步操作
    actions: {
        //获取任务列表
        [TASK_DATA]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('getTask', data, 'taskSrv').then(response => {
                    resolve(response.data);
                });
                commit(TASK_DATA, data)
            })
        },
        //领取奖励
        [RECEIVE]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('getTaskReward', data, 'taskSrv').then(response => {
                    resolve(response.data);
                });
                commit(RECEIVE, data)
            })
        },

    }
}