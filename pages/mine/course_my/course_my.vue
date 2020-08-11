<template>
	<div class="coures">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<div class="content">
			<p>MY WEODOO课程</p>

			<div class="coures_list">
				<div class="single">
					<div class="left">
						<img src="https://s1.ax1x.com/2020/08/11/aOMxmD.th.jpg" />
					</div>
					<div class="right">
						<p class="grade">幼儿启蒙班</p>
						<div class="label">
							<p class="grade_label">7-13岁</p>
						</div>
						<p class="text">学生名：<span>陈天浩</span></p>
						<div>
							<p class="text">课程进度<span>8/12</span></p>
							<cmd-progress :percent="8/12*100" :show-info="false" 
							stroke-color="#7f8971" :stroke-width="3"></cmd-progress>
						</div>
						<p class="text">剩余请假次数：<span>1/3</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		data() {
			return {

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

	.content {
		margin: 7% 5% 0% 5%;
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
				margin-left: 3%;

				.label {
					margin: 5% 0% 7% 0%;
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
					padding-bottom: 4rpx;
				}

			}


		}
	}
</style>
