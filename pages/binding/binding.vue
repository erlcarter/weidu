<template>
	<div class="bindding" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<div class="content">
			<p>验证信息</p>
			<p>
				·由于学员作品均有隐私性,所以我们规定只有同时会员身份或者是会员身份的监护人才具有查看其作品的权利.
				<br>
				·输入学员的姓名后,学员信息会与此账号绑定在一起.若想更改则进入我的主页→我在资料→更改绑定学员.
			</p>
			<div class="input_btn">
				<p>学员名:</p>
				<input type="text" placeholder="点击填写">
			</div>



			<div class="_bind_but">
				<button>绑定</button>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.content {
		margin: 7% 5% 0% 5%;
	}
	.content>p:nth-child(1){
		width:29.2vw;
		height:7.2vw;
		font-size:4.8vw;
		font-family:Noto Sans CJK SC;
		font-weight:bold;
		line-height:7.2vw;
		color:rgba(127,137,113,1);
		opacity:1;
	}
	.content>p:nth-child(2){
		width:89.33vw;
		height:19.47vw;
		font-size:3.2vw;
		font-family:Noto Sans CJK SC;
		font-weight:300;
		line-height:4.8vw;
		color:rgba(127,137,113,1);
		opacity:1;
		
		padding-bottom: 7%;
		padding-top: 3%;
	}

	.input_btn{
		width: 89.33vw;
		height: 13.33vw;
		background: rgba(224, 229, 223, 1);
		border: 0px solid rgba(184, 196, 182, 1);
		opacity: 1;
		border-radius: 3vw;
		margin-top: 5%;
		
		line-height: 13.33vw;
		display: flex;
		p{
			width: 25vw;
			font-size: 3.73vw;
			font-family: Noto Sans CJK SC;
			font-weight: 300;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			// padding-left: 76rpx;
			text-align: right;
		}
		input{
			font-size: 3.73vw;
			font-family: Noto Sans CJK SC;
			font-weight: bold;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			margin: 4%;
			margin-left: 56rpx;
		}
		
		
	}
	._bind_but {
		width: 90%;
		position: fixed;
		bottom: 0;
		text-align: center;
		background-color: #FFFFFF;
		padding: 3% 0 5% 0;

		button {
			text-align: center;
			background-color: #7f8971;
			border-radius: 20rpx;
			width: 400rpx;
			height: 13.33vw;
			line-height: 100rpx;
			overflow: hidden;
			font-weight: 600;
			font-size: 26rpx;
			letter-spacing: 1.4rpx;
			color: #ffffff;
			letter-spacing: 4rpx;
		}
	}
</style>
