<template>
	<div id="index" class="_index">

		<!--头部标题-->
		<header class="indexHead">
			<heada />
		</header>

		<!--内容-->
		<div class="fixedly">
			<img mode="widthFix" class="banner_img" lazy-load src="/static/images/source.png" alt="">
			<div class="banenr_text">
				<p v-html="banenr_text"></p>
			</div>
		</div>

		<!-- 最新活动与首页案例 -->
		<div class="activity_btn">
			<p class="activity_tite">最新活动&商业合作案例</p>

			<div class="activity_list" v-for="value in activity_list" :key="item.acti_title">
				<!-- 左图 -->
				<img :src="value.src" :mode="mode" class="acti_lis_left" alt="">
				<!--右内容-->
				<div class="acti_lis_right">
					<p class="ac_lis_ri_tite" v-text="value.acti_title"></p>
					<p class="ac_lis_ri_date" v-text="value.acti_date"></p>
					<p class="ac_lis_ri_cont" v-text="value.acti_cont"></p>

					<a url="###" class="read_more_btn">
						<p>READ MORE</p>
						<img src="../../static/images/icon/click2.png" alt="">
					</a>
				</div>
			</div>

		</div>

		<!--店面地址 -->
		<div class="site_btn">
			<p>店面地址</p>
			<!-- 位置地址 -->
			<div class="site_collect">
				<!--个体-->
				<div class="site_alone">
					<!--店面地址text -->
					<div class="site_tite">
						<p class="shop">黄沙店</p>
						<p class="shop_site">通宝大厦</p>
						<!-- 查看详细地址 -->
						<p class="shop_go"> >>> </p>
					</div>
					<!--店面地址Animation -->
					<div class="show_btn">
						<img :mode="mode" src="../../static/images/site_le.png" alt="">
					</div>

				</div>
				<div style="width: 5%;"></div>
				<div class="site_alone">
					<!--店面地址text -->
					<div class="site_tite">
						<p class="shop">白云店</p>
						<p class="shop_site">江高爱国东路</p>
						<p class="shop_go"> >>> </p>
					</div>
					<!--店面地址Animation -->
					<div class="show_btn">
						<img :mode="mode" src="../../static/images/site_ri.png" alt="">
					</div>

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
	import heada from "@/components/heada"
	import youxniao from "@/components/youxniao"
	// import footer_btn from "@/components/footer_btn"

	export default {
		data() {
			return {
				mode: 'aspectFill',
				banenr_text: '系统维度艺术一直致力于幼儿、青少年艺术教育传播，\n' +
					'          以及系统的美术课程研发和创新。开设课程分为少儿成长阶梯课程、\n' +
					'          少儿专业特色课程、少儿艺术托管课程。将艺术审美、绘画兴趣、\n' +
					'          内心感悟三者融入课堂教学，秉持“实现艺术美的生活化”为核心理念，\n' +
					'          培养孩子们发现美、表现美的能力，以及通过学习艺术养成良好的行为习惯，\n' +
					'          提升思维能力、审美情趣等综合素质，培养健全人格和个人魅力。',

				activity_list: [{
					src: 'https://s1.ax1x.com/2020/08/05/asDM1s.md.jpg',
					acti_title: 'WEDOO夏日创作营招募',
					acti_date: '7.22-7.31',
					acti_cont: ` 7 月已开启了愿上半年所有的遗憾，是下半年惊喜的铺垫，
					 维度和大家继续努力冲鸭~  `,
				},{
					src: 'https://s1.ax1x.com/2020/08/05/asDM1s.md.jpg',
					acti_title: 'WEDOO夏日创作营招募',
					acti_date: '7.22-7.31',
					acti_cont: ` 7 月已开启了愿上半年所有的遗憾，是下半年惊喜的铺垫，
					 维度和大家继续努力冲鸭~  `,
				}
				],
				
			}
		},
		// 組件
		components: {
			heada,
			youxniao
			// footer_btn
		},
	}
</script>

<style lang="scss" scoped>
	// 自定义头部
	.indexHead {
		background-color: #7f8971;
	}

	// 固定的内容区
	.fixedly {
		display: flex;
		flex-direction: column;
		align-items: center;

		//首页大 图片 （固定的）
		.banner_img {
			/*1125px x 843px
		  高=百分百*原图的高/原图的宽
		*/
			transform: translateY(-80rpx);
			width: 750rpx;
			z-index: -1;
		}

		// 首页 介绍文字（固定的）
		.banenr_text {
			margin: 0 6%;

			p {
				/*font-size: 12px;*/
				font-size: calc(750rpx * 12 / 375);
				font-weight: 300;
				color: #7f8971;
				transform: translateY(-80rpx);
			}
		}
	}

	// 最新活动与首页案例
	.activity_btn {
		transform: translateY(-20rpx);
		margin: 0 6%;

		.activity_tite {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
			margin-bottom: 6%;
		}

		.activity_list {
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: inset 0 6rpx 40rpx rgba(0, 0, 0, .1);
			width: 100%;
			height: 448rpx;
			// overflow: hidden;
			margin-bottom: 5%;
			display: flex;

			.acti_lis_left {
				// border-top-left-radius: 20rpx;
				// border-bottom-left-radius: 20rpx;
				border-radius: 20rpx;
				border: 2px solid #e0e5df;
				width: 375rpx;
				height: 446rpx;
				// object-fit: cover;
			}

			.acti_lis_right {
				width: 318rpx;
				height: 446rpx;
				padding: 5% 5% 0% 5%;

				.ac_lis_ri_tite {
					font-size: 26rpx;
					font-weight: 700;
					color: #7f8971;
					// margin-right: 5%;
					z-index: 99;
					// 最多显示两行
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.ac_lis_ri_date {
					margin: 8% 0;
					background-color: #a49888;
					border-radius: 6rpx;
					width: 124rpx;
					height: 32rpx;
					line-height: 32rpx;
					text-align: center;
					font-size: 18rpx;
					font-weight: 600;
					color: #ffffff;

					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.ac_lis_ri_cont {
					font-size: 24rpx;
					font-weight: 300;
					color: #7f8971;
					margin-top: 14%;


					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
				}

				.read_more_btn {
					display: flex;
					margin: 20% 0% 5% 32%;

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

		}

	}

	//店铺地址
	.site_btn {
		margin: 7% 6%;

		p {
			font-size: 36rpx;
			font-weight: 700;
			color: #7f8971;
		}

		.site_collect {
			display: flex;

			.site_alone {
				margin-top: 30rpx;
				background-color: #ffffff;
				border-radius: 10px;
				box-shadow: inset 0 3px 20px rgba(0, 0, 0, .1);
				width: 160px;
				height: 100px;
				overflow: hidden;
				padding: 5% 0 0 5%;
				display: flex;

				.site_tite {
					.shop {
						font-size: 26rpx;
						font-weight: 700;
						color: #7f8971;
						width: 100rpx;
						overflow: hidden; //隐藏
						text-overflow: ellipsis; //最后以...结尾
						white-space: wrap; //换行
					}

					.shop_site {
						padding-top: 1%;
						font-size: 22rpx;
						color: #b8c4b6;
						font-weight: 300;
						z-index: 15;
						position: absolute;

						width: 100rpx;
						overflow: hidden; //隐藏
						text-overflow: ellipsis; //最后以...结尾
						white-space: wrap; //换行

					}

					.shop_go {
						font-size: 24rpx;
						color: #b8c4b6;
						margin: 100% 0 1% 0;
					}
				}

				// 图片
				.show_btn {
					img {
						width: 334rpx;
						height: 266rpx;
						transform: translate(-154rpx, -70rpx);
						position: absolute;
						z-index: 11;
						// margin-right: -5%;
					}
				}

			}
		}
	}
</style>
