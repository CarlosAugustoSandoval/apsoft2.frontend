<template>
  <v-row v-if="persona">
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.curso_de_vida"
          label="Curso de Vida"
          name="Curso de Vida"
          rules="required"
          :items="cursosVida"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-select-complete
          v-model="persona.parentesco_id"
          label="Vinculo Familiar con El Jefe del Hogar"
          rules="required"
          name="Vinculo Familiar con El Jefe del Hogar"
          :items="parentescos"
          item-text="descripcion"
          item-value="id"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.sexo"
          label="Sexo"
          name="Sexo"
          rules="required"
          :items="sexos"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.genero"
          label="Genero"
          name="Genero"
          rules="required"
          :items="generos"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.orientacion"
          label="Orientación Sexual"
          name="Orientación Sexual"
          rules="required"
          :items="orientaciones"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.estado_civil"
          label="Estado Civil"
          name="Estado Civil"
          rules="required"
          :items="estadosCiviles"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.ocupacion"
          label="Ocupación"
          name="Ocupación"
          rules="required"
          :items="ocupaciones"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.grupo_etnico"
          label="Grupo Étnico"
          name="Grupo Étnico"
          rules="required"
          :items="gruposEtnicos"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.discapacidad"
          label="Discapacidad"
          name="Discapacidad"
          rules="required"
          :items="discapacidades"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-select-complete
          v-model="persona.caracterizacion.hecho_victimizante_id"
          label="Hecho Victimizante"
          name="Hecho Victimizante"
          rules="required"
          :items="hechosVictimizantes"
          item-text="descripcion"
          item-value="id"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.vinculacion_sgsss"
          label="Vinculación al SGSSS"
          name="Vinculación al SGSSS"
          rules="required"
          :items="vinculaciones"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="persona.caracterizacion.tipo_afiliacion"
          label="Tipo Afiliación"
          name="Tipo Afiliación"
          rules="required"
          :items="tiposAfiliacion"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormCaracterizacion',
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
      'cursosVida',
      'parentescos',
      'sexos',
      'generos',
      'orientaciones',
      'estadosCiviles',
      'ocupaciones',
      'gruposEtnicos',
      'discapacidades',
      'hechosVictimizantes',
      'vinculaciones',
      'tiposAfiliacion'
    ])
  }
}
</script>

<style scoped>

</style>