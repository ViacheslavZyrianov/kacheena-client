<template>
  <div class="page">
    <v-row>
      <v-spacer />
      <v-col
        lg="3"
        md="3"
      >
        <add-edit-trainee ref="addEditTrainee"/>
      </v-col>
    </v-row>
    <div
      v-for="(trainees, clubId) in traineesByClub"
      :key="clubId"
      class="mb-12"
    >
      <v-row>
        <v-card class="py-2 px-4 ml-3">
          <div class="text-h6">
            {{ clubTitle(clubId) }}
          </div>
        </v-card>
      </v-row>
      <v-row>
        <v-col
          v-for="{ _id, id, picture, name, birthdate, sex } in trainees"
          :key="id"
          lg="3"
          md="4"
        >
          <trainee
            :_id="_id"
            :id="id"
            :picture="picture"
            :name="name"
            :birthdate="birthdate"
            :sex="sex"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import trainee from './trainee.vue'
import addEditTrainee from './add-edit-trainee.vue'

export default {
  name: 'TraineesView',
  components: {
    trainee,
    addEditTrainee
  },
  computed: {
    ...mapGetters({
      getTrainees: 'trainees/getTrainees',
      getClubById: 'clubs/getClubById'
    }),
    traineesByClub() {
      return this.getTrainees.reduce((acc, val) => {
        if (acc[val.club]) acc[val.club].push(val)
        else acc[val.club] = [val]
        
        return acc
      }, {})
    }
  },
  methods: {
    ...mapActions({
      fetchClubs: 'clubs/fetchClubs',
      fetchTrainees: 'trainees/fetchTrainees'
    }),
    clubTitle(clubId) {
      return this.getClubById(clubId)?.title || this.$t('trainees.clubless')
    }
  },
  async created() {
    await this.fetchClubs()
    await this.fetchTrainees()
  }
}
</script>