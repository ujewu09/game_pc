<template>
    <div class="component-match-info">
        <div class="game">
            <div class="top">
                <div class="left">
                    <div class="container-image">
                        <el-image class="image" :src="gameInfo.game_logo_url">
                            <div slot="placeholder" class="image-placeholder">
                                <i class="el-icon-loading"></i>
                            </div>
                            <div slot="error" class="image-error">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="text">
                        {{gameInfo.game_name}}
                    </div>
                </div>
                <div class="middle">
                    <el-button>奖池盘</el-button>
                </div>
                <div class="right">
                    <slot name="close"></slot>
                </div>
            </div>
            <div class="game-data">
                <div class="left">
                    <div class="game-vs">
                        <div class="logo">
                            <el-image class="image" :src="gameInfo.top_option.bet_nums[0].team_logo_url">
                                <div slot="placeholder" class="image-placeholder">
                                    <i class="el-icon-loading"></i>
                                </div>
                                <div slot="error" class="image-error">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </div>
                        <div class="name">
                            {{gameInfo.top_option.bet_nums[0].team_name}}
                            <!-- 88rising -->
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="top-vs">
                        BO3
                    </div>
                    <div class="middle-vs">
                        <slot name="data"></slot>
                    </div>
                    <div class="bottom-vs">
                        <slot name="live"></slot>
                    </div>
                </div>
                <div class="right">
                    <div class="game-vs">
                        <div class="logo">
                            <el-image class="image" :src="gameInfo.top_option.bet_nums[1].team_logo_url">
                                <div slot="placeholder" class="image-placeholder">
                                    <i class="el-icon-loading"></i>
                                </div>
                                <div slot="error" class="image-error">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </div>
                        <div class="name">
                            {{gameInfo.top_option.bet_nums[1].team_name}}
                            <!-- RiCH CHIGGA -->
                        </div>
                    </div>
                    <div class="right-top">
                        <div class="date">{{utils.timestampToTime(gameInfo.match_start_time * 1000)}}</div>
                        <div class="enter">
                            {{
                                gameInfo.game_status == '0' && '未开始' ||
                                gameInfo.game_status == '1' && '进行中' ||
                                gameInfo.game_status == '2' && '已结束' ||
                                gameInfo.game_status == '3' && '延期' ||
                                gameInfo.game_status == '4' && '取消'
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        gameInfo: {
            type: Object,
            required: true
        }
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
    @import url('./../assets/style.less');
    .component-match-info{
        .game {
            .top {
                display: flex;
                text-align: center;
                height: 50px;
                background-color: #141926;
                padding: 0 20px;
                .left, .right {
                    width: 300px;
                }
                // .game-data:v-deep {
                .left {
                    display: flex;
                    align-items: center;
                    .container-image {
                        width: 30px;
                        margin: 0 5px 0 0;
                        .image {
                            vertical-align: middle;
                        }
                    }
                    .text {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .middle {
                    flex: 1;
                    button {
                        color: #FFFFFF;
                        font-weight: bold;
                        border-width: 0;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        background-image: linear-gradient(rgba(11, 165, 146, 1), rgba(11, 145, 156, 1));
                        // &:active {
                        //     background-image: linear-gradient(rgba(11, 165, 146, 0.8), rgba(11, 145, 156, 0.8));
                        // }
                    }
                }
                .right {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    cursor: pointer;
                    img {
                        width: 10px;
                        vertical-align: middle;
                    }
                }
                // }
                
            }
            .game-data {
                display: flex;
                padding: 0 0 30px 0;
                .top-vs {
                    padding-top: 18px;
                }
                .middle {
                    width: 120px;
                    text-align: center;
                    color: #76839F;
                    .middle-vs {
                        position: relative;
                        width: 120px;
                        div:nth-child(2) {
                            padding: 0 15px;
                        }
                    }
                    .bottom-vs {
                        margin-top: 25px;
                    }
                }
                .left, .right {
                    flex: 1;
                    display: flex;
                    text-align: center;
                    .game-vs {
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        width: 200px;
                        .name {
                            font-weight: bold;
                            font-size: 20px;
                            color: #FFFFFF;
                        }
                    }
                    &::v-deep {
                        .image {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0 auto;
                            width: 80px;
                            height: 80px;
                            .el-image__inner {
                                width: auto;
                                height: auto;
                                max-width: 100%;
                                max-height: 100%;
                            }
                        }
                    }
                }
                .left {
                    justify-content: flex-end;
                    .game-vs {
                        padding: 60px 40px 0 0;
                        // .text {}
                    }
                }
                .right {
                    justify-content: flex-start;
                    .game-vs {
                        padding: 60px 0 0 40px;
                        // .text {}
                    }
                }
            }
            .right-top {
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                text-align: right;
                flex: 1;
                color: @color-tip;
                .date {
                    font-size: 12px;
                    padding: 20px 20px 0 0;
                }
                .enter {
                    font-size: 12px;
                    border-radius: 2px;
                    text-align: center;
                    margin: 10px 20px 0 0;
                    line-height: 20px;
                    width: 60px;
                    color: @color-select;
                    background-color: #1C2236;
                }
            }
        }
    }
</style>
