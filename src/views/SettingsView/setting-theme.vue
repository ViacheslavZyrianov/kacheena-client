<template>
  <settings-row>
    <template #col-left>
      {{ $t('settings.theme.label') }}
    </template>
    <template #col-right>
      <v-switch
        :input-value="getIsDarkTheme"
        :label="isDarkThemeLabel"
        hide-details
        class="mt-0"
        @change="onIsDarkThemeSwitchChange"
      />
    </template>
  </settings-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import settingsRow from './settings-row.vue'

export default {
  name: 'SettingTheme',
  components: {
    settingsRow
  },
  computed: {
    ...mapGetters({
      getIsDarkTheme: 'settings/getIsDarkTheme'
    }),
    isDarkThemeLabel() {
      return this.getIsDarkTheme ? this.$t('settings.theme.dark') : this.$t('settings.theme.light')
    }
  },
  methods: {
    ...mapMutations({
      SET_IS_DARK_THEME: 'settings/SET_IS_DARK_THEME'
    }),
    onIsDarkThemeSwitchChange(val) {
      this.SET_IS_DARK_THEME(val)
    }
  }
}
</script>