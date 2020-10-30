<template>
	<div class="page-zhuche">
		<div class="bj">
			<div class="fixed">
				<div class="fixed-1">
					<div class="fixed-1-div"><img src="../assets/images/logo.png" alt="" class="fixed-img"></div>
					<div class="fixed-1-div">
						<p class="fixed-1-p-1">开心电竞</p>
						<p class="fixed-1-p-2">HAPPY E-SPORTE</p>
					</div>
				</div>
				<div class="fixed-2">
					<div class="fixed-2-div">
						注册
					</div>
				</div>
			</div>
			<div class="center">
				<div class="div-float-left">
					<img src="../assets/images/hailiangdianjing.png" alt="" class="div-float-left-img">
					<p class="div-float-left-p">精彩赛事为您挑选</p>
				</div>
				<form id="form" method="post">
					<div class="div-float-right">
						<p class="div-float-right-p1">注册</p>
						<ul class="div-float-right-ul2">
							<li>
								<div class="div-float-right-ul2-div-1">
									<label class="div-float-right-ul2-div-1-label" id="sj">请输入手机号</label>
									<input type="text" placeholder="请输入手机号" id="shuru" @click="thisFocus" v-model="user">
									<span class="focus-span" v-show="focusSpan">手机号</span>
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-div-2">
									<input type="text" placeholder="验证码"  v-model="yanzheng" @click="thisYanzheng">
									<div class="div-yanzhengma" v-show="Yanzhengma" >验证码</div>
									<div class="div-yanzhengma1" v-show="Yanzheng" @click="catchTime">验证码</div>
									<div v-show="timimg==false" class="catchTime  Time">{{times}}s后重发</div>
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-div-1">
									<label class="div-float-right-ul2-div-1-label-2" v-show="pwd">请输入密码</label>
									<input type="password" placeholder="密码" id="pwd" v-model="password1" pattern="11">
									<span class="focus-spanpwd" id="pwdd" v-show="thispwd">密码（对不起，密码不能为空）</span>
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-div-1">
									<label class="div-float-right-ul2-div-1-label-3">请再次输入密码</label>
									<input type="password" placeholder="确定密码" v-model="password2">
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-bj" id="tj" @click="submit">立即注册</div>
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
		data(){
			return{
				focusSpan:false,
				Yanzheng:false,
				Yanzhengma:true,
				thispwd:false,
				password1:'',
				password2:'',
				user:'',
				yanzheng:'',
				times:60,
				timimg:true,
				InputSector:true,
				pwd:true,
			}
		},
		methods:{
			thisFocus(){
				this.focusSpan = true;
			},
			thisYanzheng(){
				this.Yanzhengma = false;
				this.Yanzheng = true;
			},
			submit(){
								// /^[1][3,4,5,7,8][0-9]{9}$/
								//^((13[4-9])|(14[7-8])|(15[0-2,7-9])|(165)|(178)|(18[2-4,7-8])|(19[5,7,8]))\\d{8}|(170[3,5,6])\\d{7}$
				let phoneReg =/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				let phoneReg1 = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
				if((this.user)=="" ){
					this.$message.error('手机号不能为空');
					return false;
				}else if(!phoneReg.test(this.user)){
					this.$message.error('手机号格式错误');
					return false;
				}else if((this.password1)==""){
					this.$message.error('密码不能为空');
					this.thispwd = true
					return false;
				}else if((this.password2)==""){
					this.$message.error('请再次输入密码');
					return false;
				}
				else if(!phoneReg1.test(this.password1)){
					this.$message.error('密码格式错误');
					return false;
				}else if(this.password1!=this.password2){
					this.$message.error('两次密码不一致');
				}
				else{
					console.log('正确');
					this.$router.push('denglu')
					return true;
				}
			},
			//返回键：时间归于60s
			back(){
				this.timimg;
				this.times=60;
			},
			//获取验证码倒计时
			time(){
				let timer=setInterval(()=> {
				this.times--;
					if(this.times<0){
						clearInterval(timer)
						this.times=60;
						this.timimg=true;
					}
				},1000);
			},
			catchTime(){
				this.timimg=false;
				this.time();
			},
		},
	}
</script>

<style scoped lang="less">
	.page-zhuche {
		* {
			padding: 0;
			margin: 0;
		}

		.bj {
			// background: url(../assets/images/bj.png)no-repeat;
			width: 100%;
			height: 848px;
			position: relative;
		}

		.fixed {
			// position: fixed;
			box-shadow: 0px 0px 4px #000;
			width: 100%;
			height: 80px;
			background-color: #090c15;
		}

		.fixed-1 {
			float: left;
			margin: 18px 0 0 168px;
		}

		.fixed-1-p-1 {
			font-size: 22px;
			font-weight: bold;
			color: #fff;
			text-align: center;
			font-style: italic;
			cursor: pointer;
		}

		.fixed-1-p-2 {
			font-size: 12px;
			transform: scale(0.5);
			color: #fff;
			font-style: italic;
			color: #03bdc9;
			text-align: center;
			cursor: pointer;
		}

		.fixed-1-div {
			display: inline-block;
		}

		.fixed-img {
			width: 34px;
			height: 37px;
		}

		.fixed-2 {
			float: right;
			margin: 25px 305px 0 0;
		}

		.fixed-2-div {
			background: url(../assets/images/zhuce.png)no-repeat;
			width: 90px;
			height: 33px;
			text-align: center;
			cursor: pointer;
			line-height: 36px;
			color: #FFFFFF;
			font-size: 12px;
		}

		.center {
			margin-top: 160px;
		}

		.div-float-left {
			float: left;
			margin: 151px 0 0 366px;
		}

		.div-float-right {
			float: right;
			margin: 19px 415px 0 0
		}

		.div-float-left-p {
			color: #6e87ae;
			margin-top: 6px;
		}

		.div-float-left-img {
			width: 244px;
			height: 23px;
		}

		.div-float-right-p1 {
			font-size: 30px;
			font-weight: bold;
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
			color: #78849e;
			border: 0;
			outline: none;
			/* float: right; */
			width: 410px;
		}

		.div-float-right-ul2-div-1 {
			border-bottom: 1px solid #aec5e2;
			height: 33px;
		}
		#shuru:focus{
			border-bottom: 1px solid #26eac4;
		}
		// #pwd:focus{
		// 	border-bottom: 1px solid red;
		// }
		.focus-span{
			color: #25e9c1;
			font-size: 14px;
			position: absolute;
			top: -17px;
			left: -1px;
		}
		.focus-spanpwd{
			color: red;
			font-size: 14px;
			position: absolute;
			top: -17px;
			left: -1px;
		}
		.div-float-right-ul2-div-1-label {
			/* position: absolute; */
			left: 336px;
			top: 5px;
			position: relative;
			/* margin: 7px 0 0 76px; */
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

		.div-float-right-ul2-div-1-label-3 {
			position: absolute;
			left: 316px;
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

		.div-yanzhengma {
			background: url(../assets/images/yanzhengma.png)no-repeat;
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
			background: url(../assets/images/yanzhengma1.png)no-repeat;
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
		.catchTime{
		font-size: 12px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		width: 106px;
		color: #ea3667;
		position: absolute;
		top: -3px;
		right: 84px; // eslint-disable-line no-unused-vars 防止报错。
		}
	}
</style>
