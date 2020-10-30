// 前缀必须是文件名
import utils from '../../utils/common.js';
export const USER_DATA = 'USER_DATA';
export const SAVE_DATA = 'SAVE_DATA';
export const MODIFY_PLATFORM_MONEY = 'MODIFY_PLATFORM_MONEY'; //修改平台币
export const MODIFY_GUESS_MONEY = 'MODIFY_GUESS_MONEY'; //修改竞猜币
export default {
    state: {
        userData: {}, //储存相关数据
    },
    getters: {

    },
    mutations: {
        [SAVE_DATA](state, data) {
            if (data) {
                state.userData = data;
                // console.log(state.userData, '我存储了数据')
            }
        },
        //修改平台币
        [MODIFY_PLATFORM_MONEY](state, data) {
            if (data || data == 0) {
                state.userData.platform_money = data;
                // console.log(state.userData.platform_money, '修改了平台币')
            }
        },
        //修改竞猜币
        [MODIFY_GUESS_MONEY](state, data) {
            if (data || data == 0) {
                state.userData.money = data;
                // console.log(state.userData.money, '修改了竞猜币')

            }
        }
    },
    // 异步操作
    actions: {
        [USER_DATA]() {
            return new Promise((resolve) => {
                utils.request('userinfo', arguments[1]).then(response => {
                    resolve(response.data);
                });
            })
        }
    }
}