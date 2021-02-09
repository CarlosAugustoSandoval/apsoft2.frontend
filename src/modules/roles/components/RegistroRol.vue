<template>
  <v-dialog
      v-model="dialog"
      width="720"
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
            <v-icon>mdi-account-{{ rol && rol.id ? 'edit' : 'plus' }}</v-icon>
          </v-avatar>
          {{ rol && rol.id ? 'Edición de' : 'Nuevo' }} Rol
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
      <v-container fluid>
        <v-row v-if="rol" justify="center" align="center">
          <v-col cols="12" class="pb-0">
            <ValidationObserver ref="formulario" autocomplete="off">
              <ValidationProvider name="Nombre Rol" rules="required" v-slot="{ errors }">
                <v-text-field
                    v-model="rol.name"
                    dense
                    outlined
                    clearable
                    :error-messages="errors"
                    label="Nombre Rol"
                >
                  <template v-slot:append-outer>
                    <v-btn color="primary" class="mt-n1" @click="guardarRol">
                      Guardar
                    </v-btn>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </ValidationObserver>
          </v-col>
          <v-col cols="12" v-if="rol && rol.id && permissions">
            <v-subheader style="height: 24px !important;" class="title mb-2">
              <v-icon left>mdi-key</v-icon>
              Permisos
            </v-subheader>
            <v-divider></v-divider>
            <v-list dense subheader class="pa-0">
              <template v-for="(permisos, indexModulo) in permissions">
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
                        v-model="rol.permissions"
                        :value="permiso"
                    />
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            block
            color="primary"
            @click="close"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import models from '@/models/models'

export default {
  name: 'RegistroRol',
  data: () => ({
    click: false,
    dialog: false,
    loading: false,
    rol: null,
    permissions: []
  }),
  methods: {
    changePermiso(permiso) {
      permiso.loading = true
      this.axios.put(`roles/${this.rol.id}/permission/${permiso.id}`).then(response => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'success',
          message: response.data.message
        })
        permiso.loading = false
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          message: `Error al actualizar el permiso ${permiso.name}`,
          error: error
        })
        permiso.loading = false
        this.getRol(this.rol.id)
      })
    },
    guardarRol() {
      this.$refs.formulario.validate().then(result => {
        if (result) {
          this.loading = true
          let request = this.rol.id
              ? this.axios.put(`roles/${this.rol.id}`, this.rol)
              : this.axios.post(`roles`, this.rol)
          request
              .then(async response => {
                this.$store.commit('SET_SNACKBAR', {
                  color: 'success',
                  message: `El rol se ha ${this.rol.id ? 'editado' : 'guardado'} correctamente.`
                })
                if (!this.rol.id) await this.cleanShow(response)
                this.$emit('guardado')
                this.loading = false
              })
              .catch(e => {
                this.$store.commit('SET_SNACKBAR', { color: 'error', message: 'Error al guardar el registro del rol.', error: e })
                this.loading = false
              })
        }
      })
    },
    async cleanShow(response) {
      response.data.role.permissions.forEach(x => {
        delete x.pivot
        x.loading = false
      })
      response.data.permissions.forEach(x => {
        x.loading = false
      })
      this.rol = response.data.role
      this.permissions = response.data.permissions.reduce((value, key) => {
        (value[key['module']] = value[key['module']] || []).push(key)
        return value
      }, {})
    },
    open(rol = null) {
      if (rol) {
        this.getRol(rol)
      } else {
        this.rol = this.clone(models.rol)
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.rol = null
        this.$refs.formulario.reset()
      }, 400)
    },
    getRol(rol) {
      this.loading = true
      this.axios.get(`roles/${rol.id}`)
          .then(async response => {
            await this.cleanShow(response)
            this.loading = false
          })
          .catch(e => {
            this.$store.commit('SET_SNACKBAR', { color: 'error', message: `Error al recuperar el rol con ID ${rol.id}.`, error: e })
            this.close()
          })
    }
  }
}
</script>