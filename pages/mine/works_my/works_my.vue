<template>
	<div class="show_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<div class="Portfolio">
			<p class="titile">我的作品</p>
			<!-- 作品展示 -->
			<div class="Portfolio_list">
				<!-- 列表 渲染 -->
				<div class="Por_lis_fall" v-for="value in Por_lis_fall" :key="value">
					<div id="por_sty" class="por_sty">
						<a url="./details/details">
							<img mode="widthFix"  class="por_img" :src="value.src" alt="">
							<img  class="promo" src="../../../static/images/promo.png" alt="">
						</a>
						<div class="por_about">
							<p class="por_name" v-text="value.por_name">逛超市简笔画.</p>
							<p class="por_author">©<span v-text="value.por_author">用户名</span></p>
						</div>
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
	import youxniao from "@/components/youxniao"
	export default {
		data() {
			return {
				Por_lis_fall: [{
						src: "https://s1.ax1x.com/2020/08/06/aR1Hi9.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1oa4.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1TIJ.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1Hi9.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1TIJ.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1bGR.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1Hi9.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1TIJ.jpg",
						por_name: "逛超市简笔画",
						por_author:"张三"
					},
				],
			}
		},
		// 組件
		components: {
			youxniao
			// footer_btn
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

		//课程列表--标题
		.titile {
			padding: 7% 0% 2% 5%;
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}

		.Portfolio_list {
			margin: 2% 5% 5% 5%;
			width: 90%;

			//瀑布流
			/* 规定的列数，设置5列 */
			column-count: 2;
			/* 规定的间隔距离 */
			column-gap: 3%;

		}

		.Por_lis_fall {
			break-inside: avoid;
			width: 100%;

			.por_sty {
				padding-bottom: 8%;
				width: 100%;
				height: auto;
				position: relative;
			}

			.por_img{
				// padding: 5% 3% 5% 10%;
				width: 100%;
				height: auto;
				border-radius: 20rpx;
			}
			.promo{
				background-color: #ffffff;
				border-radius: 5rpx;
				// border: 2rpx solid #ffb047;
				width: 158rpx;
				height: 42rpx;
				overflow: hidden;
				margin: 4%;
				top: 0;
				left: 0;
				position:absolute;

			}
			

			.por_about {
				padding-left: 7%;

				.por_name {
					padding-top: 2%;
					font-weight: 700;
					color: #7f8971;

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
