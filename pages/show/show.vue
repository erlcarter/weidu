<template>
	<div class="show_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<div class="Portfolio">
			<p class="titile">WEDOO星榜作品</p>
			<!-- 作品展示 -->
			<div class="Portfolio_list">
				<!-- 列表 渲染 -->
				<div class="Por_lis_fall" v-for="value in Por_lis_fall" :key="value">
					<div class="por_sty">
						<img mode="widthFix" :src="value.src" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				Por_lis_fall: [
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1Hi9.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1oa4.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1TIJ.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1Hi9.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1TIJ.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1bGR.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1Hi9.jpg"
					},
					{
						src: "https://s1.ax1x.com/2020/08/06/aR1TIJ.jpg"
					},
				],

			}
		}
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
	}

	.Portfolio {
		// padding: 2% 6% 0 6%;
		background-color: #ffffff;
		width: 100%;

		//课程列表--标题
		.titile {
			padding: 2% 0% 2% 5%;
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}

		.Portfolio_list {
			margin: 5% 5% 5% 5%;
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

			.por_sty img {
				// padding: 5% 3% 5% 10%;
				width: 100%;
				height: auto;
				border-radius: 20rpx;
			}
		}

		.por_sty {
			width: 100%;
			height: auto;
		}


	}
</style>
