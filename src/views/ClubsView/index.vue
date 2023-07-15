<template>
  <div class="page">
    <portal to="toolbar-content">
      <v-row>
        <v-col
          lg="3"
          md="3"
        >
          <add-edit-club ref="addEditClub" />
        </v-col>
      </v-row>
    </portal>
    <v-row>
      <v-col
        v-for="{ _id, address, title, notes, instagram, facebook, site } in getClubs"
        :key="_id"
        xl="2"
        lg="3"
        md="4"
        cols="12"
      >
        <club-card
          :id="_id"
          :title="title"
          :address="address"
          :instagram="instagram"
          :facebook="facebook"
          :site="site"
          :notes="notes"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AddEditClub from './add-edit-club/index.vue'
import ClubCard from './club-card.vue'

export default {
  name: 'ClubsView',
  components: {
    AddEditClub,
    ClubCard
  },
  computed: {
    ...mapGetters({
      getClubs: 'clubs/getClubs'
    })
  },
  methods: {
    ...mapActions({
      fetchClubs: 'clubs/fetchClubs'
    })
  },
  async created() {
    await this.fetchClubs()
  }
}
</script>