<template>
    <v-navigation-drawer
        style="padding-top: 56px !important; z-index: 2 !important;"
        v-model="Customizer_drawer"
        app
        temporary
        clipped
        :right="!$vuetify.rtl"
    >
      <loading :value="loading"/>
      <v-list-item two-line class="profile-bg" v-if="user">
        <v-list-item-avatar size="60" class="mr-1 my-0">
          <img src="../../../assets/images/avatars/avatar16.svg"/>
        </v-list-item-avatar>
        <v-list-item-content class="white--text">
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle class="caption white--text">{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list class="pa-0">
        <v-list-item @click="$refs && $refs.dialogChangePassword.open()">
          <v-list-item-avatar color="warning">
            <v-icon dark>mdi-key</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Cambiar contraseña</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-avatar color="error">
            <v-icon dark>mdi-power-standby</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!---Theme color -->
      <v-divider></v-divider>
      <div class="px-4 py-4">
        <span>Color Primario</span>
        <v-item-group
            mandatory
            v-model="colorActive"
        >
          <v-item
              v-for="tcolor in themeColors"
              :key="tcolor"
              :value="tcolor"
              class="mt-2"
          >
            <template v-slot="{ active, toggle }">
              <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="tcolor"
                  class="v-settings__item mr-2"
                  size="25"
                  @click="toggle"
              />
            </template>
          </v-item>
        </v-item-group>
        <v-switch v-model="dark" class="mt-4"  hide-details primary  label="Modo Oscuro" />
      </div>
      <change-password ref="dialogChangePassword"></change-password>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Customizer',
    components: {
      ChangePassword: () => import('./ChangePassword')
    },
    data: () => ({
      loading: false,
      colorActive: null,
      dark: false,
    }),
    computed: {
      Customizer_drawer: {
          get () { return this.$store.state.customizer.Customizer_drawer },
          set (val) { this.$store.commit('SET_CUSTOMIZER_DRAWER', val) }
      }
    },
    watch: {
      dark: {
        handler (dark) {
          if (typeof dark !== 'undefined') {
            this.$store.commit('SET_THEME_MODE', dark)
          }
        },
        immediate: false
      },
      'themeColor': {
        handler (color) {
          this.$vuetify.theme.themes.light.primary = color
          this.$vuetify.theme.themes.dark.primary = color
        },
        immediate: true
      },
      'darkMode': {
        handler (mode) {
          this.$vuetify.theme.light = !mode
          this.$vuetify.theme.dark = mode
        },
        immediate: true
      },
      colorActive: {
        handler (color) {
          this.$store.commit('SET_THEME_COLOR', color)
        },
        immediate: false
      }
    },
    created() {
      this.colorActive = this.themeColor
      this.dark = this.darkMode
    },
    methods: {
       logout () {
         this.loading = true
         this.$store.dispatch('logout')
             .then(resolve => {
               if (resolve) this.$router.push({name: 'Login'})
               this.$store.commit('SET_CUSTOMIZER_DRAWER', false)
               this.loading = false
             })
       }
     } 
  }
</script>

<style lang="scss">
.profile-bg{
  //background:url('../../../assets/images/background/user-info.jpg') no-repeat;
  background:url('../../../assets/images/background/weatherbg.jpg') no-repeat;
  .v-avatar{
    padding:45px 0;
  }
}
</style>