<template>
  <v-row>
    <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4">
      <v-card :height="400" class="d-flex flex-column justify-center">
        <v-img :src="item.image" :width="200" :height="200" class="align-self-center"></v-img>

        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text class="text-truncate" style="max-height: 250px; overflow: hidden">{{
          item.description
        }}</v-card-text>
        <span class="mr-3 icon-green">{{ item.price + '$' }}</span>
        <span v-if="item.status === 'active'" class="status-active">Active</span>
        <span v-else class="icon-red">Inactive</span>

        <v-card-actions class="mt-auto d-flex justify-center">
          <v-spacer></v-spacer>
          <router-link :to="{ name: 'view-product', params: { id: item.id } }">
            <v-icon small class="icon-blue">mdi-eye</v-icon>
          </router-link>
          <router-link :to="{ name: 'product', params: { id: item.id, type: 'edit' } }">
            <v-icon small class="icon-green">mdi-pencil</v-icon>
          </router-link>

          <DeleteModal :onDelete="() => onDelete(item.id)" :showIcon="true" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<script>
import DeleteModal from './shared/modal/DeleteModal.vue'
import { deletProduct } from '../stores/api'

export default {
  components: {
    DeleteModal
  },
  methods: {
    onDelete(id) {
      deletProduct(id)
    }
  }
}
</script>
<style>
.icon-blue {
  color: blue !important;
  margin-right: 8px;
}

.icon-green {
  color: green !important;
  margin-right: 8px;
}

.icon-red {
  color: red !important;
}
</style>
