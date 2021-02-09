<template>
  <div>
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <c-tooltip
            left
            tooltip="Crear Usuario"
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
          <data-table
              v-model="dataTable"
          >
            <template v-slot:tabla="{ items, headers, loading }">
              <v-data-table
                  v-model="seleccionados"
                  :headers="headers"
                  :items="items"
                  :loading="loading"
                  loading-text="Cargando... por favor espere"
                  show-select
                  class="elevation-1 rounded-0 mb-12"
                  hide-default-footer
              >
                <template v-slot:item.opciones="{ item }">
                  <c-tooltip
                      left
                      tooltip="Editar Usuario"
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
                      tooltip="Eliminar Usuario"
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
        </v-card>
      </v-col>
    </v-row>
    <registro-usuario
        ref="registroItem"
        @guardado="registroGuardado"
    />
    <c-dialog
        ref="cdialog"
        @save="eliminarRegistro"
    />
  </div>
</template>

<script>
import RegistroUsuario from '@/modules/usuarios/components/RegistroUsuario'
import models from '@/models/models'
import {mapGetters} from 'vuex'
export default {
  name: 'Encuestas',
  components: {
    RegistroUsuario
  },
  data: () => ({
    encuesta: null,
    seleccionados: [],
    rutaBase: 'users',
    dataTable: {
      buttonZone: false,
      advanceFilters: false,
      nameItemState: 'tablaUsuarios',
      route: 'users',
      makeHeaders: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Correo Electrónico',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Opciones',
          value: 'opciones',
          align: 'center',
          sortable: false
        }
      ]
    },
    seleccionado: null
  }),
  computed: {
    ...mapGetters([
      'riesgosAmbientales',
      'riesgosPrioritarios'
    ])
  },
  created() {
    this.encuesta = this.clone(models.caracterizacion.hogar)
    this.encuesta.caracterizacion = this.clone(models.caracterizacion.caracterizacionHogar)
    this.encuesta.uso_espacios = this.clone(models.caracterizacion.usoEspacios)
    this.riesgosAmbientales.forEach(x => {
      let data =this.clone(models.caracterizacion.riesgoAmbiental)
      data.riesgo = x
      data.riesgo_ambiental_id = x.id
      this.encuesta.riesgos_ambientales.push(data)
    })
    this.encuesta.personas.push(this.nuevaPersona())
  },
  methods: {
    nuevaPersona() {
      let persona = this.clone(models.caracterizacion.persona)
      persona.caracterizacion = this.clone(models.caracterizacion.caracterizacionPersona)
      this.riesgosPrioritarios.forEach(x => {
        let data =this.clone(models.caracterizacion.riesgoPrioritario)
        data.riesgo = x
        data.riesgo_prioritario_id = x.id
        persona.riesgos_prioritarios.push(data)
      })
      persona.anfitrion = !this.encuesta.personas.length ? 1 : 0
      return persona
    },
    crearRegistro() {
      this.$refs.registroItem.open()
    },
    editarRegistro(registro) {
      this.$refs.registroItem.open(registro)
    },
    preEliminarRegistro(registro) {
      this.seleccionado = registro
      this.$refs.cdialog.open(`¿Está seguro de eliminar el registro del usuario <strong>${this.seleccionado.name}</strong>?`)
    },
    eliminarRegistro() {
      this.$store.dispatch('eliminarUsuario', this.seleccionado.id)
          .then(resolve => {
            if (resolve) {
              this.registroGuardado()
              this.$refs.cdialog.close()
            } else {
              this.$refs.cdialog.loading = false
            }
          })
    },
    registroGuardado() {
      this.$store.commit('RELOAD_TABLA', 'tablaUsuarios')
    }
  }
}
</script>
