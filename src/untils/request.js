//引入axios
import axios from "axios"
//引入router
import router from "../router/index.js"

//引入qs
import QS from 'qs'
//设置接口环境切换
// if(process.env.NODE_ENV == "development"){
// 	axios.defaults.baseURL = config.development;
// }else if(process.env.NODE_ENV == "production"){
// 	axios.defaults.baseURL = config.production;
// }

//自定义axios实例
var instance = axios.create({
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 1000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // 默认的
});

// // 添加请求拦截器
axios.interceptors.request.use(function (config) {
	//获取本地存储的数据
	const token = localStorage.getItem("token");
	//如果token不为空,那么则将token通过headers发送给后台
	if(token){
		config.headers.Authorization = "Bearer " +token;
	}
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器7
axios.interceptors.response.use(function (response) {
	// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
	// 否则的话抛出错误
	if (response.status === 200) {            
	    return Promise.resolve(response);        
	} else {            
	     return Promise.reject(response);        
    }  
    
    // 对响应数据做点什么
    return response
  }, function (error) {
	 if (error.response.status) {  
		// 401: 未登录
		// 未登录则跳转登录页面，并携带当前页面的路径
		// 在登录成功后返回当前页面，这一步需要在登录页操作。
		switch (error.response.status) { 
			case "401" : 
				router.replace({                        
					path: '/login',                        
					query: { 
						redirect: router.currentRoute.fullPath 
					}
				});
				break;
			case "403":
			    // 清除token
				storage.removeLocalStroageData("token");
			    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
			    setTimeout(() => {                        
			        router.replace({                            
			            path: '/login',                            
			            query: { 
			                redirect: router.currentRoute.fullPath 
			            }                        
			        });                    
			    }, 1000);                    
			    break; 
		}
		 return Promise.reject(error.response);
	 }   
	  
    // 对响应错误做点什么
    return Promise.reject(error);
});


//封装get接口的请求
function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
//封装post接口的请求
function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, QS.stringify(params))        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)           
        })    
    });
}


export default {
	get,
	post
}