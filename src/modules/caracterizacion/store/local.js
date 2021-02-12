// state
const state = {
    datosUbicacion: {
        codigo_departamento: null,
        codigo_municipio: null,
        barrio_id: null,
        direccion: null,
        zona: null
    }
}

// getters
const getters = {
    datosUbicacion: state => {
        return state.datosUbicacion
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
    SET_DATOS_UBICACION (state, data) {
        state.datosUbicacion.codigo_departamento = data.codigo_departamento
        state.datosUbicacion.codigo_municipio = data.codigo_municipio
        state.datosUbicacion.barrio_id = data.barrio_id
        state.datosUbicacion.direccion = data.direccion
        state.datosUbicacion.zona = data.zona
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
