import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'

const register = resolve => require(['./../components/register/register.vue'], resolve)
const home = resolve => require(['./../components/home/index.vue'], resolve)
const my = resolve => require(['./../components/my/my.vue'], resolve)
const allmembers = resolve => require(['./../components/allmembers/allmembers.vue'], resolve)
const member = resolve => require(['./../components/membershuo/membershuo.vue'], resolve)

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: login
    }, {
        path: '/register',
        name: 'register',
        component: register
    }, {
        path: '/login',
        component: login
    }, {
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/my',
        name: 'my',
        component: my
    }, {
        path: '/allmembers',
        name: 'allmembers',
        component: allmembers
    }, {
        path: '/member/:id',
        name: 'member',
        component: member
    }]
})