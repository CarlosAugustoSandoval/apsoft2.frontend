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
                    @click.stop="editarPersona(persona)"
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
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </c-tooltip>
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
  },
  data: () => ({
    click: false
  }),
  methods: {
    editarPersona(persona) {
      console.log('persona', persona)
    },
    preEliminarPersona(persona) {
      console.log('persona', persona)
    }
  }
}
</script>

<style scoped>

</style>