<template>
	<div class="details" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">


		<div>
			<div class="details_btn">
				<!-- 公共的 -->
				<div class="img_bnt">
					<img class="ails" mode='widthFix' src="../../../static/images/string.png" alt="">
					<div class="frame">
						<img class="border_top" src="/static/images/frame2.png" alt="">
						<img class="border" src="/static/images/border.png" alt="">
						<img class="middle" mode="widthFix" v-if='Rende.avatar' :src="img_http + Rende.avatar + img_end" />
						<img class="border_bottom" src="/static/images/frame1.png" alt="">
					</div>
					<div class="publicity">
						<!--左 -->
						<div class-="Name_works">
							<!-- 作品名称 -->
							<p class="Name_works_bnt"><span v-text="Rende.art_desc">逛超市简笔画</span></p>

							<!-- 作者|作品息 -->
							<div class="writer">
								<p>—</p>
								<p>作者：<span v-text="Rende.student_name">陈浩</span></p>
								<p>班级：<span v-text="Rende.course_name">三年三班</span></p>
								<p>创作时间：<span v-text="Rende.time">2020-7-11</span></p>
								<p>围观人数：<span v-text="Rende.look_num">345</span></p>
							</div>
						</div>
						<!-- 右 -->
						<img  v-if="Rende.is_hot" src="../../../static/images/recommend.png" alt="">
					</div>
				</div>

				<!--自己页面需新增-->
				<div class="mine" v-if="Rende.mine">
					<p class="mine_title">作品花絮</p>
					<div v-for="img in Rende.imgs" :key="value">
						<img mode="widthFix" :src="img_http + img + img_end"  v-if="img" />
					</div>
					<!-- 保存按钮 -->
					<div class="_phone">
						<!-- #ifndef MP-WEIXIN -->
						<!-- 	<button @click="saveImgToLocal">
							保存至手机1
						</button> -->
						<!-- #endif -->

						<!-- #ifdef MP-WEIXIN -->
						<button @click="saveEwm" v-if="openSettingBtnHidden">
							保存至手机
						</button>

						<!--open-type="openSetting打开授权页面"  -->
						<button v-else hover-class="none" open-type="openSetting" @opensetting='handleSetting'>保存至手机</button>
						<!-- #endif -->
						<!-- <button>
							保存至手机
						</button> -->
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				mine: true,
				id: null,
				Rende: [], //作品信息列表

				openSettingBtnHidden: true, //是否授权


			};
		},
		// 小程序生命周期
		onLoad(opt) {
			console.log("show传过来的id为:" + opt.id);
			this.id = opt.id;

			this.getData()
		},
		computed: {
			...mapState(['info', 'img_http', 'img_end']), //请求全局用户信息
		},
		methods: {
			...mapActions(['onRequest']), //请求模块
			//获取数据
			getData() {
				console.log('缓存中的用户个人信息');
				console.log(this.info);
				let url = this.$urls.type_article_info_get;
				console.log('完整的后端页面地址url:' + url)
				this.onRequest({
					url,
					data: {
						id: this.id, //获取作品id
						uiid: this.info.uiid //获取登录用户uiid
					},
				}).then(res => {
					// console.log(res)
					let data = res.data.data;
					console.log("作品信息") //作品信息
					console.log(data) //作品信息
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						this.Rende = data
						
						this.Rende.imgs = this.Rende.imgs.split(',')
						console.log(this.Rende)
						// 循环遍历Rende这个数组
						// for (var i = 0; i < this.Rende.length; i++) {
						// 	//切割Rende中的每一项imgs
						// 	this.Rende[i].imgs = this.Rende[i].imgs.split(',')
							
						// 	if (this.Rende[i].id == this.id) {
						// 		this.data = this.Rende[i];
						// 	}
							
						// }
						
					}
				})
			},

			downFile(url) {
				uni.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
					url: this.img_http + url, //图片地址
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({ //保存图片到系统相册。
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败",
										icon: "none"
									});
								}
							});
						}
					}
				})
			},


			//微信小程序保存到相册
			handleSetting(e) {
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					console.log(1);
					this.openSettingBtnHidden = false;
				} else {
					console.log(2);
					this.openSettingBtnHidden = true;
				}

			},

			saveEwm: function(e) {
				//获取相册授权
				uni.getSetting({ //获取用户的当前设置。
					success: (res) => {
						console.log(res)
						if (!res.authSetting['scope.writePhotosAlbum']) {

							// {uni.authorize}提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，
							// 但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。如果用户之前拒绝了授权，
							// 此接口会直接进入失败回调，一般搭配uni.getSetting和uni.openSetting使用。
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									//这里是用户同意授权后的回调
									this.saveImgToLocal();
								},
								fail: () => { //这里是用户拒绝授权后的回调
									console.log('2222')
									this.openSettingBtnHidden = false
								}
							})
						} else { //用户已经授权过了
							console.log('同意了')
							this.saveImgToLocal();
						}
					}
				})
			},

			getSetting() {
				return new Promise((resolve, reject) => {
					uni.getSetting({ //获取用户的当前设置。
						success: (res) => {
							if (!res.authSetting['scope.writePhotosAlbum']) {
								this.openSettingBtnHidden = true;
								resolve();
							} else { //用户已经授权过了
								this.saveImgToLocal();
							}
						}
					})
				})
			},

			// 提示是否保存的模态框
			saveImgToLocal: function(e) {
				uni.showModal({ //显示消息提示框。
					title: '提示',
					content: '确定保存到相册吗',
					success: res => {
						if (res.confirm) {
							this.downFile(this.Rende.avatar)
							for (let i = 0; i < this.Rende.imgs.length; i++) {
								this.downFile(this.Rende.imgs[i])
							}


						} else if (res.cancel) {

						}
					}
				});

			}
		},


	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	//作品详情内容
	.details_btn {
		margin: 7% 5% 15% 5%;

		.img_bnt {
			text-align: center;

			.ails {
				width: 35.73vw;
				height: 8.53vw;
				border: 0px solid rgba(127, 137, 113, 1);
				opacity: 1;
			}

			.frame {
				position: relative;
				// width: 79.33vw;
				// height: 100vw;
				// border: 18rpx groove rgba(127, 137, 113, .6);
				transform: translateY(-12rpx);
				box-sizing: border-box;
				box-shadow: 0vw 1vw 5vw rgba(0, 0, 0, 0.3);
				// box-shadow: 10px 10px 5px #888888;

				.border {
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					width: 100%;
					z-index: 1;
					object-fit: cover;
				}

				.middle {
					position: relative;
					z-index: 2;
					// border: 1px solid #b8c4b6;
					background-color: #000000;
					width: 528rpx;
					// height: 598rpx;
					margin: 9% 8%;
					// object-fit: cover;
				}

				.border_top {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 10px;
					// transform: rotateX(90deg);
					z-index: 3;
				}

				.border_bottom {
					position: absolute;
					left: 0px;
					bottom: 0px;
					width: 100%;
					height: 10px;
					// transform: rotateX(90deg);
					z-index: 3;
				}
			}

			.publicity {
				margin-top: 5%;
				padding: 7% 5%;
				// width: 77.33vw;
				// height: 267rpx;
				background: rgba(248, 248, 248, 1);
				opacity: 1;
				text-align: left;
				display: flex;

				// 左
				.Name_works {
					background-color: #4CD964;
					display: flex;
					height: 200rpx;
					width: 100%;

					.Name_works_bnt {
						font-weight: 700;
						color: #7f8971;
						padding-bottom: 10rpx;
					}

					.writer p {
						font-size: 24rpx;
						font-weight: 300;
						color: #7f8971;
						padding-top: 10rpx;
					}

				}

				// 右
				img {
					transform: translateX(200rpx);
					background-color: #ffffff;
					border-radius: 5rpx;
					// border: 2rpx solid #ffb047;
					width: 158rpx;
					height: 42rpx;
					// overflow: hidden;
					object-fit: cover;
				}

			}

		}

		.mine {
			// width: 90%;
			margin-bottom: 30%;

			.mine_title {
				font-size: 32rpx;
				font-weight: 700;
				color: #7f8971;
				margin: 10% 0% 6% 0%;
			}

			img {
				display: block; //变块元素
				width: 89.33vw;
				height: 80.8vw;
				// padding-bottom: 3%;
				object-fit: cover;
			}
		}

		._phone {
			width: 90%;
			position: fixed;
			bottom: 0;
			text-align: center;
			background-color: #FFFFFF;
			padding: 3% 0 10% 0;

			//background:Transparent ; //底部透明
			button {
				text-align: center;
				background-color: #7f8971;
				border-radius: 20rpx;
				width: 400rpx;
				height: 100rpx;
				line-height: 100rpx;
				overflow: hidden;
				font-weight: 600;
				font-size: 26rpx;
				letter-spacing: 1.4rpx;
				color: #ffffff;
				letter-spacing: 4rpx;
			}
		}

	}
</style>
