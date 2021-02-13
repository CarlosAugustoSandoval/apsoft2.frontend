<template>
  <v-row v-if="persona">
    <v-col cols="12">
      <c-radio
          v-model="persona.habla_español"
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
          v-model="persona.jefe_hogar"
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
          v-model="persona.tipo_identificacion"
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
          v-model="persona.identificacion"
          label="Identificación"
          name="Identificación"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="persona.nombre1"
          label="Primer Nombre"
          name="Primer Nombre"
          rules="required"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="persona.nombre2"
          label="Segundo Nombre"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="persona.apellido1"
          label="Primer Apellido"
          name="Primer Apellido"
          rules="required"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-text
          v-model="persona.apellido2"
          label="Segundo Apellido"
          upper-case
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-date
          v-model="persona.fecha_nacimiento"
          label="Fecha Nacimiento"
          name="Fecha Nacimiento"
          rules="required"
          :max="moment().format('YYYY-MM-DD')"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-number
          v-model.number="persona.celular2"
          label="Celular"
          rules="numeric|minlength:10|maxlength:10"
          :step="1"
          name="Celular"
          :dense="false"
      />
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormDatosBasicos',
  props: {
    persona: {
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