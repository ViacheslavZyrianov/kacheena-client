<template>
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
</template>

<script>
import userCard from '@/components/UserCard/index.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TraineesViewTrainee',
  components: {
    userCard
  },
  props: {
    _id: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    birthdate: {
      type: String,
      default: ''
    },
    sex: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      getTraineeById: 'trainees/getTraineeById'
    })
  },
  methods: {
    ...mapActions({
      fetchTrainees: 'trainees/fetchTrainees',
      deleteTrainee: 'trainees/deleteTrainee'
    }),
    onEdit(id) {
      const { _id, name, birthdate, sex, club } = this.getTraineeById(id)
      this.$parent.$refs.addEditTrainee.isDialogVisible = true
      this.$parent.$refs.addEditTrainee.mode = 'edit'
      this.$parent.$refs.addEditTrainee.addTraineeByTypeTabValue = 1
      this.$parent.$refs.addEditTrainee.id = _id
      this.$parent.$refs.addEditTrainee.traineeRegistration.name.value = name.split(' ')[0]
      this.$parent.$refs.addEditTrainee.traineeRegistration.surname.value = name.split(' ')[1]
      this.$parent.$refs.addEditTrainee.traineeRegistration.birthdate.value = birthdate
      this.$parent.$refs.addEditTrainee.traineeRegistration.sex.value = sex
      this.$parent.$refs.addEditTrainee.traineeRegistration.club.value = club
    },
    async onDelete(id) {
      await this.deleteTrainee(id)
      await this.fetchTrainees()
    }
  }
}
</script>