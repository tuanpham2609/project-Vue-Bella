import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/index'
import AliasPage from '@/pages/alias'
import Cart from '@/components/product/cart'
import Favorite from '@/components/product/favorite'
import Register from '@/components/user/register'
import Login from '@/components/user/login'
import User from '@/components/user/index'
import UserOrder from '@/components/user/order'
import UserDetail from '@/components/user/order-detail'
import Profile from '@/components/user/profile1'
import ChangePassword from '@/components/user/change-password'
import CheckOut from '@/components/product/checkout'
import productOderDetail from '@/components/product/order-detail'
import ChangePasswordForgot from '@/components/user/change-password-forgot'
import Forgot from '@/components/user/forgot-password.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path : '/favorite',
      name : 'favorite',
      component : Favorite
    },
    {
        path : '/user/login',
        name : 'Login',
        component : Login
    },
    {
      path : '/checkout',
      name : 'checkout',
      component : CheckOut
    },
    {
      path : '/user/forgot-password',
      name : 'Forgot',
      component : Forgot
    },
    {
        path : '/user/change-password-forgot',
        name : 'changepasswordforgot',
        component : ChangePasswordForgot
    },
    {
      path : '/dashboard',
      name : 'dashboard',
      component : User,
       children : [
           {
               path : '',
               name : 'profile',
               component : Profile
           },
           {
               path : 'change-password',
               name : 'change-password',
               component : ChangePassword
           },
           {
               path : 'orders',
               name : 'orders',
               component : UserOrder
           },
           {
               path : 'order-detail',
               name : 'order-detail',
               component : UserDetail
           }
       ]
   },
   {
      path : '/order-detail',
      name : 'product-order-detail',
      component : productOderDetail
    },
    {
        path : '/user/register',
        name : 'Register',
        component : Register
    },
    {
      path : '/cart',
      name : 'cart',
      component : Cart
    },
    {
      path: '/:alias',
      name : 'aliasPage',
      component : AliasPage,
    },
  ]
})
