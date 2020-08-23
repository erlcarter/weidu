<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		onLaunch: function() {
			// let that = this;
			// //获取openid和微信个人信息去调用登录注册接口
			// Promise.all([this.getOpenId(),this.getUserInfo()]).then(res => {
			// 	let [open_id,userInfo] = res;
			// 	that.onLogin({open_id,userInfo})
			// })
			// console.log('App Launch');
			// let res = uni.getMenuButtonBoundingClientRect();
			// let { top,height } = res;
			// //头部真正的高度,15是padding-bottom，也是body层的top值
			// let body_top = top + height + 15;
			// //header组件要设置的高度
			// let header_height = top + height;
			// let body_style = `top:${body_top}px;height:calc(100% - ${body_top}px)`;
			// let nav_top = `top:${body_top}px;`;
			// let body2_style = `top:${body_top+40}px;height:calc(100% - ${body_top+40}px)`;
			// console.log('body_style:',body_style)
			// let header = { height: top + height,top,menu_h:height }
			// let state = { body_style,header,nav_top,body2_style };
			// this.$store.commit('init',state);
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			// ...mapActions(['getOpenId','getUserInfo','onRequest','onLogin'])
		}
	};
</script>

<style lang="scss">
	// 官方页面公共css
	// @import  "./common/uni.css"; 
	// 动画库
	// @import  "./common/animate.min.css";
	button::after {
		border: none;
		outline: 0;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	
	
</style>
