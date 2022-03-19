<template>
  <v-list-item
      @click="click = false"
  >
    <c-tooltip
        v-if="alert"
        tooltip="Datos por diligenciar"
        left
    >
      <v-list-item-avatar color="warning" class="mr-2">
        <v-icon>mdi-alert</v-icon>
      </v-list-item-avatar>
    </c-tooltip>
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
            @click.stop="$emit('editar')"
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
            @click.stop="$emit('borrar')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </c-tooltip>
    </v-list-item-action-text>
  </v-list-item>
</template>

<script>

export default {
  name: 'FormPersonasItem',
  props: {
    persona: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    click: false
  }),
  computed: {
    alert() {
      let copiaObjectCaraterizacion = JSON.parse(JSON.stringify(this.persona.caracterizacion))
      delete copiaObjectCaraterizacion.persona_id
      const countCaracterizacion = Object.values(copiaObjectCaraterizacion).filter(j => j === null)
      const countRiesgosPrioritarios = this.persona.riesgos_prioritarios.map(j => j.respuesta).filter(k => k === null)

      return countCaracterizacion.length + countRiesgosPrioritarios.length
    }
  }
}
</script>