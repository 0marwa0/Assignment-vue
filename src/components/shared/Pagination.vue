<template>
  <div class="pagination">
    <v-icon :disabled="currentPage === 1" @click="currentPage--">mdi-chevron-left</v-icon>
    <button
      v-for="pageNumber in pages"
      :key="pageNumber"
      :class="{ active: currentPage === pageNumber }"
      @click="currentPage = pageNumber"
    >
      {{ pageNumber }}
    </button>

    <v-icon :disabled="currentPage === pages.length" @click="currentPage++"
      >mdi-chevron-right</v-icon
    >
  </div>
</template>
<script setup>
defineProps({
  currentPage: {
    type: Number,
    rerquired: true
  },
  itemsPerPage: {
    type: Number,
    rerquired: true
  },
  items: {
    type: Array,
    required: true
  }
})
</script>
<script>
export default {
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
