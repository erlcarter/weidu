<template>
	<div class="course" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<div class="content">
			<p class="titile" v-text="data.name">幼儿班</p>
			<div class="age">
				<p>适合年龄: <span v-text="data.year">7-13</span></p>
			</div>
			<p class="text" v-text="data.c_desc">
				集合思维、想象、多感体验、情感表达为一体，
			</p>
			<div v-for='value in data.imgs' class="img_list">
				<img mode="widthFix" :src="img_http + value+ img_end" alt="" />
			</div>
		</div>

		<!-- footer -->
		<Foote></Foote>
	</div>
</template>

<script>
	import Foote from "@/components/footer"
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				id: null,
				data: null,
				course_list: []
			}
		},
		// 小程序生命周期
		onLoad(e) {
			//接收course.list传过来的id
			console.log("course.list传过来的id为:" + e.id)
			this.id = e.id;

			this.getData()
		},
		methods: {
			...mapActions(['onRequest']), //请求模块
			//获取数据
			getData() {
				let url = this.$urls.course_list_get;
				console.log("请求接口完整路径为：" + url)
				this.onRequest({
					url
				}).then(res => {
					console.log("返回成功的res所有数据:")
					console.log(res)
					console.log(res.data.data)
					//以下status都必须都等于 1才才算成功
					if (res.data.status == 1) {
						this.course_list = res.data.data
						// console.log(this.course_list)

						// 循环遍历course_list这个数组
						for (var i = 0; i < this.course_list.length; i++) {
							//切割course_list中的每一项img
							this.course_list[i].imgs = this.course_list[i].imgs.split(',')

							if (this.course_list[i].id == this.id) {
								this.data = this.course_list[i];
								console.log(this.data)
							}
						}


					}
				})
			}
		},
		components: {
			Foote
		},
		computed: {
			...mapState(['img_http', 'img_end'])
		}
	}
</script>
<style lang="scss" scoped>
	.radian {
		position: fixed;
		top: 0;
		width: 100%;
	}

	.content {
		margin: 8.53% 5% 25% 5%;
		// width: 100%;

		.titile {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;

			opacity: 1;
			//限制文本在一行中只能输入多长的文字：超出省略
			overflow: hidden; //隐藏
			white-space: nowrap; //不换行
		}

		.age {
			width: 24vw;
			// height: 4.27vw;
			// line-height: 4.27vw;
			background: rgba(164, 152, 136, 1);
			opacity: 1;
			border-radius: 1vw;
			// margin: 3% 0% 5% 0%;
			margin: 8rpx 0 32rpx 0;

			p {
				text-align: center;
				height: 4.6vw;
				font-size: 2.8vw;
				font-family: Noto Sans CJK SC;
				font-weight: bold;
				line-height: 4.6vw;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
				letter-spacing: 1rpx;
			}
		}

		.text {
			width: 89.33vw;
			// height: 19.47vw;
			font-size: 3.2vw;
			font-family: Noto Sans CJK SC;
			font-weight: 300;
			line-height: 4.8vw;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			margin-bottom: 64rpx;
		}

		.img_list img {
			display: block;
			width: 89.55vw;
		}
	}
</style>
