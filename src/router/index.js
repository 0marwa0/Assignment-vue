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
    }
  ]
})

export default router
