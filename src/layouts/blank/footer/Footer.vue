<template>
    <v-footer app class="footerpart" inset>
      <v-col cols="12" class="pa-1">
        <span>© {{ new Date().getFullYear() }} — APSOFT un producto de <a>APSOFT</a></span>
      </v-col>
    </v-footer>
</template>
<script>
export default {
    name: 'Footer',
    data:() => ({
      
    })
}
</script>
<style lang="scss">
  .v-application .footerpart{
    border-top:1px solid rgba(0,0,0,0.1)!important;
  }
  .theme--light.v-footer{
    background:white;
  }
</style>