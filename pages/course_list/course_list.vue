<template>
	<div class="course_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<div class="course_cont">
			<p class="titile">WEDOO特色课程一览</p>
			<!-- 课程列表 -->
			<div class="course_list" v-for="value in course_list" :key="value">
				<div class="co_li_img">
					<img :src="value.src1" :mode="mode" class="li_img1" alt="">
					<img :src="value.src2" :mode="mode" alt="">
					<img :src="value.src3" :mode="mode" class="li_img3"  alt="">
				</div>
				<div class="grade">
					<p class="grade_title" v-text="value.grade_title">启蒙班</p>

					<div class="label">
						<p class="grade_label" v-text="value.grade_label">7-13岁</p>
						<a url="###" class="read_more_btn">
							<p>READ MORE</p>
							<img :mode="mode" src="../../static/images/icon/click2.png" alt="">
						</a>
					</div>

					<p class="total_ntb" v-text="value.total_ntb">
						只能写两行
					</p>
				</div>
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
	export default {
		data() {
			return {
				mode: 'aspectFill',
				course_list: [{
					src1: "https://s1.ax1x.com/2020/08/06/acsE8S.th.jpg",
					src2: "https://s1.ax1x.com/2020/08/06/acsr8O.jpg",
					src3: "https://s1.ax1x.com/2020/08/06/acsDPK.jpg",
					grade_title:"幼儿启蒙班",
					grade_label:"7-12岁",
					total_ntb:"自由的创作空间和综合媒材的运用,维护孩子独特的想法和创意."
				},
				{
					src1: "https://s1.ax1x.com/2020/08/06/acsE8S.th.jpg",
					src2: "https://s1.ax1x.com/2020/08/06/acsr8O.jpg",
					src3: "https://s1.ax1x.com/2020/08/06/acsDPK.jpg",
					grade_title:"幼儿启蒙班",
					grade_label:"7-12岁",
					total_ntb:"自由的创作空间和综合媒材的运用,维护孩子独特的想法和创意."
				},
				]
			};
		},
		//组件
		components: {
			youxniao
			// footer_btn
		},
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
	}

	.course_cont {
		padding: 2% 6% 0 6%;
		background-color: #ffffff;
		width: 100%;

		//课程列表--标题
		.titile {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}

		// 课程列表 -内容
		.course_list {
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
			width: 88%;
			height: 484rpx;
			// overflow: hidden;
			margin: 5% 0%;

			.co_li_img {
				display: flex;

				img {
					border: 1px solid #e0e5df;
					width: 111px;
					height: 111px;
				}

				.li_img1 {
					border-top-left-radius: 20rpx;
				}

				.li_img3 {
					border-top-right-radius: 20rpx;
				}

			}

			.grade {
				margin: 5% 5% 5% 5%;

				.grade_title {
					font-weight: 700;
					color: #7f8971;

					width: 500rpx;
					overflow: hidden; //隐藏
					// text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行
				}

				.label {
					margin: 3% 0% 5% 0%;
					display: flex;

					.grade_label {
						background-color: #a49888;
						border-radius: 6rpx;
						width: 94rpx;
						height: 32rpx;
						line-height: 32rpx;
						overflow: hidden;

						font-size: 20rpx;
						font-weight: 700;
						color: #ffffff;
						text-align: center;
					}

					.read_more_btn {
						display: flex;
						margin: 0% 0% 0% 50%;

						p {
							white-space: nowrap; //不换行
							font-size: 12px;
							font-weight: 700;
							color: #a49888;
							text-align: center;
						}

						img {
							// background-color: red;
							width: 36rpx;
							height: 36rpx;
							transform: translateX(2rpx);
						}
					}

				}

				.total_ntb {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					font-size: 12px;
					font-weight: 300;
					color: #7f8971;
				}
			}
		}
	}
</style>  
   