<template>
  <v-row v-if="encuesta">
    <v-col cols="12">
      <v-list dense class="pa-0">
        <template
            v-for="(persona, indexPersona) in encuesta.personas"
        >
          <form-personas-item
              :key="`persona${indexPersona}`"
              :persona="persona"
              @editar="editarPersona({index: indexPersona, persona: persona})"
              @borrar="preEliminarPersona(persona)"
          />
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
import FormPersonasItem from "./FormPersonasItem";
export default {
  name: 'FomrPersonas',
  components: {
    FormPersonasItem,
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