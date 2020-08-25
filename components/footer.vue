<template>

	<div class="foote">
		<div class="foo_left">
			<button open-type="contact" bindcontact="handleContact">
				<p>咨询客服</p>
			</button>
		</div>
		<div class="foo_right">
			<a url="../../reservation/reservation">
				<p>马上预约</p>
			</a>
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
	
	// 页脚
	.foote {
		border-width: 2rpx 0 0 0;
		border-style: solid;
		border-color: #F7F7F7;
		
		position: fixed;
		bottom: 0;
		padding: 16rpx 40rpx 50rpx 40rpx;
		// padding: 4% 5% 8% 5%;	
		display: flex;
		background-color: #ffffff;
		width: 100%;
		flex: 1;

		// z-index: 9;
		// position: fixed;

		.foo_left {
			margin-right: 4%;
			border-radius: 2vw;
			border: 2rpx solid #7f8971;
			width: 318rpx;
			height: 96rpx;
			 line-height: 96rpx;
			overflow: hidden;
			color: #7f8971;
			button{
				width: 318rpx;
				height: 96rpx;
				text-align: center;
				p {
					text-align: center;
					line-height: 96rpx;
					font-size: 28rpx;
					font-weight: 600;
					letter-spacing: 1.4rpx;
					
					
				}
			}
		
		}

		.foo_right {
			background-color: #7f8971;
			border-radius: 2vw;
			width: 320rpx;
			height: 98rpx;
			overflow: hidden;
			line-height: 98rpx;
		
			p {
				text-align: center;
				line-height: 98rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 1.4rpx;
				color: #ffffff;

			}
		}

	}
</style>
