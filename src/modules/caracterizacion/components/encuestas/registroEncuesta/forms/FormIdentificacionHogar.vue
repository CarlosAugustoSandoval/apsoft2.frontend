<template>
  <v-row v-if="encuesta">
      <v-col cols="12">
        <c-text
            :value="encuesta.ficha"
            label="Número de Ficha"
            readonly
            :dense="false"
        />
      </v-col>
      <v-col cols="12">
        <c-date
            v-model="encuesta.fecha_diligenciamiento"
            label="Fecha Diligenciamiento"
            name="Fecha Diligenciamiento"
            rules="required"
            :max="moment().format('YYYY-MM-DD')"
            :dense="false"
        />
      </v-col>
    <v-col cols="12">
      <c-radio
          v-model="encuesta.indigena"
          label="Familia Indigena"
          name="Familia Indigena"
          rules="required"
          :items="[{ text: 'SI', value: 1 }, { text: 'NO', value: 0 } ]"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
      <v-col cols="12">
        <c-select-complete
            v-model="encuesta.codigo_departamento"
            label="Departamento"
            name="Departamento"
            rules="required"
            :items="departamentos"
            item-text="nombre"
            item-value="codigo_dane"
            :dense="false"
        />
      </v-col>
      <v-col cols="12">
        <c-select-complete
            :disabled="!encuesta.codigo_departamento"
            v-model="encuesta.codigo_municipio"
            label="Municipio"
            name="Municipio"
            rules="required"
            :items="departamentos && departamentos.length && encuesta.codigo_departamento ? departamentos.find(x => x.codigo_dane === encuesta.codigo_departamento).municipios : []"
            item-text="nombre"
            item-value="codigo_dane"
            :dense="false"
        />
      </v-col>
      <v-col cols="12">
        <c-select-complete
            :disabled="!encuesta.codigo_municipio"
            v-model="encuesta.barrio_id"
            :loading="loadingBarrios"
            label="Barrio"
            :items="barrios"
            item-text="nombre"
            item-value="id"
            :dense="false"
        />
      </v-col>
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
          v-model="encuesta.direccion"
          label="Dirección"
          name="Dirección"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12" v-if="esMovil">
      <c-location
          v-model="encuesta.coordenadas"
          label="Coordenadas"
          :readonly="true"
          :dense="false"
      >
      </c-location>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormIdentificacionHogar',
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
      'departamentos',
      'zonas'
    ])
  }
}
</script>

<style scoped>

</style>