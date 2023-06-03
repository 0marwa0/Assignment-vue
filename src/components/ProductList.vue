<template>
  <div>
    <table class="content-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Status</th>
          <th></th>
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
                <p class="pointer" @click="setShowModal(item.id)">Delete</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <v-dialog v-model="showModal" class="my-dialog">
      <VOverlay ref="overlay" v-on="{ 'click:outside': () => (showModal = false) }"></VOverlay>
      <v-card>
        <v-card-title> Delete Item</v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="onDelete">Confirm</v-btn>
          <v-btn color="red darken-1" text @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped>
.my-dialog {
  max-width: 400px;
}
</style>
<script setup>
import { deletProduct } from '../stores/api'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
<script>
export default {
  methods: {
    onDelete() {
      deletProduct(this.productId)
      this.showModal = false
    },

    setShowModal(id) {
      this.showModal = true
      this.productId = id
    }
  },
  data() {
    return {
      showModal: false,
      productId: null
    }
  }
}
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
.pointer {
  cursor: pointer;
}
.dropbtn {
  /* background-color: #4caf50; */
  color: #580bcb;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px #580bcb solid;
  margin-top: -20px;
  border-radius: 20px;
  padding: 20px;
}

.dropdown-content a {
  color: black;
  padding: 12px 10px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.pagination button {
  margin-right: 5px;
}

.content-table {
  border-collapse: collapse;
  margin: 25px 0;
  width: 100%;
  font-size: 0.9em;
  min-width: 400px;
  border-radius: 20px 20px 0 0;
  /* overflow: hidden; */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
  background-color: #580bcb;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 10px solid #580bcb;
}

.content-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
table,
th,
td {
  border: none;
}
</style>
