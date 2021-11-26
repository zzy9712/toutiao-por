import axios from "axios";

// 在非组件模块获取 store 必须通过这种方式
// 这里单独加载 store ，和组件中的 this.$store 是一致的
import store from "../store/index.js"

const request = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/'
    // baseURL: 'http://www.liulongbin.top:8000'
    baseURL: 'http://toutiao.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    const { user } = store.state

    // 如果已经登录，统一给接口设置token信息
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // 处理完之后要返回config
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default request