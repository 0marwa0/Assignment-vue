import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/products/index.vue'
import Product from '../views/products/productForm.vue'
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
      path: '/product/:id?/:type?',
      name: 'product',
      component: Product
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
