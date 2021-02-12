<template>
  <v-row v-if="encuesta">
    <template v-for="(riesgoAmbiental, index) in encuesta.riesgos_ambientales">
      <v-col cols="12" :key="index">
        <div class="text-center font-weight-bold" v-if="riesgoAmbiental.riesgo.grupo">
          <p>{{ riesgoAmbiental.riesgo.grupo }}</p>
        </div>
        <c-radio
            v-model="encuesta.riesgos_ambientales[index].respuesta"
            :label="riesgoAmbiental.riesgo.descripcion"
            :name="`riesgo ambiental ${index}`"
            rules="required"
            :items="[{ text: 'SI', value: 'Si' }, { text: 'NO', value: 'No' } ]"
            item-text="text"
            item-value="value"
            :dense="false"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: "FormRiesgosAmbientales",
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

  })
}
</script>

<style scoped>

</style>