// state
const state = {
    tiposIdentificacion: [
        { tipo: 'CC', descripcion: 'Cedula de Ciudadania' },
        { tipo: 'CE', descripcion: 'Cédula de Extranjería' },
        { tipo: 'NI', descripcion: 'NIT' },
        { tipo: 'PE', descripcion: 'Permiso Especial de Permanencia' }
    ]
}

// getters
const getters = {
    tiposIdentificacion: state => {
        return state.tiposIdentificacion
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
    state,
    getters,
    actions,
    mutations
}
