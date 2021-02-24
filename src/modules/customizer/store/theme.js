// state
const state = {
    darkMode: false,
    themeColor: '#FF6707',
    themeColors: [
        '#FF6707',
        '#29265D',
        '#347EB5',
        '#04A6A4'
    ]
}

// getters
const getters = {
    themeColors: state => {
        return state.themeColors
    },
    themeColor: state => {
        return state.themeColor
    },
    darkMode: state => {
        return state.darkMode
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
    SET_THEME_MODE(state, dark) {
        state.darkMode = dark
    },
    SET_THEME_COLOR(state, color) {
        state.themeColor = color
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
