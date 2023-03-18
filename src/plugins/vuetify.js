import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { en, uk } from 'vuetify/lib/locale'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { en, uk },
    current: 'en'
  }
})
