<template>
  <div
    v-if="user"
    class="page"
  >
    <v-row>
      <v-col>
        <user-card
          :_id="user._id"
          :id="user.id"
          :picture="user.picture"
          :name="user.name"
          :birthdate="user.birthdate"
          :sex="user.sex"
          layout="horizontal"
        />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-col cols="12">
        <training />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import userCard from '@/components/UserCard/index.vue'

import training from './training/index.vue'

export default {
  name: 'TraineeView',
  components: {
    userCard,
    training
  },
  data: () => ({
    user: null
  }),
  methods: {
    ...mapActions({
      fetchUserById: 'users/fetchUserById'
    }),
    applyDatepickerDefaultValue() {
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      this.datePickerValue = `${year}-${month}-${day}`
    }
  },
  async created() {
    this.applyDatepickerDefaultValue()
    this.user = await this.fetchUserById(this.$route.params.id)
  }
}
</script>