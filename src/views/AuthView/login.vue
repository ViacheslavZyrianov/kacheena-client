<template>
  <v-card
    class="pa-4"
  >
    <v-text-field
      v-model="login"
      filled
      dense
      block
      :label="$t('login.login.label')"
    />
    <v-text-field
      v-model="password"
      filled
      dense
      block
      type="password"
      :label="$t('login.password.label')"
    />
    <v-btn
      color="primary"
      block
      class="mb-4"
      @click="onSubmit"
    >
      {{ $t("login.button") }}
    </v-btn>
    <div class="d-flex align-center mb-4">
      <v-divider />
      <div class="overline mx-4">{{ $t('login.or') }}</div>
      <v-divider />
    </div>
    <google-auth />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

import GoogleAuth from './google.vue'

export default {
  name: 'AuthLogin',
  components: {
    GoogleAuth
  },
  data: () => ({
    login: '',
    password: ''
  }),
  methods: {
    ...mapActions({
      postLogin: 'auth/postLogin'
    }),
    async onSubmit() {
        await this.postLogin({
          login: this.login,
          password: this.password
        })

        this.$router.push('trainees')
    }
  }
}
</script>