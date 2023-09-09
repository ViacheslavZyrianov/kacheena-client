<template>
  <div class="page">
    <portal to="toolbar-content">
      <v-row>
        <v-col>
          <crud-type />
        </v-col>
        <v-col>
          <crud-muscles />
        </v-col>
        <v-col>
          <add-edit-exercise ref="addEditExercise" />
        </v-col>
      </v-row>
    </portal>
    <view-grid
      :items="getExercises"
      :types="getExercisesTypes"
      :muscles="getExercisesMuscles"
      :is-delete-button-disabled="isDeleteButtonDisabled"
      :is-delete-button-loading="isDeleteButtonLoading"
      @edit="onEdit"
      @delete="onDelete"
    />
    <!-- <view-list /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import addEditExercise from './add-edit-exercise/index.vue'

import crudType from './crud-type/index.vue'
import crudMuscles from './crud-muscles/index.vue'

import viewGrid from './view-grid/index.vue'
// import viewList from './view-list/index.vue'

export default {
  name: 'ExercisesView',
  components: {
    addEditExercise,
    crudType,
    crudMuscles,
    viewGrid,
    // viewList
  },
  data: () => ({
    exercise: null,
    isDeleteButtonDisabled: false,
    isDeleteButtonLoading: false
  }),
  computed: {
    ...mapGetters({
      getExercises: 'exercises/getExercises',
      getExerciseById: 'exercises/getExerciseById',
      getExercisesTypes: 'exercises/getExercisesTypes',
      getExercisesMuscles: 'exercises/getExercisesMuscles'
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
    this.fetchExercises()
  }
}
</script>