<template>
  <v-row v-if="encuesta">
    <v-col cols="12">
      <v-card
          outlined
          tile
          style="border-color:rgba(0, 0, 0, 0.38); border-width:1px"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="font-weight-bold">Utilización exclusiva de dormitorios</span>
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.dormitorios"
                  label="Número de Dormitorios"
                  name="número de dormitorios"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.personas"
                  label="Número de Personas"
                  name="número de personas"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card
          outlined
          tile
          style="border-color:rgba(0, 0, 0, 0.38); border-width:1px"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="font-weight-bold">Convivencia con animales</span>
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.perros"
                  label="Cantidad de Perros"
                  name="cantidad de perros"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.gatos"
                  label="Cantidad de Gatos"
                  name="cantidad de gatos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col class="mx-auto" cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.cant_otros_animales"
                  label="Cantidad Otros Animales"
                  name="cantidad otros animales"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="12" v-if="encuesta.uso_espacios.cant_otros_animales">
              <c-text
                  v-model.number="encuesta.uso_espacios.cuales_otros_animales"
                  label="¿Que Otros Animales?"
                  name="otros animales"
                  rules="required"
                  :dense="false"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card
          outlined
          tile
          style="border-color:rgba(0, 0, 0, 0.38); border-width:1px"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="font-weight-bold">Animales no vacunados contra la rabia</span>
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.perros_no_vacunados"
                  label="Perros"
                  name="perro"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.gatos_no_vacunados"
                  label="Gatos"
                  name="gatos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card
          outlined
          tile
          style="border-color:rgba(0, 0, 0, 0.38); border-width:1px"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <span class="font-weight-bold">Tenencia de animales</span>
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.bovinos"
                  label="Bovinos"
                  name="bovinos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.porcinos"
                  label="Porcinos"
                  name="porcinos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.caprinos"
                  label="Caprinos"
                  name="caprinos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.equinos"
                  label="Equinos"
                  name="equinos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.ovinos"
                  label="Ovinos"
                  name="ovinos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.especies_menores"
                  label="Especies Menores"
                  name="especies menores"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.animales_exoticos"
                  label="Animales Exoticos"
                  name="animales exoticos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="6">
              <c-number
                  v-model.number="encuesta.uso_espacios.otros_no_domesticos"
                  label="Otros no Domesticos"
                  name="otros no domesticos"
                  rules="required"
                  :dense="false"
                  step="1"
              />
            </v-col>
            <v-col cols="12" v-if="encuesta.uso_espacios.otros_no_domesticos">
              <c-text
                  v-model="encuesta.uso_espacios.cuales_no_domesticos"
                  label="Cuales no Domesticos"
                  name="cuales no domesticos"
                  rules="required"
                  :dense="false"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FormUsoEspacios",
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
  watch: {
    'encuesta.uso_espacios.cant_otros_animales' : {
      handler(val){
        if(!val){
          this.encuesta.uso_espacios.cuales_otros_animales = null
        }
      }
    },
    'encuesta.uso_espacios.otros_no_domesticos' : {
      handler(val){
        if(!val){
          this.encuesta.uso_espacios.cuales_no_domesticos = null
        }
      }
    }
  }
}
</script>

<style scoped>

</style>