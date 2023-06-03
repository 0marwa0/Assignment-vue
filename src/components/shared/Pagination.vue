<template>
  <nav>
    <ul class="d-flex">
      <v-icon :class="{ disabled: currentPage === 1 }" class="page-link" @click="previousPage"
        >mdi-chevron-left</v-icon
      >
      {{
        currentPage + '/ ' + totalPages
      }}

      <v-icon :class="{ disabled: currentPage === totalPages }" @click="nextPage"
        >mdi-chevron-right</v-icon
      >
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('page-change', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.currentPage + 1)
      }
    },
    gotoPage(page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<style></style>
