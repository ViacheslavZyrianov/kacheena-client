<template>
  <settings-row>
    <template #col-left>
      {{ $t('settings.locale.label') }}
    </template>
    <template #col-right>
      <v-select
        v-model="localeValue"
        :items="localeList"
        class="mt-0 pt-0"
        hide-details
        @change="onLocaleChange"
      />
    </template>
  </settings-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import settingsRow from './settings-row.vue'

import messages from '@/plugins/i18n/messages/index.js'

export default {
  name: 'SettingLanguage',
  components: {
    settingsRow
  },
  data: () => ({
    localeValue: []
  }),
  computed: {
    ...mapGetters({
      getLocale: 'settings/getLocale'
    }),
    localeList () {
      return messages.locales.map(locale => ({
        text: this.$t(`settings.locale.list.${locale}`),
        value: [locale]
      }))
    }
  },
  methods: {
    ...mapMutations({
      SET_LOCALE: 'settings/SET_LOCALE'
    }),
    onLocaleChange([val]) {
      this.SET_LOCALE(val)
    }
  },
  created () {
    this.localeValue = [this.getLocale]
  }
}
</script>