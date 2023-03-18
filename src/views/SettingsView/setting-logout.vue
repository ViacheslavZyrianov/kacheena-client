<template>
  <settings-row>
    <template #col-left>
      {{ $t('settings.logout.label') }}
    </template>
    <template #col-right>
      <v-btn
        color="error"
        @click="onLogout"
      >
        <v-icon
          left
        >
          mdi-exit-run
        </v-icon>
        {{ $t('settings.logout.button') }}
      </v-btn>
    </template>
  </settings-row>
</template>

<script>
import { mapMutations } from 'vuex'

import settingsRow from './settings-row.vue'

export default {
  name: 'SettingLogout',
  components: {
    settingsRow
  },
  methods: {
    ...mapMutations({
      SET_ME: 'users/SET_ME'
    }),
    onLogout() {
      this.SET_ME(null)
      this.$router.push('auth')
    }
  }
}
</script>