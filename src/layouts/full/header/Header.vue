<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <v-toolbar-title class="align-center d-flex">
      <v-avatar
          size="56"
          class="mr-2"
      >
        <img
            width="120%"
            src="../../../assets/images/logos/logoMagdalenaAvatar.png"
        />
      </v-avatar>
      <v-list-item class="pa-0" style="max-width: 160px !important;">
        <v-list-item-content class="pa-0">
          <v-list-item-title class="title">Médico en Casa</v-list-item-title>
          <v-list-item-title class="caption">La fuerza del cambio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
<!--      <img src="../../../assets/images/site-logo.png" :width="$vuetify.breakpoint.smAndUp ? 160 : 130" />-->
      <app-menu/>
    </v-toolbar-title>
    <v-spacer />

    <!---right part -->
    <!---Notification -->
<!--    <notifications/>-->
    <!---Notification -->
    <!---Messages -->
<!--    <messages/>-->
    <!---Messages -->
    <!---User -->
    <user/>
    <!---User -->
  </v-app-bar>
</template>

<script>
// import AppMenu from '@/layouts/full/header/components/AppMenu'
import AppMenu from '@/modules/appMenu/components/AppMenu'
// import Notifications from '@/layouts/full-layout/header/components/Notifications'
// import Messages from '@/layouts/full-layout/header/components/Messages'
import User from '@/layouts/full/header/components/User'
export default {
  name: 'Header',
  components: {
    AppMenu,
    // Notifications,
    // Messages,
    User
  },
  data: () => ({
    showLogo: true
  }),
  computed: {
  },
  created() {
    // this.$store.dispatch('getComplementosMipres')
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .v-application #main-sidebar.theme--dark.white{
    background:#363636!important;
  }
</style>