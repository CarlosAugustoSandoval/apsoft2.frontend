import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// PLUGINS
import vuetify from './plugins/vuetify'
import './plugins/moment'
import './plugins/veeValidate'
import './plugins/mixin'
import './plugins/globalComponents'
import './plugins/axios'

// USE
store.commit('SET_DEFAULT_AXIOS')

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
