<template>
	<div class="reservation" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">
		<div class="reservation_btn">



			<div class="content">

				<from @submit="formSubmit">
					<div class="fill">
						<p class="item">微信名</p>
						<!-- <open-data class="input_btn2" type="userNickName"></open-data> -->
						<input class="input_btn" type="userNickName" v-model="info.username" placeholder="点击填写">
					</div>

					<block v-for="item in data">
						<div class="fill">
							<p class="item">学员姓名</p>
							<input class="input_btn" type="text" v-model="item.student_name" placeholder="点击填写">
						</div>

						<div class="fill">
							<p class="item">手机号码</p>
							<input class="input_btn" type="text" v-model="item.phone" placeholder="点击填写">
						</div>

					</block>
				</from>
				<p class="hint">
					·更改学员姓名后,主页关联的课程和作品都会同步更新变化
					<br>
					·最多绑定5个学员
				</p>
			</div>
			<!-- 提交确定按钮 -->
			<div class="submit">
				<button class="submit_but" @click="confirm">
					<p>确定</p>
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				data: []
			};
		},
		methods: {
			...mapActions(['onRequest']), //请求模块 

			// 提交表单
			confirm() {
				console.log(this.data)

				let data = this.data;
				// data.nickName的nickName是自己取的 控制台可显示 因为他是那全局的（userInfo.nickName来默认显示）
				data.username = this.info.username;
				console.log(JSON.stringify(data))
				//----------------------------------------
				let url = this.$urls.addWxuser_bind; //获取完整url地址
				console.log("完整url地址:" + url)
				this.onRequest({
					url,
					data: {
						uiid: this.info.uiid, //用户id
						list: JSON.stringify(this.data)
					},
				}).then(res => {
					console.log(res)
					if (res.data.status == 1) {
						uni.navigateBack()
						// this.data = res.data.data;
						uni.setStorageSync('userInfo',res.data.data)
						this.$store.state.info = res.data.data;
						console.log("获取数组列表数据")
						console.log(data)
						uni.showToast({
							title:'修改成功'
						})
					
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
				})
				

			},
			getData(){
				let url = this.$urls.addWxuser_bind_get;
				this.onRequest({
					url,
					data: {
						uiid: this.info.uiid, //用户id
					},
				}).then(res => {
					console.log(res)
					if (res.data.status == 1) {
						this.data = res.data.data;
						console.log(this.data)
					}
				})
			}
		},
		//生命周期
		mounted() {
			console.log(this.info)
			this.getData();
		},
		//计算属性
		computed: {
			...mapState(['info'])
		},
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.reservation_btn {
		margin: 8.33% 5% -20% 5%;


		.content {
			margin: 10% 0% 10% 0%;

			.fill {
				width: 89.33vw;
				height: 13.33vw;
				background: rgba(224, 229, 223, 1);
				border: 0px solid rgba(184, 196, 182, 1);
				opacity: 1;
				border-radius: 3vw;
				margin-top: 5%;

				line-height: 13.33vw;
				display: flex;

				// text-align: center;
				// 填写项
				.item {
					width: 25vw;
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: 300;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					// padding-left: 76rpx;
					text-align: right;
				}

				// 填写
				.input_btn {
					// width:14.93vw;
					height: 5.33vw;
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: bold;
					line-height: 5.33vw;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					margin: 4%;
					margin-left: 56rpx;
				}

				.input_btn2 {
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: bold;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					margin: 0%;
					margin-left: 56rpx;
				}



				// .select {
				// 	font-size: 3.73vw;
				// 	font-family: Noto Sans CJK SC;
				// 	font-weight: bold;
				// 	color: rgba(127, 137, 113, 1);
				// 	opacity: 1;
				// 	margin-left: 56rpx;
				// }


			}

			.hint {
				margin-top: 7%;
				font-size: 24rpx;
				font-weight: 300;
				color: #7f8971;
			}
		}

		.submit {
			margin: 0% 20%;
			padding-top: 5%;

			.submit_but {
				margin-bottom: 8%;
				position: fixed;
				bottom: 0;
				width: 53.33vw;
				height: 13.33vw;
				background: rgba(127, 137, 113, 1);
				opacity: 1;
				border-radius: 3vw;
				height: 13.33vw;
			}

			p {
				margin: 8% 0;
				text-align: center;
				// width:20vw;
				height: 5.33vw;
				font-size: 3.73vw;
				font-family: Noto Sans CJK SC;
				font-weight: bold;
				line-height: 5.33vw;
				color: rgba(255, 255, 255, 1);
				letter-spacing: 100rpxpx;
				opacity: 1;
			}

		}
	}
</style>
