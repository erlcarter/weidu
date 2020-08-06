<template>
	<div class="show_index" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<div class="Portfolio">
			<p class="titile">WEDOO星榜作品</p>
			<!-- 作品展示 -->
			<div class="Portfolio_list">
				<!-- 列表循环1 -->
				<div class="Por_lis_left">
					<div class="por_sty">
						<img mode="widthFix" src="../../static/images/por1.jpg" alt="">
					</div>
				</div>
				
				<!-- 分开  -->
				<div style="width: 4%;"></div>
				
				<!-- 列表循环2 -->
				<div class="Por_lis_right">
					<div class="por_sty">
						<img mode="widthFix" src="../../static/images/por5.jpg" alt="">
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
				
			};
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
			margin: 5% 6% 5% 6%;
			display: flex;
			.Por_lis_left {
				.por_sty img {
					// padding: 5% 3% 5% 10%;
					width: 320rpx;
					border-radius: 20rpx;
				}
			}
			.Por_lis_right {
				.por_sty img {
					// padding: 5% 10% 5% 3%;
					width: 320rpx;
					border-radius: 20rpx;
				}
			}

		}


	}
</style>
