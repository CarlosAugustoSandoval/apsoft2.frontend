import Vue from 'vue'

// state
const state = {
    tiposIdentificacion: [],
    departamentos: [],
    municipios: [],
    parentescos: [],
    zonas: [
        { text: 'Urbana', value: 'Urbana'},
        { text: 'Rural', value: 'Rural'}
    ],
}

// getters
const getters = {
    tiposIdentificacion: state => {
        return state.tiposIdentificacion
    },
    departamentos: state => {
        return state.departamentos
    },
    municipios: state => {
        return state.municipios
    },
    zonas: state => {
        return state.zonas
    },
    parentescos: state => {
        return state.parentescos
    }
}

// actions
const actions = {
    getComplementos (context) {
        Vue.axios.get('complementos-generales')
            .then(response => {
                context.commit('SET_COMPLEMENTOS_GENERALES', response.data)
            })
            .catch(error => {
                context.commit('SET_SNACKBAR', { color: 'error', message: `Error al pedir los complementos generales.`, error: error })
            })
    }
}

// mutations
const mutations = {
    SET_COMPLEMENTOS_GENERALES (state, data) {
        state.tiposIdentificacion = data.tipos_identificacion
        state.departamentos = data.divipola
        state.parentescos = data.Parentescos
        data.divipola.forEach(x => state.municipios = state.municipios.concat(x.municipios))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
