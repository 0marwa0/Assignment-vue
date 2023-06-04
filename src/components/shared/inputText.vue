<template>
  <label for="Title">{{ lable }}:</label>

  <v-text-field
    :id="lable"
    clearable
    variant="underlined"
    :value="value"
    @input="handleChange($event, lable)"
  ></v-text-field>
</template>
<script setup>
defineProps({
  lable: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  handleChange: { type: Function, required: true }
})
</script>
