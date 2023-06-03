<template>
  <v-row>
    <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4">
      <v-card :height="400">
        <v-img :src="item.image" :width="200" :height="200"></v-img>

        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text :height="50">{{ item.description }}</v-card-text>
        <v-card-actions>
          <span class="mr-3">{{ item.price }}</span>
          <span>{{ item.category }}</span>
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
