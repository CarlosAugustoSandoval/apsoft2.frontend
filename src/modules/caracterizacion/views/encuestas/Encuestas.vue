<template>
  <div>
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <c-tooltip
            left
            tooltip="Crear Encuesta"
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
        <v-tabs
            dark
            background-color="primary"
            v-model="tab"
            align-with-title
        >
          <v-tabs-slider color="secondary"></v-tabs-slider>
          <v-tab>Listado general</v-tab>
          <v-tab>
            <v-badge
                color="error"
                :content="cantidadPendientes || '0'"
            >
              Pendientes
            </v-badge>
          </v-tab>
        </v-tabs>
        <v-tabs-items
            touchless
            v-model="tab"
        >
          <v-tab-item>
            <general
                @editarregistro="val => editarRegistro(val)"
                @preeliminarregistro="val => preEliminarRegistro(val)"
            />
          </v-tab-item>
          <v-tab-item>
            <pendientes
                ref="encuestasPendientes"
                @editarregistro="val => editarRegistro(val)"
                @preeliminarregistro="val => preEliminarRegistro(val)"
                @recontarPendientes="val => cantidadPendientes = val"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <registro-encuesta
        ref="registroItem"
        @guardado="val => registroGuardado(val)"
    />
    <c-dialog
        ref="cdialog"
        @save="eliminarRegistro"
    />
  </div>
</template>

<script>
import RegistroEncuesta from '@/modules/caracterizacion/components/encuestas/registroEncuesta/RegistroEncuesta'
import General from '@/modules/caracterizacion/components/encuestas/listados/General'
import Pendientes from '@/modules/caracterizacion/components/encuestas/listados/Pendientes'
export default {
  name: 'Encuestas',
  components: {
    Pendientes,
    General,
    RegistroEncuesta
  },
  data: () => ({
    tab: null,
    seleccionado: null,
    cantidadPendientes: 0
  }),
  created() {
    this.traerPendientes()
  },
  methods: {
    traerPendientes(){
      this.$store.dispatch('getPendientes').then(data => {
        this.cantidadPendientes = data.length
      })
    },
    crearRegistro() {
      this.$refs.registroItem.open()
    },
    editarRegistro(registro) {
      this.$refs.registroItem[registro.idd ? 'openPendiente' : 'open'](registro)
    },
    preEliminarRegistro(registro) {
      this.seleccionado = this.clone(registro)
      this.$refs.cdialog.open(`¿Está seguro de eliminar el registro de la encuesta con ficha <strong>${this.seleccionado.ficha}</strong>?`)
    },
    eliminarRegistro() {
      console.log('this.seleccionado', this.seleccionado)
      let request = this.seleccionado.idd ? this.$store.dispatch('eliminarEncuestaLocal', { idd: this.seleccionado.idd }) : this.$store.dispatch('eliminarEncuesta', this.seleccionado.id)
      request
          .then(resolve => {
            if (resolve) {
              console.log('this.seleccionado', this.seleccionado)
              this.registroGuardado(this.seleccionado)
              this.$refs.cdialog.close()
            } else {
              this.$refs.cdialog.loading = false
            }
          })
    },
    registroGuardado(registro) {
      if(this.$refs.encuestasPendientes) this.$refs.encuestasPendientes.getRegistros()
      if(registro.id) this.$store.commit('RELOAD_TABLA', 'tablaEncuestas')
      this.traerPendientes()
    }
  }
}
</script>
