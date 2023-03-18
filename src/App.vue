<template>
  <v-app id="app">
    <the-navigation v-if="getMe" />
    <v-main>
      <v-fade-transition
        :duration="200"
        hide-on-leave
      >
        <router-view/>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import TheNavigation from '@/components/TheNavigation/index.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
  },
  computed: {
    ...mapGetters({
      getMe: 'users/getMe'
    })
  },
  methods: {
    ...mapMutations({
      SET_ME: 'users/SET_ME',
      SET_IS_DARK_THEME: 'settings/SET_IS_DARK_THEME',
      SET_LOCALE: 'settings/SET_LOCALE'
    }),
    applyTheme() {
      const isSystemThemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const { kacheena_isDarkTheme } = localStorage
      const isThemeAlreadyApplied = kacheena_isDarkTheme !== undefined
      const theme = isThemeAlreadyApplied ? kacheena_isDarkTheme : isSystemThemeDark

      this.SET_IS_DARK_THEME(theme)
    },
    applyLocale() {
      this.SET_LOCALE(localStorage.kacheena_locale || 'en')
    }
  },
  created() {
    if (localStorage.kacheena_me) this.SET_ME(JSON.parse(localStorage.kacheena_me))
    this.applyTheme()
    this.applyLocale()
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page {
  min-height: 100vh;
  padding: 24px;
}
</style>
