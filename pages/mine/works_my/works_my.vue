<template>
	<div class="show_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<scroll-view class="Portfolio">
			
			<!-- 作品展示 -->
			<!-- left -->
			<div class="Portfolio_list" style="margin: 0 1.5% 0 5.5%;">
				<!-- 列表 渲染 -->
				<div class="Por_lis_fall" v-for="(value,index) in left" :key="value">
					<div id="por_sty" class="por_sty">
						<div @click='selectItem(value)'>
							<!-- <img mode="widthFix" class="por_img" :src="value.src" alt=""> -->
							<img ref="img" class="por_img" mode="widthFix" :src="img_http + value.avatar + img_end" alt="">
							<img v-if="value.is_hot" class="promo" src="../../../static/images/promo.png" alt="">
						</div>
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
				<div class="Por_lis_fall" v-for="(value,index) in right" :key="value">
					<div id="por_sty" class="por_sty">
						<div @click='selectItem(value)'>
							<!-- <img mode="widthFix" class="por_img" :src="value.src" alt=""> -->
							<img ref="img" class="por_img" mode="widthFix" :src="img_http + value.avatar + img_end" alt="">
							<img v-if="value.is_hot" class="promo" src="../../../static/images/promo.png" alt="">
						</div>
						<div class="por_about">
							<p class="por_name" v-text="value.art_desc">逛超市简笔画.</p>
							<p class="por_author">©<span v-text="value.student_name">用户名</span></p>
						</div>
					</div>
				</div>
			</div>
		</scroll-view>
		<!-- 技术支持 -->
		<!-- <div>
			<youxniao />
		</div> -->
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
		//小程序生命周期
		onLoad() { //进来就加载
			this.getData(this.index)
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
				console.log(index + "当前的索引值")
				let url = this.$urls.find_user_article;
				console.log("完整的url地址" + url);
				this.onRequest({
					url,
					data: {
						uiid: this.info.uiid, //用户id
						count: 10,
						index
					},

				}).then(res => {
					let data = res.data.data;
					console.log(res)
					console.log("-------------")
					console.log(res.data.data)
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						// this.activity_list = res.data.data.active;
						setTimeout(() => {
							if (index == 0) { //一开始进来是  下拉刷新
								this.nothing = false;
								// this.Por_lis_fall = data; //这里的 data = res.data.data;
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

								//this.Por_lis_fall.push(...data); // Por_lis_fall累积图片的个数
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
			onPullDownRefresh() {
				this.refresh();

			},
			// 监听上拉加载更多
			onReachBottom() {
				if (!this.nothing) {
					if (!this.loading) this.getData(this.index); //防止用户多次上拉请求数据
				}
			},

			//点击事件 根据id跳转到相应的课程详情页
			selectItem(value) {
				console.log('id', value.article_id);
				uni.navigateTo({
					url: `/pages/show/details/details?id=${value.article_id}`
				})
			},

		},
		// 組件
		components: {
			youxniao
		},
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.Portfolio {
		// padding: 2% 6% 0 6%;
		background-color: #ffffff;
		width: 100%;
		

	.Portfolio_list {
			padding-top: 34rpx; 
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
			width: 100%;

			.por_sty {
				// padding-bottom: 8%;
				width: 100%;
				height: auto;
				// position: relative;
			}

			.por_img {
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

			.promo {
				background-color: #ffffff;
				border-radius: 5rpx;
				// border: 2rpx solid #ffb047;
				width: 158rpx;
				height: 42rpx;
				overflow: hidden;
				margin: 4%;
				top: 0;
				left: 0;
				position: absolute;

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
</style>
