<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th>
          Diligenciamiento
        </th>
        <th>
          Jefe / Anfitrión
        </th>
        <th>
          Ubicación
        </th>
        <th>
          Opciones
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="registros && registros.length">
        <tr
            v-for="item in registros"
            :key="item.idd"
        >
          <td>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="body-1">Fecha: {{ item.fecha_diligenciamiento }}</v-list-item-title>
                <v-list-item-subtitle class="body-2">Ficha: {{ item.ficha }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </td>
          <td>
            <v-list-item class="pa-0" v-if="item">
              <v-card color="transparent" class="elevation-0">
                <v-icon large>{{ item.sexo === 'Mujer' ? 'mdi mdi-face' : 'mdi mdi-face-woman'}}</v-icon>
                <v-card-actions class="py-0 px-1" v-if="typeof item.cantidad_personas !== 'undefined'">
                  <v-chip color="primary" class="font-weight-bold pl-2 pr-1" label x-small>
                    <v-icon left x-small>mdi-account-group</v-icon>
                    <p class="ma-0 align-center">{{ item.cantidad_personas || '0' }}</p>
                  </v-chip>
                </v-card-actions>
              </v-card>
              <v-list-item-content class="py-1">
                <v-list-item-title class="body-2">{{ item.nombre_anfitrion }}</v-list-item-title>
                <v-list-item-subtitle class="body-2">
                  {{ item.tipo_identificacion }} {{ item.identificacion_anfitrion }}
                  {{ item.celular ? ', Cel. ' + item.celular : '' }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="body-2">{{ item.anfitrion ? "Anfitrion" : '' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </td>
          <td>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="body-1">
                  {{ item.municipio + ' - ' + item.departamento + ' | Zona ' + item.zona}}
                </v-list-item-title>
                <v-list-item-subtitle class="body-2">
                  {{ item.direccion }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </td>
          <td class="text-center">
            <c-tooltip
                left
                tooltip="Editar Encuesta"
            >
              <v-btn
                  class="ma-1"
                  color="warning"
                  depressed
                  fab
                  x-small
                  @click="editarRegistro(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </c-tooltip>
            <c-tooltip
                left
                tooltip="Eliminar Encuesta"
            >
              <v-btn
                  class="ma-1"
                  color="error"
                  depressed
                  fab
                  x-small
                  @click="preEliminarRegistro(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </c-tooltip>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="4" class="text-center">No hay encuestas pendientes</td>
        </tr>
      </template>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'Pendientes',
  data: () => ({
    registros: []
  }),
  watch: {
    registros: {
      handler (val) {
        this.$emit('recontarPendientes', val.length)
      },
      immediate: true
    }
  },
  created() {
    this.getRegistros()
  },
  methods: {
    getRegistros() {
      this.$store.dispatch('getPendientes').then(data => {
        this.registros = data
      })
    },
    editarRegistro(registro) {
      this.$emit('editarregistro', registro)
    },
    preEliminarRegistro(registro) {
      this.$emit('preeliminarregistro', registro)
    }
  }
}
</script>
