<template>
  <v-row v-if="persona">
    <template v-for="(riesgoPrioritario, index) in persona.riesgos_prioritarios">
      <v-col cols="12" :key="index">
        <div class="text-center font-weight-bold" v-if="riesgoPrioritario.riesgo.grupo">
          <p>{{ riesgoPrioritario.riesgo.grupo }}</p>
        </div>
        <c-radio
            v-model="persona.riesgos_prioritarios[index].respuesta"
            :label="riesgoPrioritario.riesgo.descripcion"
            name="riesgo prioritario"
            :vid="`riesgoprioritario${index}`"
            rules="required"
            :items="[{ text: 'SI', value: 'Si' }, { text: 'NO', value: 'No' } ]"
            item-text="text"
            item-value="value"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: "FormRiesgosPrioritarios",
  props: {
    persona: {
      type: Object,
      default: null
    },
    referencia: {
      type: String,
      default: ''
    }
  },
  data: () => ({

  })
}
</script>

<style scoped>

</style>