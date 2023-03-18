<template>
  <div class="page">
    <setting-google-id />
    <setting-theme />
    <setting-language />
    <setting-logout />
  </div>
</template>

<script>
import settingGoogleId from './setting-google-id'
import settingTheme from './setting-theme'
import SettingLanguage from './setting-language'
import settingLogout from './setting-logout'

export default {
  name: 'SettingsView',
  components: {
    settingGoogleId,
    settingTheme,
    SettingLanguage,
    settingLogout
  }
}
</script>