import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Customer from '@/components/Customer'
import Error from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/customer/:id',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/404',
      name: 'Not found',
      component: Error
    },
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})
