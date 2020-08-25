import Vue from 'vue'
import Vuex from 'vuex'
import urls from '../static/urls'
let { addWxuser } = urls

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		img_http:'http://weiduimg.youxiniao.net/',
		img_end:'?imageView2/0/w/450',
		open_id:null,
		userInfo:null,//微信个人信息
		info: uni.getStorageSync('userInfo'),  //后台返回的个人信息
		body_style:'',
		body2_style:'',
		nav_top:'',
		header:{},
		name:'',
		order:{},
		call:null //客服信息
	},
	// 同步更改值
	mutations:{
		//查看大图
		onImg(state,url){
			url = url.includes('https')?url:state.img_http + url;
			console.log(url)
			uni.previewImage({
				urls:[url]
			})
		},
		//打电话
		onPhone(state,data){
			uni.makePhoneCall({
			    phoneNumber: data //仅为示例
			});
		},
		order_data(state,obj){
			let order = state.order;
			order = { ...order,...obj };
			state.order = order;
			console.log('要创建的订单的数据',order);
		},
		init(state,_state){
			state = Object.assign(state,_state);
			console.log(state)
		},
		openWin(state,{ name,url }){
			let id = state.info?.id;
			console.log('用户目前的id',id)
			if(!id){
				uni.switchTab({
				    url: '/pages/mine/mine',
					complete:() => {
						uni.showToast({
							title:'请先登录',
							icon:'none'
						})
					}
				});
				return;
			}
			state.name = name;
			uni.navigateTo({
			   url,
			})
		},
	
	
	},
	//异步
	actions:{
		//统一下单
		async place_pay({ state,dispatch },data){
			// data = { uiid:1,open_id:'oAZBL5AQCde90AOebwa-ux84HSAQ',order_id:'35' }
			console.log(data)
			uni.showLoading({
				title:'支付中'
			})
			let res = await dispatch('onRequest',{ url:pay_recharge,data });
			console.log(res.data)
			if(res.data.status == 1){
				let _data = res.data.data;
				let { timeStamp,nonce_str:nonceStr,prepay_id,sign:paySign } = _data;
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp,
				    nonceStr,
				    package: `prepay_id=${prepay_id}`,
				    signType: 'HMAC-SHA256',
				    paySign,
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
								uni.navigateBack({
								    delta: 4,
										complete:() => {
											uni.showToast({
												title:'支付成功'
											})
										}
								});
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
								uni.showToast({
									title:'支付失败',
									icon:'none'
								})
				    }
				});
			}else{
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		},
		//创建订单
		async onOrder({ state,dispatch }){	
			let data = state.order;
			data.u_id = state.info.id;
			
			// data = { u_id:1,nickname:'方洪斌',school_id:1,course_id:2,dorm_id:1,phone:'13717438766',code:'1',start_date:1587696103100,week:'w_4',mail:'1170323376@qq.com' };
			
			console.log(data)
			let res = await dispatch('onRequest',{ url:create_combo_order,data })
			if(res.data.status == 1){
				console.log('创建订单成功',res.data.data)
				return res.data.data;
			}
		},
		// 请求模块
		onRequest({ state },obj){
			let { url,data,method } = obj;
			return new Promise((resolve,reject) => {
				uni.request({
					url,
					data,
					method:method?method:'POST',
					//请求头
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					success:(res) => {
						resolve(res)
					},
					fail:(err) => {
						console.log("失败"+err)
					}
				})
			})
		},
		
		//获取openid和微信个人信息后注册并获取保存到后台的个人信息
		async onLogin({ state,dispatch },{ open_id,userInfo }){
			console.log(urls)
			console.log(addWxuser)
			uni.showLoading({ title:'加载中' });
			state.userInfo = userInfo;
			let { nickName:nickname,avatarUrl:avatar,gender:sex,city } = userInfo;
			let data = { open_id,nickname,avatar,sex,city };
			console.log(data)
			let res = await dispatch('onRequest',{ url: addWxuser,data });
			console.log(res)
			if(res.data.status == 1){
				state.info = res.data.data;
				uni.hideLoading();
				uni.setStorageSync('userInfo',res.data.data);
				return res.data.data;
			}
		},
		// getOpenId 获取用户唯一openid
		getOpenId({ state }){
			return new Promise(resolve => {
				//云开发初始化
				wx.cloud.init({raceUser: true})
				//获取openid
				wx.cloud.callFunction({
				        name:'login',
				        data:{},
				        success: res => {
				          let open_id = res.result.openid;
				          console.log('openid:',open_id)
									state.open_id = open_id;
									resolve(open_id)
				        }
				})
			})
		},
		
		getUserInfo({ state }){
			return new Promise(resolve => {
				uni.getUserInfo({
				  success: res => {
				    console.log('微信个人信息：',res.userInfo)
					state.userInfo = res.userInfo;
					resolve(res.userInfo)
				  }
				})
			})
		},
	}
	
})