// 前缀必须是文件名
import utils from '../../../utils/common';
export const NEWS_DATA = 'NEWS_DATA'
export const CLICK_NEWS = 'CLICK_NEWS'
export default {
    state: {
        systemMsgData: {},
        systemMsgDataNews: {}
    },
    getters: {

    },
    mutations: {
        [NEWS_DATA](state, data) {
            // 处理数据
            if (data) {
                state.systemMsgData = data;
                // console.log(state.systemMsgData)
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
        [NEWS_DATA]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
                utils.request('getmsg', params).then(response => {
                    let { data } = response;
                    if (data.code == 200) {
                        commit(NEWS_DATA, data.data);
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