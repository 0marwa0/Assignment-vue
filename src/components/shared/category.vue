<template>
  <v-select
    @input="handleChange($event, 'category')"
    variant="underlined"
    :value="selectedCategory"
    @update:value="(value) => (selectedCategory = value)"
    :items="categories"
  ></v-select>
</template>
<script setup>
defineProps({
  selectedCategory: {
    type: String,
    required: true
  },
  handleChange: { type: Function, required: true }
})
</script>
<script>
export default {
  data() {
    return {
      categories: ['electronics', 'jewelery', "men's clothing", "women's clothing"]
    }
  }
}
</script>
