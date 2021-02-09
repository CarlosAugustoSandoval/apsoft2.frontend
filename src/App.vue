<template>
  <v-app>
    <router-view/>
    <snackbar/>
    <customizer/>
  </v-app>
</template>

<script>
import Customizer from '@/modules/customizer/components/Customizer'
export default {
  name: 'App',
  components: {
    Customizer
  },
  created() {
    this.$store.dispatch('getComplementos')
    this.$store.dispatch('getComplementosCaraterizacion')
  }
}
</script>

<style>
.v-autocomplete.v-select.v-input--is-focused input {
  min-width: 0px !important;
}
</style>