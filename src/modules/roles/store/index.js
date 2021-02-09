import Vue from 'vue'
// state

const state = {
}

// getters
const getters = {
}

// actions
const actions = {
    async eliminarRol(context, id) {
        return await new Promise(resolve => {
            Vue.axios.delete(`roles/${id}`)
                .then(() => {
                    context.commit('SET_SNACKBAR', { color: 'success', message: 'Rol eliminado correctamente.' })
                    resolve(true)
                })
                .catch(error => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: 'Error al eliminar el registro del rol.', error: error })
                    resolve(false)
                })
        })
    }
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
