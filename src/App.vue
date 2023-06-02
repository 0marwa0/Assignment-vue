<template>
  <v-app>
    <NavBar :lang="lang" />
    <router-view></router-view>
  </v-app>
</template>
<style>
.active {
  color: #580bcb;
}

.not-active {
  color: #c7c2cf;
}
</style>
<script>
import NavBar from './components/shared/navBar.vue'

export default {
  components: {
    NavBar
  },

  data() {
    return {
      listView: true,
      lang: ['Arabic', 'English']
    }
  }
}
</script>
