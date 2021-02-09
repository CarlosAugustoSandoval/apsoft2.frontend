<template>
  <v-dialog
      v-model="dialog"
      width="620"
      persistent
  >
    <v-card>
      <loading :value="loading" absolute/>
      <v-toolbar
          tile
          dark
          color="primary"
          class="mb-4"
      >
        <v-toolbar-title>
          <v-avatar color="primary darken-3">
            <v-icon>mdi-account-{{ usuario && usuario.id ? 'edit' : 'plus' }}</v-icon>
          </v-avatar>
          {{ usuario && usuario.id ? 'Edición de' : 'Nuevo' }} Usuario
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            dark
            @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <template v-if="usuario">
        <template v-if="usuario.id">
          <v-card-text>
            <v-card>
              <v-subheader>Datos Básicos</v-subheader>
              <ValidationObserver ref="formulario" autocomplete="off">
                <v-container fluid class="py-0">
                  <v-row justify="center" align="center">
                    <v-col cols="12" class="pb-0">
                      <c-text
                          v-model="usuario.name"
                          label="Nombre de Usuario"
                          rules="required"
                          name="Nombre de Usuario"
                      />
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <c-text
                          v-model="usuario.email"
                          label="Correo Electrónico"
                          rules="required|email"
                          name="Correo Electrónico"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </ValidationObserver>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="guardarUsuario"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
          <v-card-text>
            <v-card>
              <v-tabs
                  dark
                  background-color="primary"
                  v-model="tab"
                  align-with-title
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab>Roles</v-tab>
                <v-tab
                    v-if="direct_permissions_availables"
                >
                  Permisos Directos
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card>
                    <v-list dense class="pa-0" v-if="roles && roles.length">
                      <v-list-item
                          v-for="(rol, indexRol) in roles"
                          :key="`rol${indexRol}`"
                          @click.stop="!click"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ rol.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-switch
                              inset
                              hide-details
                              @change="changeRol(rol)"
                              :loading="rol.loading"
                              :readonly="rol.loading"
                              v-model="usuario.roles"
                              :value="rol"
                          />
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-tab-item>
                <v-tab-item
                    v-if="direct_permissions_availables"
                >
                  <v-list
                      dense
                      subheader
                      class="pa-0"
                  >
                    <template v-for="(permisos, indexModulo) in direct_permissions_availables">
                      <v-subheader
                          style="height: 12px !important;"
                          class="body-1 mt-5 mb-2"
                          :key="`modulo${indexModulo}`"
                      >
                        {{indexModulo}}
                      </v-subheader>
                      <v-list-item
                          :ripple="false"
                          @click.stop="!click"
                          v-for="(permiso, indexPermiso) in permisos"
                          :key="`modulo${indexModulo}permiso${indexPermiso}`"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ permiso.description }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-switch
                              inset
                              hide-details
                              @change="changePermiso(permiso)"
                              :loading="permiso.loading"
                              :readonly="permiso.loading"
                              v-model="usuario.permissions"
                              :value="permiso"
                          />
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
                text
                block
                color="primary"
                @click="close"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <ValidationObserver ref="formulario" autocomplete="off">
            <v-container fluid>
              <v-row justify="center" align="center">
                <v-col cols="12" class="pb-0">
                  <c-text
                      v-model="usuario.name"
                      label="Nombre de Usuario"
                      rules="required"
                      name="Nombre de Usuario"
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <c-text
                      v-model="usuario.email"
                      label="Correo Electrónico"
                      rules="required|email"
                      name="Correo Electrónico"
                  />
                </v-col>
              </v-row>
            </v-container>
          </ValidationObserver>
          <v-divider />
          <v-card-actions>
            <v-btn
                text
                color="primary"
                @click="close"
            >
              Cerrar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="guardarUsuario"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </template>
      </template>
      <v-card-text v-else />
    </v-card>
  </v-dialog>
</template>

<script>
import models from '@/models/models'
export default {
  name: 'RegistroUsuario',
  data: () => ({
    tab: null,
    click: false,
    dialog: false,
    loading: false,
    direct_permissions_availables: null,
    roles: [],
    usuario: null
  }),
  methods: {
    changePermiso(permiso) {
      permiso.loading = true
      this.axios.put(`users/${this.usuario.id}/permission/${permiso.id}`).then(() => {
        this.peticionUsuario(this.usuario)
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: 'Permiso directo actualizado.'
        })
        permiso.loading = false
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          message: `Error al actualizar el permiso ${permiso.name}`,
          error: error
        })
        permiso.loading = false
        this.getUsuario(this.usuario)
      })
    },
    changeRol(rol) {
      rol.loading = true
      this.axios.put(`users/${this.usuario.id}/role/${rol.id}`).then(() => {
        this.peticionUsuario(this.usuario)
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: 'El rol se actualizó correctamente',
        })
        rol.loading = false
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          message: `Error al actualizar el rol ${rol.name}`,
          error: error
        })
        rol.loading = false
        this.getUsuario(this.usuario)
      })
    },
    guardarUsuario() {
      this.$refs.formulario.validate().then(result => {
        if (result) {
          this.loading = true
          let request = this.usuario.id
              ? this.axios.put(`users/${this.usuario.id}`, this.usuario)
              : this.axios.post(`users`, this.usuario)
          request
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El usuario se ${this.usuario.id ? 'actualizó' : 'guardó'} correctamente.`
                })
                if (!this.usuario.id) await this.cleanShow(response)
                this.$emit('guardado')
                this.loading = false
              })
              .catch(e => {
                this.$store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al guardar el usuario.', error: e})
                this.loading = false
              })
        }
      })
    },
    open(usuario = null) {
      if (usuario) {
        this.getUsuario(usuario)
      } else {
        this.usuario = this.clone(models.usuario)
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.usuario = null
        this.tab = null
        this.$refs.formulario.reset()
      }, 400)
    },
    async getUsuario(usuario) {
      this.loading = true
      await this.peticionUsuario(usuario)
      this.loading = false
    },
    async peticionUsuario(usuario) {
      return await new Promise(resolve => {
        this.axios.get(`users/${usuario.id}`)
            .then(async response => {
              await this.cleanShow(response)
              resolve(true)
            })
            .catch(e => {
              this.$store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al recuperar el registro del usuario.', error: e})
              this.close()
              resolve(false)
            })
      })
    },
    async cleanShow(response) {
      // Roles
      response.data.user.roles.forEach(x => {
        delete x.pivot
        delete x.permissions
        x.loading = false
      })
      response.data.roles.forEach(x => {
        x.loading = false
      })

      // //Permisos
      response.data.user.permissions.forEach(x => {
        delete x.pivot
        x.loading = false
      })
      if (response.data.direct_permissions_availables && response.data.direct_permissions_availables.length) {
        response.data.direct_permissions_availables.forEach(x => {
          x.loading = false
        })

        //Asignación
        this.direct_permissions_availables = response.data.direct_permissions_availables.reduce((value, key) => {
          (value[key['module']] = value[key['module']] || []).push(key)
          return value
        }, {})
      } else {
        this.direct_permissions_availables = null
      }

      this.roles = response.data.roles
      this.usuario = response.data.user
    }
  }
}
</script>