<template>
  <v-app id="inspire">
    <Header/>
    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import store from '../../store'
import Header from './header/Header'
export default {
  name: 'Layout',
  components: {
    Header
  },
  async beforeCreate() {
    await store.dispatch('getUser')
  },
  created() {
    this.$store.dispatch('getComplementos')
    this.$store.dispatch('getComplementosCaraterizacion')
  }
}
</script>

<style>

</style>