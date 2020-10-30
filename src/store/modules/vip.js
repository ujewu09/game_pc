import utils from '../../utils/common';
export const VIP_MGS = 'VIP_MGS'
export const VIP_TQ = 'VIP_TQ'
export const VIP_TQLQ = 'VIP_TQLQ'
export default {
    state: {
        exclusive: {}, //vip专属优惠
        deposit: {}, //vip月存优惠
        experience: {}, //vip体验金
        relief: {}, //vip救济金
        keep_level: {}, //vip升级保级
        vipData:{},
        vipDataTQ:{}, //获取vip特权信息
        vipDataTQLQ:{} //领股vip特权
    },
    getters: {

    },
    mutations: {
        [VIP_MGS](state, data) {
            // 处理数据
            if (data) {
                // state.vipData = data
                // console.log(state.vipData = data)
                state.exclusive = data.exclusive;
                state.deposit = data.deposit;
                state.experience = data.experience;
                state.relief = data.relief;
                state.keep_level = data.keep_level;
            }
        },
        [VIP_TQ](state, data) {
            // 处理数据
            if (data) {
                //console.log(state.vipDataTQ = data)
                state.vipDataTQ = data
            }
        },
        [VIP_TQLQ](state, data) {
            // 处理数据
            if (data) {
                //console.log(state.vipDataTQLQ = data)
                state.vipDataTQLQ = data
            }
        },
    },
    actions: {
        // { commit }, data
        // [SYSTEM_MGS]({ commit }, data) {
        //     commit(SYSTEM_MGS, data.data);
        //     //arguments[1]
        //  },
        [VIP_MGS]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
                utils.request('get_vip_conf', params).then(response => {
                    let { data } = response;
                    if (data.code == 200) {
                        // console.log(data)
                        commit(VIP_MGS, data.data);
                        resolve(data);
                    } else {
                        project(response);
                    }
                });
            })
        },
        [VIP_TQ]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
                utils.request('get_vip_privilege', params).then(response => {
                    let { data } = response;
                    if (data.code == 200) {
                        // console.log(data)
                        commit(VIP_TQ, data.data);
                        resolve(data);
                    } else {
                        project(response);
                    }
                });
            })
        },
        [VIP_TQLQ]({ commit }, params) {
            // 取数据
            return new Promise((resolve, project) => {
                utils.request('take_vip_privilege', params).then(response => {
                    let { data } = response;
                    if (data.code == 200) {
                        // console.log(data)
                        commit(VIP_TQLQ, data.data);
                        resolve(data);
                    } else {
                        project(response);
                    }
                });
            })
        },
    }
}