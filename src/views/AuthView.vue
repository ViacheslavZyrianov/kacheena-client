<template>
  <div class="page d-flex align-center justify-center">
    <v-card
      width="300"
      class="d-flex align-center flex-column pa-4"
    >
      <div class="text-h6 mb-2">
        {{ $t('auth.label') }}
      </div>
      <v-btn
        :href="googleAuthUrl"
        color="primary"
      >
        <v-icon left>
          mdi-google
        </v-icon>
        google
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthView',
  computed: {
    ...mapGetters({
      getMe: 'users/getMe'
    }),
    googleAuthUrl() {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth'
      const options = {
        redirect_uri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        state: '/',
      }

      const qs = new URLSearchParams(options)

      return `${url}?${qs.toString()}`
    }
  },
  methods: {
    ...mapActions({
      googleAuthInit: 'auth/googleAuthInit'
    })
  },
  async created() {
    if (this.$route.query.code) {
      await this.googleAuthInit(this.$route.query.code)

      this.$router.push('/')
    }
  }
}
</script>