<template>
  <v-row v-if="encuesta">
    <v-col cols="12">
      <v-list subheader>
        <v-subheader>
          Personas Encuesdas
          <c-tooltip
              left
              tooltip="Nueva Persona"
          >
            <v-btn
                color="primary"
                depressed
                fab
                x-small
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </c-tooltip>
        </v-subheader>
        <template
            v-for="(persona, indexPersona) in encuesta.personas"
        >
          <v-list-item
              :key="`persona${indexPersona}`"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ [persona.nombre1, persona.nombre2, persona.apellido1, persona.apellido2].filter(x => x).join(' ') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'FomrPersonas',
  props: {
    encuesta: {
      type: Object,
      default: null
    },
    referencia: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>