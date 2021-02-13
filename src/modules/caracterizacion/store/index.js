import Vue from 'vue'
import caracterizacion from '../db/Caracterizacion'

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
    riesgosPrioritarios: [],
    tiposTenencia: [],
    subsidios: []
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
        return state.cursosVida.map(x => {
            return {text: x, value: x}
        })
    },
    discapacidades: state => {
        return state.discapacidades.map(x => {
            return {text: x, value: x}
        })
    },
    estadosCiviles: state => {
        return state.estadosCiviles.map(x => {
            return {text: x, value: x}
        })
    },
    generos: state => {
        return state.generos.map(x => {
            return {text: x, value: x}
        })
    },
    gruposEtnicos: state => {
        return state.gruposEtnicos.map(x => {
            return {text: x, value: x}
        })
    },
    ocupaciones: state => {
        return state.ocupaciones.map(x => {
            return {text: x, value: x}
        })
    },
    orientaciones: state => {
        return state.orientaciones.map(x => {
            return {text: x, value: x}
        })
    },
    sexos: state => {
        return state.sexos.map(x => {
            return {text: x, value: x}
        })
    },
    tiposAfiliacion: state => {
        return state.tiposAfiliacion.map(x => {
            return {text: x, value: x}
        })
    },
    vinculaciones: state => {
        return state.vinculaciones.map(x => {
            return {text: x, value: x}
        })
    },
    hechosVictimizantes: state => {
        return state.hechosVictimizantes
    },
    riesgosAmbientales: state => {
        return state.riesgosAmbientales
    },
    riesgosPrioritarios: state => {
        return state.riesgosPrioritarios
    },
    tiposTenencia: state => {
        return state.tiposTenencia
    },
    subsidios: state => {
        return state.subsidios
    }
}

// actions
const actions = {
    async guardarEncuestaLocal (context, encuesta) {
        if (!encuesta.idd) context.commit('SET_DATOS_UBICACION', encuesta)
        return await caracterizacion.encuestas[encuesta.idd ? 'put' : 'add'](encuesta)
            .then(() => {
                return true
            })
            .catch(() => {
                context.commit('SET_SNACKBAR', { color: 'error', message: 'Error al guardar la encuesta.' })
                return false
            })
    },
    async eliminarEncuestaLocal (context, idd) {
        if (idd) {
            return await caracterizacion.encuestas.delete(idd)
                .then(() => {
                    context.commit('SET_SNACKBAR', { color: 'success', message: 'La Encuesta se eliminó correctamente.' })
                    return true
                })
                .catch(() => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: 'Error al eliminar la encuesta.' })
                    return false
                })
        }
    },
    async getPendientes () {
        return await caracterizacion.encuestas.toCollection().reverse().toArray()
    },
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
        state.tiposTenencia = data.caracterizacion_hogares_respuestas.tenencia
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
        state.subsidios = data.subsidios
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
