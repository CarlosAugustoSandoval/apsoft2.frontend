import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'
import store from '../store'

Vue.use(VueAxios, axios)
axios.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
        store.commit('SET_LOGOUT')
        store.commit('SET_SNACKBAR', {color: 'warning', message: `Los datos de la sesión han expirado, inicie sesión nuevamente.`})
        router.replace({name: 'Login'})
    }
    return Promise.reject(error)
})
