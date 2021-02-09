import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import es from 'vuetify/es5/locale/es'
import theme from './theme'

Vue.use(Vuetify);

export default new Vuetify({
    rtl: theme.isRTL,
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            dark: theme.dark,
            light: theme.light
        }
    },
    lang: {
        locales: { es },
        current: 'es'
    }
})
