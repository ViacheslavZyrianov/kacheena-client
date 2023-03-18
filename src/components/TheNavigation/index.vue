<template>
  <v-navigation-drawer
    app
    permanent
    width="200px"
  >
    <v-row
      align="center"
      class="pa-2"
      no-gutters
    >
      <v-col cols="4">
        <v-avatar
          color="primary"
        >
          <img
            :src="getMe.picture"
            :alt="getMe.name"
          >
        </v-avatar>
      </v-col>
      <v-col
        class="body-1 text-truncate"
      >
        {{ getMe.name }}
      </v-col>
    </v-row>

    <v-list class="pa-0">
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
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

import navigationList from './navigationList';

export default {
  name: 'TheNavigation',
  data: () => ({
    navigationList
  }),
  computed: {
    ...mapGetters({
      getMe: 'users/getMe'
    })
  }
}
</script>