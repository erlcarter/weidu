<template>
	<div class="coures">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<div class="content">
			<div class="coures_list" v-for="(value,index) in course_list" :key="value.student_id">
				<!-- <navigator url="../../course_list/Details_course/Details_course" hover-class="none"> -->
				<div @click='selectItem(value)'>

					<div class="single">
						<!-- 头像 -->
						<div class="left">
							<img :src="img_http + value.avatar+ img_end" />
						</div>
						<!-- 信息 -->
						<div class="right">
							<p class="grade" v-text="value.name">幼儿班</p>
							<div class="label">
								<p class="grade_label"><span v-text="value.year">7-12</span></p>
							</div>
							<p class="text">学生名：<span v-text="value.student_name">卢本伟</span></p>
							<div>
								<p class="text" style="padding-bottom: 0rpx;">课程进度：
									<span v-text="value.setion_current+'/'+value.setion_total">8/8</span>
								</p>
								<cmd-progress :percent="value.setion_current/value.setion_total*100" :show-info="false" stroke-color="#7f8971"
								 :stroke-width="3">
								 </cmd-progress>
							</div>
							<div>
								<p class="text">剩余请假次数：<span v-text="value.setion_current +'/' +value.absent_total">1/3</span></p>
								<!-- 剩余请假次数 -->
								<div style="display: flex;">
									<!--请假总次数是固定的（value.absent_total） -->
									<div class="leave" v-for="(value2,index) in value.absent_total" :key="index">
										<!-- 判断索引是否小于等于setion_current剩余请假次数 -->
										<img :src="'/static/images/' + (index+1 <= value.setion_current?'leave2':'leave1') + '.png'" alt="">
									</div>
								</div>

							</div>

							<div class="read_more_btn">
								<p>READ MORE</p>
								<img src="../../../static/images/icon/click2.png" alt="">
							</div>

						</div>
					</div>
				</div>
			</div>

			<p class="PScript">
				·对于数据若有任何疑问请联系客服进行问题咨询
			</p>
		</div>
	</div>
</template>

<script>
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				course_list: [],
			}
		},
		//小程序生命周期
		onLoad() { //进来就加载
			this.getData()
		},
		//计算属性
		computed: {
			...mapState(['info', 'img_http', 'img_end'])
		},
		methods: {
			// 请求模块
			...mapActions(['onRequest']),
			//获取数据
			getData(index) {
				this.loading = true;
				let url = this.$urls.find_user_course;
				console.log("完整的url地址" + url);
				this.onRequest({
					url,
					data: {
						uiid: this.info.uiid, //用户id
					},

				}).then(res => {
					let data = res.data.data;
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
				console.log('id', value.course_id);
				uni.navigateTo({
					url: `/pages/course_list/Details_course/Details_course?id=${value.course_id}`
				})
			},
		},
		// 组件
		components: {
			cmdProgress
		}
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.coures {
		// position: fixed;
		// top: 0
	}

	.content {
		margin: 64rpx 5% 0% 5%;
	}

	.content>p:nth-child(1) {
		// width:29.2vw;
		height: 7.2vw;
		font-size: 4.8vw;
		// font-size: 32rpx;
		font-family: Noto Sans CJK SC;
		font-weight: bold;
		line-height: 7.2vw;
		color: rgba(127, 137, 113, 1);
		opacity: 1;
	}

	.coures_list {
		.single {
			margin-top: 5%;
			padding: 5% 5% 5% 5%;
			// width:89.33vw;
			// height: 58.4vw;
			height: 51.4vw;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0vw 0vw 5vw rgba(0, 0, 0, 0.1);
			opacity: 1;
			border-radius: 20rpx;
			display: flex;
			position: relative; //相對postscript 的

			.left {
				img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10px;
					overflow: hidden;
					object-fit: cover;
				}
			}

			.right {
				width: 400rpx;
				margin-left: 5%;

				.label {
					margin: 8rpx 0% 16rpx 0%;
					background-color: #a49888;
					border-radius: 6rpx;
					width: 94rpx;
					height: 32rpx;
					overflow: hidden;

					.grade_label {

						background-color: #a49888;
						border-radius: 6rpx;
						width: 94rpx;
						height: 32rpx;
						line-height: 32rpx;
						overflow: hidden;
						font-size: 20rpx;
						font-weight: 700;
						color: #ffffff !important;
						text-align: center;
					}
				}

				.grade {
					width: 28.66vw;
					height: 5.33vw;
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: bold;
					line-height: 5.33vw;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
				}

				.text {
					// width:22.4vw;
					height: 4.8vw;
					font-size: 3.2vw;
					font-family: Noto Sans CJK SC;
					font-weight: 400;
					line-height: 4.8vw;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					padding-top: 12rpx;
				}

				.leave {
					display: flex;
					padding-top: 6rpx;
					padding-right: 10rpx;

					img {
						width: 4.27vw;
						height: 4.27vw;
						background: rgba(127, 137, 113, 1);
						border-radius: 50%;
						opacity: 1;
						object-fit: cover;
					}
				}


				.read_more_btn {
					display: flex;
					position: absolute;
					right: 0;
					bottom: 0;
					margin: 0% 5% 5% 0%;

					p {
						white-space: nowrap; //不换行
						font-size: 24rpx;
						font-weight: 700;
						color: #a49888;
						// text-align: center;
					}

					img {
						// background-color: red;
						width: 36rpx;
						height: 36rpx;
						transform: translateX(2rpx);
						object-fit: cover;
					}

				}
			}


		}
	}

	.PScript {
		margin: 5% 1%;
		width: 89.07vw;
		height: 4.8vw;
		font-size: 3.2vw;
		font-family: Noto Sans CJK SC;
		font-weight: 300;
		line-height: 4.8vw;
		color: rgba(127, 137, 113, 1);
		opacity: 1;
	}
</style>
