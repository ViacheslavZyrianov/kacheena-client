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
      <v-col cols="3">
        <s-avatar
          :picture="getMe.picture"
          :name="getMe.name"
          :size="48"
        />
      </v-col>
      <v-col
        class="body-1 text-truncate"
      >
        {{ formattedName }}
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

import SAvatar from '@/components/SAvatar/index.vue'

export default {
  name: 'TheNavigation',
  data: () => ({
    navigationList
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
    }
  }
}
</script>