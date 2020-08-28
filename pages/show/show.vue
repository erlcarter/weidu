<template>
	<div class="show_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<scroll-view class="Portfolio">
			<p class="titile">星榜作品</p>
			<p class="titile_s">STAR WORKS LIST</p>
			<!-- 作品展示 -->

			<!-- left -->
			<div class="Portfolio_list" style="margin: 0 1.5% 0 5.5%;">
				<!-- 列表 渲染 -->
				<div class="Por_lis_fall " v-for="(value,index) in left" :key="value.article_id">
					<div id="por_sty" class="por_sty">
						<!-- <a url="./details/details" hover-class="none"> -->
						<div @click='selectItem(value)'>
							<img ref="img" mode="widthFix" :src="img_http + value.avatar + img_end" alt="" />
						</div>
						<!-- </a> -->
						<div class="por_about">
							<p class="por_name" v-text="value.art_desc">逛超市简笔画.</p>
							<p class="por_author">©<span v-text="value.student_name">用户名</span></p>
						</div>
					</div>
				</div>
			</div>
			<!-- right -->
			<div class="Portfolio_list" style="margin: 0 5.5% 0 1.5%;">
				<!-- 列表 渲染 -->
				<div class="Por_lis_fall" v-for="(value,index) in right" :key="value.article_id">
					<div id="por_sty" class="por_sty">
						<!-- <a url="./details/details" hover-class="none"> -->
						<div @click='selectItem(value)'>
							<img ref="img" mode="widthFix" :src="img_http + value.avatar + img_end" alt="" />
						</div>
						<!-- </a> -->
						<div class="por_about">
							<p class="por_name" v-text="value.art_desc">逛超市简笔画.</p>
							<p class="por_author">©<span v-text="value.student_name">用户名</span></p>
						</div>
					</div>
				</div>
			</div>

		</scroll-view>
		<!-- 上拉加载-->
		<div v-if="loading" class="load_btn">
			<p>加载中...</p>
		</div>
		<div v-if="nothing">
			<!-- 技术支持 -->
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
				index: 0, //当时索引值
				Por_lis_fall: [],
				loading: false, //上拉加载
				nothing: false, //上拉没数据时
				left: [],
				right: []
			}

		},
		onLoad() { //进来就加载
			this.getData(this.index)
		},
		methods: {
			// 请求模块
			...mapActions(['onRequest']),
			//获取数据
			getData(index) {
				this.loading = true;
				console.log(this.index + "当前的索引值")
				let url = this.$urls.good_article_get;
				console.log("完整的url地址" + url);
				this.onRequest({
					url,
					data: {
						index
					}

				}).then(res => {
					let data = res.data.data;
					console.log(res)
					console.log(res.data.data)
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						// this.activity_list = res.data.data.active;
						setTimeout(() => {  //定时器 
							if (index == 0) { //一开始进来是或者下拉刷新 
								this.nothing = false;
								this.left = [], this.right = [];

								data.map((item, index) => { // 这里的写法相当于v-for="(item,index) in data"
									if ((index + 1) % 2 == 1) {
										this.left.push(item);
									} else {
										this.right.push(item);
									}
								})
								this.index = data.length; //  data.length赋值index
								// 停止下拉刷新
								uni.stopPullDownRefresh()
							} else { //上拉加载
								let length = this.left.length + this.right.length;
								data.map((item, index) => {
									if ((length + index + 1) % 2 == 1) {
										this.left.push(item);
									} else {
										this.right.push(item);
									}
								})
								// this.Por_lis_fall.push(...data); // Por_lis_fall累积图片的个数
								this.index += data.length; // 累积图片的吃长度
							}

							this.loading = false;
							if (data.length < 10) this.nothing = true;
						}, 500)

					}
				})
			},

			// 下拉刷新
			refresh() {
				this.getData(0); //index为0  获取最新的数据
			},

			//点击事件 根据id跳转到相应的课程详情页
			selectItem(value) {
				console.log('id', value.article_id);
				uni.navigateTo({
					url: `/pages/show/details/details?id=${value.article_id}`
				})
			},

		},


		// --------------------------------------------------
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh();

		},
		// 监听上拉加载更多
		onReachBottom() {
			console.log(this.index)
			console.log(this.nothing)
			if (!this.nothing) {
				if (!this.loading) this.getData(this.index); //防止用户多次上拉请求数据
			}
		},


		// 組件
		components: {
			youxniao
			// footer_btn
		},
		//
		computed: {
			...mapState(['img_http', 'img_end'])
		},
		// 分享
		onShareAppMessage: function() {
			return {
				title: '优秀作品',
				// path: '/index/index?id=123'
			}
		},
		//分享到朋友圈
		onShareTimeline(){
			return {
				title: '优秀作品',
				// path: '/index/index?id=123'
			}
		}

	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.Portfolio {
		// height: 100vh;
		// overflow:auto;
		// -webkit-overflow-scrolling: touch;
		// padding: 2% 6% 0 6%;
		background-color: #ffffff;
		width: 100%;

		//课程列表--标题
		.titile {
			padding: 8.33% 0% 0% 6%;
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		} 
		.titile_s {
			margin: 8rpx 0 32rpx 6%;
			font-size: 12px;
			font-weight: 300;
			color: #7f8971;
		}

		.Portfolio_list {
			display: inline-block;
			vertical-align: top;
			// margin: 0% 5% 5% 5%;
			width: 43%;

			//瀑布流
			/* 规定的列数，设置5列 */
			column-count: 1;
			/* 规定的间隔距离 */
			column-gap: 3%;
		}



		.Por_lis_fall {
			break-inside: avoid;
			// break-inside: auto;
			width: 100%;

			.por_sty {
				// margin-bottom: 8%;
				width: 100%;
				height: auto;
			}

			.por_sty img {
				margin-top: 32rpx;
				width: 100%;
				height: auto;
				border-radius: 20rpx;
				min-height: 200rpx;
				background: #F1F1F1;
				// 外阴影
				box-shadow: 0vw 6rpx 40rpx rgba(0, 0, 0, 0.1);
				// box-shadow: 10px 10px 5px #888888;
			}

			.por_about {
				padding-left: 7%;

				.por_name {
					padding-top: 8rpx;
					// padding-top: 16rpx;
					font-weight: 700;
					color: #7f8971;
					font-size: 28rpx;
					width: 260rpx;
					overflow: hidden; //隐藏
					//text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行
				}

				.por_author {
					padding-top: 2%;
					font-size: 12px;
					font-weight: 300;
					color: #7f8971;

					width: 260rpx;
					overflow: hidden; //隐藏
					//text-overflow: ellipsis; //最后以...结尾
					white-space: nowrap; //不换行
				}
			}

		}

	}

	.load_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0rpx;

		p {
			font-size: 24rpx;
			color: #AAAAAA;
		}
	}
</style>
