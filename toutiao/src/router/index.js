import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
//  component: () => import ("../views/login") 的写法相当于
// import login from '../views/login' ; component: login;

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ("../views/login/")
    },
    {
        path: '/', //默认子路由
        component: () =>
            import ("../views/layout/"),
        children: [{
            path: '',
            name: 'home',
            component: () =>
                import ("../views/home/"),
        }, {
            path: '/qa',
            name: 'qa',
            component: () =>
                import ("../views/qa/"),
        }, {
            path: '/video',
            name: 'video',
            component: () =>
                import ("../views/video/"),
        }, {
            path: '/my',
            name: 'my',
            component: () =>
                import ("../views/my/"),
        }]

    }
]

const router = new VueRouter({
    routes
})

export default router