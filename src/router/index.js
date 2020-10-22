import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  base: '/partner/',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/login.vue')
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: () => import(/* webpackChunkName: "store" */ '../pages/layout/layout.vue'),
      redirect: '/invoice/shop-list',
      children: [
        {
          path: 'shop-list',
          name: 'ShopList',
          component: () => import(/* webpackChunkName: "store" */ '../pages/shop/list.vue')
        },
        {
          path: 'silent',
          name: 'ShopSilent',
          component: () => import(/* webpackChunkName: "store" */ '../pages/shop/silent.vue')
        },
        {
          path: 'warning',
          name: 'ShopWarning',
          component: () => import(/* webpackChunkName: "store" */ '../pages/shop/warning.vue')
        },
        {
          path: 'provider-list',
          name: 'ProviderList',
          component: () => import(/* webpackChunkName: "store" */ '../pages/provider/list.vue')
        }
      ]
    },
  ]
})
