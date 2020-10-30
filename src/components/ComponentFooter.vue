<template>
    <div class="component-footer">
        <div class="bottom">
            <div class="footer">
                <div class="left">
                    <ul>
                        <li><router-link :to="{ path:'/rule' }" style="color:#a0b7d7">玩法规则</router-link></li>
                        <li><router-link :to="{ path:'/help' }" style="color:#a0b7d7">帮助</router-link></li>
                        <li>APP下载</li>
                    </ul>
                </div>
                <div class="middle">
                    <ul>
                        <li>Leagure of Lengends</li>
                        <li>Glory of Kings</li>
                        <li>Data Il</li>
                        <li>Counter Strike: Global offensive</li>
                    </ul>
                </div>
                <div class="right">
                    <el-button class="customer-service-btn">在线客服</el-button>
                </div>
            </div>
            <div class="copy">
                <p>版权所有 ©2018-2020 开心电竞[www.kxdjw.com]全球最大的电竞竞猜集团。保留所有权</p>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style lang="less">
.component-footer {
    .bottom {
        background-color: #121723;
        color: #697088;
        text-align: center;
        font-size: 12px;
        .footer {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1246px;
            padding: 35px 0 25px 0;
            margin: 0 auto;
            color: #afc8ea;
            ul {
                text-align: left;
            }
            .left { 
                width: 30%;
                margin-top: -5px;
                ul {
                    width: 50%;
                    margin: 0 auto;
                    font-size: 14px;
                    li {
                        cursor: pointer;
                        line-height: 40px;
                        list-style-type: disc;
                    }
                }
            }
            .middle {
                width: 30%;
                ul {
                    width: 60%;
                    margin: 0 auto;
                    li {
                        cursor: pointer;
                        padding: 0 0 0 25px;
                        line-height: 30px;
                        background-repeat: no-repeat;
                        background-position: left center;
                    }
                    li:nth-child(1) {
                        background-image: url('./../assets/common/footer1.png');
                    }
                    li:nth-child(2) {
                        background-image: url('./../assets/common/footer2.png');
                    }
                    li:nth-child(3) {
                        background-image: url('./../assets/common/footer3.png');
                    }
                    li:nth-child(4) {
                        background-image: url('./../assets/common/footer4.png');
                    }
                }
            }
            .right {
                width: 40%;
                .customer-service-btn {
                    height: 35px;
                    line-height: 35px;
                    padding: 0;
                    width: 136px;
                    background-color: #263046;
                    border: 1px solid #298a97;
                    color: #7086aa;
                    &:active {
                        background-color: rgba(38, 48, 70, 0.8);
                    }
                }
            }
        }
        .copy {
            background-color: #090C15;
            height: 50px;
            line-height: 50px;
        }
    }
}
</style>
