<template>
	<view>
		<view v-if="!userInfo">
			<!--获取用户信息 -->
			<button @getuserinfo='getUserInfo' open-type="getUserInfo" type="primary" class='login'>微信授权登录</button>
		</view>
		<view v-else>adsadadsa</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {

			};
		},
		methods: {
			//授权回调
			getUserInfo(e) {
				console.log(e)
				// this.doLogin();
				if (e.detail.userInfo) {
					//用户按了允许授权按钮
					// this.doLogin();
					this.$store.state.userInfo = e.detail.userInfo;
				} else {
					//用户按了拒绝按钮
					wx.showModal({
						title: '登陆失败',
						content: '为了更好的体验，请为小程序授权',
						// success: function(res) {
						// 	if (res.confirm) {
						// 		console.log('用户点击确定')
						// 	} else {
						// 		console.log('用户点击取消')
						// 	}
						// }
					})

					wx.hideLoading();
				}
			}
		},
		computed: {
			...mapState(['userInfo'])
		}
	}
</script>

<style lang="scss">
	// .tost_ask {
	// 	width: 300rpx;
	// 	height: 300rpx;
	// 	background-color: #4CD964;
	// 	display: block;
	// 	aling-items: centrer;
	// 	align-items: center
	// }
</style>
