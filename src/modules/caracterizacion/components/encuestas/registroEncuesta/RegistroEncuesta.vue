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
            <v-icon>mdi-file-{{ encuesta && (encuesta.id || encuesta.idd) ? 'edit' : 'plus' }}</v-icon>
          </v-avatar>
          {{ encuesta && (encuesta.id || encuesta.idd) ? 'Edición de' : 'Nueva' }} Encuesta
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
                        referencia="formIdentificacionHogar"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formIdentificacionHogar" autocomplete="off">
                        <form-identificacion-hogar :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="2"
                        title="Entorno del Hogar"
                        referencia="formEntornoHogar"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formEntornoHogar" autocomplete="off">
                        <form-entorno-hogar :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="3"
                        title="Integrante que Recibe la Visita"
                        referencia="formAnfitrion"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formAnfitrion" autocomplete="off">
                        <form-anfitrion :encuesta="encuesta" :anfitrion="encuesta.personas.find(x => x.anfitrion)"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="4"
                        title="Uso de los Espacios de la Vivienda"
                        referencia="formUsoEspacios"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formUsoEspacios" autocomplete="off">
                        <form-uso-espacios :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="5"
                        title="Riesgos Ambientales de la Vivienda"
                        referencia="FormRiesgosAmbientales"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="FormRiesgosAmbientales" autocomplete="off">
                        <form-riesgos-ambientales :encuesta="encuesta"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="6"
                        title="Personas Encuestadas"
                        referencia="formPersonas"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                        text-button="Guardar Encuesta"
                    >
                      <ValidationObserver ref="formPersonas" autocomplete="off">
                        <fomr-personas
                            :encuesta="encuesta"
                            @personaGuardada="guardarEncuestaTemporal"
                        />
                      </ValidationObserver>
                    </item-windows>
                  </v-window>
                </v-card>
              </v-col>
            </v-row>
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
import FormAnfitrion from '@/modules/caracterizacion/components/encuestas/registroEncuesta/forms/FormAnfitrion'
import FormUsoEspacios from '@/modules/caracterizacion/components/encuestas/registroEncuesta/forms/FormUsoEspacios'
import FormRiesgosAmbientales from '@/modules/caracterizacion/components/encuestas/registroEncuesta/forms/FormRiesgosAmbientales'

export default {
  name: 'RegistroEncuesta',
  components: {
    FormAnfitrion,
    FomrPersonas,
    ItemWindows,
    FormIdentificacionHogar,
    FormEntornoHogar,
    FormUsoEspacios,
    FormRiesgosAmbientales
  },
  data: () => ({
    step: 1,
    loading: false,
    dialog: false,
    encuesta: null,
    grupoTemporal: '',
    grupoTemporalPersona: ''
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
    async guardarEncuestaTemporal() {
      await this.$store.dispatch('guardarEncuestaLocal', this.encuesta)
      this.$emit('guardado', this.encuesta)
      return true
    },
    siguiente(referencia) {
      this.$refs[referencia].validate().then(async result => {
        if (result) {
          await this.guardarEncuestaTemporal()
          if(this.step === 6) {
            this.guardar()
          } else {
            this.step++
          }
        }
      })
    },
    validarEncuesta() {
      return true
    },
    async guardar () {
      if(await this.validarEncuesta()) {
        this.loading = true
        let copiaData = this.clone(this.encuesta)
        if(!copiaData.id) delete copiaData.id
        let request = copiaData.id
            ? this.axios.put(`hogares-module/hogares/${copiaData.id}`, copiaData)
            : this.axios.post(`hogares-module/hogares`, copiaData)
        request
            .then(async response => {
              this.$store.commit('SET_SNACKBAR', {color: 'success', message: `La encuesta se guardo correctamente.`})
              if(response.data && response.data.id) await this.borrarTemporal(copiaData)
              this.$emit('guardado', response.data)
              this.close()
            })
            .catch(error => {
              this.loading = false
              this.$store.commit('SET_SNACKBAR', {color: 'error', message: `Error al guardar la encuesta.`, error: error})
            })
      }
    },
    async borrarTemporal(temporal) {
      return await new Promise(resolve => {
        this.$store.dispatch('eliminarEncuestaLocal', temporal.idd)
            .then(response => {
              resolve(response)
            })
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
      if (encuesta && encuesta.id) {
        this.getEncuesta(encuesta.id)
      } else {
        this.encuesta = this.clone(models.caracterizacion.hogar)
        this.encuesta.caracterizacion = this.clone(models.caracterizacion.caracterizacionHogar)
        this.encuesta.uso_espacios = this.clone(models.caracterizacion.usoEspacios)
        this.encuesta.hogares_subsidio = this.clone(models.caracterizacion.hogar.hogares_subsidio)
        this.riesgosAmbientales.forEach(x => {
          let data =this.clone(models.caracterizacion.riesgoAmbiental)
          data.riesgo = x
          if(this.grupoTemporal !== x.grupo){
            this.grupoTemporal = x.grupo
          }else{
            data.riesgo.grupo = null
          }
          data.riesgo_ambiental_id = x.id
          this.encuesta.riesgos_ambientales.push(data)
        })
        this.encuesta.personas.push(this.nuevaPersona())
        this.encuesta.ficha = `${this.user.id}-${this.moment().format('DDMMYYYYHHmm')}`
      }
      this.dialog = true
    },
    openPendiente(registro) {
      this.encuesta = this.clone(registro)
      this.dialog = true
    },
    nuevaPersona() {
      let persona = this.clone(models.caracterizacion.persona)
      persona.caracterizacion = this.clone(models.caracterizacion.caracterizacionPersona)
      this.riesgosPrioritarios.forEach(x => {
        let data =this.clone(models.caracterizacion.riesgoPrioritario)
        data.riesgo = x
        if(this.grupoTemporalPersona !== x.grupo){
          this.grupoTemporalPersona = x.grupo
        }else{
          data.riesgo.grupo = null
        }
        data.riesgo_prioritario_id = x.id
        persona.riesgos_prioritarios.push(data)
      })
      persona.anfitrion = !this.encuesta.personas.length ? 1 : 0
      return persona
    },
    close() {
      this.dialog = false
      this.step = 1
      this.$emit('close', this.encuesta)
      setTimeout(() => {
        this.loading = false
        this.encuesta = null
      }, 400)
    }
  }
}
</script>