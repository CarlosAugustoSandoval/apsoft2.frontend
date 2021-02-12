import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Módulos Requeridos
import auth from '@/modules/auth/store'
import snackbar from '@/modules/snackbar/store'
import loading from '@/modules/loading/store'
import customizer from '@/modules/customizer/store/customizer'
import theme from '@/modules/customizer/store/theme'
import dataTable from '@/modules/dataTable/store'
import menu from '@/modules/appMenu/store'
import complementos from '@/modules/complementos/store'

// Módulos Externos
import usuarios from '@/modules/usuarios/store'
import roles from '@/modules/roles/store'
import caracterizacion from '@/modules/caracterizacion/store'
import caracterizacionLocal from '@/modules/caracterizacion/store/local'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    snackbar,
    loading,
    customizer,
    theme,
    dataTable,
    menu,
    complementos,
    // Externos
    usuarios,
    roles,
    caracterizacion,
    caracterizacionLocal
  },
  plugins: [createPersistedState({
    paths: ['theme','auth','caracterizacionLocal']
  })]
})
