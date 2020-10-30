// 前缀必须是文件名
import utils from '../../../utils/common.js';
export const SYSTEM_MGS = 'SYSTEM_MGS'
export const CLICK_NEWS = 'CLICK_NEWS'
export default {
    state: {
        systemMsgData:{},
        systemMsgDataNews:{}
    },
    getters: {

    },
    mutations: {
        [SYSTEM_MGS](state, data) {
            // 处理数据
            if (data) {
                state.systemMsgData = data;
            }
        },
        [CLICK_NEWS](state, data) {
            // 处理数据
            if (data) {
                state.systemMsgData = data;
            }
        },
    },
    actions: {
        // { commit }, data
        // [SYSTEM_MGS]({ commit }, data) {
        //     commit(SYSTEM_MGS, data.data);
        //     //arguments[1]
        //  },
         [SYSTEM_MGS]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
             utils.request('getmsg', params).then(response => {
                 let { data } = response;
                 if (data.code == 200) {
                    // console.log(data)
                     commit(SYSTEM_MGS, data.data);
                     resolve(data);
                     
                 } else {
                     project(response);
                 }
            });  
            })
         },
         //点击消息
         [CLICK_NEWS]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
                utils.request('clickmsg', params).then(response => {
                    let { data } = response;
                    if (data.code == 200) {
                        // console.log(data)
                        commit(CLICK_NEWS, data.data);
                        resolve(data);
                        
                    } else {
                        project(response);
                    }
                });  
            })
        },
    }
}