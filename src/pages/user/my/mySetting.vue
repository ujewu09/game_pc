<template>
    <div class="user-my-mySetting">
        <div class="modify_pwd">
            <div class="pwdBox" @click="showPwd" ref="pwdBox">
                <img src="../../../assets/my/pwd.png"/>
                <span>修改登录密码</span>
            </div>
           <el-popover
                placement="bottom"
                trigger="click"
                visible-arrow="true"
                v-model="visible_pwd">
                <div class="pwd_modifyBox">
                    <form>
                        <h6>*建议您不定期更换登录密码，且不要以生日，电话号码作为登录密码，防止盗号</h6>
                        <div class="phoneNum"><span class="text">手机号</span><input v-model="pwdBox.phone.value" @blur="phoneReg(pwdBox)"  class="input" maxlength="11" placeholder="请输入手机号码" /></div>
                        <div class="phoneCode"><span class="text">验证码</span><input v-model="pwdBox.code.value" class="input" placeholder="请输入验证码" /><button  ref="yz" @click="getCode($event)" :class="{'style-patter':this.pwdBox.phone.pattern}">获取验证码</button></div>
                        <div class="newPwd"><span class="text">新密码</span><el-input v-model="pwdBox.pwd.value" @blur="pwdReg(pwdBox)"  maxlength="11" placeholder="请输入6-11位的英文或数字" show-password></el-input></div>
                        <div class="newPwds"><span class="text">确认密码</span><el-input v-model="pwdBox.RepeatPwd.value" @blur="repReg"  maxlength="11" placeholder="请输入6-11位的英文或数字"  show-password></el-input></div>
                        <button class="save" @click="updatePwd">保存</button>
                    </form>
                </div>
            </el-popover>
        </div>
        <div class="modify_phone">
             <div class="phoneBox"  @click="showPhone" ref="phoneBox">
                <img src="../../../assets/my/phone.png"/>
                <p>{{userPhone}}</p>
                <span>修改手机号码</span>
            </div>
            <el-popover
                placement="bottom"
                trigger="click"
                visible-arrow="true"
                v-model="visible_phone">
                <div class="phone_modifyBox">
                    <form>
                        <h6>*如需修改已绑定的手机号码，需校验旧手机号，如旧手机无法接收到短信验证码，请您联系在线客服协助</h6>
                        <div class="newPwd"><span class="text">密码</span><el-input v-model="phoneBox.pwd.value" @blur="pwdReg(phoneBox)"  maxlength="11" placeholder="请输入6-11位的英文或数字" show-password></el-input></div>
                        <div class="phoneNum"><span class="text">手机号</span><input v-model="phoneBox.phone.value"  @blur="phoneReg(phoneBox)"  class="input" maxlength="11" placeholder="请输入手机号码" /></div>
                        <div class="phoneCode"><span class="text">验证码</span><input v-model="phoneBox.code.value"   class="input"  placeholder="请输入验证码" /><button ref="yzm" @click="getCode($event)" :class="{'style-patter':this.phoneBox.phone.pattern}">获取验证码</button></div>
                        <button class="save" @click="updatePhone">保存</button>
                    </form>
                </div>
            </el-popover>
        </div>
    </div>
</template>
<script>
import utils from '../../../utils/common'
export default {
    data(){
        return{
            visible_pwd:true,
            visible_phone:false,
            pwdBox:{
                phone:{
                    value:'',
                    pattern:false,
                },
                code:{
                    value:'',
                    pattern:false,
                },
                pwd:{
                    value:'',
                    pattern:false,
                },
                RepeatPwd:{
                    value:'',
                    pattern:false
                },
            },
            phoneBox:{
                pwd:{
                    value:'',
                    pattern:false,
                },
                phone:{
                    value:'',
                    pattern:false
                },
                code:{
                    value:'',
                    pattern:false,
                },
            },
            userPhone:'',
        }
    },
    created(){
        this.userPhone = utils.gameUserInfo().data.phone;
        this.userPhone = this.userPhone.replace( this.userPhone.substring(3,7), "****")
    },
    methods:{
        showPwd(){
            this.visible_pwd = true;
            this.visible_phone = false;
            if( this.visible_phone == false){
                 this.$refs.phoneBox.style.border="1px solid";
            }
           this.$refs.pwdBox.style.border="1px solid #28ffd4";
        },
        showPhone(){
            this.visible_phone = true;
            this.visible_pwd = false;
            if( this.visible_pwd == false){
                 this.$refs.pwdBox.style.border="1px solid";
            }
           this.$refs.phoneBox.style.border="1px solid #28ffd4";
        },
        send_msg(methods){
            this.$store.dispatch('SECOND_CODE',
                {
                    type:'login',
                    mobile:methods.phone.value
                }).then((Response)=>{
                if(Response.code == 200){
                    this.$message.success('短信发送成功，请注意查收！')
                }else{
                    this.$message({
                        type:'error',
                        message:"发送失败"
                    })
                }
            })
        },
        getCode(e){
            e.preventDefault()
            if(this.phoneBox.phone.pattern || this.pwdBox.phone.pattern){
                let second = 60;
                let timer =  setInterval (()=>{
                    second --;
                    e.target.disabled = true;
                    e.target.innerHTML = second + 's重新发送';
                    if(second == 0 ){
                        e.target.innerHTML = '获取验证码';
                        e.target.disabled = false;
                        clearInterval(timer);
                    }
                },1000)  

                if(this.phoneBox.phone.pattern){
                    this.send_msg(this.phoneBox);
                }else if(this.pwdBox.phone.pattern){
                    this.send_msg(this.pwdBox);
                }
                 
            }else{
                e.target.disabled = false;
            }
        } ,
        phoneReg(target){
                target.phone.pattern = false;
            if(  target.phone.value && (/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test( target.phone.value))){
                 target.phone.pattern = true;
            }else if( target.phone.value && (/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test( target.phone.value) == false)){
                this.$message({
                    type:'warning',
                    message:'手机号码不正确'
                })
            }
        },
        repReg(){
            this.pwdBox.RepeatPwd.pattern = false;
            if( this.pwdBox.RepeatPwd.value.length > 0 && (this.pwdBox.RepeatPwd.value == this.pwdBox.pwd.value)){
                this.pwdBox.RepeatPwd.pattern = true;
            }else if(this.pwdBox.RepeatPwd.value.length > 0 && (this.pwdBox.RepeatPwd.value != this.pwdBox.pwd.value)) {
                this.pwdBox.RepeatPwd.pattern = false;
                this.$message({
                    type:'warning',
                    message:'两次输入的密码不一致,请重新输入！'
                })
            }
        },
        //修改密码
        updatePwd(e){
            e.preventDefault();
            if(this.pwdBox.phone.pattern && this.pwdBox.RepeatPwd.pattern){
                 this.$store.dispatch('MODIFY_PWD',{
                     securityCode:this.pwdBox.code.value,
                     new_password:this.pwdBox.RepeatPwd.value,
                 }).then((Response)=>{
                    if(Response.code == 200){
                        this.$message.success('密码修改成功,即将回到登录界面!')
                        setTimeout(()=>{
                          sessionStorage.clear();
                         this.$router.push('/login');
                        },1000)
                     }else{
                         this.$message({
                             type:'error',
                             message:"密码修改失败！"
                         })
                     }
                 })
            } 
        },
        pwdReg(target){
             target.pwd.pattern = false;
            if( target.pwd.value.length > 0 && (/^(?=.{6,11})(((?=.*[A-Z])(?=.*[a-z]))|bai((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/.test(target.pwd.value))){
               target.pwd.pattern = true;
            }else if(target.pwd.value.length  > 0 && (/^(?=.{6,11})(((?=.*[A-Z])(?=.*[a-z]))|bai((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/.test(target.pwd.value) ==false)){
                this.$message({
                    type:'warning',
                    message:'密码格式错误'
                })
            }
        },
        //修改手机号
        updatePhone(e){
            e.preventDefault();
            if(this.phoneBox.pwd.pattern && this.phoneBox.phone.pattern){
               this.$store.dispatch('MODIFY_PHONE',{
                   phone:this.phoneBox.phone.value,
                   ve_code:this.phoneBox.code.value,
               }).then((Response)=>{
                    if(Response.code == 200){
                        this.phoneBox.phone.value = '',
                        this.phoneBox.pwd.value = ''
                        this.phoneBox.code.value = '',
                        this.$message.success('手机号码修改成功,即将回到登录界面!')
                        setTimeout(()=>{
                          sessionStorage.clear();
                         this.$router.push('/login');
                        },1000)

                    }
               })
           }
        }
    }
}
</script>
<style  lang='less' scoped>
  @import url('../../../assets/style.less');
.user-my-mySetting{
    padding:40px 0 0 60px;
    display: flex;
     /deep/.el-popover.el-popper{
        margin:30px 0;
        height: 400px;
        background:#141926;
        border:1px solid @color-select;
        width:750px !important;
     }
     //共同样式部分
     .pwd_modifyBox,.phone_modifyBox{
        form{
            flex-direction: column;
            display: flex;
            align-items: center;
            input::-webkit-input-placeholder { /* WebKit browsers */
                color:#c0c4cc;
                font-size: 16px;
            }
            // input.pattern-style::-webkit-input-placeholder {
            //     color: red;
            // }
            
           h6{
            text-align: center;
            font-size: 14px;
            color:@color-tip;
           }
           div{
               display: flex;
               align-items: center;
               width:380px;
               margin:15px 0 10px 0;
               .text{
                   font-size: 18px;
                   display: inline-block;
                   width:75px;
                   text-align: right;
                   margin:0 15px 0 0;
                   color:@color-used;
               }
               .input{
                   padding-left: 15px;
                   width:230px;
                   outline: none;
                   height: 36px;
                   color:@color-tip;
                   font-size: 16px;
                   background:none;
                   border:1px solid @color-two-level;
               }
           }
           .phoneCode{
               input{
                   width:125px;
                   margin-right: 10px;
               }
               button{
                   outline: none;
                   font-size: 14px;
                   color:@color-used;
                   width:90px;
                   height: 38px;
               }
               .style-patter{
                   background:linear-gradient(#07e2c6, #069ee7);
                   color:#fff;
               }
           }
           .newPwd,.newPwds{
               height: 40px;
               /deep/.el-input__inner{
                    background:none;
                    border:none;
                    font-size: 16px;
                    color:@color-tip;
               }
               /deep/.el-input.el-input--suffix{
                   width:245px;
                   border:1px solid @color-two-level;
               }
           }
            .save{
               width: 118px;
                height: 34px;
                outline: none;
                border: none;
                margin: 30px 0;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background: linear-gradient(#07e2c6, #069ee7);
           }
        }
     }  
     //密码修改框
    .modify_pwd{ 
        margin:0 30px 0 0;
        .pwdBox{
            display: flex;
            flex-direction: column;
            width: 116px;
            height: 78px;
            background:#141926;
            padding:10px 20px 20px 20px;
            border:1px solid @color-select;
            img{
                width:30px;
                height:30px;
                align-self: center;
            }
            span{
                font-size: 16px;
                color:#fff;
                margin:30px 0 0 0;
                text-align: center;
            }
        }
       .pwd_modifyBox{
           padding:20px 80px 0 80px; 
           .phoneNum{
               margin-top:30px;
           }
       }
       .pwd_modifyBox:before{
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 8%;
            bottom: 100%;
            border: solid transparent ;
            border-width: 13px;
            border-bottom-color: @color-select;
        }
    }
    //手机号码修改框
    .modify_phone{
        .phoneBox{
            display: flex;
            flex-direction: column;
            width: 116px;
            height: 78px;
            background:#141926;
            padding:10px 20px 20px 20px;
            border:1px solid #141926;
            img{
                width:30px;
                height:30px;
                align-self: center;
            }
            p{
                font-size: 14px;
                color:@color-tip;
                text-align: center;
                margin:8px 0;
            }
            span{
                font-size: 16px;
                color:#fff;
                text-align: center;
            }
        }
         /deep/.el-popover.el-popper{
            position: relative;
            left:-188px;
        }
        .phone_modifyBox{
            padding:30px 50px;
            div{
                margin:15px 0 15px 0;
            }
            .newPwd{
                margin-top: 30px;
            }
            .save{
                margin:40px 0 0 0;
            }
        }
        .phone_modifyBox:before{
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 33%;
            bottom: 100%;
            border: solid transparent ;
            border-width: 13px;
            border-bottom-color: @color-select;
        }
    }
}
</style>