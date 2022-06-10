import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from '../views/LayoutView.vue'
import ChartView from '../views/ChartView.vue'
import UploadView from '../views/UploadView.vue'
import ChessView from '../views/ChessView.vue'
import EvaluateView from '../views/EvaluateView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: LayoutView,
      children:[
          {
              path: '/home',
              name: 'home',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component:HomeView
          },
          {
              path: '/about',
              name: 'about',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
          },
          {
              path: '/chart',
              name: 'chart',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component:ChartView
          },
          {
              path: '/upload',
              name: 'upload',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component:UploadView
          },
          {
              path: '/chess',
              name: 'chess',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component:ChessView
          },
          {
              path: '/evaluate',
              name: 'evaluate',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component:EvaluateView
          },
      ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
