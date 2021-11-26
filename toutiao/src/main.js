import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自动设置 rem 基准值（HTML 标签字体大小）
import 'amfe-flexible'

// 全局样式
import '../styles/index.less'

// 全局引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

// 创建 vue 根实例
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')