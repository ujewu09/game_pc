// 前缀必须是文件名
import utils from '../../utils/common.js';
export const RETRIEVEPASSWORD = 'RETRIEVEPASSWORD'
export const SEND_MSG_PWD = 'SEND_MSG_PWD'
export default {
    //cunfangzhuangtai
    state: {
        registerData: {},
        code: {},
    },
    //jisuanshuxing
    getters: {

    },
    //tongbucaozuo
    mutations: {
        // [RETRIEVEPASSWORD](state, data) {
        //     if (data) {
        //         // 重置密码
        //         /*utils.request("register", data).then(response => {
        //             console.log(response);
        //             state.registerData;
        //             sessionStorage.setItem('data',response.data);
        //             if (data.callback) {
        //                 data.callback(data);
        //             } 
        //          })*/
        //     }
        // },
    },
    //异步操作
    actions: {
        [RETRIEVEPASSWORD]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request("reset_pass", data).then(response => {
                        resolve(response.data);
                    })
                    // request
                commit(RETRIEVEPASSWORD, data);
            });
        },
        [SEND_MSG_PWD]({ commit }, data) {
            console.log(commit);
            //验证码
            return new Promise((resolve) => {
                utils.getMessage(data).then(response => {
                    console.log(response.data)
                    resolve(response.data);
                });
                //
            })
        }
    },
    // mudules:{

    // }
}