// 前缀必须是文件名
import utils from '../../utils/common.js';
export const COMMON_DATA = 'COMMON_DATA';
export default {
    state: {
        commonData: {},
    },
    getters: {

    },
    mutations: {
        [COMMON_DATA](state, data) {
            if (data) {
                // 注册
                utils.request("register", {
                    phone: "13812345678",
                    SecurityCode: "8270",
                    Password: "lsrjXOipsCRBeL8o5JZsLOG4OFcjqWprg4hYzdbKCh4=",
                    ReferralCode: "",
                    RegisterChannel: 1
                }).then(response => {
                    console.log(response);
                })

                // 验证码
                utils.getMessage({
                    mobile: "13812345678",
                    type: "login",
                }).then(response => {
                    console.log(response);
                })

                state.commonData = data
            }
        },
    },
    actions: {
        [COMMON_DATA]({ commit }, data) {
            commit(COMMON_DATA, data)
        }
    }
}