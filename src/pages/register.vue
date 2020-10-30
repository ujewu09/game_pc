<template>
  <div class="page-zhuche">
    <div class="bj">
      <div class="center">
        <div class="div-float-left">
          <img src="../assets/images/hailiangdianjing.png" alt class="div-float-left-img" />
          <p class="div-float-left-p">精彩赛事为您挑选</p>
        </div>
        <form id="form" method="post">
          <div class="div-float-right">
            <p class="div-float-right-p1">注册</p>
            <ul class="div-float-right-ul2">
              <li>
                <div class="div-float-right-ul2-div-1">
                  <label class="div-float-right-ul2-div-1-label" id="sj">请输入手机号</label>
                  <input type="text" placeholder="请输入手机号" id="shuru" @click="thisFocus" v-model="user" />
                  <span class="focus-span" v-show="focusSpan">手机号</span>
                </div>
              </li>
              <li>
                <div class="div-float-right-ul2-div-2">
                  <input type="text" placeholder="验证码" v-model="yanzheng" id="verification" />
                  <div class="div-yanzhengma" v-show="Yanzhengma" @click="thisYanzheng()">{{yzm}}</div>
                  <el-button class="imgbotton" v-show="Yanzheng" :disabled="disabled" @click="catchTime()">{{yzm}}</el-button>
                </div>
              </li>
              <li>
                <div class="div-float-right-ul2-div-1">
                  <label class="div-float-right-ul2-div-1-label-2">请输入密码</label>
                  <input type="password" name="password" id="pwd" placeholder="请输入密码" v-model="password1" @click="namepwd()" />
                  <span class="focus-spanpwd" id="pwdd" v-show="thispwd">密码（对不起，密码不能为空）</span>
                </div>
              </li>
              <li>
                <div class="div-float-right-ul2-div-1">
                  <label class="div-float-right-ul2-div-1-label-3">请再次输入密码</label>
                  <input type="password" name="password" id="pwd" placeholder="请再次输入密码" v-model="password2" @click="namepwd()" />
                </div>
              </li>
              <li>
                <div class="div-float-right-ul2-bj" id="tj" @click="submit()">立即注册</div>
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
        focusSpan: false,
        Yanzheng: false,
        Yanzhengma: true,
        thispwd: false,
        password1: "",
        password2: "",
        user: "",
        yanzheng: "",
        InputSector: true,
        yzm: '验证码',
        disabled: false,
      };
    },
    computed: {
      registerData() {
        console.log("this.$store.state.register.registerData", this.$store.state.register.registerData);
        return this.$store.state.register.registerData;
      }
    },
    methods: {
      thisFocus() {
        this.focusSpan = true;
      },
      thisYanzheng() {
        this.Yanzhengma = false;
        this.Yanzheng = true;
        this.focusSpan = false;
      },
      namepwd() {
        this.focusSpan = false;
      },
      submit() {
        ///^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
        let phoneReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        let phoneReg1 = /^(?=.{6,11})(((?=.*[A-Z])(?=.*[a-z]))|bai((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/;
        if (this.user == "") {
          this.$message.error("手机号不能为空！");
          return false;
        } else if (!phoneReg.test(this.user)) {
          this.$message.error("手机号格式错误！");
          return false;
        } else if (this.yanzheng == "") {
          // this.$message.error("验证码不能为空");
          return false;
        } else if (this.password1 == "") {
          this.$message.error("密码不能为空！");
          this.thispwd = true;
          return false;
        } else if (this.password2 == "") {
          this.$message.error("请再次输入密码！");
          return false;
        } else if (!phoneReg1.test(this.password1)) {
          this.$message.error("密码必须包含字母数字！");
          return false;
        } else if (this.password1 != this.password2) {
          this.$message.error("两次密码不一致！");
        } else {
          this.$store.dispatch("REGISTER", {
              Phone: this.user,
              SecurityCode: this.yanzheng,
              Password: this.password2,
              ReferralCode: "",
              RegisterChanne: 1,
            })
            .then(response => {
              if (response.code != 200) {
                return false;
              }
              console.log('ssss')
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push('/login');
            })
        }
      },
      catchTime() {
        let phoneReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (this.user == "") {
          this.$message.error("手机号不能为空");
          return false;
        } else if (!phoneReg.test(this.user)) {
          this.$message.error("手机号格式错误");
          return false;
        } else if (this.user == "") {
          return false;
        }
        this.$store.dispatch("SEND_MSG", {
            type: 'login',
            mobile: this.user
          })
          .then(response => {
            if (response.code != 200) {
              return false;
            }
            this.$message({
              message: '验证码发送成功',
              type: 'success'
            });
            let time = 60;
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
          })
      },
      // yzmBtn() {
      // 	let time = 60;
      // 	let timer = setInterval(() => {
      // 		if (time == 0) {
      // 			clearInterval(timer);
      // 			this.yzm = "获取验证码";
      // 			this.disabled = false;
      // 		} else {
      // 			this.yzm = time + 's';
      // 			time--;
      // 			this.disabled = true;
      // 		}
      // 	}, 1000)
      // }
    }
  };
</script>

<style scoped lang="less">
  .page-zhuche {
        display: flex;
        width: 1246px;
        height: 800px;
        margin: 0 auto;
    * {
      padding: 0;
      margin: 0;
    }

    .center {
      margin-top: 160px;
      height: 600px;

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
          position: relative;
          left: 744px;
          top: -272px;

        .div-float-right-p1 {
          font-size: 30px;
          font-weight: bold;
          font-family: "微软雅黑";
          color: #fff;
          cursor: pointer;
        }

        .div-float-right-ul2 {
          margin-top: 59px;

          .div-float-right-ul2-div-1 {
            border-bottom: 1px solid #aec5e2;
            height: 33px;

            .focus-spanpwd {
              color: red;
              font-size: 14px;
              position: absolute;
              top: -17px;
              left: -1px;
            }

            .div-float-right-ul2-div-1-label {
              left: 336px;
              top: 5px;
              position: relative;
              color: #2b3a4a;
              font-size: 12px;
            }
          }
        }

        .div-float-right-ul2 li {
          list-style: none;
          margin-top: 30px;
          font-size: 14px;
          height: 52px;
          width: 408px;
          position: relative;
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

        #shuru:focus {
          border-bottom: 1px solid #26eac4;
        }

        #verification:focus {
          border-bottom: 1px solid #26eac4;
          width: 303px;
        }

        #pwd:focus {
          border-bottom: 1px solid #26eac4;
        }

        #pwdd:focus {
          border-bottom: 1px solid #26eac4;
        }

        .focus-span {
          color: #25e9c1;
          font-size: 14px;
          position: absolute;
          top: -17px;
          left: -1px;
        }

        .div-float-right-ul2-div-1-label-2 {
          position: absolute;
          left: 340px;
          top: 5px;
          color: #2b3a4a;
          font-size: 12px;
        }

        .div-float-right-ul2-div-1-label-3 {
          position: absolute;
          right: 0;
          top: 5px;
          color: #2b3a4a;
          font-size: 12px;
        }

        .div-float-right-ul2-div-2 {
          border-bottom: 1px solid #aec5e2;
          height: 33px;
          width: 303px;
        }

        .div-float-right-ul2-bj {
          background: url(../assets/images/zhuceanniu.png) no-repeat;
          width: 400px;
          height: 54px;
          text-align: center;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          line-height: 55px;
          font-weight: bold;
        }

        .div-yanzhengma {
          background: url(../assets/images/yanzhengma.png) no-repeat;
          width: 97px;
          height: 31px;
          color: #667ca3;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          position: absolute;
          cursor: pointer;
          left: 314px;
          top: 3px;
        }

        .div-yanzhengma1 {
          background: url(../assets/images/yanzhengma1.png) no-repeat;
          width: 97px;
          height: 31px;
          color: #667ca3;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          position: absolute;
          cursor: pointer;
          left: 314px;
          top: 3px;
        }

        /deep/ .el-button {
          background: url(../assets/images/yanzhengma1.png) no-repeat;
          width: 97px;
          height: 31px;
          color: #667ca3;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          position: absolute;
          cursor: pointer;
          left: 314px;
          top: 3px;
          border: 0px;
          border-radius: 1px;
        }
      }
    }
  }
</style>
