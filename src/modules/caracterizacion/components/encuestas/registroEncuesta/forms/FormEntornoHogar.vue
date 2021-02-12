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
          v-model="encuesta.direccion"
          label="Dirección"
          name="Dirección"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-select-complete
          v-model="encuesta.caracterizacion.tipo_vivienda"
          :items="tiposVivienda"
          label="Tipo de vivienda"
          name="tipo de vivienda"
          rules="required"
          :dense="false"
      ></c-select-complete>
    </v-col>
    <v-col cols="12" v-if="encuesta.caracterizacion.tipo_vivienda === 'Otro'">
      <c-text
          v-model="encuesta.caracterizacion.otro_tipo_vivienda"
          label="¿Que otro tipo de vivienda?"
          name="que otro tipo de vivienda"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12" v-if="encuesta.caracterizacion.tipo_vivienda === 'Institución de adultos y persona mayor' || encuesta.caracterizacion.tipo_vivienda === 'Institución de protección de niños y adolescentes'">
      <c-text
          v-model="encuesta.caracterizacion.nombre_institucion"
          label="Nombre de la institución"
          name="nombre de la institución"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-select-complete
          v-model="encuesta.caracterizacion.tenencia"
          :items="tiposTenencia"
          label="Tenencia de la vivienda"
          name="tenencia de la vivienda"
          rules="required"
          :dense="false"
      ></c-select-complete>
    </v-col>
    <v-col cols="12" v-if="encuesta.caracterizacion.tenencia === 'Otros'">
      <c-text
          v-model="encuesta.caracterizacion.otra_tenencia"
          label="¿Que otro tipo de tenencia?"
          name="que otro tipo de tenencia"
          rules="required"
          :dense="false"
      />
    </v-col>
    <v-col cols="12">
      <c-select-complete
          v-model="encuesta.caracterizacion.tipo_familia"
          :items="tiposFamilia"
          label="Tipo de familia"
          name="tipo de familia"
          rules="required"
          :dense="false"
      ></c-select-complete>
    </v-col>
    <v-col cols="12">
      <c-radio
          v-model="encuesta.caracterizacion.recibe_subsidio"
          label="¿La familia recibe algún subsidio o aporte de alguna institución de orden Nacional Departamental o municipal?"
          name="subsidios"
          rules="required"
          :items="[{ text: 'SI', value: 1 }, { text: 'NO', value: 0 } ]"
          item-text="text"
          item-value="value"
          :dense="false"
      />
    </v-col>
    <v-col cols="12" v-if="encuesta.caracterizacion.recibe_subsidio">
      <ValidationProvider name="subsidios" rules="required" v-slot="{ errors }">
        <v-combobox
            v-model="encuesta.hogares_subsidio"
            :items="subsidios"
            :search-input.sync="search"
            hide-selected
            label="Elija subsidios"
            name="subsidios"
            multiple
            dense
            outlined
            :error-messages="errors"
        >
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
                v-bind="attrs"
                color="green"
                class="white--text"
                :input-value="selected"
                small
            >
              <span class="pr-2">{{ item }}</span>
              <v-icon small @click="parent.selectItem(item)">
                mdi-close
              </v-icon>
            </v-chip>
          </template>
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No hay reultados para "<strong>{{ search }}</strong>". presione <kbd>enter</kbd> para crearlo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </ValidationProvider>
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
  watch: {
    'encuesta.caracterizacion.tipo_vivienda': {
      handler(val){
        if(val !== 'Otro' || val !== 'Institución de adultos y persona mayor' || val !== 'Institución de protección de niños y adolescentes'){
          this.encuesta.caracterizacion.otro_tipo_vivienda = null
          this.encuesta.caracterizacion.nombre_institucion = null
        }
      }
    },
    'encuesta.caracterizacion.tenencia': {
      handler(val){
        if(val !== 'Otros'){
          this.encuesta.caracterizacion.otra_tenencia = null
        }
      }
    },
    'encuesta.caracterizacion.recibe_subsidio': {
      handler(val){
        if(val !== 'Otros'){
          this.encuesta.hogares_subsidio = []
        }
      }
    }
  },
  data: () => ({
    loadingBarrios: false,
    barrios: [],
    search: ''
  }),
  computed: {
    ...mapGetters([
      'zonas',
      'tiposVivienda',
      'tiposTenencia',
      'tiposFamilia',
      'subsidios'
    ])
  }
}
</script>

<style scoped>

</style>