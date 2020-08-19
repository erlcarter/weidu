var header = 'https://test.youxiniao.net:44336';
function url(path){
	return header + path;
}
var urls = {
	addWxuser: url('/api_user/addWxuser'), //微信的open_id 和基本信息添加 用户,并返回该用户的基本信息
	index_get: url('/api/index_get'),  //获取首页的基本信息（活动列表+店铺列表）
	course_list_get: url('/api/course_list_get'), //获取课程列表
	book_apply: url('/api/book_apply'), //申请预约信息
	book_sift_info_get: url('/api/book_sift_info_get'), //获取预约页面的筛选数据（店铺+加课程）
	getCourse_list: url('/api/getCourse_list'),
	getSchool_dorm: url('/api/getSchool_dorm'),
	getschool_course_table: url('/api/getschool_course_table'),
	getCompany_deposit: url('/api/getCompany_deposit'),
	getStroy_list: url('/api/getStroy_list'),
	getStroy_info: url('/api/getStroy_info'),
	get_oder_agent: url('/order/get_oder_agent'),
	get_oder_user: url('/order/get_oder_user'),
	get_combio_order_info: url('/order/get_combio_order_info'),
	create_combo_order:url('/order/create_combo_order'),
	set_combo_order_offlinePay: url('/order/set_combo_order_offlinePay'),
	getCompany_data: url('/api/getCompany_data'),
	get_oder_agent:url('/order/get_oder_agent'),
	pay_recharge: url('/order/pay_recharge')
}
export default urls;

// import $C from '@/static/config.js'
// export default{
// 	function urls(options = {} ){
// 		options.url = $C.webUrl + options.url
// 		options.method = options.method || this.common.method
// 		options.header = options.header || this.common.header
		
// 		 return uni.request(options);
// 	}
// 	function get(url,data = {},options = {}){
// 		options.url =url
// 		options.data =data
// 		options.method = 'POST'
// 		return this.urls(options)
// 	}
	
// }

// onRequest({ url:'',data:{ index:'',count:'' }})