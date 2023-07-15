<template>
  <div class="page">
    <setting-google-id v-if="_isGoogleAuthEnabled" />
    <setting-theme />
    <setting-language />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import settingGoogleId from './setting-google-id'
import settingTheme from './setting-theme'
import SettingLanguage from './setting-language'

export default {
  name: 'SettingsView',
  components: {
    settingGoogleId,
    settingTheme,
    SettingLanguage
  },
  computed: {
    ...mapState({
      _isGoogleAuthEnabled: '_system/_isGoogleAuthEnabled'
    })
  },
}
</script>