<template>
  <div>
    <loading :value="loading"/>
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <c-tooltip
            left
            tooltip="Crear Rol"
        >
          <v-btn
              color="primary"
              depressed
              small
              fab
              @click="crearRegistro"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <v-card tile flat>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>ID</th>
                <th>Rol</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(rol, indexRol) in roles" :key="`rol${indexRol}`">
                <td>{{ rol.id }}</td>
                <td>{{ rol.name }}</td>
                <td class="text-center">
                  <c-tooltip
                      left
                      tooltip="Editar Rol"
                  >
                    <v-btn
                        class="ma-1"
                        color="warning"
                        depressed
                        fab
                        x-small
                        @click="editarRegistro(rol)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </c-tooltip>
                  <c-tooltip
                      left
                      tooltip="Eliminar Rol"
                  >
                    <v-btn
                        class="ma-1"
                        color="error"
                        depressed
                        fab
                        x-small
                        @click="preEliminarRegistro(rol)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </c-tooltip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <registro-rol
        ref="registroItem"
        @guardado="getRoles"
    />
    <c-dialog
        ref="cdialog"
        @save="eliminarRegistro"
    />
  </div>
</template>

<script>
import RegistroRol from '@/modules/roles/components/RegistroRol'

export default {
  name: 'Roles',
  components: {
    RegistroRol
  },
  data: () => ({
    roles: [],
    loading: false,
    seleccionado: null
  }),
  created() {
    this.getRoles()
  },
  methods: {
    crearRegistro() {
      this.$refs.registroItem.open()
    },
    editarRegistro(registro) {
      this.$refs.registroItem.open(registro)
    },
    preEliminarRegistro(registro) {
      this.seleccionado = registro
      this.$refs.cdialog.open(`¿Está seguro de eliminar el registro del rol <strong>${this.seleccionado.name}</strong>?`)
    },
    eliminarRegistro() {
      this.$store.dispatch('eliminarRol', this.seleccionado.id)
          .then(resolve => {
            if (resolve) {
              this.getRoles()
              this.$refs.cdialog.close()
            } else {
              this.$refs.cdialog.loading = false
            }
          })
    },
    getRoles() {
      this.loading = true
      this.axios.get(`roles`)
          .then(response => {
            this.roles = response.data.roles
            this.loading = false
          })
          .catch(e => {
            this.$store.commit('SET_SNACKBAR', { color: 'error', message: 'Error al recuperar los registros de los roles.', error: e })
            this.loading = false
          })
    }
  }
}
</script>
