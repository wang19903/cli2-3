import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "/"
  },

  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/front/Home.vue')
  },

  {
    path: '/products',
    name: 'ListProducts',
    component: () => import('@/views/front/ListProducts.vue'),
  },

  {
    path: '/favor',
    name: 'Favor',
    component: () => import('@/views/front/Favor.vue'),
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/back/Login.vue"),
  },

  {
    path: "/admin",
    name: "Dashboard",
    component: () => import("@/views/back/Dashboard.vue"),
    children: [
      {
        path: "products",
        name: "Products",
        component: () => import("@/views/back/Products.vue"),
        meta: { requiresAuth: true }
      },

      {
        path: "orders",
        name: "Orders",
        component: () => import("@/views/back/Orders.vue"),
        meta: { requiresAuth: true }
      },

      {
        path: "coupons",
        name: "Coupons",
        component: () => import("@/views/back/Coupons.vue"),
        meta: { requiresAuth: true }
      },
      
      {
        path: "customer_order",
        name: "CustomerOrder",
        component: () => import("@/components/CustomerOrder.vue"),
      },

      {
        path: "customer_checkout/:orderId",
        name: "CustomerCheckout",
        component: () => import("@/components/CustomerCheckout.vue"),
      },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
