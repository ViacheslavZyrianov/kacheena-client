<template>
  <settings-row>
    <template #col-left>
      {{ $t('settings.googleAuthId.label') }}
    </template>
    <template #col-right>
      <div class="d-flex align-center">
        <div
          class="body-1 mr-4 google-auth-id"
          id="googleAuthId"
        >
          {{ getMeGoogleId }}
        </div>
        <v-btn
          color="primary"
          fab
          tile
          x-small
          class="btn-copy-google-auth-id"
          data-clipboard-target="#googleAuthId"
        >
          <v-icon>
            mdi-content-copy
          </v-icon>
        </v-btn>
      </div>
    </template>
  </settings-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import ClipboardJS from 'clipboard'

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
      getMeGoogleId: 'users/getMeGoogleId',
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
    },
    initClipboard() {
      const clipboard = new ClipboardJS('.btn-copy-google-auth-id')

      clipboard.on('success', e => {
        e.clearSelection()
      })
    }
  },
  created () {
    this.localeValue = [this.getLocale]
    this.initClipboard()
  }
}
</script>