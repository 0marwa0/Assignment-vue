<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-icon v-if="showIcon" v-bind="props" small class="icon-red pointer">mdi-delete</v-icon>
        <p v-else v-bind="props" class="pointer">Delete</p>
      </template>

      <v-card>
        <v-card-title> Delete Item</v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="handleDelete">Confirm</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
defineProps({
  onDelete: {
    type: Function,
    required: true
  },
  showIcon: {
    type: Boolean,
    required: false
  }
})
</script>
<script>
export default {
  methods: {
    handleDelete() {
      this.dialog = false
      this.onDelete()
    }
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style>
.text-center {
  text-align: center;
}
</style>
