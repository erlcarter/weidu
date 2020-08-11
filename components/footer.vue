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
		position: fixed;
		bottom: 0;
		padding: 4% 5% 5% 5%;
		display: flex;
		background-color: #ffffff;
		width: 100%;
		flex: 1;

		// z-index: 9;
		// position: fixed;

		.foo_left {
			margin-right: 4%;
			border-radius: 9rpx;
			border: 2rpx solid #7f8971;
			width: 318rpx;
			height: 78rpx;
			overflow: hidden;

			p {
				text-align: center;
				line-height: 78rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 1.4rpx;
				color: #7f8971;
			}
		}

		.foo_right {
			background-color: #7f8971;
			border-radius: 10rpx;
			width: 320rpx;
			height: 80rpx;
			overflow: hidden;

			p {
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 1.4rpx;
				color: #ffffff;

			}
		}

	}
</style>
