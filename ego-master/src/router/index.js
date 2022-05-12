import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/home.vue'
import Login from '@/views/Login/Login.vue'

const Params=()=>import('@/views/Params/params.vue')
const Order=()=>import('@/views/Order/order.vue')
const Advert=()=>import('@/views/Advert/Advert.vue')
const Goods=()=>import('@/views/Goods/Goods.vue')
const OrderList=()=>import('@/views/Order/OrderList/index.vue');
const OrderBack=()=>import('@/views/Order/OrderBack/index.vue');
const AddGoodS=()=>import('@/views/Goods/AddGoods.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Layout,
    //路由元信息
    meta:{
    isLogin:true
    },
    children:[
      {
        path:'/',
        name:Home,
        component:Home
      },
      {
       path:'/goods',
       name:Goods,
       component:Goods
      },
      {
       path:'/Add-goodS',
       name:AddGoodS,
       component:AddGoodS
      },
      {
        path:'/params',
        name:Params,
        component:Params
       },
       {
        path:'/advert',
        name:Advert,
        component:Advert
       },
       {
        path:'/order',
        name:Order,
        component:Order,
        children:[
          {
          path:'order-list',
          component:OrderList
         },
        {
          path:'order',
          component:OrderBack
        }
      ]
       }
    ]
},
{
  path:'/login',
  name:Login,
  component:Login,
}
]

const router = new VueRouter({
  routes
})




export default router
