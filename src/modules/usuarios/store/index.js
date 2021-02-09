import Vue from 'vue'
// state

const state = {
}

// getters
const getters = {
}

// actions
const actions = {
    async eliminarUsuario(context, id) {
        return await new Promise(resolve => {
            Vue.axios.delete(`users/${id}`)
                .then(() => {
                    context.commit('SET_SNACKBAR', { color: 'success', message: 'Usuario eliminado correctamente.' })
                    resolve(true)
                })
                .catch(error => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: 'Error al eliminar el registro del usuario.', error: error })
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
