<template>
  <v-row>
    <v-col cols="12" sm="12" md="4" lg="4">
      <v-list class="notification-wrap">
        <v-list-item-group v-model="currentOption" color="indigo">
          <template v-for="(items, index) in data">
            <v-hover :key="`option-${ index }`">
              <v-list-item @click="changeTable(index)">
                <v-list-item-content class="pa-0">
                  <v-list-item-title><h5 class="mb-0 text-truncate">{{ index }}</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-hover>
          </template>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="8">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Descripcion</th>
              <th class="text-left">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data[currentTable]" :key="index">
              <td>{{ item.descripcion }}</td>
              <td>
                <v-progress-linear
                    :value="(item.porcentaje * 100)"
                    :color="returnColor(item.porcentaje * 100)"
                    height="25"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RiesgosAmbientales",
  props: {
    data: {
      type: [Array, Object],
      default: null
    },
  },
  data: () => ({
    currentOption: 0,
    currentTable: 'CONOCE LOS RIESGOS QUÍMICOS EN EL HOGAR - RQ',
  }),
  methods: {
    changeTable(index){
      this.currentTable = index
    },
    returnColor(porcentaje){
      if(porcentaje < 50){
        return 'red'
      }else if (porcentaje <= 80){
        return 'yellow'
      }else{
        return 'green'
      }
    }
  },
}
</script>

<style scoped>

</style>