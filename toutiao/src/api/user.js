import request from "../utils/request";

// 在非组件模块获取 store 必须通过这种方式
// 这里单独加载 store ，和组件中的 this.$store 是一致的
import store from "../store/index.js"

// 登录注册
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/:mobile${mobile}`,
    })
}

// 获取用户个人信息
export const userInfo = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/profile`
            // headers: {
            //     Authorization: `Bearer${store.state.user.token}`
            // }
    })
}