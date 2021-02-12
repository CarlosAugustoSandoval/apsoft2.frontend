<template>
  <v-row v-if="anfitrion">
    <v-col cols="12">
      <c-radio
          v-model="anfitrion.habla_español"
          label="Habla y Comprende el Español"
          name="Habla y Comprende el Español"
          rules="required"
          :items="[{ text: 'SI', value: 1 }, { text: 'NO', value: 0 } ]"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="anfitrion.jefe_hogar"
          label="Es el Jefe del Hogar"
          name="Es el Jefe del Hogar"
          rules="required"
          :items="[{ text: 'SI', value: 1 }, { text: 'NO', value: 0 } ]"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-select-complete
          v-model="anfitrion.tipo_identificacion"
          label="Tipo Identifiación"
          rules="required"
          name="Tipo Identifiación"
          :items="tiposIdentificacion"
          item-text="descripcion"
          item-value="tipo"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="anfitrion.identificacion"
          label="Identificación"
          name="Identificación"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="anfitrion.nombre1"
          label="Primer Nombre"
          name="Primer Nombre"
          rules="required"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="anfitrion.nombre2"
          label="Segundo Nombre"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="anfitrion.apellido1"
          label="Primer Apellido"
          name="Primer Apellido"
          rules="required"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="anfitrion.apellido2"
          label="Segundo Apellido"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-date
          v-model="anfitrion.fecha_nacimiento"
          label="Fecha Nacimiento"
          name="Fecha Nacimiento"
          rules="required"
          :max="moment().format('YYYY-MM-DD')"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-number
          v-model.number="anfitrion.telefono_fijo"
          label="Teléfono Fijo"
          rules="numeric|minlength:10|maxlength:10"
          :step="1"
          name="Teléfono Fijo"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-number
          v-model.number="anfitrion.celular"
          label="Celular Principal"
          rules="required|numeric|minlength:10|maxlength:10"
          :step="1"
          name="Celular Principal"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-number
          v-model.number="anfitrion.celular2"
          label="Celular Opcional"
          rules="numeric|minlength:10|maxlength:10"
          :step="1"
          name="Celular Opcional"
          :dense="false"
      />
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormAnfitrion',
  props: {
    anfitrion: {
      type: Object,
      default: null
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'tiposIdentificacion'
    ])
  }
}
</script>

<style scoped>

</style>