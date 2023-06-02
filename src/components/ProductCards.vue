<template>
  <v-row>
    <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4">
      <v-card>
        <v-card-media :src="item.image"></v-card-media>

        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text>{{ item.description }}</v-card-text>
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
