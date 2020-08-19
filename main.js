import Vue from 'vue'
import App from './App'
import store from './store/store'
Vue.prototype.$store = store
//引入请求库
import urls from './static/urls.js'
Vue.prototype.$urls = urls


Vue.config.productionTip = false
// Vue.component('Header',Header)
// Vue.component('Nothing',Nothing)
// Vue.component('Call',Call)
//时间戳过滤器返回指定日期格式
// Vue.filter('onDate',function(time){
// 	let date = new Date(time * 1000);
// 	let year = date.getFullYear();
// 	let month = date.getMonth() + 1;
// 	let day = date.getDate();
// 	return `${year}/${month}/${day}`;
// })

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
