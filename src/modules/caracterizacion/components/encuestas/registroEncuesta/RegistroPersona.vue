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
            <v-icon>mdi-account-{{ personaOrigina ? 'edit' : 'plus' }}</v-icon>
          </v-avatar>
          {{ personaOrigina ? 'Edición de' : 'Nueva' }} Persona
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
      <v-container fluid v-if="persona">
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
                        title="Datos Básicos"
                        referencia="formDatosBasicos"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formDatosBasicos" autocomplete="off">
                        <form-datos-basicos :persona="persona"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="2"
                        title="Caracterización"
                        referencia="formCaracterizacionPersona"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                    >
                      <ValidationObserver ref="formCaracterizacionPersona" autocomplete="off">
                        <form-caracterizacion :persona="persona"/>
                      </ValidationObserver>
                    </item-windows>
                    <item-windows
                        :step="3"
                        title="Riesgos Prioritarios"
                        referencia="formRiesgosPrioritarios"
                        @atras="step--"
                        @siguiente="val => siguiente(val)"
                        text-button="Guardar"
                    >
                      <ValidationObserver ref="formRiesgosPrioritarios" autocomplete="off">
                        <form-riesgos-prioritarios :persona="persona"/>
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
import FormDatosBasicos from '@/modules/caracterizacion/components/encuestas/registroEncuesta/formsPersona/FormDatosBasicos'
import FormCaracterizacion from '@/modules/caracterizacion/components/encuestas/registroEncuesta/formsPersona/FormCaracterizacion'
import FormRiesgosPrioritarios from '@/modules/caracterizacion/components/encuestas/registroEncuesta/formsPersona/FormRiesgosPrioritarios'
import ItemWindows from '@/modules/caracterizacion/components/encuestas/registroEncuesta/ItemWindows'
export default {
  name: 'RegistroPersona',
  components: {
    FormRiesgosPrioritarios,
    FormCaracterizacion,
    FormDatosBasicos,
    ItemWindows
  },
  data: () => ({
    step: 1,
    loading: false,
    dialog: false,
    persona: null,
    personaOrigina: null,
    grupoTemporal: ''
  }),
  computed: {
    ...mapGetters([
      'riesgosPrioritarios'
    ])
  },
  methods: {
    siguiente(referencia) {
      this.$refs[referencia].validate().then(result => {
        if (result) {
          this.$emit('guardado', this.persona)
          if(this.step === 3) {
            this.close()
          } else {
            this.step++
          }
        }
      })
    },
    guardar () {
      this.$refs.formulario.validate().then(async result => {
        if (result) {
          this.loading = true
          let copiaData = this.clone(this.persona)
          let request = copiaData.id
              ? this.axios.put(`hogares-module/hogares/${copiaData.id}`, copiaData)
              : this.axios.post(`hogares-module/hogares`, copiaData)
          request
              .then(response => {
                this.$emit('guardado', response.data)
                this.$store.commit('SET_SNACKBAR', {color: 'success', message: `La persona se guardo correctamente.`})
                this.close()
              })
              .catch(error => {
                this.loading = false
                this.$store.commit('SET_SNACKBAR', {color: 'error', message: `Error al guardar la persona.`, error: error})
              })
        }
      })
    },
    open(persona = null) {
      if (persona) {
        this.personaOrigina = this.clone(persona)
        this.persona = this.clone(persona)
      } else {
        let persona = this.clone(models.caracterizacion.persona)
        persona.caracterizacion = this.clone(models.caracterizacion.caracterizacionPersona)
        this.riesgosPrioritarios.forEach(x => {
          let data =this.clone(models.caracterizacion.riesgoPrioritario)
          data.riesgo = x
          if(this.grupoTemporal !== x.grupo){
            this.grupoTemporal = x.grupo
          }else{
            data.riesgo.grupo = null
          }
          data.riesgo_prioritario_id = x.id
          persona.riesgos_prioritarios.push(data)
        })
        persona.anfitrion = 0
        this.persona = persona
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('close', this.persona)
      setTimeout(() => {
        this.loading = false
        this.persona = null
        this.personaOrigina = null
        this.step = 1
      }, 400)
    }
  }
}
</script>