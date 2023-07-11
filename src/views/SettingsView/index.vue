<template>
  <div class="page">
    <setting-google-id />
    <setting-theme />
    <setting-language />
  </div>
</template>

<script>
import settingGoogleId from './setting-google-id'
import settingTheme from './setting-theme'
import SettingLanguage from './setting-language'

export default {
  name: 'SettingsView',
  components: {
    settingGoogleId,
    settingTheme,
    SettingLanguage
  }
}
</script>