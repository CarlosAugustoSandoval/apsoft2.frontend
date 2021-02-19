<template>
  <v-container fluid>
    <v-card elevation="1">
      <v-card-title class="mb-0 pb-0">
        <v-row>
          <v-col cols="12" sm="12" md="5" lg="5">
            <c-select-complete
                v-model="parametros.codigo_departamento"
                label="Departamento"
                name="Departamento"
                rules="required"
                :items="departamentos"
                item-text="nombre"
                item-value="codigo_dane"
            />
          </v-col>
          <v-col cols="12" sm="12" md="5" lg="5">
            <c-select-complete
                :disabled="!parametros.codigo_departamento"
                v-model="parametros.codigo_municipio"
                label="Municipio"
                name="Municipio"
                rules="required"
                :items="departamentos && departamentos.length && parametros.codigo_departamento ? departamentos.find(x => x.codigo_dane === parametros.codigo_departamento).municipios : []"
                item-text="nombre"
                item-value="codigo_dane"
            />
          </v-col>
          <v-col cols="12" sm="12" md="2" lg="2">
            <v-btn color="green" class="white--text" block>
              <span>Filtrar</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
    <v-card>
      <v-tabs v-model="tab">
        <v-tab>Hogares</v-tab>
        <v-tab>Personas</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center text-h6 font-weight-bold">
              TOTAL HOGARES {{ estadisticasHogares.total }}
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <hogares-chart v-if="hogaresData && hogaresData.vivienda" :chart-i-d="'chart-tipoVivienda'" :title="'TIPO VIVIENDA'" :data="hogaresData.vivienda"></hogares-chart>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <hogares-chart v-if="hogaresData && hogaresData.tenencia" :chart-i-d="'tenencia'" :title="'TENENCIA'" :data="hogaresData.tenencia"></hogares-chart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center text-h6 font-weight-bold">
              TOTAL PERSONAS {{ estadisticasPersonas.total }}
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="3" lg="3">
                  <v-list two-line class="notification-wrap">
                    <v-list-item-group v-model="currentOption" color="indigo">
                      <template v-for="option in options">
                        <v-hover :key="`option-${ option.value }`">
                          <v-list-item @click="changeChart(option.arrayValue)">
                            <v-list-item-avatar class="my-1 align-self-center">{{ (option.value + 1) }}</v-list-item-avatar>
                            <v-list-item-content class="pa-0">
                              <v-list-item-title><h5 class="mb-0 text-truncate">{{ option.name }}</h5></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-hover>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col cols="12" sm="12" md="9" lg="9">
                  <personas-chart
                      :key="chartSelected"
                      v-if="personasData && personasData[chartSelected]"
                      :chart-i-d="chartSelected"
                      :title="options[currentOption].name"
                      :data="personasData[chartSelected]"
                      :apply-substring="options[currentOption].applySubstring"
                  ></personas-chart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import HogaresChart from "@/modules/caracterizacion/components/estadisticas/HogaresChart";
import PersonasChart from "@/modules/caracterizacion/components/estadisticas/PersonasChart";
export default {
  name: "Estadisticas",
  components: {
    HogaresChart,
    PersonasChart
  },
  computed: {
    ...mapGetters([
      'departamentos',
    ]),
    hogaresData(){
      return this.estadisticasHogares
    },
    personasData(){
      return this.estadisticasPersonas
    }
  },
  data: () => ({
    parametros: {
      codigo_departamento: null,
      codigo_municipio: null
    },
    tab: null,
    estadisticasHogares: [],
    estadisticasPersonas: [],
    currentOption: 0,
    options: [
      {name: 'Sexo', value: 0, arrayValue: 'sexo', applySubstring: false},
      {name: 'Genero', value: 1, arrayValue: 'genero', applySubstring: false},
      {name: 'Orientacion', value: 2, arrayValue: 'orientacion', applySubstring: false},
      {name: 'Estado Civil', value: 3, arrayValue: 'estadoCivil', applySubstring: false},
      {name: 'Ocupacion', value: 4, arrayValue: 'ocupacion', applySubstring: false},
      {name: 'Grupo Etnico', value: 5, arrayValue: 'grupoEtnico', applySubstring: false},
      {name: 'Discapacidad', value: 6, arrayValue: 'discapacidad', applySubstring: false},
      {name: 'Tipo Afiliacion', value: 7, arrayValue: 'tipoAfiliacion', applySubstring: false},
      {name: 'Curso de Vida', value: 8, arrayValue: 'cursoVida', applySubstring: false},
      {name: 'Hechos Victimizantes', value: 9, arrayValue: 'hechosVictimizantes', applySubstring: true}
    ],
    chartSelected: 'sexo'
  }),
  methods: {
    getHogaresEstadisticas(){
      this.axios.get(`hogares-module/estadisticas-hogares?departamento=${this.parametros.codigo_departamento}?municipios=${this.parametros.codigo_municipio}`).then(response => {
        this.estadisticasHogares = response.data
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          'message': ' error al conseguir estadisticas de hogares',
          error: error
        })
      })
    },
    getPersonasEstadisticas(){
      this.axios.get(`hogares-module/estadisticas-personas?departamento=${this.parametros.codigo_departamento}?municipios=${this.parametros.codigo_municipio}`).then(response => {
        this.estadisticasPersonas = response.data
      }).catch(error => {
        this.$store.commit('SET_SNACKBAR', {
          color: 'error',
          'message': ' error al conseguir estadisticas de personas',
          error: error
        })
      })
    },
    changeChart(name){
      this.chartSelected = name
    }
  },
  created() {
    this.getHogaresEstadisticas()
    this.getPersonasEstadisticas()
  }
}
</script>

<style scoped>

</style>