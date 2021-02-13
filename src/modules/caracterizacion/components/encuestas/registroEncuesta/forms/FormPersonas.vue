<template>
  <v-row v-if="encuesta">
    <v-col cols="12">
      <v-list dense class="pa-0">
        <template
            v-for="(persona, indexPersona) in encuesta.personas"
        >
          <v-list-item
              :key="`persona${indexPersona}`"
              @click="click = false"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ [persona.nombre1, persona.nombre2, persona.apellido1, persona.apellido2].filter(x => x).join(' ') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ [persona.tipo_identificacion, persona.identificacion].filter(x => x).join('') }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ [persona.celular ? `Celular: ${persona.celular}` : null].filter(x => x).join(', ') }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text
                style="flex-direction: inherit !important;"
                class="ma-0"
            >
              <c-tooltip
                  left
                  tooltip="Editar Persona"
              >
                <v-btn
                    class="ma-1"
                    color="warning"
                    depressed
                    fab
                    x-small
                    @click.stop="editarPersona({index: indexPersona, persona: persona})"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </c-tooltip>
              <c-tooltip
                  left
                  tooltip="Borrar Persona"
              >
                <v-btn
                    class="ma-1"
                    color="error"
                    depressed
                    fab
                    x-small
                    @click="preEliminarPersona(persona)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </c-tooltip>
            </v-list-item-action-text>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
    <v-col cols="12" class="text-center">
      <c-tooltip
          bottom
          tooltip="Nuevo Integrante"
      >
        <v-btn
            color="primary"
            depressed
            fab
            large
            @click="crearPersona"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </c-tooltip>
    </v-col>
    <registro-persona
        ref="registroPersona"
        @guardado="val => personaGuardada(val)"
        @close="indexPersonaSeleccionada = null"
    />
  </v-row>
</template>

<script>

import RegistroPersona from '../RegistroPersona'
export default {
  name: 'FomrPersonas',
  components: {
    RegistroPersona
  },
  props: {
    encuesta: {
      type: Object,
      default: null
    },
    referencia: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    click: false,
    indexPersonaSeleccionada: null
  }),
  methods: {
    personaGuardada(persona) {
      this.encuesta.personas.splice(this.indexPersonaSeleccionada || 0, this.indexPersonaSeleccionada !== null ? 1 : 0, persona)
      if(this.indexPersonaSeleccionada === null) this.indexPersonaSeleccionada = 0
      this.$emit('personaGuardada')
    },
    crearPersona() {
      this.$refs.registroPersona.open()
      this.indexPersonaSeleccionada = null
    },
    editarPersona(data) {
      this.indexPersonaSeleccionada = data.index
      this.$refs.registroPersona.open(data.persona)
    },
    preEliminarPersona(persona) {
      console.log('persona', persona)
    }
  }
}
</script>

<style scoped>

</style>