<template>
	<div class="bindding" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../static/images/radian_1.png" alt="">
		<div class="content">
			<p>验证信息</p>
			<p>
				·由于学员作品均有隐私性,所以我们规定只有同时会员身份或者是会员身份的监护人才具有查看其作品的权利.
				<br>
				·输入学员的姓名后,学员信息会与此账号绑定在一起.若想更改则进入我的主页→我在资料→更改绑定学员.
			</p>
			<div class="input_btn">
				<p>学员名:</p>
				<input type="text" v-model="addressData.name" placeholder="点击填写">
			</div>
			<div class="input_btn">
				<p>手机号码</p>
				<input type="number" v-model="addressData.mobile" placeholder="点击填写" maxlength=11>
			</div>



			<div class="_bind_but">
				<button @click="onBind">绑定</button>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
				}
			};
		},
		// 小程序的生命周期  进来就执行
		onLoad(e) { 
			
		},
		//计算属性
		computed:{
			...mapState(['info'])
		},
		methods: {
			...mapActions(['onRequest']), //请求模块
			
			onBind() {
				let data = this.addressData;
				console.log(JSON.stringify(data))
				//判断 用户输入 任何一栏为空 就不往下执行
				if(data.name == '' || data.mobile == '') {
					uni.showToast({
						title:'请输入信息',
						icon:'none'
					})
					return;
				}
				//----------------------
				let url = this.$urls.addWxuser_bind;  //获取完整url地址
				console.log("完整url地址:" + url)
				
				this.onRequest({
					url,
					data: {
						uiid:this.info.uiid,  //用户id
						list:JSON.stringify([{student_name:data.name,phone:data.mobile}])
					},
				}).then(res => {
					console.log(res)
					if(res.data.status == 1){
						// console.log(res.data.data)
						//设置本地数据缓存
						uni.setStorageSync('bindding', true);
						// 弹窗
						uni.switchTab({
							url: '/pages/mine/mine',
							complete: () => {
								uni.showToast({
									title: '绑定成功'
								})
							}
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						})
					}
				})
			
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



	.content {
		margin: 7% 5% 0% 5%;
	}

	.content>p:nth-child(1) {
		width: 29.2vw;
		height: 7.2vw;
		font-size: 4.8vw;
		font-family: Noto Sans CJK SC;
		font-weight: bold;
		line-height: 7.2vw;
		color: rgba(127, 137, 113, 1);
		opacity: 1;
	}

	.content>p:nth-child(2) {
		width: 89.33vw;
		height: 19.47vw;
		font-size: 3.2vw;
		font-family: Noto Sans CJK SC;
		font-weight: 300;
		line-height: 4.8vw;
		color: rgba(127, 137, 113, 1);
		opacity: 1;

		padding-bottom: 7%;
		padding-top: 3%;
	}

	.input_btn {
		width: 89.33vw;
		height: 13.33vw;
		background: rgba(224, 229, 223, 1);
		border: 0px solid rgba(184, 196, 182, 1);
		opacity: 1;
		border-radius: 3vw;
		margin-top: 5%;

		line-height: 13.33vw;
		display: flex;

		p {
			width: 25vw;
			font-size: 3.73vw;
			font-family: Noto Sans CJK SC;
			font-weight: 300;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			// padding-left: 76rpx;
			text-align: right;
		}

		input {
			font-size: 3.73vw;
			font-family: Noto Sans CJK SC;
			font-weight: bold;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			margin: 4%;
			margin-left: 56rpx;
			
		}


	}

	._bind_but {
		width: 90%;
		position: fixed;
		bottom: 0;
		text-align: center;
		background-color: #FFFFFF;
		padding: 3% 0 60rpx 0;

		button {
			text-align: center;
			background-color: #7f8971;
			border-radius: 20rpx;
			width: 400rpx;
			height: 13.33vw;
			line-height: 100rpx;
			overflow: hidden;
			font-weight: 600;
			font-size: 26rpx;
			letter-spacing: 1.4rpx;
			color: #ffffff;
			letter-spacing: 4rpx;
		}
	}
</style>
