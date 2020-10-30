// 前缀必须是文件名
import utils from '../../../utils/common.js';
export const MODIFY_PWD = 'MODIFY_PWD';
export const MODIFY_PHONE = 'MODIFY_PHONE';
export const SECOND_CODE = 'SECOND_CODE'
export default {
    state: {
        pwd_result: 1,
        phone_result: {},
        code: ''
    },
    getters: {

    },
    mutations: {
        //发送验证码
        [SECOND_CODE](state, data) {
            if (data) {
                console.log(data)
            }
        },
        //修改密码
        [MODIFY_PWD](state, data) {
            if (data) {
                state.pwd_result++;
                console.log(state.pwd_result)
            }
        },
        //修改手机号码
        [MODIFY_PHONE](state, data) {
            if (data) {
                console.log(state.phone_result)
            }
        },
    },
    actions: {
        [SECOND_CODE]({ commit }, data) {
            return new Promise((resolve) => {
                utils.getMessage(data).then(response => {
                    resolve(response.data);
                });
                commit(SECOND_CODE, data)
            })

        },
        [MODIFY_PWD]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('updatepass', data).then(response => {
                    resolve(response.data);
                });
                commit(MODIFY_PWD, data)
            })

        },
        [MODIFY_PHONE]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('updatephone', data).then(response => {
                    resolve(response.data);
                });
                commit(MODIFY_PHONE, data)
            })

        },


    }
}