<template>
	<view class="content_mine">
		<!-- 未登录 -->
		<view v-if="!userInfo">
			<!--内容区域Bedin-->
			<div class="content">
				<!--获取个人信息 -->
				<div class="whether_log">
					<!-- 头像 -->
					<img src="../../static/images/head_img.png" alt="">
					<!-- 用户名|会员 -->
					<div class="info_btn">
						<p>维度艺术空间</p>
						<img src="../../static/images/icon/wedoo.png" alt="">
					</div>
					<!-- 点击登录按钮 -->
					<button @getuserinfo='getUserInfo' open-type="getUserInfo" type="primary" class='login'>
						<p>点击登录</p>
					</button>
				</div>
				<!-- 我的课程|我的作品展 -->
				<div class="menu_bnt">
					<div class="left">
						<div>
							<p class="my_menu">我的课程</p>
							<p class="my_number">共3个</p>
						</div>
						<div class="show_btn">
							<img src="../../static/images/show_le.png" alt="">
						</div>
					</div>

					<div class="right">
						<div>
							<p class="my_menu">我的作品展</p>
							<p class="my_number">共3个</p>
						</div>
						<div class="show_btn">
							<img src="../../static/images/show_ri.png" alt="">
						</div>
					</div>
				</div>
				<!--是否需要帮助-->
				<div class="refer">
					<div class="refer_text">
						<p>你可能需要帮助？</p>
						<span>有疑问请点击这里进行客服咨询</span>
					</div>
					<img src="../../static/images/refer.png" alt="">
				</div>
				<!-- 提供技术支持 -->
				<div class="skill_company">
					<a href="https://www.youxiniao.net/">
						<img src="../../static/images/icon/company.png" alt="">
						<p>优息鸟科技提供技术支持</p>
					</a>
				</div>
			</div>
			<!-- 内容区域end-->
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
		padding-top: 120rpx;
	}

	// 请登录内容区域
	.content {
		background-color: #ffffff;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		// position: relative;
		// top: -80rpx;
		z-index: 0;
		padding: 0 5%;

		//获取个人信息
		.whether_log {
			background-color: #ffffff;
			border-radius: 20rpx;
			//阴影
			box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
			width: 670rpx;
			height: 164rpx;
			overflow: hidden;
			// margin: 0 5%;
			transform: translateY(-50%);
			z-index: 1;
			display: flex;

			img {
				background-color: #a49888;
				border-radius: 50%;
				border: 1px solid #ffffff;
				width: 104rpx;
				height: 104rpx;
				overflow: hidden;
				object-fit: cover;
				margin: 5% 2% 5% 5%;
			}

			.info_btn {
				margin: 5% 0rpx;

				p {
					font-size: 32rpx;
					font-weight: 700;
					color: #7f8971;
				}

				img {
					width: 100rpx;
					height: 32rpx;
					border-radius: 5%;
					margin: 6% 8% 0 0;
				}

			}

			// 点击登录按钮
			.login {
				background-color: #a49888;
				border-radius: 10px;
				width: 200rpx;
				height: 100rpx;
				line-height: 164rpx;
				overflow: hidden;
				margin: 5% 5%;
				transform: translateX(22%);

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
		}

		// 我的课程|我的作品展
		.menu_bnt {
			width: 670rpx;
			display: flex;
			transform: translateY(-40rpx);

			.left {
				background-color: #ffffff;
				border-radius: 20rpx;
				box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				width: 320rpx;
				height: 400rpx;
				overflow: hidden;
			}

			.right {
				background-color: #ffffff;
				border-radius: 20rpx;
				box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				width: 320rpx;
				height: 400rpx;
				overflow: hidden;
				// 中间分隔
				margin-left: 5%;
			}

			.my_menu {
				font-size: 32rpx;
				font-weight: 700;
				color: #7f8971;
				margin: 10% 0 0 10%;
			}

			.my_number {
				font-size: 23rpx;
				color: #b8c4b6;
				margin: 3% 0 0 10%;
			}

			.show_btn {
				background-image: linear-gradient(90deg, #ffffff 0%, #e0e5df 100%);
				width: 320rpx;
				height: 200rpx;
				position: fixed;
				bottom: 0px;
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				img{
					width: 360rpx;
					height: 400rpx;
					transform: translateY(-50%);
					// transform: translateX(-5%);
					background-size: cover;
					// margin-right: 5%;
				}
			}
		}

		// 是否是要帮助
		.refer {
			background-image: linear-gradient(90deg, #ffffff 0%, #e0e5df 100%);
			border-radius: 10px;
			box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
			width: 100%;
			height: 200rpx;
			overflow: hidden;
			display: flex;
			margin-top: 8%;

			// transform: translateY(-30rpx);
			img {
				object-fit: cover;
				width: 220rpx;
				height: 200rpx;
				transform: translateX(36rpx);
				// transform: translateY(-30rpx);
			}

			.refer_text {
				margin-left: 5%;

				p {
					margin-top: 10%;
					font-size: 36rpx;
					font-weight: 700;
					color: #7f8971;
				}

				span {
					margin-top: 5%;
					font-size: 24rpx;
					font-weight: 300;
					color: #7f8971;
				}
			}

		}

		//youxiniao技术支持
		.skill_company {
			margin-top: 25%;
			margin-bottom: 15%;
			text-align: center;

			img {
				width: 100rpx;
				height: 65rpx;
				object-fit: cover;
			}

			p {
				font-size: 20rpx;
				color: #b8c4b6;
			}
		}
	}
</style>
