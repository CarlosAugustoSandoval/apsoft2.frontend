<template>
  <v-row v-if="encuesta">
    <v-col cols="12">
      <c-radio
          v-model="encuesta.zona"
          label="Zona"
          name="Zona"
          rules="required"
          :items="zonas"
          item-text="text"
          item-value="value"
          :dense="false"
          :column="!$vuetify.breakpoint.smAndUp"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          :value="encuesta.direccion"
          label="Dirección"
          name="Dirección"
          rules="required"
          :dense="false"
      />
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormEntornoHogar',
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
    loadingBarrios: false,
    barrios: []
  }),
  computed: {
    ...mapGetters([
      'zonas'
    ])
  }
}
</script>

<style scoped>

</style>