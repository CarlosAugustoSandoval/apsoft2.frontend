import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import store from '../store'

//Rutas requeridas
import home from '@/modules/home/router'
import auth from '@/modules/auth/router'

//Rutas Externas
import usuarios from '@/modules/usuarios/router'
import roles from '@/modules/roles/router'
import caracterizacion from '@/modules/caracterizacion/router'

Vue.use(VueRouter)

const routes = [
  //Rutas requeridas
  home,
  auth,
  //Rutas Externas
  usuarios,
  roles,
  caracterizacion
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
    return goTo(scrollTo)
  },
  routes
})

// navigation guards before each
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.access_token) {
      next({ name: 'Login' })
    } else if(to.name === 'Home' || (await store.getters.permisoName(to.meta.withAccess))) {
      next()
    } else {
      setTimeout(() => {
        store.commit('SET_SNACKBAR', {color: 'warning', message: `No tiene permisos para ingresar a: ${to.meta.title.text}.`})
      }, 200)
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router
