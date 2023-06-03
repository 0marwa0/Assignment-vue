<template>
  <v-main>
    <v-container class="d-flex">
      <div class="view-switcher">
        <i class="material-icons" :class="{ active: listView }" @click="listView = true">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </i>

        <i class="material-icons" :class="{ active: !listView }" @click="listView = false">
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
        <ProductList :items="items" />
      </v-container>

      <v-container v-else>
        <ProductCards :items="items" />
      </v-container>

      <Pagination
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        :items="items"
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
import Pagination from '../../components/shared/pagination.vue'
export default {
  components: {
    ProductList,
    ProductCards,
    Pagination
  },
  mounted() {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        this.items = response.data
        console.log(response.data, 'itemms')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    return {
      listView: true,
      items: [],
      currentPage: 1,
      itemsPerPage: 4
    }
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage

      return this.items.slice(startIndex, endIndex)
    },
    pages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    }
  }
}
</script>
