<template>
  <div class="page">
    <v-row>
      <v-spacer />
      <v-col
        lg="3"
        md="3"
      >
        <add-edit-exercise ref="addEditExercise" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="{ _id, title, type, muscle, notes } in getExercises"
        :key="_id"
        xl="2"
        lg="3"
        md="4"
        cols="12"
      >
        <v-card
          class="pa-4"
        >
          <div class="text-h6 mb-2">
            {{ title }}
          </div>
          <v-chip-group class="mb-2 pa-0">
            <v-chip
              outlined
              class="my-0"
            >
              {{ $t(`exercises.type.${type}`) }}
            </v-chip>
            <v-chip
              outlined
              class="my-0"
            >
              {{ $t(`exercises.muscle.${muscle}`) }}
            </v-chip>
          </v-chip-group>
          <v-card
            outlined
            class="mb-4"
          >
            <v-card-text>
              {{ notes }}
            </v-card-text>
          </v-card>
          <div class="mt-2 d-flex flex-column">
            <v-btn
              :disabled="isDeleteButtonDisabled"
              :loading="isDeleteButtonLoading"
              color="info"
              class="mb-2"
              @click="onEdit(_id)"
            >
              {{ $t('general.edit') }}
            </v-btn>
            <v-btn
              color="error"
              @click="onDelete(_id)"
            >
              {{ $t('general.delete') }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import addEditExercise from './add-edit-exercise/index.vue'

export default {
  name: 'ExercisesView',
  components: {
    addEditExercise
  },
  data: () => ({
    exercise: null,
    isDeleteButtonDisabled: false,
    isDeleteButtonLoading: false
  }),
  computed: {
    ...mapGetters({
      getExercises: 'exercises/getExercises',
      getExerciseById: 'exercises/getExerciseById'
    })
  },
  methods: {
    ...mapActions({
      fetchExercises: 'exercises/fetchExercises',
      deleteExercise: 'exercises/deleteExercise'
    }),
    onEdit(id) {
      this.$refs.addEditExercise.isDialogVisible = true
      this.$refs.addEditExercise.mode = 'edit'
      this.$refs.addEditExercise.id = id
      const {
        _id, // eslint-disable-line no-unused-vars
        trainerId, // eslint-disable-line no-unused-vars
        ...addEditExerciseForm
      } = this.getExerciseById(id)
      this.$refs.addEditExercise.form = addEditExerciseForm
    },
    async onDelete(id) {
      this.isDeleteButtonDisabled = true
      this.isDeleteButtonLoading = true

      await this.deleteExercise(id)
      await this.fetchExercises()

      this.isDeleteButtonDisabled = false
      this.isDeleteButtonLoading = false
    }
  },
  async created() {
    await this.fetchExercises()
  }
}
</script>