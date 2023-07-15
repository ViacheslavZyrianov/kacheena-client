<template>
  <v-navigation-drawer
    app
    permanent
    :mini-variant="isMini"
  >
    <v-list class="pa-0">
      <v-list-item
        link
        class="d-flex align-center py-1"
        @click="onNavigationDrawerToggle"
      >
        <v-list-item-icon class="mr-4">
          <v-icon>
            {{ mdiMenuToggleIcon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title class="d-flex align-center justify-start">
          <s-avatar
            :picture="getMe.picture"
            :name="getMe.name"
            :size="24"
            class="mr-2"
          />
          <v-list-item-title>
            {{ formattedName }}
          </v-list-item-title>
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-for="{ title, icon, to } in navigationList"
        :key="title"
        :to="to"
      >
        <v-list-item-icon class="mr-4">
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(title) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-3">
        <v-btn
          v-if="isMini"
          fab
          tile
          x-small
          color="error"
          @click="onLogout"
        >
          <v-icon small>
            mdi-exit-run
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          block
          color="error"
          @click="onLogout"
        >
          <v-icon left>
            mdi-exit-run
          </v-icon>
          {{ $t('settings.logout.button') }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import navigationList from './navigationList';

import SAvatar from '@/components/SAvatar/index.vue'

export default {
  name: 'TheNavigation',
  data: () => ({
    navigationList,
    isMini: false
  }),
  components: {
    SAvatar
  },
  computed: {
    ...mapGetters({
      getMe: 'users/getMe'
    }),
    formattedName() {
      const [name, surname] = this.getMe.name.split(' ')

      return surname && surname.length > 1 ? `${name} ${surname[0]}.` : name
    },
    mdiMenuToggleIcon() {
      return this.isMini ? 'mdi-menu-open mdi-rotate-180' : 'mdi-menu-open'
    }
  },
  methods: {
    ...mapMutations({
      SET_ME: 'users/SET_ME'
    }),
    onLogout() {
      this.SET_ME(null)
      this.$router.push('auth')
    },
    onNavigationDrawerToggle() {
      return this.isMini = !this.isMini
    }
  }
}
</script>