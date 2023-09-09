<template>
  <v-dialog
    v-model="isDialogVisible"
    width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('exercises.muscles.label') }}
      </v-btn>
    </template>
    <v-card class="pa-4">
      <template
        v-if="isExercisesMuscles"
      >
        <div 
          v-for="(_, exerciseKey) in exercisesMuscles"
          :key="exerciseKey"
          class="d-flex align-center mb-4"
        >
          <v-text-field
            v-model="exercisesMuscles[exerciseKey]"
            dense
            outlined
            hide-details
          />
          <v-btn
            color="error"
            fab
            x-small
            class="ml-4"
            :disabled="isDeleteBtnDisabled"
            :loading="isDeleteButtonLoading(exerciseKey)"
            @click="onDelete(exerciseKey)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
        <v-btn
          color="success"
          block
          :disabled="isUpdateBtnDisabled"
          :loading="isUpdateButtonLoading"
          @click="onUpdate"
        >
          {{ $t('general.save') }}
        </v-btn>
      <v-divider class="mt-8 mb-4" />
      </template>
      <v-form class="d-flex align-center">
        <v-text-field
          v-model="muscle"
          :placeholder="$t('exercises.muscles.placeholder')"
          class="mr-6"
          maxlength="30"
          counter
        />
        <v-btn
          :disabled="isAddMuscleInputDisabled"
          :loading="isAddMuscleInputLoading"
          color="success"
          @click="onAdd"
        >
          {{ $t('general.add') }}
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

import isObjectsEqual from '@/utils/isObjectsEqual'

export default {
  name: 'ExercisesCrudMuscles',
  data: () => ({
    muscle: '',
    isDialogVisible: false,
    exercisesMuscles: {},
    initialExercisesMuscles: null,
    isAddMuscleInputLoading: false,
    isUpdateBtnDisabled: false,
    isDeleteBtnDisabled: false,
    isUpdateButtonLoading: false,
    deletingExercise: null
  }),
  watch: {
    exercisesMuscles: {
      handler() {
        this.isUpdateBtnDisabled = isObjectsEqual(this.exercisesMuscles, this.initialExercisesMuscles)
      },
      deep: true,
    }
  },
  computed: {
    isAddMuscleInputDisabled() {
      return this.muscle.length < 3
    },
    isExercisesMuscles() {
      return Object.keys(this.exercisesMuscles).length
    }
  },
  methods: {
    ...mapActions({
      fetchExercisesMuscles: 'exercises/fetchExercisesMuscles',
      postExercisesMuscle: 'exercises/postExercisesMuscle',
      updateExercisesMuscles: 'exercises/updateExercisesMuscles',
      deleteExerciseMuscle: 'exercises/deleteExerciseMuscle'
    }),
    async init() {
      this.exercisesMuscles = await this.fetchExercisesMuscles()
      this.initialExercisesMuscles = JSON.parse(JSON.stringify(this.exercisesMuscles))
    },
    async onAdd() {
      this.isAddMuscleInputLoading = true
      
      await this.postExercisesMuscle(this.muscle)
      await this.init()

      this.muscle = ''
      
      this.isAddMuscleInputLoading = false
    },
    async onUpdate() {
      this.isUpdateBtnDisabled = true
      this.isDeleteBtnDisabled = true

      await this.updateExercisesMuscles(this.exercisesMuscles)
      await this.init()

      this.isDeleteBtnDisabled = false
    },
    async onDelete(exerciseKey) {
      this.deletingExercise = exerciseKey
      this.isDeleteBtnDisabled = true
      this.isUpdateBtnDisabled = true

      await this.deleteExerciseMuscle(exerciseKey)
      await this.init()
    
      this.deletingExercise = null
      this.isDeleteBtnDisabled = false
    },
    isDeleteButtonLoading(exerciseKey) {
      return this.deletingExercise === exerciseKey
    }
  },
  async created() {
    this.init()
  }
}
</script>
