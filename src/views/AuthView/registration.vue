<template>
  <v-card
    class="pa-4"
  >
    <v-form v-model="isFormValid">
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
      <!-- <v-text-field
        v-model="form.passwordRepeat.value"
        :rules="form.passwordRepeat.rules"
        filled
        dense
        block
        type="password"
        :label="$t('registration.passwordRepeat.label')"
      /> -->
      <v-btn
        :disabled="isSubmitBtnDisabled"
        :loading="isSubmitBtnLoading"
        color="primary"
        block
        class="mb-4"
        @click="onSubmit"
      >
        {{ $t('registration.button') }}
      </v-btn>
      <div class="d-flex align-center mb-4">
        <v-divider />
        <div class="overline mx-4">{{ $t('registration.or') }}</div>
        <v-divider />
      </div>
      <google-auth />
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
    isFormValid() {
      this.isSubmitBtnDisabled = !this.isFormValid
    }
  },
  data() {
    return {
      isSubmitBtnDisabled: true,
      isSubmitBtnLoading: false,
      isFormValid: false,
      passwordFieldType: 'password',
      passwordIcon: 'mdi-eye-outline',
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
            // value => {
            //   console.log('passwordRepeat', this.form.passwordRepeat.value)
            //   return this.form.passwordRepeat.value === value || 'Passwords must be identical'
            // }
          ]
        },
        // passwordRepeat: {
        //   value: '',
        //   rules: [
        //     v => {
        //       console.log('password', this.form.password.v)
        //       return this.form.password.value === v || 'Passwords must be identical'
        //     }
        //   ]
        // }
      }
    }
  },
  methods: {
    ...mapActions({
      postRegister: 'auth/postRegister'
    }),
    async onSubmit() {
      // this.isSubmitBtnDisabled = true
      // this.isSubmitBtnLoading = true

      await this.postRegister({
        name: this.form.fullName.value,
        login: this.form.login.value,
        password: this.form.password.value
      })

      // this.isSubmitBtnDisabled = false
      // this.isSubmitBtnLoading = false
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
    }
  }
}
</script>