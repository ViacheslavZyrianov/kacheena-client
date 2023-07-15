<template>
  <v-app id="app">
    <the-navigation v-if="getMe" />
    <v-app-bar
      app
      elevation="0"
    >
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <portal-target name="toolbar-content" />
    </v-app-bar>
    <v-main>
      <v-fade-transition
        :duration="200"
        hide-on-leave
      >
        <router-view/>
      </v-fade-transition>
    
      <the-locale-selector v-if="isLocaleSelectorVisible" />
    </v-main>
    <v-snackbar
      v-model="getSnackbar.isVisible"
      :color="getSnackbar.color"
      :timeout="getSnackbar.timeout"
    >
      <v-layout align-center pr-4>
        <v-icon
          v-if="getSnackbar.icon"
          class="pr-3"
          dark
          large
        >
          {{ getSnackbar.icon }}
        </v-icon>
        <v-layout column>
          <div>{{ getSnackbar.content }}</div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import TheNavigation from '@/components/TheNavigation/index.vue'
import TheLocaleSelector from '@/components/TheLocaleSelector/index.vue'

export default {
  name: 'App',
  components: {
    TheNavigation,
    TheLocaleSelector
  },
  computed: {
    ...mapGetters({
      getMe: 'users/getMe',
      getSnackbar: 'snackbar/getSnackbar'
    }),
    isLocaleSelectorVisible() {
      return ['Home', 'Auth'].includes(this.$route.name)
    },
    toolbarTitle() {
      return this.$t(`${this.$route?.name?.toLowerCase()}.label`)
    }
  },
  methods: {
    ...mapMutations({
      SET_ME: 'users/SET_ME',
      SET_IS_DARK_THEME: 'settings/SET_IS_DARK_THEME',
      SET_LOCALE: 'settings/SET_LOCALE'
    }),
    ...mapActions({
      fetchInit: 'init/fetchInit'
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
  async created() {
    await this.fetchInit()
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
