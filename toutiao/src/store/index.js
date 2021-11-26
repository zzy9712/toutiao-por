import Vue from 'vue'
import Vuex from 'vuex'

// 导入封装的操作本地缓存模块
import { getItem, setItem, remItem } from '../utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 当前登录用户登录状态，(token 等数据)
        user: getItem('user')
    },
    mutations: {
        setUser(state, data) {
            state.user = data
                // 为了防止页面数据刷新丢失，我们还需要把数据放到本地存储中，这仅仅为了数据持久化
            setItem('user', state.user)
        }
    },
    actions: {},
    modules: {}
})