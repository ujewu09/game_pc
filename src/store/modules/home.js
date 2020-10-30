// 前缀必须是文件名
import utils from '../../utils/common.js';
export const HOME_HORSE = 'HOME_HORSE';
export const HOME_STATUS = 'HOME_STATUS';
export const HOME_TYPE = 'HOME_TYPE';
export const HOME_GAME_TYPE_LIST = 'HOME_GAME_TYPE_LIST';
export default {
    state: {
        homeHorse: [],
        gameTypeList:[],
        homeGameStatus: 1,
        homeGameType: -1,
    },
    getters: {

    },
    mutations: {
        [HOME_HORSE](state, data) {
            if (data) {
                state.homeHorse = data;
            }
        },
        [HOME_GAME_TYPE_LIST](state, data) {
            if (data) {
                state.gameTypeList = data;
            }
        },
        [HOME_STATUS](state, num) {
            if (num) {
                state.homeGameStatus = num;
            }
        },
        [HOME_TYPE](state, num) {
            if (num) {
                state.homeGameType = num;
            }
        },
    },
    actions: {
        [HOME_HORSE]({ commit }) {

            let userInfo = utils.gameUserInfo();
            let { code, data } = userInfo;
            let loginGameType = [];
            let gameTypeList = [];

            if (JSON.stringify(userInfo) != '{}') {
                // 登录的情况下获取游戏类型
                if (code == 200 && data && data.gameList) {
                    var { gameList } =  data;
                    loginGameType = gameList;
                }
            }

            return new Promise(() => {
                utils.request('channel_config', {}, 'workSrv').then(response => {
                    let result = response.data;
                    let { data, code } = result;
                    if (code == 200 ) {
                        commit(HOME_HORSE, data.banner_list);

                        // 拼接游戏类型列表
                        gameTypeList = [{
                            id: -1,
                            name: "全部",
                            game_logo: require('./../../assets/home/logo/homelogo.png')
                        }].concat(loginGameType.length > 0 ? loginGameType : data.gameList); // data.gameList 是未登录下的游戏类型

                        setTimeout(() => {
                            commit(HOME_GAME_TYPE_LIST, gameTypeList);
                        }, 2000)
                    }
                });
            })
        }
    }
}