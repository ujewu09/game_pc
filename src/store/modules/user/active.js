// 前缀必须是文件名
import utils from '../../../utils/common.js';
export const ACTIVE_USER = 'ACTIVE_USER'
export const ACTIVE_USERCLICK = 'ACTIVE_USERCLICK'
export default {
    state: {
        systemMsgData:{},
        systemMsgDataclick:{},
    },
    getters: {

    },
    mutations: {
        [ACTIVE_USER](state, data) {
            // 处理数据
            if (data) {
                state.systemMsgData = data;
            }
        },
        [ACTIVE_USERCLICK](state, data) {
            // 处理数据
            if (data) {
                state.systemMsgDataclick = data;
            }
        },
    },
    actions: {
        [ACTIVE_USER]({ commit }, params) {
           // 取数据
           return new Promise((resolve, project) => {
            utils.request('getactivity', params, "taskSrv").then(response => {
                let { data } = response;
                // let result = data;
                // result.data;
                if (data.code == 200) {
                    commit(ACTIVE_USER, data.data);
                    resolve(data);
                } else {
                    project(response);
                }
            });  
            })
        },
        //点击触发
        [ACTIVE_USERCLICK]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
             utils.request('clickactivity', params, "taskSrv").then(response => {
                 let { data } = response;
                 if (data.code == 200) {
                     commit(ACTIVE_USERCLICK, data.data);
                     resolve(data);
                 } else {
                     project(response);
                 } 
             });
            })
        }
    }
}