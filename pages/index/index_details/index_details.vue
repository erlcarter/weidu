<template>
	<div class="details" style="overflow-x:hidden;">
		<img class="radian" mode="widthFix" src="@/static/images/radian_1.png" alt="">
		<div class="details_btn" v-for="value in details_list" :key="value">
			<p class="text1"  v-text="value.text1">维度 - 维度艺术&招商银行</p>
			<p class="date"  v-text="value.date">2017-03-08</p>

			<div class="content">
				<img mode="widthFix" :src="value.src" alt="afe0QU.jpg" border="0" />
				<p v-text="value.content">当妈妈是世界上最辛苦的工作</p>
			</div>

		</div>
		<!-- <footer />  -->
		<Foote></Foote>
		
	</div>
		

	
</template>

<script>
	import Foote from "@/components/footer"
	export default {
		data() {
			return {
				details_list:[
					{
						text1:"维度 - 维度艺术&招商银行，女神节黏土画动作回顾",
						date:'2020-03-08',
						src: 'https://s1.ax1x.com/2020/08/07/afttRe.md.jpg',
						content:`当妈妈是世界上最辛苦的工作，也是世界上最幸福的工作。她们精心呵护、养育着自己的孩子，不断地付出，并陪伴成长。`
					}
				]
			}
		},
		methods: {

		},
		components: {
			Foote
		},
	}
</script>

<style lang="scss" scoped>
	.radian {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.details_btn {
		padding-bottom: 160rpx;
		margin: 7% 5% 0% 5%;

		// background-color: #4CD964;
		.text1 {
			font-size: 32rpx;
			font-weight: 700;
			color: #7f8971;
		}

		.date {
			margin: 2% 0% 5% 0%;
			font-size: 24rpx;
			font-weight: 300;
			color: #7f8971;
		}

		.content img {
			width: 100%;
			height: 888rpx;
		}

		.content p {
			margin-top: 3%;
			font-size: 24rpx;
			font-weight: 300;
			color: #606060;
		}
	}

</style>
