<template>
  <data-table
      v-model="dataTable"
  >
    <template v-slot:tabla="{ items, headers, loading }">
      <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          loading-text="Cargando... por favor espere"
          class="elevation-1 rounded-0 mb-12"
          hide-default-footer
      >
        <template v-slot:item.diligencia="{ item }">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="body-1">Fecha: {{ item.fecha_diligenciamiento }}</v-list-item-title>
              <v-list-item-subtitle class="body-2">Ficha: {{ item.ficha }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item.persona="{ item }">
          <v-list-item>
            <v-card color="transparent" class="elevation-0">
              <v-icon large>{{ item.sexo === 'Mujer' ? 'mdi mdi-face' : 'mdi mdi-face-woman'}}</v-icon>
              <v-card-actions class="py-0 px-1" v-if="item && (typeof item.cantidad_personas !== 'undefined')">
                <v-chip color="primary" class="font-weight-bold pl-2 pr-1" label x-small>
                  <v-icon left x-small>mdi-account-group</v-icon>
                  <p class="ma-0 align-center">{{ item && item.cantidad_personas ? item.cantidad_personas : '0' }}</p>
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
        </template>
        <template v-slot:item.ubicacion="{ item }">
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
        </template>
        <template v-slot:item.opciones="{ item }">
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
        </template>
      </v-data-table>
    </template>
  </data-table>
</template>

<script>
export default {
  name: 'General',
  data: () => ({
    rutaBase: 'hogares-module/hogares',
    dataTable: {
      buttonZone: false,
      advanceFilters: false,
      nameItemState: 'tablaEncuestas',
      route: 'hogares-module/hogares',
      makeHeaders: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Diligenciamiento',
          align: 'left',
          sortable: false,
          value: 'diligencia'
        },
        {
          text: 'Persona',
          align: 'left',
          sortable: false,
          value: 'persona'
        },
        {
          text: 'Ubicación',
          align: 'left',
          sortable: false,
          value: 'ubicacion'
        },
        {
          text: 'Opciones',
          value: 'opciones',
          align: 'center',
          sortable: false
        }
      ]
    }
  }),
  methods: {
    editarRegistro(registro) {
      this.$emit('editarregistro', registro)
    },
    preEliminarRegistro(registro) {
      this.$emit('preeliminarregistro', registro)
    }
  }
}
</script>
