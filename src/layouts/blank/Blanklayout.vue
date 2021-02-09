<template>
  <v-app>
     <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './footer/Footer'
  export default {
    name: 'Blanklayout',
    components: {
      Footer
    }
  }
</script>
