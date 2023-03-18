import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n/index'

export const state = () => ({
  isDarkTheme: false,
  locale: null
})

export const getters = {
  getIsDarkTheme: ({ isDarkTheme }) => isDarkTheme,
  getLocale: ({ locale }) => locale
}

export const mutations = {
  SET_IS_DARK_THEME (state, payload) {
    const isDarkTheme = JSON.parse(payload)
    state.isDarkTheme = isDarkTheme
    localStorage.kacheena_isDarkTheme = isDarkTheme
    vuetify.framework.theme.isDark = isDarkTheme
  },
  SET_LOCALE (state, payload) {
    state.locale = payload
    localStorage.kacheena_locale = payload
    i18n.locale = payload
    vuetify.framework.lang.current = payload
  }
}