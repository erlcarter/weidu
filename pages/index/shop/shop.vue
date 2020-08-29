<template>
	<div class="shopDetails" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">
		<div class="shop">
			<p class="text1" v-text="address.name">维度艺术空间·黄沙店2</p>
			<div class="details">
				<p>营业时间：<span v-text="address.dm_desc">周一休息，周二至周日正常上课</span></p>
				<p>联系电话：<span v-text="address.phone">12233435</span></p>
				<p>店面地址：<span v-text="address.address">荔湾区从桂林</span></p>
			</div>

			<div class='posi'>
				<img mode="widhFix" v-if="address" :src="show_img(address.avatar)" alt="">
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
				address: null,
				id: null,
		
			}
		},
		onLoad(options) {
			console.log(options) 
			this.id = options.id;
			this.getData()
		},
		methods: {
			...mapActions(['onRequest']), //请求模块
			
			show_img(avatar){
				console.log(avatar)
				if(avatar == null || avatar == ""  ){
					return  "/static/images/default_img.png"
				}else{
					// 压缩
					// return  this.img_http+avatar+this.img_end_2
					// 去压缩
					return  this.img_http+avatar
				}
				
			},


			// 获取数据
			getData() {
				let url = this.$urls.index_get;
				console.log(this.$urls.index_get);
				this.onRequest({
					url
				}).then(res => {
					console.log(res)
					console.log(res.data.data.shop)
					//以下都必须都等于 1才才算成功
					if (res.data.status == 1) {
						var shop = res.data.data.shop;
						shop.map(item => {
							if (item.id == this.id) {
								this.address = item;
							}
						})
					}
				})

			}
		},

		components: {
			Foote
		},
		computed: {
			...mapState(['img_http', 'img_end', 'img_end_2'])
		},
		// 分享
		onShareAppMessage: function() {
			return {
				title: '维度艺术空间',
				// path: '/index/index?id=123'
			}
		},
		//分享到朋友圈
		onShareTimeline(){
			return {
				title: '维度艺术空间',
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

	.shop {
		padding-bottom: 160rpx;
		margin: 8.53% 5% 10% 5%;

		.text1 {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}

		.details {
			width: 89.33vw;
			height: 19.2vw;
			font-size: 3.2vw;
			font-family: Noto Sans CJK SC;
			font-weight: 300;
			line-height: 4.8vw;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			margin: 2% 0% 10% 0%;
		}

		.details p {
			margin-bottom: 1%;
		}

		.posi img {
			height: 90vw;
			width: 90vw;
			object-fit: cover;
			border-radius: 20rpx;
		}
	}
</style>
