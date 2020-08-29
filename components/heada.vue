<template>
	<page-meta>
		<navigation-bar />
	</page-meta>
    <view>
        <view class="status_bar">
            <!-- 这里是状态栏 -->
        </view>
		
		<!-- 这是标题 -->
        <header>
        	<img model="widthFix" class="head_title" src="/static/images/head1.png" alt="" />
        </header>
    </view>

</template>



<script>
	export default {
		data() {
			return {

			}
		},
	}
</script> 


<style lang="scss">
	
	 .status_bar {
			// position: fixed;
			// top: 0;
	        height: var(--status-bar-height);
	        width: 100%;
			// background: #7F8971;
			z-index: 99;
	    }
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		 padding-top: 50rpx;
		// padding-top: var(--status-bar-height);
		.head_title {
			// padding-top: 58rpx;
			/*318*76*/
			width: calc(750rpx * 116 / 375);
			height: calc(750rpx * 48 / 375); 
			// height: var(--status-bar-height);
		}
	}
</style>
 