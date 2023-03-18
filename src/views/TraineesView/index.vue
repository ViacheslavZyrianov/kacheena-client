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
        <user-card
          :_id="_id"
          :id="id"
          :picture="picture"
          :name="name"
          :birthdate="birthdate"
          :sex="sex"
        >
          <template #footer>
            <v-btn
              :to="{ name: 'Trainee', params: { id: _id } }"
              color="primary"
              class="mt-4"
              block
            >
              {{ $t('trainees.traineeCard.fullInfoButton.label') }}
            </v-btn>
            <v-btn
              color="primary"
              class="mt-4"
              block
              @click="onEdit(_id)"
            >
              {{ $t('general.edit') }}
            </v-btn>
            <v-btn
              color="error"
              class="mt-4"
              block
              @click="onDelete(_id)"
            >
              {{ $t('general.delete') }}
            </v-btn>
          </template>
        </user-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import addEditTrainee from './add-edit-trainee.vue'
import userCard from '@/components/UserCard/index.vue'

export default {
  name: 'TraineesView',
  components: {
    addEditTrainee,
    userCard
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      getTrainees: 'trainees/getTrainees',
      getTraineeById: 'trainees/getTraineeById'
    })
  },
  methods: {
    ...mapActions({
      fetchTrainees: 'trainees/fetchTrainees'
    }),
    onEdit(id) {
      const { _id, name, birthdate, sex } = this.getTraineeById(id)
      this.$refs.addEditTrainee.isDialogVisible = true
      this.$refs.addEditTrainee.mode = 'edit'
      this.$refs.addEditTrainee.addTraineeByTypeTabValue = 1
      this.$refs.addEditTrainee.id = _id
      this.$refs.addEditTrainee.traineeRegistration.name.value = name.split(' ')[0]
      this.$refs.addEditTrainee.traineeRegistration.surname.value = name.split(' ')[1]
      this.$refs.addEditTrainee.traineeRegistration.birthdate.value = birthdate
      this.$refs.addEditTrainee.traineeRegistration.sex.value = sex
    },
    onDelete(id) {
      console.log('onDelete id', id)
    }
  },
  async created() {
    await this.fetchTrainees()
  }
}
</script>