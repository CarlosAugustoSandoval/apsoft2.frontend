import Vue from 'vue'

// state
const state = {
    tiposFamilia: [],
    tiposVivienda: [],
    cursosVida: [],
    discapacidades: [],
    estadosCiviles: [],
    generos: [],
    gruposEtnicos: [],
    ocupaciones: [],
    orientaciones: [],
    sexos: [],
    tiposAfiliacion: [],
    vinculaciones: [],
    hechosVictimizantes: [],
    riesgosAmbientales: [],
    riesgosPrioritarios: []
}

// getters
const getters = {
    tiposFamilia: state => {
        return state.tiposFamilia
    },
    tiposVivienda: state => {
        return state.tiposVivienda
    },
    cursosVida: state => {
        return state.cursosVida
    },
    discapacidades: state => {
        return state.discapacidades
    },
    estadosCiviles: state => {
        return state.estadosCiviles
    },
    generos: state => {
        return state.generos
    },
    gruposEtnicos: state => {
        return state.gruposEtnicos
    },
    ocupaciones: state => {
        return state.ocupaciones
    },
    orientaciones: state => {
        return state.orientaciones
    },
    sexos: state => {
        return state.sexos
    },
    tiposAfiliacion: state => {
        return state.tiposAfiliacion
    },
    vinculaciones: state => {
        return state.vinculaciones
    },
    hechosVictimizantes: state => {
        return state.hechosVictimizantes
    },
    riesgosAmbientales: state => {
        return state.riesgosAmbientales
    },
    riesgosPrioritarios: state => {
        return state.riesgosPrioritarios
    }
}

// actions
const actions = {
    getComplementosCaraterizacion (context) {
        Vue.axios.get('hogares-module/complementos')
            .then(response => {
                context.commit('SET_COMPLEMENTOS_CARACTERIZACION', response.data)
            })
            .catch(error => {
                context.commit('SET_SNACKBAR', { color: 'error', message: `Error al pedir los complementos de caracterización.`, error: error })
            })
    },
    async eliminarEncuesta(context, id) {
        return await new Promise(resolve => {
            Vue.axios.delete(`hogares-module/hogares/${id}`)
                .then(() => {
                    context.commit('SET_SNACKBAR', { color: 'success', message: 'Encuesta eliminada correctamente.' })
                    resolve(true)
                })
                .catch(error => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: 'Error al eliminar el registro de la encuesta.', error: error })
                    resolve(false)
                })
        })
    }
}

// mutations
const mutations = {
    SET_COMPLEMENTOS_CARACTERIZACION (state, data) {
        state.tiposFamilia = data.caracterizacion_hogares_respuestas.tipo_familia
        state.tiposVivienda = data.caracterizacion_hogares_respuestas.tipo_vivienda
        state.cursosVida = data.caracterizacion_personas_respuestas.curso_de_vida
        state.discapacidades = data.caracterizacion_personas_respuestas.discapacidad
        state.estadosCiviles = data.caracterizacion_personas_respuestas.estado_civil
        state.generos = data.caracterizacion_personas_respuestas.genero
        state.gruposEtnicos = data.caracterizacion_personas_respuestas.grupo_etnico
        state.ocupaciones = data.caracterizacion_personas_respuestas.ocupacion
        state.orientaciones = data.caracterizacion_personas_respuestas.orientacion
        state.sexos = data.caracterizacion_personas_respuestas.sexo
        state.tiposAfiliacion = data.caracterizacion_personas_respuestas.tipo_afiliacion
        state.vinculaciones = data.caracterizacion_personas_respuestas.vinculacion_sgsss
        state.hechosVictimizantes = data.hechos_victimizantes
        state.riesgosAmbientales = data.riesgos_ambientales
        state.riesgosPrioritarios = data.riesgos_prioritarios
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
