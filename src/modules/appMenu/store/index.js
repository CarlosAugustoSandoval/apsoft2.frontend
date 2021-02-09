import { itemsMenu } from './data'
// state
const state = {
    itemsMenu
}

// getters
const getters = {
    itemsMenu: (state, getters) => {
        let menuPrincipal = []
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'inicio'))
        if(getters.permisoName('usuarios.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'usuarios'))
        if(getters.permisoName('roles.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'roles'))
        return menuPrincipal
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
