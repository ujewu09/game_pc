// 前缀必须是文件名
import utils from '../../../utils/common';
export const TASK_DATA = 'TASK_DATA';
export const RECEIVE = 'RECEIVE';

export default {
    state: {
        taskList: {}, //任务列表
    },
    getters: {

    },
    mutations: {
        [TASK_DATA](state, data) {
            if (data) {
                state.taskList = data;
            }
        },
    },
    // 异步操作
    actions: {
        //获取任务列表
        [TASK_DATA]() {
            return new Promise((resolve) => {
                utils.request('getTask', arguments[1], 'taskSrv').then(response => {
                    resolve(response.data);
                });
            })
        },
        //领取奖励
        [RECEIVE]() {
            return new Promise((resolve) => {
                utils.request('getTaskReward', arguments[1], 'taskSrv').then(response => {
                    resolve(response.data);
                });
            })
        },

    }
}