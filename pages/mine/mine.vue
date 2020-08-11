<template>
	<view class="content_mine">
		<!-- 未登录 -->
		<view v-if="!userInfo">
			<!--内容区域Bedin-->
			<div class="content">
				<!--获取个人信息 -->
				<div class="whether_log">
					<!-- 头像 -->
					<img :mode="mode" src="../../static/images/head_img.png" alt="">
					<!-- 用户名|会员 -->
					<div class="info_btn">
						<p>维度艺术空间</p>
						<img :mode="mode" class="public" src="../../static/images/icon/wedoo.png" alt="">
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
							<img :mode="mode" src="../../static/images/show_le.png" alt="">
						</div>
					</div>

					<div class="right">
						<div>
							<p class="my_menu">我的作品展</p>
							<p class="my_number">共3个</p>
						</div>
						<div class="show_btn">
							<img :mode="mode" src="../../static/images/show_ri.png" alt="">
						</div>
					</div>
				</div>
				<!--是否需要帮助-->
				<div class="refer">
					<div class="refer_text">
						<p>你可能需要帮助？</p>
						<span>有疑问请点击这里进行客服咨询</span>
					</div>
					<img :mode="mode" src="../../static/images/refer.png" alt="">
				</div>
				<!-- 提供技术支持 -->
				<div>
					<youxniao />
				</div>
			</div>
			<!-- 内容区域end-->
		</view>
		<!-- 已登录 -->
		<view v-else>
			<!--内容区域Bedin-->
			<div class="content">
				<!--获取个人信息 -->
				<!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
				<div class="whether_log">
					<!-- 头像 -->
					<open-data type='userAvatarUrl'></open-data>

					<!-- 用户名|会员 -->
					<div class="info_btn">
						<p>
							<open-data type="userNickName"></open-data>
						</p>
						<img :mode="mode" class="vip_btn" src="../../static/images/icon/VIP_icon.png" alt="">
					</div>

					<!-- 去往我的资料 -->
					<button type="default" class="my_data"></button>

					<!-- 点击登录按钮 -->
					<!-- <button @getuserinfo='getUserInfo' open-type="getUserInfo" type="primary" class='login'>
						<p>点击登录</p>
					</button> -->

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
							<img :mode="mode" src="../../static/images/show_ri.png" alt="">
						</div>
					</div>
				</div>
				<!--是否需要帮助-->
				<div class="refer">
					<div class="refer_text">
						<p>你可能需要帮助？</p>
						<span>有疑问请点击这里进行客服咨询</span>
					</div>
					<img :mode="mode" src="../../static/images/refer.png" alt="">
				</div>
				<!-- 提供技术支持 -->
				<div>
					<youxniao />
				</div>
			</div>
			<!-- 内容区域end-->
		</view>
	</view>
</template>

<script>
	import youxniao from "@/components/youxniao"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				mode: 'aspectFill',
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
		},
		components: {
			youxniao,
		},
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

			// 未登录显示的头像
			img {
				background-color: #a49888;
				border-radius: 50%;
				border: 1rpx solid #ffffff;
				width: 104rpx;
				height: 104rpx;
				overflow: hidden;
				object-fit: cover;
				margin: 5% 2% 5% 5%;
			}

			//open-data 已经登录显示的头像
			open-data {
				// background-color: #a49888;
				border-radius: 50%;
				border: 1rpx solid #ffffff;
				width: 104rpx;
				height: 104rpx;
				overflow: hidden;
				object-fit: cover;
				margin: 5% 2% 5% 5%;
			}

			// 用户名
			.info_btn {
				margin: 5% 0rpx;

				// 未登录名称
				p {
					font-size: 28rpx;
					font-weight: 700;
					color: #7f8971;

					// 超出width: 180rpx;省略号结尾
					width: 200rpx;
					overflow: hidden; //隐藏
					text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行
				}

				//已登录名称
				.open-data {
					font-size: 28rpx;
					font-weight: 700;
					color: #7f8971;

					// 超出width: 180rpx;省略号结尾
					width: 200rpx;
					overflow: hidden; //隐藏
					text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行
				}


				// 未登录的图标。。。
				.public {
					background-color: #ffffff;
					border-radius: 0rpx;
					border: 1rpx solid transparent;
					width: 118rpx;
					height: 42rpx;
					overflow: hidden;
					margin: 6% 8% 0 0;
					object-fit: cover;
				}

				//已登录的图标
				.vip_btn {
					background-color: #ffffff;
					border-radius: 0rpx;
					border: 1rpx solid transparent;
					width: 185rpx;
					height: 42rpx;
					overflow: hidden;
					object-fit: cover;
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

			// 去往的我资料按钮
			.my_data {
				transform: translatey(18%);
				background-color: #FFFFFF;
				width: 40rpx;
				height: 50rpx;
				line-height: 40rpx;
				margin-top: 7%;
				margin-bottom: 7%;
				margin-right: 4%;
				background: url(../../static/images/icon/click1.png);
				background-size: cover;
			}

			.my_data:active {
				transform: translatey(18%);
				background-color: #FFFFFF;
				width: 40rpx;
				height: 50rpx;
				line-height: 40rpx;
				margin-top: 7%;
				margin-bottom: 7%;
				margin-right: 4%;
				background: url(../../static/images/icon/click2.png);
				background-size: cover;
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

				img {
					width: 355rpx;
					height: 400rpx;
					transform: translateY(-50%);
					background-size: cover;
					// margin-right: -5%;
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
				width: 250rpx;
				height: 230rpx;

				transform: translate(420rpx, -30rpx);
				z-index: 5;
				position: absolute;

			}

			.refer_text {
				margin-left: 5%;

				p {
					margin-top: 10%;
					font-size: 36rpx;
					font-weight: 700;
					color: #7f8971;
					z-index: 6;
				}

				span {
					margin-top: 5%;
					font-size: 24rpx;
					font-weight: 300;
					color: #7f8971;
					z-index: 7;
				}
			}

		}

	}
</style>
