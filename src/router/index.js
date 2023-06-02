import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/products/index.vue'
import NewProduct from '../views/products/newProduct.vue'
import ViewProduct from '../views/products/viewProduct.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: Products
    },
    {
      path: '/view-product/:id',
      name: 'view-product',
      component: ViewProduct
    },
    {
      path: '/new-product/:id',
      name: 'new-product',
      component: NewProduct
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
