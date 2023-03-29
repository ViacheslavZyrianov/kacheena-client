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
    <v-row>
      <v-col
        v-for="{ _id, id, picture, name, birthdate, sex } in getTrainees"
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
    })
  },
  methods: {
    ...mapActions({
      fetchClubs: 'clubs/fetchClubs',
      fetchTrainees: 'trainees/fetchTrainees'
    }),
  },
  async created() {
    await this.fetchClubs()
    await this.fetchTrainees()
  }
}
</script>