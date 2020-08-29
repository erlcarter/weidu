<template>
	<view class="content_mine">
		<view>
			<!--内容区域Bedin-->
			<div class="content">
				<!--未登录 -->
				<div class="whether_log" v-if="!info">
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

				<!-- 已登录-->
				<div class="whether_log" v-else>
					<!-- 头像 -->
					<img :src='info.avatar'></img>

					<!-- 用户名|会员 -->
					<div class="info_btn">
						<p>
							<span v-text="info.username"></span>
						</p>
						<img :mode="mode" class="vip_btn" src="../../static/images/icon/VIP_icon.png" alt="">

					</div>
					<!-- 去往我的资料 -->
					<button type="default" class="my_data"></button>
					<a url="./profile_my/profile_my" class="go_profile" />
				</div>

				<!-- 我的课程|我的作品展 -->
				<div class="menu_bnt">
					<div class="left">
						<!-- 请求获取登陆信息   data-type="0"或者="1" 判断点击的是课程还是作品展-->
						<button @getuserinfo='getUserInfo' open-type="getUserInfo" type="primary" data-type="0" class='login_btn'></button>
						<div>
							<p class="my_menu">我的课程</p>
							<p class="my_number">
								<span v-if="!info">请先登录</span>
								<span v-else>共{{info.course_num}}个</span>
							</p>
						</div>
						<div class="show_btn">
							<img src="../../static/images/show_le.png" alt="">
						</div>
					</div>

					<div class="right">
						<button @getuserinfo='getUserInfo' open-type="getUserInfo" type="primary" data-type="1" class='login_btn'></button>
						<div>
							<p class="my_menu">我的作品展</p>
							<p class="my_number">
								<span v-if="!info">请先登录</span>
								<span v-else>共{{info.article_num}}个</span>
							</p>
						</div>
						<div class="show_btn">
							<img :mode="mode" src="../../static/images/show_ri.png" alt="">
						</div>
					</div>
				</div>

				<!--是否需要帮助-->
				<div class="refer">
					<button class="service" open-type="contact" bindcontact="handleContact"></button>
					<div class="refer_text">
						<p>你可能需要帮助？</p>
						<span>有疑问请点击这里进行客服咨询</span>
					</div>

					<img src="../../static/images/refer.png" alt="">
				</div>
				<!-- 技术支持 -->
				<div class="yxniao">
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
		mapActions,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				mode: 'aspectFill',
			};

		},
		// 小程序的生命周期
		onLoad() {

		},
		//计算属性
		computed: {
			//userInfo当前微信获取到的用户信息 
			//info 后台返回的用户信息
			...mapState(['userInfo', 'info']) //微信个人信息
		},
		methods: {

			// getOpenId 获取用户唯一openid
			//onLogin 用户个人信息
			...mapActions(['onLogin', 'getOpenId', 'onRequest']),

			//我的课程和我的作品 ，判断是否有绑定用户，没有的话跳到绑定信息页面
			async getBind(type) { //定义一个返回 AsyncFunction 对象的异步函数
				let url = this.$urls.addWxuser_bind_get;
				console.log(this.info.uiid)
				let res = await this.onRequest({
					url,
					data: {
						uiid: this.info.uiid, //用户id
					},
				});
				if (res.data.status == 1) {
					let data = res.data.data;
					for (var i = 0; i < data.length; i++) {
						if (data[i].student_name != '') {
							var _url = '';
							if (type == 0) _url = 'course_my/course_my';
							else if (type == 1) _url = 'works_my/works_my';
							uni.navigateTo({
								url: '/pages/mine/' + _url
							})
							return;
						}
					}


					uni.navigateTo({
						url: '/pages/binding/binding'
					})
				}
			},


			//授权回调
			getUserInfo(e) { //e 为点击事件的所有参数  获取用户信息
				console.log(e)
				// 这里e.currentTarget.dataset.type;拿到data-type="0"还是1 赋值给type
				var type = e.currentTarget.dataset.type;
				console.log(type) //type出来的是data-type为0还是1

				//当用户按了允许按钮
				if (e.detail.userInfo) {

					// 当用户按了允许按钮 把信息传给全局this.$store.state.userInfo保存，即所有页面都可获取用户登录信息
					this.$store.state.userInfo = e.detail.userInfo;
					//没有用户，说明还没登录
					if (!this.info) {
						//获取openid用户 唯一id
						this.getOpenId().then(open_id => {
							console.log(open_id)

							this.onLogin({
								open_id,
								userInfo: e.detail.userInfo
							}).then(res => {
								console.log('注册成功', res)
								//点击的是下面两个
								if (type) {
									this.getBind(type);
								}
							})
						})
					} else {
						this.getBind(type);
					}



				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '登陆失败',
						content: '为了更好的体验，请为小程序授权',

					})

					wx.hideLoading();
				}
			}
		},

		components: {
			youxniao,
		},
		// 分享到朋友
		onShareAppMessage: function() {
			return {
				title: '维度艺术',
				path: '/pages/index/index'
			}
		},
		//分享到朋友圈
		onShareTimeline(){
			return {
				title: '维度艺术',
				// path: '/index/index?id=123'
			}
		}
	
	}
</script>

<style lang="scss" scoped>
	// .yxniao{
	// 	margin-bottom: 7.6%;
	// 	width: 90%;
	// 	position:absolute;
	// 	bottom: 0;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;



	// }
	.yxniao {
		position: absolute;
		bottom: 0;
		width: 90%;
	}

	.content_mine {
		min-height: 100vh;
		background-color: #7f8971;
		padding-top: 120rpx;
		box-sizing: border-box;
		
		
	}

	// 请登录内容区域
	.content {
		position: relative;
		min-height: calc(100vh - 120rpx);
		// height: 100vh;
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
			//内阴影
			// box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
			// 外阴影
			box-shadow: 0vw 0vw 5vw rgba(0, 0, 0, 0.1);
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
				line-height: 104rpx;
				overflow: hidden;
				object-fit: cover;
				margin: 4.5% 2% 5% 5%;

				display: flex;
				justify-content: center;
				align-items: center;
			}

			//open-data 已经登录显示的头像
			img {
				// background-color: #a49888;
				border-radius: 50%;
				border: 1rpx solid #ffffff;
				width: 104rpx;
				height: 104rpx;
				line-height: 104rpx;
				overflow: hidden;
				object-fit: cover;
				margin: 4.5% 2% 5% 5%;

				display: flex;
				justify-content: center;
				align-items: center;

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
					width: 250rpx;
					overflow: hidden; //隐藏
					text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行
				}

				//已登录名称
				span {
					font-size: 28rpx;
					font-weight: 700;
					color: #7f8971;

					// 超出width: 180rpx;省略号结尾
					width: 250rpx;
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
					margin: 4% 8% 0 0;
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
					margin: 4% 8% 0 0;
				}
			}

			// 点击登录按钮 
			.login {
				background-color: #a49888;
				border-radius: 10px;
				width: 200rpx;
				height: 100rpx;
				line-height: 100rpx;
				overflow: hidden;
				margin: 5% 5%;
				transform: translateX(1%);

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
				background-color: #FFFFFF;
				margin-top: 9.5%;
				margin-right: 1%;
				background: url(../../static/images/icon/click1.png);
				background-repeat: no-repeat;
				background-size: 40rpx; //28
				position: relative;

				display: flex;
				justify-content: center;
				align-items: center;
			}



			.go_profile {
				// width: 80rpx;
				// height: 160rpx;
				// position: absolute;
				// right: 0;
				// background: transparent;

				position: absolute;
				left: 0;
				height: 100%;
				width: 100%;
				background: transparent; //透明
				z-index: 10;
			}

		}

		// 我的课程|我的作品展
		.menu_bnt {
			width: 670rpx;
			display: flex;
			transform: translateY(-48rpx); //16

			.left {
				position: relative;
				// background-color: #ffffff;
				// border-radius: 20rpx;
				// box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				// width: 320rpx;
				// height: 400rpx;
				// overflow: hidden;
				width: 42.66vw;
				height: 53.33vw;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0vw 0vw 5vw rgba(0, 0, 0, 0.1);
				opacity: 1;
				border-radius: 2vw;

				.login_btn {
					position: absolute;
					left: 0;
					height: 100%;
					width: 100%;
					background: transparent; //透明
					z-index: 10;
					// background: red;
				}
			}

			.right {
				position: relative;
				// background-color: #ffffff;
				// border-radius: 20rpx;
				// box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				// width: 320rpx;
				// height: 400rpx;
				// overflow: hidden;
				width: 42.66vw;
				height: 53.33vw;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0vw 0vw 5vw rgba(0, 0, 0, 0.1);
				opacity: 1;
				border-radius: 2vw;
				// 中间分隔
				margin-left: 32rpx;

				.login_btn {
					position: absolute;
					left: 0;
					height: 100%;
					width: 100%;
					background: transparent; //透明
					z-index: 10;
					// background: green;
				}
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
					// width: 355rpx;
					// height: 400rpx;
					// transform: translateY(-50%);
					width: 42.66vw;
					height: 53.33vw;
					transform: translate(-10rpx, -50%);
					background-size: cover;
					// margin-right: -5%;
				}
			}

		}

		// 是否是要帮助
		.refer {
			position: relative;
			background-image: linear-gradient(90deg, #ffffff 0%, #e0e5df 100%);
			border-radius: 10px;
			// box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
			box-shadow: 0vw 0vw 5vw rgba(0, 0, 0, 0.1);
			width: 100%;
			height: 200rpx;
			display: flex;
			margin-top: 32rpx;
			transform: translateY(-20rpx);
			margin-bottom: 60rpx;

			// transform: translateY(-30rpx);
			img {
				// object-fit: cover;
				width: 250rpx;
				height: 230rpx;

				transform: translate(396rpx, -30rpx);
				z-index: 5;
				position: absolute;
				object-fit: cover;
			}

			.refer_text {
				margin-left: 5%;

				p {
					margin-top: 10%;
					font-size: 32rpx;
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


			.service {
				position: absolute;
				left: 0;
				height: 100%;
				width: 100%;
				background: transparent; //透明
				z-index: 10;
				// background: red;
			}
		}

	}
</style>
