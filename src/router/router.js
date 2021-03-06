import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import uuid from 'uuid'
import UsersResult from '../components/UsersResult/UsersResult'
import User from '../components/User/User'
import Transactions from '../components/Transactions/Transactions'
import NotFound from '../components/NotFound/NotFound'
import { LOADING_ACTIONS, HEADER_BUTTON_STATE } from '../const/const'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {name: 'users'}
  },
  {
    path: '/users',
    name: 'users',
    component: UsersResult,
    meta: {
      users: true
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '/transactions/:id',
    name: 'transactions',
    component: Transactions,
    props: true
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      notFound: true
    }
  }
]

let router =  new VueRouter({
  mode: 'history',
  base: (process.env.NODE_ENV === 'development') ? '/' : '/usersList',
  routes
})
router.beforeEach((to, from, next) => {
  let dispatch = store.dispatch
  const meta = uuid()
    if (to.matched.some(record => record.meta.users)) {
        dispatch('app/setIsLoading', {
          meta,
          data: LOADING_ACTIONS.USERS
        })
        next()
        return
    } else if(to.matched.some(record => record.meta.notFound)) {
      dispatch('app/setShowBtnCreateUser', {
        meta,
        data: HEADER_BUTTON_STATE.NOT_FOUND
      })
      next()
      return
    } else {
        next()
    }
})

export default router