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
        {{ $t('exercises.types.label') }}
      </v-btn>
    </template>
    <v-card class="pa-4">
      <template
        v-if="isExercisesTypes"
      >
        <div 
          v-for="(_, exerciseKey) in exercisesTypes"
          :key="exerciseKey"
          class="d-flex align-center mb-4"
        >
          <v-text-field
            v-model="exercisesTypes[exerciseKey]"
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
          v-model="type"
          :placeholder="$t('exercises.types.placeholder')"
          class="mr-6"
          maxlength="30"
          counter
        />
        <v-btn
          :disabled="isAddTypeInputDisabled"
          :loading="isAddTypeInputLoading"
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
  name: 'ExercisesCrudType',
  data: () => ({
    type: '',
    isDialogVisible: false,
    exercisesTypes: {},
    initialExercisesTypes: null,
    isAddTypeInputLoading: false,
    isUpdateBtnDisabled: false,
    isDeleteBtnDisabled: false,
    isUpdateButtonLoading: false,
    deletingExercise: null
  }),
  watch: {
    exercisesTypes: {
      handler() {
        this.isUpdateBtnDisabled = isObjectsEqual(this.exercisesTypes, this.initialExercisesTypes)
      },
      deep: true,
    }
  },
  computed: {
    isAddTypeInputDisabled() {
      return this.type.length < 3
    },
    isExercisesTypes() {
      return Object.keys(this.exercisesTypes).length
    }
  },
  methods: {
    ...mapActions({
      fetchExercisesTypes: 'exercises/fetchExercisesTypes',
      postExercisesType: 'exercises/postExercisesType',
      updateExercisesTypes: 'exercises/updateExercisesTypes',
      deleteExerciseType: 'exercises/deleteExerciseType'
    }),
    async init() {
      this.exercisesTypes = await this.fetchExercisesTypes()
      this.initialExercisesTypes = JSON.parse(JSON.stringify(this.exercisesTypes))
    },
    async onAdd() {
      this.isAddTypeInputLoading = true
      
      await this.postExercisesType(this.type)
      await this.init()

      this.type = ''
      
      this.isAddTypeInputLoading = false
    },
    async onUpdate() {
      this.isUpdateBtnDisabled = true
      this.isDeleteBtnDisabled = true

      await this.updateExercisesTypes(this.exercisesTypes)
      await this.init()

      this.isDeleteBtnDisabled = false
    },
    async onDelete(exerciseKey) {
      this.deletingExercise = exerciseKey
      this.isDeleteBtnDisabled = true
      this.isUpdateBtnDisabled = true

      await this.deleteExerciseType(exerciseKey)
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
