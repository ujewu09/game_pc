<template>
	<div class="page-denglu">
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
					<div class="fixed-2-div" @click="zhuche">
						注册
					</div>
				</div>
			</div>
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
								<input type="text" placeholder="请输入手机号" id="shoujihao" v-model="phoneNum1">
							</div>
						</li>
						<li>
							<div class="div-float-right-ul2-div-1">
								<label class="div-float-right-ul2-div-1-label-2">请输入密码</label>
								<input type="password" placeholder="密码" name="pattern" id="pwd" v-model="password1">
							</div>
						</li>
						<li @click="zhaohuimima">忘记密码?</li>
						<li>
							<div class="div-float-right-ul2-bj" @click="user">
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
	export default {
		data() {
			return {
				phoneNum1:"",
				password1:"",
			}
		},
		methods: {
			zhuche() {
				this.$router.push('../zhuche')
			},
			zhaohuimima() {
				this.$router.push('../zhaohuimima')
				// ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
			},
			//手机号的正则验证
			user(){
				let phoneReg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				let phoneReg1 = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
				if((this.phoneNum1)=="" ){
					this.$message.error('手机号不能为空');
					return false;
				}else if(!phoneReg.test(this.phoneNum1)){
					this.$message.error('手机号格式错误');
					return false;
				}else if((this.password1)==""){
					this.$message.error('密码不能为空');
					return false;
				}else if(!phoneReg1.test(this.password1)){
					this.$message.error('密码格式错误');
					return false;
				}else{
					console.log('正确');
					this.$router.push('home.vue')
					return true;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.page-denglu {
		* {
			padding: 0;
			margin: 0;
		}

		.bj {
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
			width: 408px;
			margin-top: 30px;
		}

		.div-float-right-ul2 li input {
			background: none;
			padding: 10px 0px;
			top: -5px;
			left: -1px;
			position: absolute;
			width: 320px;
			font-size: 14px;
			/* text-indent: 20em; */
			color: #78849e;
			border: 0; // 去除未选中状态边框
			outline: none; // 去除选中状态边框
			/* float: right; */
		}

		.div-float-right-ul2-div-1 {
			border-bottom: 1px solid #aec5e2;
			height: 33px;
			position: relative;
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
			height: 52px;
			position: relative;
		}

		.div-float-right-ul2 li:nth-last-of-type(2) {
			font-size: 14px;
			margin: -9px 0 0 0;
			position: absolute;
			right: 70px;
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
</style>
