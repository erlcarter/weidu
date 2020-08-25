<template>
	<div class="course_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<div class="course_cont">
			<p class="titile">WEDOO特色课程一览</p>
			<p class="titile_s">LIST OF FEATURED COURSES</p>
			<!-- 课程列表 -->
			<div class="course_list" v-for="value in course_list" :key="value.id">

				<!-- 多图 -->
				<!-- 	<div class="co_li_img">
					<img :src="value.src1" :mode="mode" class="li_img1" alt="">
					<img :src="value.src2" :mode="mode" alt="">
					<img :src="value.src3" :mode="mode" class="li_img3" alt="">
				</div> -->

				<!-- <navigator url="./Details_course/Details_course" hover-class="none"> -->
				<div @click='selectItem(value)'>
					<!-- 单独 -->
					<div class="co_li_img">
						<img :src="img_http + value.avatar + img_end" :mode="mode" class="li_img1" alt="">
					</div>


					<div class="grade">
						<p class="grade_title" v-text="value.name">启蒙班</p>

						<div class="label">
							<p class="grade_label" v-text="value.year">7-13岁</p>
							<!-- <a url="./Details_course/Details_course" class="read_more_btn"> -->
							<div class="read_more_btn">
								<p>READ MORE</p>
								<img src="../../static/images/icon/click2.png" alt="">
							</div>
						</div>

						<p class="total_ntb" v-text="value.c_desc">
							只能写两行
						</p>
					</div>
				</div>
				<!-- </navigator> -->

			</div>
		</div>
		<!-- 技术支持 -->
		<div>
			<youxniao />
		</div>
	</div>
</template>

<script>
	import youxniao from "@/components/youxniao"
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				mode: 'aspectFill',
				course_list: []
			}
		},
		// 小程序的生命周期
		onLoad() {
			this.getData()
		},
		methods: {
			...mapActions(['onRequest']), //请求模块

			//获取数据
			getData() {
				let url = this.$urls.course_list_get;
				console.log('url:' + url)
				this.onRequest({
					url
				}).then(res => {
					console.log(res)
					console.log(res.data.data)
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						this.course_list = res.data.data
					}
				})

			},
			//点击事件 根据id跳转到相应的课程详情页
			selectItem(value) {
				console.log('id', value.id);
				uni.navigateTo({
					url: `/pages/course_list/Details_course/Details_course?id=${value.id}`
				})
			},
		},
		//组件
		components: {
			youxniao
			// footer_btn
		},
		computed: {
			...mapState(['img_http', 'img_end'])
		}
	}
</script>

<style lang="scss" scoped>
	.radian {
		position: fixed;
		top: 0;
		width: 100%;
	}

	.course_cont {
		margin: 8.53% 5% 0 5%;
		background-color: #ffffff;
		width: 100%;

		//课程列表--标题
		.titile {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}
		.titile_s {
			padding: 8rpx 0 0 0;
			font-size: 12px;
			font-weight: 300;
			color: #7f8971;
		}

		// 课程列表 -内容
		.course_list {
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0vw 1vw 5vw rgba(0, 0, 0, 0.1);
			width: 90%;
			height: 484rpx;
			// overflow: hidden;
			margin: 5% 0%;


			// 多图
			// .co_li_img {
			// 	display: flex;

			// 	img {
			// 		border: 1rpx solid #e0e5df;
			// 		width: 222rpx;
			// 		height: 222rpx;
			// 	}

			// 	.li_img1 {
			// 		border-top-left-radius: 20rpx;
			// 	}

			// 	.li_img3 {
			// 		border-top-right-radius: 20rpx;
			// 	}

			// }

			//一图
			.co_li_img {
				.li_img1 {
					width: 89.8vw;
					height: 30vw;
					object-fit: cover;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
				}
			}





			.grade {
				margin: 4.27% 5% 4.27% 5%;

				.grade_title {
					width: 28.67vw;
					height: 5.33vw;
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: bold;
					line-height: 5.33vw;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					overflow: hidden; //隐藏
					// text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行

					letter-spacing: 0vw; //字体间距
				}

				.label {
					margin: 16rpx 0% 4.27% 0%;
					display: flex;

					.grade_label {
						background-color: #a49888;
						border-radius: 6rpx;
						// width: 94rpx;
						height: 32rpx;
						line-height: 32rpx;
						overflow: hidden;

						font-size: 20rpx;
						font-weight: 700;
						color: #ffffff;
						text-align: center;
						font-weight: bold;
						padding: 0 16rpx;
					}

					.read_more_btn {
						display: flex;
						margin: 0% 0% 0% 50%;
						transform: translate(26rpx, 0rpx);

						p {
							white-space: nowrap; //不换行
							// text-align: center;

							// width:20.67vw;
							height: 4.8vw;
							font-size: 3.2vw;
							font-family: Noto Sans CJK SC;
							font-weight: bold;
							line-height: 4.8vw;
							color: rgba(164, 152, 136, 1);
							opacity: 1;
							transform: translate(10rpx, 0rpx);
							letter-spacing: 0vw; //字体间距
						}

						img {
							// background-color: red;
							width: 36rpx;
							height: 36rpx;
							transform: translate(6rpx, 0rpx);
							object-fit: cover;

						}
					}

				}

				.total_ntb {
					// width: 76.8vw;
					height: 10.13vw;
					font-size: 3.2vw;
					font-family: Noto Sans CJK SC;
					font-weight: 300;
					line-height: 4.8vw;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
	}
</style>
