<template>
	<div class="reservation" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">
		<div class="reservation_btn">
			<p class="text1">请填写预约资料</p>
			<p class="prompt">我们将会在24小时内通过电话方式联系您,请保持电话畅通.</p>
			<div class="content">
				<div class="fill">
					<p class="item">学员名</p>
					<input class="input_btn" type="text" v-model="addressData.name" placeholder="点击填写">
				</div>

				<!--mode为 selector 或 multiSelector 时，range 有效 ，默认 mode = selector , mode可以不写-->
				<picker :range="addressData.courselist" @change="_select">
					<div class="fill">
						<p class="item">选择课程</p>
						<p class='select'>{{addressData.course}}</p>
					</div>
				</picker>

				<div class="fill">
					<p class="item">手机号码</p>
					<input class="input_btn" type="number" v-model="addressData.phone" placeholder="点击填写" maxlength=11>
				</div>

				<picker :range="addressData.shoplist" @change="shop_sele">
					<div class="fill">
						<p class="item">选择店面</p>
						<p class="select">{{addressData.shop}}
							<p />
					</div>
				</picker>

			</div>
			<!-- 预约提交按钮 -->
			<div class="submit">
				<button class="submit_but" @click="confirm">
					<p>预约</p> 
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					name: '',
					phone: '',

					course: '点击选择',
					courselist: ['素描', '油画', '插画'],

					shop: '点击选择',
					shoplist: ['白云店', '黄沙店']
				}

			};
		},
		onLoad(option) {},
		methods: {
			_select(e) {
				console.log(e.detail.value);
				let {
					courselist
				} = this.addressData;
				this.addressData.course = courselist[+e.detail.value]
			},
			shop_sele(e) {
				console.log(e.detail.value);
				let {
					shoplist
				} = this.addressData;
				console.log(shoplist[+e.detail.value])
				// 如果改变的是数组要用$set（）
				// this.$set(this.addressData,'shop',shoplist[+e.detail.value])
				this.addressData.shop = shoplist[+e.detail.value]
			},

			//提交
			confirm() {
				let {name,phone,course,shop} = this.addressData;
				let data = { name,phone,course,shop }
				console.log(JSON.stringify(data))
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

	.reservation_btn {
		margin: 8.53% 5% 0% 5%;

		.text1 {
			font-size: 4.8vw;
			font-family: Noto Sans CJK SC;
			font-weight: bold;
			line-height: 7.2vw;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
		}

		.prompt {
			width: 81.87vw;
			height: 4.8vw;
			font-size: 3.2vw;
			font-family: Noto Sans CJK SC;
			font-weight: 300;
			line-height: 4.8vw;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			margin-top: 2%;

			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}

		.content {
			margin: 8.53% 0% 10% 0%;

			.fill {
				width: 89.33vw;
				height: 13.33vw;
				background: rgba(224, 229, 223, 1);
				border: 1px solid rgba(184, 196, 182, 1);
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
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: bold;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					margin: 4%;
					margin-left: 56rpx;
				}

				.select {
					font-size: 3.73vw;
					font-family: Noto Sans CJK SC;
					font-weight: bold;
					color: rgba(127, 137, 113, 1);
					opacity: 1;
					margin-left: 56rpx;
				}


			}
		}

		.submit {
			// margin: 0% 20%;
			// margin: 3% 25% 50rpx 25%;
			width: 90%;
			display: flex;
			// justify-content: center;
			align-items: center;
			// transform: translate(0rpx, -63rpx);
			position: fixed;
			bottom: 6%;
			background: Transparent;

			.submit_but {
				// margin-bottom: 60rpx;
				// padding: 3% 20% 50rpx 20%;

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
