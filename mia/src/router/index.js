import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Classify from '@/components/classify'
import Shopping from '@/components/shopping'
import Sign from '@/components/sign'
import Register from '@/components/register'
import List from '@/components/list'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',redirect:'index'},
    { path: '*',redirect:'index'},
    { path: '/index',name:'index',component:Index},
    { path: '/classify',name:'classify',component:Classify},
    { path: '/shopping',name:'shopping',component:Shopping},
    { path: '/sign',name:'sign',component:Sign},
    { path: '/register',name:'register',component:Register},
    { path: '/list',name:'list',component:List},
    { path: '/detail/:id',name:'detail',component:Detail}
  ]
})
