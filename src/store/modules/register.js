// 前缀必须是文件名
import utils from './../../utils/common.js';
export const REGISTER = 'REGISTER'
export const SEND_MSG = 'SEND_MSG'
export default {
    state: {
        registerData: {},
        code : {},

    },
    getters: {

    },
    mutations: {
        [REGISTER](state, data) {
            if (data) {
                // 注册
                /*utils.request("register", data).then(response => {
                    console.log(response);
                    state.registerData;
                    sessionStorage.setItem('data',response.data);
                    if (data.callback) {
                        data.callback(data);
                    } 
                 })*/
            }
        },
        [SEND_MSG](state, data) {
            if (data) {
                // 验证码
               /* utils.getMessage(data).then(response => {
                    state.code = response.data;
                });*/
            }
            
        },
    },
    actions: {
        [REGISTER]({ commit }, data) {
            // console.log(arguments[1]);
            return new Promise((resolve) => {
                utils.request("register", data).then(response => {
                    resolve(response.data);
                 })
                // request
                commit(REGISTER, data);
            })
        },
        [SEND_MSG]({ commit }, data) {
            //验证码
            console.log(commit);
            return new Promise((resolve) => {
                utils.getMessage(data).then(response => {
                    resolve(response.data);
                });
                commit(SEND_MSG, data)
            })
        }
    }
}