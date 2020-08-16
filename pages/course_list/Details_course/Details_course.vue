<template>
	<div class="course" style="overflow-x:hidden;">
		<img mode="widthFix" class="radian" src="../../../static/images/radian_1.png" alt="">
		<div class="content" v-for="index in con_list" :key="index">
			<p class="titile" v-text="titile">幼儿班</p>
			<div class="age">
				<p>适合年龄: <span v-text="age">7-13</span>岁</p>
			</div>
			<p class="text"v-text="text">
				集合思维、想象、多感体验、情感表达为一体，
			</p>
			<img mode="widthFix" :src="index.src" alt="">
		</div>

		<!-- footer -->
		<Foote></Foote>
	</div>
</template>

<script>
	import Foote from "@/components/footer"

	export default {
		data() {
			return {
				titile:"幼儿启蒙班",
				age:"7-12",
				text:`集合思维、想象、多感体验、情感表达为一体，
				借助故事、思维游戏、音乐等拓展情境，
				在平面创意的基础上增加了立体创意，
				使绘画更具趣味性和互动性，让孩子多元智能得到充分开发。`,
				con_list:[{
					src:"https://s1.ax1x.com/2020/08/10/aHVm9J.png"
				}]
			}
		},
		components: {
			Foote
		},

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
			width: 30vw;
			height: 7.2vw;
			font-size: 4.8vw;
			font-family: Noto Sans CJK SC;
			font-weight: bold;
			line-height: 7.2vw;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			//限制文本在一行中只能输入多长的文字：超出省略
			overflow: hidden; //隐藏
			white-space: nowrap; //不换行
		}

		.age {
			width: 28vw;
			height: 4.27vw;
			line-height: 4.27vw;
			background: rgba(164, 152, 136, 1);
			opacity: 1;
			border-radius: 1vw;
			margin: 3% 0% 5% 0%;

			p {
				text-align: center;
				height: 4vw;
				font-size: 2.6vw;
				font-family: Noto Sans CJK SC;
				font-weight: bold;
				line-height: 4vw;
				color: rgba(255, 255, 255, 1);
				opacity: 1;
			}
		}

		.text {
			width: 89.33vw;
			height: 19.47vw;
			font-size: 3.2vw;
			font-family: Noto Sans CJK SC;
			font-weight: 300;
			line-height: 4.8vw;
			color: rgba(127, 137, 113, 1);
			opacity: 1;
			margin-bottom: 8.53%;
		}
	}
</style>
