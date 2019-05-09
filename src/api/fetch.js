import axios from 'axios'
import router from '../router/index'
import Cookies from 'js-cookie'

//request header 根据需求添加
// axios.defaults.baseURL = 'http://test.178lottery.com';
// axios.defaults.headers.post['encryptDisable'] = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  //全局加token
  let token=localStorage.getItem('token');
  if(token){
    config.headers.Authorization=token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.errorCode === 24 && response.data.errorMsg === "需要登录") {
    alert("身份过期，请先登录");
    setTimeout(() => {
      router.push('/login')
    }, 1500)

  } else {
    return response;
  }

}, function (error) {
  // 对响应错误做点什么

  return Promise.reject(error);
});

export default axios