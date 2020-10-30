<template>
    <div class="page-active">
        <div class="border">
            <h2 class="border-h2">优惠活动</h2>
            <div class="border-center" align="center">
                <ul class="ul-1">
                    <!-- {{systemMsgDataclick.buttons}} -->
                    <!-- <img :src="(item.logo)" alt="" class="itemImg"> -->
                    <li v-for="item in systemMsgData.activityList" :key="item.activityId" class="li-position">
                        <img :src="(item.logo)" alt="" class="itemImg">
                        <!-- <span class="table-cell">
                            <img :src="(item.logo)" alt="" class="itemImg">
                        </span> -->
                        <!-- :style="{'background': 'url('+item.logo+') no-repeat 100%'}" -->
                        <div class="center-top"  @click="getActivity(item)">
                            <div class="top-div1">
                                <p>{{item.activityName}}</p>
                                <p>2020-06-15</p>
                            </div>
                            <div :class="positioning" v-if="show&&item.activityId===showId">
                                <div class="one">
                                    <p>活动内容：</p>
                                    <table id="table" v-if="systemMsgDataclick.assignId != 1 || systemMsgDataclick.assignId !=2" >
                                        <tr v-for="(data,index) in systemMsgDataclick.content" :key="index">
                                            <td>{{data.sendGold}}</td>
                                            <td>{{data.target}}</td>
                                        </tr>
                                    </table>
                                    <p v-if="systemMsgDataclick.assignId == 1 || systemMsgDataclick.assignId ==2" style="position: relative;left: -34px;">{{systemMsgDataclick.content}}</p>
                                    <div style="clear: both;"></div>
                                    <p>活动详情：</p>
                                    <div class="systemMsgDataclick" >
                                        <p class="p-both">{{systemMsgDataclick.details}}</p>
                                    </div>
                                    <div class="btn">立即申请</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                positioning:"position-absolute",
                show:false,
                showId:true,
                username:{},
                userstr:{}
            }
        },
        computed: {
            systemMsgData(){
                // 处理数据
                return this.$store.state.active.systemMsgData;
            },
            systemMsgDataclick(){
                // 点击请求
                return this.$store.state.active.systemMsgDataclick;
            },
        },
        created(){
            console.log(this.systemMsgDataclick.details);
            this.systemMsgDataclick.details.split("↵")[0]
            console.log(this.systemMsgDataclick.details);
            var strs = "A↵B↵C↵D".split("↵")
            console.log(strs)
            this.userstr = strs
        },
        methods: {
            getActivity(item) {
                this.showId=item.activityId;
                this.show = !this.show
                this.$store.dispatch("ACTIVE_USERCLICK",{
                    activityId: item.activityId,
                    assignId: item.assignId
                });
                // console.log(12345);
                for(let i =0;i<3;i++){
                    setTimeout(()=>console.log(i),1)
                }
                
            },
            cl(item){
                console.log(12345);
                this.showId=item.activityId
            },
        },
        mounted() {
            this.$store.dispatch("ACTIVE_USER",{});
        },
    }
</script>
<style lang="less" scoped>
@import url('../../assets/modifyStyle.less');
    .page-active {
        .border {
            width: 932px;
            height: 1000px;
            border: 1px #262933 solid;
            background-color: #0b0e1a;
            .border-h2 {
                color: #fff;
                margin: 29px 0 0 37px;
                font-size: 28px;
            }
            .border-center {
                width: 840px;
                height: 200px;
                margin: 35px 0 0 67px;
                position: relative;
                margin: 35px 0 0 0px;
                left: -170px;
                .ul-1 {
                    margin: 24px 0 0 0;
                    .li-position {
                        position: relative;

                        .position-absolute {
                            width: 400px;
                            height: 333px;
                            background-color: #141926;
                            border-radius: 2px;
                            position: absolute;
                            top: 200px;
                            z-index: 999;
                            left: 0;

                            .one {
                                margin: 11px 0 0 0px;
                                #table {
                                    float: left;
                                    margin: 0 0 0 6px;
                                }
                                #table tr td {
                                    padding: 0 10px;
                                    font-size: 14px;
                                    color: #7086ae;
                                    cursor: pointer;
                                }

                                .p-both {
                                    color: #7086ae;
                                }

                                .btn {
                                    width: 100px;
                                    height: 36px;
                                    background-color: #263046;
                                    color: #bacef1;
                                    font-size: 12px;
                                    cursor: pointer;
                                    line-height: 36px;
                                    border-radius: 3px;
                                    margin-top: 19px;
                                    border: 1px #384460 solid;
                                }
                            }
                            .one p {
                                text-align: left;
                                margin: 0 0 0 -10px;
                                font-size: 12px;
                                width: 354px;
                                padding: 6px 0;
                                color: #6b81a7;
                            }
                        }
                    }
                }
                .ul-1 li {
                    display: inline-block;
                    margin: 0 9px;
                    width: 400px;
                    // overflow:hidden;
                    height: 200px;
                    
                    .table-cell{
                        display: table-cell;
                        font-size: 0;
                        width: 150px;
                        height: 150px;
                        text-align: center;
                        vertical-align: middle;
                    }

                    .itemImg{
                        height: 100%;
                        width: 100%;
                        // max-width: 100%;
                        // max-height: 100%;
                        // width: 100%;
                        position: absolute;
                    }
                }
                .center-top {
                    display: inline-block;
                    max-width: 400px;
                    max-height: 200px;
                    position: absolute;

                    .top-div1 {
                        background-color: #141926;
                        height: 59px;
                        margin: 141px 0 0 0;
                        float: left;
                        width: 400px;
                        text-align: left;
                        line-height: 20px;
                    }
                }
                .top-div1 p:nth-last-of-type(2) {
                    color: #bacef1;
                    font-size: 16px;
                    margin: 11px 0 0 17px;
                }

                .top-div1 p:nth-last-of-type(1) {
                    color: #506180;
                    font-size: 14px;
                    margin: 0px 0 0 17px;
                }
                
                .ul-2 {
                    float: left;
                    margin: 24px 0 0 12px;
                }
            }
        }
    }
</style>
