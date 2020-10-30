// 前缀必须是文件名
import utils from './../../utils/common.js';
export const LOGIN = 'LOGIN'
export default {
    state: {
       loginDatqa:{},
       count:1
    },
    getters: {

    },
    mutations: {
        [LOGIN](state, data) {
            if (data) {
                     // 登陆
               /* utils.request("login", data).then(response => {
                    console.log(response.data);
                    state.loginDatqa = response.data;
                    sessionStorage.setItem('data',response.data);
                 }) */
            }
        },
    },
    actions: {
        [LOGIN]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request("login", data).then(response => {
                    if(response.data.code == 200){
                        sessionStorage.setItem('data',JSON.stringify(response.data));
						sessionStorage.setItem('session',response.data.data.sessionId);
                    }
                   
                    resolve(response.data);
                 })
                // request
                commit(LOGIN, data);
            })
        }
    }
}