<template>
  <div class="page d-flex align-center justify-center">
    <v-card
      width="300"
    >
      <v-tabs
        v-model="authTabValue"
        grow
      >
        <v-tab>
        {{ $t('login.label') }}
        </v-tab>
        <v-tab>
        {{ $t('registration.label') }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="authTabValue"
      >
        <v-tab-item>
          <login />
        </v-tab-item>
        <v-tab-item>
          <registration />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Login from './login.vue'
import Registration from './registration.vue'

export default {
  name: 'AuthView',
  components: {
    Login,
    Registration
  },
  data: () => ({
    authTabValue: 0
  })
}
</script>