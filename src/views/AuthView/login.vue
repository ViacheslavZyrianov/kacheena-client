<template>
  <v-card
    class="pa-4"
  >
    <v-form
      @submit="onSubmit"
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
        :disabled="isSubmitBtnDisabled"
        :loading="isSubmitBtnLoading"
        color="primary"
        block
        @click="onSubmit"
      >
        {{ $t("login.button") }}
      </v-btn>
    </v-form>
    <template v-if="isGoogleAuthVisible">
      <div class="d-flex align-center my-4">
        <v-divider />
        <div class="overline mx-4">{{ $t('login.or') }}</div>
        <v-divider />
      </div>
      <google-auth />
    </template>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import GoogleAuth from './google.vue'

export default {
  name: 'AuthLogin',
  components: {
    GoogleAuth
  },
  data: () => ({
    login: '',
    password: '',
    isGoogleAuthVisible: false,
    isSubmitBtnDisabled: false,
    isSubmitBtnLoading: false
  }),
  methods: {
    ...mapActions({
      postLogin: 'auth/postLogin'
    }),
    ...mapMutations({
      SET_ERROR: 'snackbar/SET_ERROR'
    }),
    async onSubmit() {
      this.isSubmitBtnDisabled = true
      this.isSubmitBtnLoading = true

      try {
        await this.postLogin({
          login: this.login,
          password: this.password
        })
        
        this.$router.push('dashboard')
      } catch (errCode) {
        this.SET_ERROR(this.$t(`login.errors.${errCode}`))
      } finally {
        this.isSubmitBtnDisabled = false
        this.isSubmitBtnLoading = false
      }
    }
  }
}
</script>