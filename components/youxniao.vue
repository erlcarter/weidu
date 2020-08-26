<template>
	<div class="skill_company" >
		<div>
			<img  src="../static/images/icon/company.png" alt="" @click="goTo()">
			<p>优息鸟科技提供技术支持</p>
		</div>
	</div>
</template> 

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			goTo(){
				wx.navigateToMiniProgram({
				  appId: 'wx6bab3d2f5d3a4393',
				  extraData: {
				    foo: 'bar'
				  },
				  envVersion: 'release',
				  success(res) {
				    // 打开成功
				  }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
		//youxiniao技术支持
		.skill_company {
			padding-top: 20%;
			padding-bottom: 10%;
			text-align: center;

			img {
				width: 100rpx;
				height: 65rpx;
				object-fit: cover;
			}

			p {
				font-weight: 300;
				font-size: 20rpx;
				color: #b8c4b6;
			}
		}
</style>
