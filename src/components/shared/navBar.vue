<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <router-link to="/" class="logo"> E-Store </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon>
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in lang" :key="index" :value="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script setup>
defineProps({
  lang: {
    type: Array,
    required: true
  }
})
</script>
<style>
.logo {
  color: white;
  text-decoration: none;
}
</style>
