<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
  >
    <v-card flat tile>
      <loading v-model="loading" absolute/>
      <v-toolbar
          tile
          dark
          color="primary"
          class="mb-4"
      >
        <v-toolbar-title>
          <v-avatar color="primary darken-3">
            <v-icon>mdi-file-{{ encuesta && encuesta.ficha ? 'edit' : 'plus' }}</v-icon>
          </v-avatar>
          {{ encuesta && encuesta.id ? 'Edición de' : 'Nueva' }} Encuesta
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
      <v-container fluid v-if="encuesta">
        <v-row justify="center" align="center">
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <v-card
                    class="mx-auto"
                >
                  <v-window v-model="step">
                    <item-windows
                        :step="1"
                        title="Identificación del Hogar"
                        referencia="formulario"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formulario" autocomplete="off">
                        <form-identificacion-hogar :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="2"
                        title="Entorno del Hogar"
                        referencia="formulario2"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formulario2" autocomplete="off">
                        <form-entorno-hogar :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="3"
                        title="Personas"
                        referencia="formulario3"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formulario3" autocomplete="off">
                        <fomr-personas :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                  </v-window>
                </v-card>
              </v-col>
            </v-row>
            <v-divider/>
            <v-card-actions>
              <v-btn
                  @click="close"
              >
                Cancelar
              </v-btn>
              <v-spacer/>
              <v-btn
                  @click="guardar"
                  color="primary"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import models from '@/models/models'
import FormIdentificacionHogar from '@/modules/caracterizacion/components/encuestas/registroEncuesta/forms/FormIdentificacionHogar'
import FormEntornoHogar from '@/modules/caracterizacion/components/encuestas/registroEncuesta/forms/FormEntornoHogar'
import ItemWindows from '@/modules/caracterizacion/components/encuestas/registroEncuesta/ItemWindows'
import FomrPersonas from '@/modules/caracterizacion/components/encuestas/registroEncuesta/forms/FormPersonas'
export default {
  name: 'RegistroEncuesta',
  components: {
    FomrPersonas,
    ItemWindows,
    FormIdentificacionHogar,
    FormEntornoHogar
  },
  data: () => ({
    step: 1,
    loading: false,
    dialog: false,
    encuesta: null
  }),
  computed: {
    ...mapGetters([
      'riesgosAmbientales',
      'riesgosPrioritarios',
      'user'
    ])
  },
  watch: {
  },
  methods: {
    siguiente(referencia) {
      this.$refs[referencia].validate().then(result => {
        if (result) {
          this.step++
        }
      })
    },
    guardar () {
      this.$refs.formulario.validate().then(async result => {
        if (result) {
          this.loading = true
          let copiaData = this.clone(this.encuesta)
          let request = copiaData.id
              ? this.axios.put(`hogares-module/hogares/${copiaData.id}`, copiaData)
              : this.axios.post(`hogares-module/hogares`, copiaData)
          request
              .then(response => {
                this.$emit('guardado', response.data)
                this.$store.commit('SET_SNACKBAR', {color: 'success', message: `La encuesta se guardo correctamente.`})
                this.close()
              })
              .catch(error => {
                this.loading = false
                this.$store.commit('SET_SNACKBAR', {color: 'error', message: `Error al guardar la encuesta.`, error: error})
              })
        }
      })
    },
    getEncuesta (id) {
      this.loading = true
      this.axios.get(`hogares-module/hogares/${id}`)
          .then(response => {
            this.encuesta = response.data
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {color: 'error', message: `Error al recuperar el registro de la encuesta.`, error: error})
          })
    },
    open(encuesta = null) {
      if (encuesta) {
        this.getEncuesta(encuesta.id)
      } else {
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
        this.encuesta.ficha = `${this.user.id}-${this.moment().format('DDMMYYYYHHmm')}`
      }
      this.dialog = true
    },
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
    close() {
      this.dialog = false
      setTimeout(() => {
        this.loading = false
        this.encuesta = null
      }, 400)
    }
  }
}
</script>