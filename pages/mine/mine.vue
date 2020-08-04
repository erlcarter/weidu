<template>
	<view class="content_mine">
		<!-- 未登录 -->
		<view v-if="!userInfo">
			<!--获取用户信息 -->
			<div class="whether_log">
				<button @getuserinfo='getUserInfo' open-type="getUserInfo" type="primary" class='login'>
					<p>点击登录</p>
				</button>
			</div>
			<!-- 内容区域 -->
			<div class="content">
				<div class="menu_bnt">
					<div class="left">我的课程</div>
					<div class="right">我的作品展3333</div>
				</div>
				<!--refer-->
			<!-- 	<div class="refer">
					<div class="refer_text">
						<p>你可能需要帮助？</p>
						<span>有疑问请点击这里进行客服咨询</span>
					</div>
					<img src="../../static/images/refer.png" alt="">
				</div> -->
			</div>
		</view>
		<!-- 已登录 -->
		<view v-else>33333</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {

			};
		},
		methods: {
			//授权回调
			getUserInfo(e) {
				console.log(e)
				// this.doLogin();
				if (e.detail.userInfo) {
					//用户按了允许授权按钮
					// this.doLogin();
					this.$store.state.userInfo = e.detail.userInfo;
				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '登陆失败',
						content: '为了更好的体验，请为小程序授权',
						// success: function(res) {
						// 	if (res.confirm) {
						// 		console.log('用户点击确定')
						// 	} else {
						// 		console.log('用户点击取消')
						// 	}
						// }
					})

					wx.hideLoading();
				}
			}
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style lang="scss" scoped>
	.content_mine {
		background-color: #7f8971;
	}

	.content {
		background-color: #ffffff;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		
		position:relative; 
		top:-80rpx;
		z-index:0;
		padding: 0 5%;
		.menu_bnt {
			width: 670rpx;
			display: flex;
			// margin: 0% 5%;
			// margin-left: 5%;
			// margin-right: 5%;
			padding-top: 17%;
			
			.left {
				background-color: #ffffff;
				border-radius: 10px;
				box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				width: 160px;
				height: 200px;
				overflow: hidden;
			}

			.right {
				background-color: #ffffff;
				border-radius: 10px;
				box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				width: 160px;
				height: 200px;
				overflow: hidden;
				// 中间分隔
				margin-left: 5%;
			}
		}
		.refer{
			background-image: linear-gradient(90deg, #ffffff 0%, #e0e5df 100%);
			border-radius: 10px;
			box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
			width: 100%;
			height: 200rpx;
			overflow: hidden;
			display: flex;
			img{
				object-fit:cover!important;
				width: 200rpx;
				height: 200rpx;
			}
			
		}
	}

	.whether_log {
		background-color: #ffffff;
		border-radius: 20rpx;
		//阴影
		box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
		
		width: 670rpx;
		height: 164rpx;
		overflow: hidden;
		margin: 0 5%;
		position:relative;
		z-index:1;
	}

	.login {
		background-color: #a49888;
		border-radius: 10px;
		width: 200rpx;
		height: 100rpx;
		line-height: 164rpx;
		overflow: hidden;
		margin: 5% 5%;
		float: right;

		p {
			font-size: 28rpx;
			font-weight: 700;
			letter-spacing: 0.7px;
			color: #ffffff;
			display: block;
			line-height: 100rpx;
			text-align: center;
		}

	}
</style>
