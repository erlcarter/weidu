<template>
	<div class="details" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">
		<div class="details_btn">
			<p class="text1" v-text="data.name">维度 - 维度艺术&招商银行</p>
			<p class="date" v-text="data.active_date">2017-03-08</p>

			<div class="content">
				<img mode="widthFix" v-if="img" v-for="img in data.imgs" :src="img_http + img + img_end" 
				alt="afe0QU.jpg" border="0" />
			</div>

		</div>
		<!-- <footer />  -->
		<Foote></Foote>

	</div>



</template>

<script>
	import Foote from "@/components/footer"

	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				id: null,
				details_list: {
					text1: "维度 - 维度艺术&招商银行，女神节黏土画动作回顾",
					date: '2020-03-08',
					imglist: [],
				},
				data: null

			}
		},
		// 小程序生命周期
		onLoad(e) {
			console.log(e.id)
			this.id = e.id;
			
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
					console.log(res.data.data.active)
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						this.details_list = res.data.data.active;

						//循环遍历details_list数组
						for (var i = 0; i < this.details_list.length; i++) {
							//切割第i项的imgs 
							this.details_list[i].imgs = this.details_list[i].imgs.split(',')

							if (this.details_list[i].id == this.id) {
								this.data = this.details_list[i];
							}
						}

					}
				})
			},

		},
		components: {
			Foote
		},
		computed: {
			...mapState(['img_http', 'img_end'])
		}


	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.details_btn {
		padding-bottom: 160rpx;
		margin: 8.53% 5% 10% 5%;

		// background-color: #4CD964;
		.text1 {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}

		.date {
			margin: 2% 0% 8.53% 0%;
			font-size: 24rpx;
			font-weight: 300;
			color: #7f8971;
		}

		.content img {
			display: block;
			width: 100%;
			height: 888rpx;
		}

		.content p {
			margin-top: 3%;
			font-size: 24rpx;
			font-weight: 300;
			color: #606060;
		}
	}
</style>
