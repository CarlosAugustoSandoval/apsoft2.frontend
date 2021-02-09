// state
const state = {
    tables: {
        tablaPersonas: 0,
        tablaPersonasVersion: 1,
        tablaEncuestas: 0,
        tablaEncuestasVersion: 1,
        tablaUsuarios: 0,
        tablaUsuariosVersion: 1
    }
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    RELOAD_TABLA(state, table) {
        state.tables[table] = state.tables[table] + 1
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
