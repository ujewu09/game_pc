// 前缀必须是文件名
import utils from '../../../utils/common.js';
export const MODIFY_INFO = 'MODIFY_INFO'
export const SAVE_INFO = 'SAVE_INFO'
export default {
    state: {
        modifyInfo: utils.gameUserInfo().data, //保存用户修改后的信息
    },
    getters: {

    },
    mutations: {
        [SAVE_INFO](state, data) {
            if (data) {
                state.modifyInfo = data;
                // console.log(state.modifyInfo)
            }
        },
        [MODIFY_INFO](state, data) {
            if (data) {
                // console.log("触发：MODIFY_INFO");
                state.modifyInfo = data;
            }
        },
    },
    actions: {
        [MODIFY_INFO]({ commit }, data) {
            return new Promise((resolve) => {
                utils.request('update_personal_info', data).then(response => {
                    resolve(response.data);
                });
                commit(MODIFY_INFO, data)
            })
        }
    }
}