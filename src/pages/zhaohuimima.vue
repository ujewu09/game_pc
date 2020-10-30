<template>
	<!-- 找回密码 -->
	<div class="page-zhaohuimima" >
		<header class="header">
			<div class="header-div-1">
				<img src="../assets/images/logo.png" alt="" class="header-img">
				<p>开心电竞</p>
			</div>
			<div class="header-div-2">
				<ul class="header-ul">
					<li>
						<div class="li-div">
							<img src="../assets/images/erji.png" alt="" width="40px">
							<div class="header-ul-kf">在线客服</div>
						</div>
					</li>
					<li>
						<div class="header-ul-div-1">
							<div class="header-ul-div-2">注册</div>
						</div>
					</li>
				</ul>
			</div>
		</header>
		<div class="center">
			<div class="center-left">
				<p class="left-p1">海量电竞赛事预测</p>
				<p class="left-p2">竞彩赛事为你挑选</p>
			</div>
			<div class="center-right">
				<form id="form" method="post">
					<div class="div-float-right">
						<div class="border"></div>
						<p class="div-float-right-p1">找回密码</p>
						<ul class="div-float-right-ul2">
							<li>
								<div class="div-float-right-ul2-div-1">
									<input type="text" placeholder="请输入您的手机号" id="shuru">
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-div-2">
									<input type="text" placeholder="验证码">
									<div class="div-yanzhengma">发送验证码</div>
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-div-1">
									<label class="div-float-right-ul2-div-1-label-2">请输入密码6-11位英文或数字</label>
									<input type="password" placeholder="密码" id="pwd" >
								</div>
							</li>
							<li>
								<div class="div-float-right-ul2-bj" id="tj" @click="denglu">找回密码</div>
							</li>
						</ul>
					</div>
				</form>
			</div>
		</div>
		<div class="buttom">
			<p class="buttom-p1">Copyright &copy; 2020 LanChuan E-Sport Co,Ltd.All Rights reserved.</p>
			<p class="buttom-p2">www.886.com</p>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			denglu(){
				this.$router.push('../denglu')
			}
		},
	}
</script>

<style lang="less" scoped>
	.page-zhaohuimima{
		background-color: #000;
		width: 100%;
		height: 1000px;
		*{
			padding: 0;
			margin: 0;
		}
		.header-div-1{
			float: left;
			margin: 7px 0 0 25px;
		}
		.header-div-1 p{
			vertical-align: middle;
			color: #fff;
			font-weight: bold;
			font-size: 14px;
			padding-left: 2px;
		}
		.header-div-2{
			float: right;
			margin: 15px 7px 0 0;
		}
		.header{
			width: 100%;
			height: 85px;
			border-bottom:2px #a3a3a3 solid;
		}
		.header-ul li{
			display: inline-block;
			color: #FFFFFF;
		}
		.header-ul li:nth-last-of-type(2){
			position: relative;
			width: 100px;
		}
		.header-ul-ej{
			display: inline-block;
			vertical-align: middle;
		}
		.header-ul-kf{
			position: absolute;
			font-size: 16px;
			vertical-align: middle;
			display: inline-block;
			left: 46px;
			top: 6px;
			cursor: pointer;
		}
		.header-ul-div-1{
			width: 106px;
			background-color: #52c41a;
			height: 47px;
			border-radius: 4px;
			position: relative;
			margin: 6px 0 0 26px;
		}
		.header-ul-div-2{
			position: absolute;
			width: 100px;
			height: 40px;
			background-color: #237804;
			left: 3px;
			top: 4px;
			border-radius: 5px;
			text-align: center;
			line-height: 41px;
			cursor: pointer;
		}
		.header-img{
			width: 40px;
			height: 47px;
			margin: 0 0 0 10px;
		}
		.li-div{
			width: 130px;
			position: absolute;
			top: -37px;
			left: -75px;
		}
		.center-left{
			float: left;
			margin: 363px 0 0 115px;
		}
		.center-right{
			float: right;
			margin: 73px 394px 0 0;
		}
		.left-p1{
			font-size: 26px;
			color: #FFFFFF;
		}
		.left-p2{
			margin-top: 6px;
			color: #fff;
			font-size: 18px;
		}
		.center{
			width: 100%;
			height: 852px;
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
		}
		
		.div-float-right-ul2 li input {
			background: none;
			padding: 10px 0px;
			top: -3px;
			left: -1px;
			position: absolute;
			width: 320px;
			font-size: 16px;
			/* text-indent: 20em; */
			color: #78849e;
			border: 0;
			outline: none;
			/* float: right; */
			width: 410px;
		}
		
		.div-float-right-ul2-div-1 {
			border-bottom: 2px solid #797979;
			height: 33px;
		}
		#shuru:focus{
			border-bottom: 1px solid #26eac4;
		}
		.div-float-right-ul2-div-1-label {
			/* position: absolute; */
			left: 336px;
			top: 5px;
			position: relative;
			/* margin: 7px 0 0 76px; */
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
		.div-float-right-ul2-div-2 {
			border-bottom: 2px solid #797979;
			height: 33px;
			width: 245px;
		}
		
		.div-float-right-ul2-bj {
			width: 346px;
			height: 45px;
			text-align: center;
			margin: 0 auto;
			color: #FFFFFF;
			font-size: 18px;
			border-radius: 3px;
			cursor: pointer;
			line-height: 47px;
			font-weight: bold;
			background: #237804;
		}
		
		.div-yanzhengma {
			width: 150px;
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
			background-color: #237804;
		}
		.div-float-right{
			position: relative;
		}
		.border{
			background-color: #b7eb8f;
			width: 14px;
			height: 14px;
			top: 16px;
			left: -31px;
			position: absolute;
			border-radius: 30px;
		}
		.buttom{
			border-top: #c2c2c2 solid 1px;
			width: 100%;
			// background-color: red;
			height: 60px;
		}
		.buttom-p1{
			float: left;
			margin: 10px 0 0 50px;
			font-size: 14px;
		}
		.buttom-p2{
			margin: 10px 300px 0 0;
			font-size: 14px;
			float: right;
		}
	}
</style>
