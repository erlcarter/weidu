<template>
	<div class="coures">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<div class="content">
			<p>MY WEODOO课程</p>

			<div class="coures_list" v-for="(value,index) in single_list" :key="index">
				<navigator url="../../course_list/Details_course/Details_course" hover-class="none">
					<div class="single">
						<div class="left">
							<img :src="value.head_img" />
						</div>
						<div class="right">
							<p class="grade" v-text="value.grade">幼儿班</p>
							<div class="label">
								<p class="grade_label"><span v-text="value.grade_label">7-12</span>岁</p>
							</div>
							<p class="text">学生名：<span v-text="value.stu_name">卢本伟</span></p>
							<div>
								<p class="text" style="padding-bottom: 0rpx;">课程进度：<span v-text="value.off+'/'+value.task">8/8</span></p>
								<cmd-progress :percent="value.off/value.task*100" :show-info="false" stroke-color="#7f8971" :stroke-width="3"></cmd-progress>
							</div>
							<div>
								<p class="text">剩余请假次数：<span v-text="value.leave_res +'/' +value.leave_sum">1/3</span></p>
								<!-- 剩余请假次数 -->
								<div style="display: flex;">
									<!--请假总次数是固定的（value.leave_sum） -->
									<div class="leave" v-for="(value2,index) in value.leave_sum" :key="index">
										<!-- 判断索引是否小于等于leave_res剩余请假次数 -->
										<img :src="'/static/images/' + (index+1 <= value.leave_res?'leave2':'leave1') + '.png'" alt="">
									</div>
								</div>

							</div>

							<div class="read_more_btn">
								<p>READ MORE</p>
								<img src="../../../static/images/icon/click2.png" alt="">
							</div>

						</div>
					</div>
				</navigator>
			</div>

			<p class="PScript">
				·对于数据若有任何疑问请联系客服进行问题咨询
			</p>
		</div>
	</div>
</template>

<script>
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		data() {
			return {
				single_list: [{
						head_img: 'https://s1.ax1x.com/2020/08/11/aOMxmD.th.jpg',
						grade: '幼儿启蒙班',
						grade_label: "7-13",
						leave_text: "2/3",
						stu_name: "迪丽热巴",
						pro_bar: "8/12",
						off: 4, //已完成
						task: 12, //总进度
						leave_res: 1, //剩余次数
						leave_sum: 3, //总请假次数
					},
					{
						head_img: 'https://s1.ax1x.com/2020/08/11/aOMxmD.th.jpg',
						grade: '创意绘画班',
						grade_label: "7-13",
						leave_text: "2/3",
						stu_name: "迪丽巴巴",
						pro_bar: "8/12",
						off: 8, //已完成
						task: 12, //总进度
						leave_res: 3, //剩余次数
						leave_sum: 3, //总请假次数
					},
				]
			}
		},
		methods: {

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
		margin: 8.33% 5% 0% 5%;
	}

	.content>p:nth-child(1) {
		// width:29.2vw;
		height: 7.2vw;
		font-size: 4.8vw;
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
			height: 58.4vw;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0vw 0vw 5vw rgba(0, 0, 0, 0.1);
			opacity: 1;
			border-radius: 2vw;
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
					margin: 6% 0% 8% 0%;
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
					padding-bottom: 10rpx;
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
