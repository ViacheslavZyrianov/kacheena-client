<template>
  <v-btn
    :href="googleAuthUrl"
    color="primary"
    block
  >
  <v-icon left>
    mdi-google
  </v-icon>
    google
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AuthGoogle',
  computed: {
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