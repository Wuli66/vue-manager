import VueRouter from "vue-router"
import Vue from 'vue'
import Main from '../view/Main'
import Home from '../view/Home'
import User from '../view/User'
import Mall from '../view/Mall'
import PageOne from '../view/PageOne'
import PageTwo from '../view/PageTwo'
import Login from    '../view/Login'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name:'Main',
            component: Main,
            redirect: '/home', //重定向
            children: [
                //自路由写死的状态
                // {
                //     path: 'home',
                //     name: 'home',
                //     component: Home
                // },
                // {
                //     path: 'user',
                //     name: 'user',

                //     component: User
                // },
                // {
                //     path: 'mall',
                //     name: 'mall',

                //     component: Mall
                // },
                // ,
                // {
                //     path: 'page1',
                //     name: 'page1',

                //     component: PageOne
                // },
                // {
                //     path: 'page2',
                //     name: 'page2',

                //     component: PageTwo
                // }
            ]
        },
        {   
            path:'/login',
            name:'login',
            component:Login,
        }

    ]

})

router.beforeEach((to, from,next) => {
    const token = Cookie.get('token');
    //token 不存在 并且跳转的不是login页面，否则next死循环
    if(!token && to.name !== 'login') {
        next({name:'login'})
    }else if(token && to.name == 'login'){ //token存在，说明用户登陆，此时跳转至首页
        console.log("from",from);
        next({name:'home'});
    }else {
        next(); 
    }
})

export default router