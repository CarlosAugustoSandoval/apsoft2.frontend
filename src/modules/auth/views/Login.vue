<template>
  <v-row class="ma-0">
    <loading :value="loading"/>
    <v-col cols="12" md="6" lg="7" xl="8" class="primary d-none d-md-flex align-center justify-center">
      <v-container>
        <div class="pa-10">
          <v-row justify="center">
            <v-col cols="8" xl="6">
              <div>
                <h2
                    class="display-1 white--text font-weight-medium"
                >Titulo de portada para la aplicación.</h2>
                <h6
                    class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                >Subtitulo de portada para la aplicación.</h6>
                <!--                <v-btn class="mt-4 text-capitalize" x-large outlined color="white">Leer más</v-btn>-->
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <v-col cols="12" md="6" lg="5" xl="4" class="d-flex align-center py-0">
      <v-container fluid class="py-0">
        <div class="px-10 py-0">
          <v-row justify="center">
            <v-col cols="12" sm="8" md="12" class="py-0">
              <v-row justify="center">
                <img v-if="darkMode" src="../../../assets/images/site-logo.png"/>
                <img v-else src="../../../assets/images/site-dark-logo.png"/>
              </v-row>
              <v-row justify="center" class="mb-2 mt-4">
                <v-col cols="12" class="text-center">
                  <div class="font-weight-bold text-h5">Inicio de Sesión</div>
                </v-col>
              </v-row>
              <ValidationObserver class="mb-5" ref="formLogin" v-slot="{ invalid }" tag="form" autocomplete="off" @submit.prevent="login">
                <c-text
                    v-model="email"
                    label="Nombre de Usuario"
                    rules="required|email"
                    name="Nombre de Usuario"
                    :dense="false"
                />
                <c-password
                    v-model="password"
                    label="Contraseña"
                    rules="required"
                    name="Contraseña"
                    :dense="false"
                />
                <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                  <v-checkbox
                      v-model="remember"
                      label="Recordarme"
                  ></v-checkbox>
                  <!--                  <div class="ml-auto">-->
                  <!--                    <router-link tag="a" class="link" :to="{name: 'ForgotPassword'}" exact>¿Olvidó la Contraseña?</router-link>-->
                  <!--                  </div>-->
                </div>
                <v-btn
                    :disabled="invalid"
                    color="primary"
                    block
                    class="mr-4"
                    submit
                    type="submit"
                >Iniciar Sesión</v-btn>
              </ValidationObserver>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: null,
    password: null,
    remember: false,
    loading: false
  }),
  methods: {
    login() {
      this.$refs.formLogin.validate().then(result => {
        if (result) {
          this.loading = true
          this.$store.dispatch('login', { email: this.email, password: this.password, remember_token: this.remember })
              .then(resolve => {
                if (resolve) this.$router.push({name: 'Home'})
                this.loading = false
              })
        }
      })
    }
  }
}
</script>
