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


		<!--店面地址 -->
		<div class="site_btn">
			<p class="titile">店面地址</p>
			<p class="titile_s">STORE ADDRESS</span></p>
			<!-- 位置地址 -->
			<div class="site_collect">
				<!--个体-->
				<div class="site_alone">
					<!--店面地址text -->
					<div class="site_tite">
						<p class="shop">黄沙店</p>
						<p class="shop_site">通宝大厦</p>
						<!-- 查看详细地址 -->
						<img src="../../static/images/icon/go_to.png" alt="" class="shop_go">
					</div>
					<!--店面地址Animation -->
					<div class="show_btn">
						<a @click="onShop(41)" hover-class="none">
							<img src="../../static/images/site_le.png" alt="">
						</a>
					</div>

				</div>
				<div style="width: 5%;"></div>
				<div class="site_alone">
					<!--店面地址text -->
					<div class="site_tite">
						<p class="shop">白云店</p>
						<p class="shop_site">江高爱国东路</p>
						<img src="../../static/images/icon/go_to.png" alt="" class="shop_go">

					</div>
					<!--店面地址Animation -->
					<div class="show_btn">
						<a @click="onShop(40)" hover-class="none">
							<img src="../../static/images/site_ri.png" alt="">
						</a>
					</div>

				</div>


			</div>
		</div>


		<!-- 最新活动与首页案例 -->
		<div class="activity_btn">
			<p class="activity_tite">最新活动&商业合作案例</p>
			<p class="titile_s">LATEST ACTIVITIES & COMMERCIAL COOPERATION</span></p>

			<!-- <navigator :href='`${goodsDetail}${goods.id}`'> -->
			<div class="activity_list" v-for="value in activity_list" :key="value.id" @click="selectItem(value)">
				<!-- 左图 -->
				<img :src="img_http + value.avatar + img_end" :mode="mode" class="acti_lis_left" alt="">
				<!--右内容-->
				<div class="acti_lis_right">
					<p class="ac_lis_ri_tite" v-text="value.name"></p>
					<p class="ac_lis_ri_date" v-text="value.active_date"></p>
					<p class="ac_lis_ri_cont" v-text="value.a_desc"></p>
					<div class="read_more_btn">
						<p>READ MORE</p>
						<img src="../../static/images/icon/click2.png" alt="">
					</div>
				</div>
			</div>
			<!-- </navigator> -->

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

	import {
		mapActions,
		mapState
	} from 'vuex'
	// import footer_btn from "@/components/footer_btn"

	export default {
		data() {
			return {
				mode: 'aspectFill',
				banenr_text: `\xa0\xa0\xa0\xa0\xa0维度艺术一直致力于幼儿、青少年艺术教育传播和美术课程研发及创新。维度课程将艺术审美、绘画兴趣、内心感悟三者融入课堂教学，通过各种不同的绘画形式和方式，让孩子们在创作的过程中探索出属于自己的表达方式，真诚地表达自己。全程小班教学，注重孩子们观察能力的培养和创造力的开发，鼓励个性化的发展。`,

				activity_list: [],
			}
		},
		// 小程序生命周期
		onLoad() {
			this.getData()
		},
		methods: {
			...mapActions(['onRequest']), //请求模块

			// 获取数据
			getData() {
				let url = this.$urls.index_get;
				console.log(this.$urls.index_get);
				this.onRequest({
					url
				}).then(res => {
					console.log(res)
					console.log(res.data.data)
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						this.activity_list = res.data.data.active;
					}
				})

			},
			// 最新活动点击事件
			selectItem(value) {
				console.log('id', value.id);
				uni.navigateTo({
					url: `/pages/index/index_details/index_details?id=${value.id}`
				})
			},
			// 店铺地址 固定两家
			onShop(id) {
				uni.navigateTo({
					url: '/pages/index/shop/shop?id=' + id
				})
			},

	
		},
		// 組件
		components: {
			heada,
			youxniao
			// footer_btn
		},
		computed: {
			...mapState(['img_http', 'img_end'])
		},
		// 分享到朋友
		onShareAppMessage: function() {
			return {
				title: '维度艺术',
				// path: '/index/index?id=123'
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
			margin: 0 5%;

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
		margin: 64rpx 6% 0% 6%;

		.activity_tite {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
			// margin-left
		}

		.activity_list {
			background-color: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0rem 1vw 5vw rgba(0, 0, 0, 0.1);
			width: 100%;
			height: 448rpx;
			// overflow: hidden;
			margin-top: 6%;
			display: flex;

			.acti_lis_left {
				border-top-left-radius: 20rpx;
				border-bottom-left-radius: 20rpx;
				// border-radius: 20rpx;
				// border: 2px solid #e0e5df;
				width: 375rpx;
				height: 446rpx;
				// object-fit: cover;
			}

			.acti_lis_right {
				width: 318rpx;
				height: 446rpx;
				padding: 5% 5% 0% 5%;
				position: relative;

				.ac_lis_ri_tite {
					font-size: 28rpx;
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
					// margin: 8% 0;
					margin: 8rpx 0rpx 8% 0rpx;
					background-color: #a49888;
					border-radius: 6rpx;
					width: 126rpx;
					height: 32rpx;
					line-height: 32rpx;
					text-align: center;
					font-size: 20rpx;
					// font-weight: 700;
					font-weight: bold;
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
					// margin: 0 0 32rpx 38%;
					position: absolute;
					bottom: 64rpx; //16
					left: 38%;

					p {
						white-space: nowrap; //不换行
						font-size: 22rpx;
						font-weight: bold;
						// font-weight: 800;
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
		margin: 64rpx 6% 0% 6%;
		transform: translate(0rpx, -50rpx);

		.titile {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
			// margin-left: 10rpx;
		}


		.site_collect {
			display: flex;

			.site_alone {
				width: 42.67vw;
				height: 24vw;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0vw 1vw 5vw rgba(0, 0, 0, 0.1);
				opacity: 1;
				border-radius: 3vw;
				margin-top: 60rpx;
				overflow: hidden;
				padding: 32rpx 0 0 32rpx;
				display: flex;

				.site_tite {
					.shop {
						font-size: 28rpx;
						font-weight: 700;
						color: #7f8971;
						width: 100rpx;
						overflow: hidden; //隐藏
						text-overflow: ellipsis; //最后以...结尾
						white-space: wrap; //换行
					}

					.shop_site {
						// padding-top: 1%;
						font-size: 22rpx;
						color: #b8c4b6;
						font-weight: 300;
						z-index: 11;
						position: absolute;

						width: 150rpx;
						overflow: hidden; //隐藏
						text-overflow: ellipsis; //最后以...结尾
						white-space: wrap; //换行

					}

					.shop_go {
						width: 48rpx;
						height: 24rpx;
						// font-size: 24rpx;
						color: #b8c4b6;
						margin: 80% 0 20% 10%;
					}
				}

				// 图片
				.show_btn {
					img {
						width: 320rpx;
						height: 236rpx;
						transform: translate(-140rpx, -56rpx);
						position: absolute;
						z-index: 15;
						object-fit: cover;
					}
				}

			}
		}
	}

	.titile_s {
		padding: 8rpx 0 0 0rpx;
		font-size: 12px;
		font-weight: 300;
		color: #7f8971;
	}
</style>
