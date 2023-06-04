<template>
  <v-main>
    <v-container class="d-flex">
      <div class="view-switcher">
        <i class="material-icons" :class="{ active: listView }" @click="viewList(true)">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </i>

        <i class="material-icons" :class="{ active: !listView }" @click="viewList(false)">
          <v-icon>mdi-view-module</v-icon>
        </i>
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'product', params: { type: 'create' } }">
        <v-btn> Add </v-btn></router-link
      >
    </v-container>
    <v-container>
      <v-container v-if="listView">
        <ProductList :items="paginatedData" />
      </v-container>

      <v-container v-else>
        <ProductCards :items="paginatedData" />
      </v-container>
      <pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="changePage"
      /> </v-container
  ></v-main>
</template>
<style>
.active {
  color: #580bcb;
}

.not-active {
  color: #c7c2cf;
}
</style>

<script>
import ProductList from '../../components/ProductList.vue'
import ProductCards from '../../components/ProductCards.vue'
import axios from 'axios'
import { getProducts } from '../../stores/api'
import pagination from '../../components/shared/Pagination.vue'
export default {
  components: {
    ProductList,
    ProductCards,
    pagination
  },
  created() {},
  mounted() {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        let store = JSON.parse(localStorage.getItem('items'))
        if (store.length === 0 || store === undefined || store === null) {
          localStorage.setItem('items', JSON.stringify(response.data))
        }
        console.log(response.data, 'itemms')
        const reloaded = localStorage.getItem('reloaded')
        if (reloaded !== 'true') {
          localStorage.setItem('reloaded', 'true')
          window.location.reload()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  data() {
    return {
      listView: localStorage.getItem('viewList')
        ? JSON.parse(localStorage.getItem('viewList'))
        : true,
      items: JSON.parse(localStorage.getItem('items'))
        ? JSON.parse(localStorage.getItem('items'))
        : [],
      currentPage: 1,
      itemsPerPage: 6
    }
  },
  computed: {
    totalItems() {
      return this.items.length
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.items.slice(startIndex, endIndex)
    }
  },

  methods: {
    viewList(value) {
      localStorage.setItem('viewList', JSON.stringify(value))
      this.localRefresh()
    },
    localRefresh() {
      window.location.reload()
    },
    changePage(page) {
      this.currentPage = page
    }
  }
}
</script>
