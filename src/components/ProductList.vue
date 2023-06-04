<template>
  <div>
    <table class="content-table">
      <thead>
        <tr>
          <th v-for="head in tableHead" :key="head">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.price + '$' }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.status ? item.status : 'Out of stock' }}</td>
          <td>
            <div class="dropdown">
              <button class="dropbtn">...</button>
              <div class="dropdown-content">
                <router-link :to="{ name: 'view-product', params: { id: item.id } }"
                  >view</router-link
                >
                <router-link :to="{ name: 'product', params: { id: item.id, type: 'edit' } }"
                  >edit</router-link
                >
                <DeleteModal :onDelete="() => onDelete(item.id)" />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { deletProduct } from '../stores/api'
import DeleteModal from './shared/modal/DeleteModal.vue'
import '../assets/main.css'
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
<script>
export default {
  components: {
    DeleteModal
  },
  methods: {
    onDelete(id) {
      deletProduct(id)
    }
  },
  data() {
    return {
      tableHead: ['Title', 'Price', 'Description', 'Category', 'Status', '']
    }
  }
}
</script>
