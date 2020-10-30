<template>
     <!-- 找回密码 -->
     <div class="page-zhaohuimima">
          <div class="center">
               <div class="div-float-left">
                    <img src="../assets/images/hailiangdianjing.png" alt="" class="div-float-left-img">
                    <p class="div-float-left-p">精彩赛事为您挑选</p>
               </div>
               <div class="center-right">
                    <form id="form" method="post">
                         <div class="div-float-right">
                              <div class="border"></div>
                              <p class="div-float-right-p1">找回密码</p>
                              <ul class="div-float-right-ul2">
                                   <li>
                                        <div class="div-float-right-ul2-div-1">
                                             <input type="text" placeholder="请输入您的手机号" id="shuru" v-model="user">
                                        </div>
                                   </li>
                                   <li>
                                        <div class="div-float-right-ul2-div-2">
                                             <input type="text" placeholder="验证码" id="yanzhengma" v-model="code">
                                             <el-button @click="catchTime()" :disabled="disabled">{{yzm}}</el-button>
                                        </div>
                                   </li>
                                   <li>
                                        <div class="div-float-right-ul2-div-1">
                                             <!-- <label class="div-float-right-ul2-div-1-label-2">请输入密码</label> -->
                                             <!-- <input type="password" placeholder="密码" id="pwd" v-model="password"> -->
                                             <el-input placeholder="请输入密码" v-model="password" show-password id="pwd"></el-input>
                                        </div>
                                   </li>
                                   <li>
                                        <!-- <div class="div-float-right-ul2-bj" id="tj" @click="denglu">找回密码</div> -->
                                        <div class="div-float-right-ul2-bj" id="tj" @click="submit()">找回密码</div>
                                   </li>
                              </ul>
                         </div>
                    </form>
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          data() {
               return {
                    InputSector: true,
                    user: '',
                    password: '',
                    code: '',
                    disabled: false,
                    yzm:"验证码"
               }
          },
          methods: {
               submit() {
                    ///^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
                    let phoneReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    let phoneReg1 = /^(?=.{6,11})(((?=.*[A-Z])(?=.*[a-z]))|bai((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/;
                    if ((this.user) == "") {
                         this.$message.error('手机号不能为空！');
                         return false;
                    } else if (!phoneReg.test(this.user)) {
                         this.$message.error('手机号格式错误！');
                         return false;
                    } else if (this.code == "") {
                         this.$message.error('验证码不能为空！');
                         return false;
                    } else if ((this.password) == "") {
                         this.$message.error('密码不能为空！');
                         return false;
                    } else if (!phoneReg1.test(this.password)) {
                         this.$message.error('密码必须包含字母数字！');
                         return false;
                    } else {
                         this.$store.dispatch("RETRIEVEPASSWORD", {
                                   Phone: this.user,
                                   SecurityCode: this.code,
                                   Password: this.password,
                              })
                              .then(response => {
                                   if (response.code != 200) {
                                        return false;
                                   }
                                   this.$message({
                                        message: '密码修改成功！',
                                        type: 'success'
                                   });
                                   this.$router.push('/login');
                              });
                    }
               },
               catchTime() {
                    // console.log(this.user);
                    let phoneReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    if ((this.user) == "") {
                         this.$message.error('手机号不能为空');
                         return false;
                    } else if (!phoneReg.test(this.user)) {
                         this.$message.error('手机号格式错误');
                         return false;
                    } else {
                         console.log(this.utils.gameUserInfo().data);
                         this.$store.dispatch("SEND_MSG_PWD", {
                                   type: 'login',
                                   mobile: this.user
                              })
                              .then(response => {
                                   console.log(response)
                                   if (response.code != 200) {
                                        return false;
                                   }
                                   let time = 50;
                                   let timer = setInterval(() => {
                                        if (time == 0) {
                                        clearInterval(timer);
                                        this.yzm = "获取验证码";
                                        this.disabled = false;
                                        } else {
                                        this.yzm = time + 's';
                                        time--;
                                        this.disabled = true;
                                        }
                                   }, 1000);
                              });
                    }
               },
          //      yzmBtn() {
          //       let time = 50;
          //       let timer = setInterval(() => {
          //           if (time == 0) {
          //               clearInterval(timer);
          //               this.yzm = "获取验证码";
          //               this.disabled = false;
          //           } else {
          //               this.yzm = time + 's';
          //               time--;
          //               this.disabled = true;
          //           }
          //       }, 1000)
          //   }
          }
     }
</script>

<style lang="less" scoped>
     .page-zhaohuimima {
          // background-color: #000;
          display: flex;
          width: 1246px;
          height: 800px;
          margin: 0 auto;
          .num{
               width: 200px;
               height: 200px;
               background: red;
          }
          * {
               padding: 0;
               margin: 0;
          }

          .center {
               width: 100%;
               height: 600px;
               margin-top: 160px;

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

               .center-right {
                         float: right;
                         /* margin: 19px 0px 0 0; */
                         position: relative;
                         left: -133px;
               }

               #shuru {
                    border: 0; // 去除未选中状态边框
                    outline: none; // 去除选中状态边框
                    background: none;
                    padding: 10px 0px;
                    top: -3px;
                    left: -1px;
                    position: absolute;
                    width: 320px;
                    font-size: 14px;
                    color: #aec5e2;
                    border: 0;
                    outline: none;
                    width: 410px;
               }

               .div-float-right-p1 {
                    font-size: 28px;
                    /* font-weight: bold; */
                    font-family: "微软雅黑";
                    color: #fff;
                    cursor: pointer;
               }

               .div-float-right-ul2 {
                    margin-top: 59px;
               }

               .div-float-right-ul2 li {
                    list-style: none;
                    margin-top: 30px;
                    font-size: 14px;
                    height: 52px;
                    width: 408px;
                    position: relative;

                    .div-float-right-ul2-div-1 {
                         border-bottom: 2px solid #797979;
                         height: 33px;
                         width: 408px;

                         .div-float-right-ul2-div-1-label {
                              left: 336px;
                              top: 5px;
                              position: relative;
                              color: #797979;
                              font-size: 12px;
                         }

                         .div-float-right-ul2-div-1-label-2 {
                              position: absolute;
                              left: 198px;
                              top: 5px;
                              color: #797979;
                              font-size: 16px;
                         }
                    }

                    .div-float-right-ul2-div-2 {
                         border-bottom: 2px solid #797979;
                         height: 33px;
                         width: 245px;
                         position: relative;
                         
                         /deep/ .el-button {
                              width: 150px;
                              font-size: 20px;
                              border-radius: 8px;
                              height: 50px;
                              color: #ffffff;
                              text-align: center;
                              line-height: 51px;
                              font-size: 16px;
                              position: absolute;
                              cursor: pointer;
                              left: 261px;
                              top: -15px;
                              background-color: #1b2231;
                              border: 2px #333853 solid;
                         }
                    }

                    .div-float-right-ul2-bj {
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

                    .catchTime {
                         font-size: 12px;
                         height: 50px;
                         line-height: 50px;
                         text-align: center;
                         width: 106px;
                         color: #ea3667;
                         position: absolute;
                         top: -6px;
                         right: -27px;
                    }
               }

               .div-float-right-ul2 li input {
                    background: none;
                    padding: 10px 0px;
                    top: -3px;
                    left: -1px;
                    position: absolute;
                    width: 320px;
                    font-size: 14px;
                    /* text-indent: 20em; */
                    color: #aec5e2;
                    border: 0;
                    outline: none;
                    /* float: right; */
                    width: 410px;
               }

               /deep/.el-input__inner {
                    background: none;
                    padding: 10px 0px;
                    top: -20px;
                    left: -1px;
                    position: absolute;
                    width: 320px;
                    font-size: 14px;
                    color: #aec5e2;
                    border: 0;
                    outline: none;
                    width: 410px;
               }

               /deep/.el-input__suffix {
                    position: absolute;
                    top: -19px;
               }

               ::-webkit-input-placeholder {
                    color: #aec5e2;
               }

               .div-float-right {
                    position: relative;

                    .border {
                         background-color: #b7eb8f;
                         width: 14px;
                         height: 14px;
                         top: 16px;
                         left: -31px;
                         position: absolute;
                         border-radius: 30px;
                    }

                    //  #shuru:focus{
                    //      border-bottom: 1px solid #26eac4;
                    // }
                    .buttom {
                         border-top: #c2c2c2 solid 1px;
                         width: 100%;
                         // background-color: red;
                         height: 60px;
                    }

                    .buttom-p1 {
                         float: left;
                         margin: 10px 0 0 50px;
                         font-size: 14px;
                    }

                    .buttom-p2 {
                         margin: 10px 300px 0 0;
                         font-size: 14px;
                         float: right;
                    }
               }
          }
     }
</style>
