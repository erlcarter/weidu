<template>
	<div class="details" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">
		<!-- 作品详情（别人） -->
		<div v-if="!mine">
			<div class="details_btn">
				<div class="img_bnt">
					<img class="ails" mode='widthFix' src="../../../static/images/string.png" alt="">
					<div class="frame">
						<img :src="ewmImg" />
					</div>
					<div class="publicity">
						<!--左 -->
						<div class-="Name_works">
							<!-- 作品名称 -->
							<p class="Name_works_bnt">逛超市简笔画</p>

							<!-- 作者|作品息 -->
							<div class="writer">
								<p>—</p>
								<p>作者：<span v-text="writer_name">陈浩</span></p>
								<p>班级：<span v-text="grade_cla">三年三班</span></p>
								<p>创作时间：<span v-text="date_wri">2020-7-11</span></p>
								<p>围观人数：<span v-text="quan">345</span></p>
							</div>
						</div>
						<!-- 右 -->
						<img src="../../../static/images/recommend.png" alt="">
					</div>
				</div>

			</div>
		</div>

		<!-- 作品详情（自己） -->
		<div v-else>
			<div class="details_btn">
				<div class="img_bnt">
					<img class="ails" mode='widthFix' src="../../../static/images/string.png" alt="">
					<div class="frame">
						<img :src="ewmImg" />
					</div>
					<div class="publicity">
						<!--左 -->
						<div class-="Name_works">
							<!-- 作品名称 -->
							<p class="Name_works_bnt">逛超市简笔画</p>

							<!-- 作者|作品息 -->
							<div class="writer">
								<p>—</p>
								<p>作者：<span v-text="writer_name">陈浩</span></p>
								<p>班级：<span v-text="grade_cla">三年三班</span></p>
								<p>创作时间：<span v-text="date_wri">2020-7-11</span></p>
								<p>围观人数：<span v-text="quan">345</span></p>
							</div>
						</div>
						<!-- 右 -->
						<img src="../../../static/images/recommend.png" alt="">
					</div>
				</div>

				<!--自己页面需新增-->
				<div class="mine">
					<p class="mine_title">作品花絮</p>
					<div v-for="value in titbits" :key="value">
						<img :src="value.ewmImg" />
					</div>
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
					<button v-else hover-class="none" open-type="openSetting"
					 @opensetting='handleSetting'>保存至手机</button>
					<!-- #endif -->
					<!-- <button>
						保存至手机
					</button> -->
				</div> 
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mine: true,
				ewmImg: "https://s1.ax1x.com/2020/08/10/aHobY4.md.jpg",
				writer_name: "陈浩南",
				grade_cla: "三年四班",
				date_wri: "1999-7-9",
				quan: 324,
				titbits: [
					{
						ewmImg: "https://s1.ax1x.com/2020/08/10/ab8skd.md.jpg" //这是要保存的图片
					},
					{
						ewmImg: "https://s1.ax1x.com/2020/08/10/aHqPbt.md.jpg" //这是要保存的图片
					}
				],

				openSettingBtnHidden: true, //是否授权

			};
		},
		onLoad(opt) { 
		},
		components: {},
		methods: {
			downFile(url) {
				uni.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
					url, //图片地址
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({  //保存图片到系统相册。
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
					success: (res)=> {
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
								fail: ()=> { //这里是用户拒绝授权后的回调
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
			
			getSetting(){
				return new Promise((resolve,reject) => {
					uni.getSetting({ //获取用户的当前设置。
						success:(res)=> {
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
					success: function(res) {
						if (res.confirm) {
							this.downFile(this.ewmImg)
							for (let i = 0; i < this.titbits.length; i++) {
								this.downFile(this.titbits[i].ewmImg)
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
				// width: 79.33vw;
				height: 100vw;
				border: 18rpx groove rgba(127, 137, 113, .6);
				transform: translateY(-12rpx);
				box-sizing: border-box;

				img {
					border: 1px solid #b8c4b6;
					background-color: #000000;
					width: 528rpx;
					height: 598rpx;
					margin: 9% 8%;
					object-fit: cover;
				}
			}

			.publicity {
				margin-top: 5%;
				padding: 7% 5%;
				// width: 77.33vw;
				height: 280rpx;
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
				width: 89.33vw;
				height: 80.8vw;
				padding-bottom: 3%;
				object-fit: cover;
			}
		}

		._phone {
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
