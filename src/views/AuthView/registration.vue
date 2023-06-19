<template>
  <v-card
    class="pa-4"
  >
    <v-form
      v-model="isFormValid"
      ref="form"
    >
      <v-text-field
        v-model="form.fullName.value"
        :rules="form.fullName.rules"
        filled
        dense
        block
        :label="$t('registration.fullName.label')"
        :placeholder="$t('registration.fullName.placeholder')"
      />
      <v-text-field
        v-model="form.login.value"
        :rules="form.login.rules"
        filled
        dense
        block
        :label="$t('registration.login.label')"
        :placeholder="$t('registration.login.placeholder')"
      />
      <v-text-field
        v-model="form.password.value"
        :rules="form.password.rules"
        filled
        dense
        block
        :type="passwordFieldType"
        :label="$t('registration.password.label')"
        :append-icon="passwordIcon"
        @click:append="togglePasswordVisibility"
      />
      <v-text-field
        v-model="form.passwordRepeat.value"
        :rules="form.passwordRepeat.rules"
        ref="passwordRepeat"
        filled
        dense
        block
        :type="passwordRepeatFieldType"
        :label="$t('registration.passwordRepeat.label')"
        :append-icon="passwordRepeatIcon"
        @click:append="togglePasswordRepeatVisibility"
      />
      <v-btn
        :disabled="isSubmitBtnDisabled"
        :loading="isSubmitBtnLoading"
        color="primary"
        block
        @click="onSubmit"
      >
        {{ $t('registration.button') }}
      </v-btn>
      <template v-if="isGoogleAuthVisible">
        <div class="d-flex align-center my-4">
          <v-divider />
          <div class="overline mx-4">{{ $t('registration.or') }}</div>
          <v-divider />
        </div>
        <google-auth />
      </template>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

import GoogleAuth from './google.vue'

export default {
  name: 'AuthRegistration',
  components: {
    GoogleAuth
  },
  watch: {
    isFormValid(val) {
      this.isSubmitBtnDisabled = !val
    },
    'form.fullName.value'(val) {
      this.form.login.value = val.toLowerCase().replaceAll(' ', '').trim()
    },
    'form.password.value'() {
      this.$refs.passwordRepeat.validate();
    }
  },
  data() {
    return {
      isGoogleAuthVisible: false,
      isSubmitBtnDisabled: true,
      isSubmitBtnLoading: false,
      isFormValid: false,
      passwordFieldType: 'password',
      passwordRepeatFieldType: 'password',
      passwordIcon: 'mdi-eye-outline',
      passwordRepeatIcon: 'mdi-eye-outline',
      form: {
        fullName: {
          value: '',
          rules: [
            v => v.length >= 2 || this.$t('registration.fullName.errors.1')
          ]
        },
        login: {
          value: '',
          rules: [
            v => v.length >= 4 || this.$t('registration.login.errors.1')
          ]
        },
        password: {
          value: '',
          rules: [
            v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v) || this.$t('registration.password.errors.1')
          ]
        },
        passwordRepeat: {
          value: '',
          rules: [
            v => this.form.password.value === v || this.$t('registration.passwordRepeat.errors.1')
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions({
      postRegister: 'auth/postRegister'
    }),
    async onSubmit() {
      this.isSubmitBtnDisabled = true
      this.isSubmitBtnLoading = true

      await this.postRegister({
        name: this.form.fullName.value,
        login: this.form.login.value,
        password: this.form.password.value
      })
      
      this.isSubmitBtnDisabled = false
      this.isSubmitBtnLoading = false
    },
    togglePasswordVisibility() {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text'
        this.passwordIcon = 'mdi-eye-off-outline'
      }
      else {
        this.passwordFieldType = 'password'
        this.passwordIcon = 'mdi-eye-outline'
      }
    },
    togglePasswordRepeatVisibility() {
      if (this.passwordRepeatFieldType === 'password') {
        this.passwordRepeatFieldType = 'text'
        this.passwordRepeatIcon = 'mdi-eye-off-outline'
      }
      else {
        this.passwordRepeatFieldType = 'password'
        this.passwordRepeatIcon = 'mdi-eye-outline'
      }
    }
  }
}
</script>