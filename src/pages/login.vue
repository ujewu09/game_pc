<template>
    <div class="page-denglu">
        <div class="bj">
            <div class="center">
                <div class="div-float-left">
                    <img src="../assets/images/hailiangdianjing.png" alt="" class="div-float-left-img">
                    <p class="div-float-left-p">精彩赛事为您挑选</p>
                </div>
                <form action="">
                    <div class="div-float-right">
                        <p class="div-float-right-p1">登录</p>
                        <ul class="div-float-right-ul2">
                            <li>
                                <div class="div-float-right-ul2-div-1">
                                    <label class="div-float-right-ul2-div-1-label">手机号</label>
                                    <input type="text" placeholder="请输入手机号" id="shoujihao" v-model="phoneNum1" value="">
                                </div>
                            </li>
                            <li>
                                <div class="div-float-right-ul2-div-1">
                                    <label class="div-float-right-ul2-div-1-label-2" id="mm">请输入密码</label>
                                    <input type="password" placeholder="请输入密码" name="pattern" id="pwd" v-model="password1">
                                </div>
                            </li>
                            <li @click="zhaohuimima">忘记密码?</li>
                            <li>
                                <div class="div-float-right-ul2-bj" @click="user()">
                                    立即登录
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios'
    export default {
        data() {
            return {
                phoneNum1: "",
                password1: "",
            }
        },
        methods: {
            zhaohuimima() {
                this.$router.push('../retrievePassword');
            },
            //手机号的正则验证
            user() {
                    //(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$
                    //[a-zA-Z]
                    let phoneReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    let phoneReg1 = /^(?=.{6,11})(((?=.*[A-Z])(?=.*[a-z]))|bai((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/;
                    if ((this.phoneNum1) == "") {
                        this.$message.error('手机号不能为空');
                        return false;
                    } else if (!phoneReg.test(this.phoneNum1)) {
                        this.$message.error('手机号格式错误');
                        return false;
                    } else if ((this.password1) == "") {
                        this.$message.error('密码不能为空');
                        return false;
                    } else if (!phoneReg1.test(this.password1)) {
                        this.$message.error('密码必须包含数字跟字母');
                        return false;
                    } else {
                        this.$store.dispatch("LOGIN",{
                            phone:this.phoneNum1,
                            type:"pass",
                            login_type:3,   
                            value:this.password1,
                        })
                        .then(response => {
                            if(response.code!=200){
                                return false;
                            }
                            this.$message({message: '登陆成功！',
                                type: 'success'
                            });
                            this.$router.push('home/match');
                            return true;
                        })   
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .page-denglu {
        display: flex;
        width: 1246px;
        height: 800px;
        margin: 0 auto;
        .bj {
            width: 100%;
            height: 500px;
            position: relative;

            .center {
                margin-top: 160px;
            }

            .div-float-left {
               float: left;
               margin: 151px 0 0 -86px;

                .div-float-left-p {
                    color: #6e87ae;
                    margin-top: 6px;
                }

                .div-float-left-img {
                    width: 244px;
                    height: 23px;
                }
            }

            .div-float-right {
                float: right;
                margin: 19px 117px 0 0;

                .div-float-right-p1 {
                    font-size: 30px;
                    font-weight: bold;
                    font-family: "微软雅黑";
                    color: #fff;
                    cursor: pointer;
                }

                .div-float-right-ul2 {
                    margin-top: 60px;

                    #shoujihao:focus{
                        border-bottom: 1px solid #26eac4;
                    }
                    #pwd:focus{
                        border-bottom: 1px solid #26eac4;
                    }
                    .div-float-right-ul2-div-1 {
                        border-bottom: 1px solid #677ca4;
                        height: 33px;
                        width: 408px;
                        position: relative;
                    }
                }

                .div-float-right-ul2 li {
                    list-style: none;
                    width: 408px;
                    margin-top: 30px;
                }

                .div-float-right-ul2 li input {
                    background: none;
                    padding: 10px 0px;
                    width: 408px;
                    top: -3px;
                    left: -1px;
                    position: absolute;
                    font-size: 14px;
                    /* text-indent: 20em; */
                    color: #aec5e2;
                    border: 0; // 去除未选中状态边框
                    outline: none; // 去除选中状态边框
                    /* float: right; */
                }

                ::-webkit-input-placeholder {
                    color: #aec5e2;
                }

                div-float-right-ul2 li input {
                    color: #aec5e2;
                }

                .div-float-right-ul2-div-1-label {
                    position: absolute;
                    left: 357px;
                    top: 5px;
                    color: #2b3a4a;
                    font-size: 12px;
                }

                .div-float-right-ul2-div-1-label-2 {
                    position: absolute;
                    left: 340px;
                    top: 5px;
                    color: #2b3a4a;
                    font-size: 12px;
                }

                .div-float-right-ul2 li {
                    font-size: 14px;
                    height: 61px;
                    position: relative;
                }

                .div-float-right-ul2 li:nth-last-of-type(2) {
                    font-size: 14px;
                    margin: -9px 0 0 0;
                    position: absolute;
                    right: -228px;
                    top: 424px;
                    color: #aec5e2;
                    cursor: pointer;
                    // float: right;
                }

                .div-float-right-ul2 li:nth-last-of-type(1) {
                    margin-top: 60px;
                }

                .div-float-right-ul2-bj {
                    // border-bottom: px solid #fff;
                    background: url(../assets/images/zhuceanniu.png)no-repeat;
                    width: 400px;
                    height: 54px;
                    text-align: center;
                    color: #FFFFFF;
                    font-size: 18px;
                    cursor: pointer;
                    line-height: 55px;
                    font-weight: bold;
                }
            }
        }
    }
</style>
