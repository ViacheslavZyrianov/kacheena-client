<template>
  <v-dialog
    v-model="isDialogVisible"
    width="300"
    @input="onDialogInput"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="success"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('exercises.addButton') }}
      </v-btn>
    </template>
    <v-card class="pa-4">
      <v-form
        v-model="isFormValid"
        ref="form"
      >
        <v-text-field
          v-model="form.title"
          :rules="rules.title"
          :label="$t('exercises.title.label')"
          :placeholder="$t('exercises.title.placeholder')"
          filled
          dense
          hide-details
          class="mb-6"
        />
        <v-autocomplete
          v-model="form.type"
          :items="typeList"
          :rules="rules.type"
          :label="$t('exercises.type.label')"
          required
          filled
          hide-details
          class="mb-6"
        />
        <v-autocomplete
          v-model="form.muscle"
          :items="muscleList"
          :rules="rules.muscle"
          :label="$t('exercises.muscle.label')"
          required
          filled
          hide-details
          class="mb-6"
        />
        <v-textarea
          v-model="form.notes"
          :label="$t('exercises.notes.label')"
          :placeholder="$t('exercises.notes.placeholder')"
          class="mb-6"
          filled
          rows="4"
          hide-details
          auto-grow
        />
        <v-btn
          :disabled="isButtonDisabled"
          :loading="isButtonLoading"
          color="success"
          block
          @click="onFormSubmit"
        >
          {{ $t('general.save') }}
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import muscleList from './muscleList'
import typeList from './typeList'

export default {
  name: 'ExercisesAddEditExercise',
  data: () => ({
    id: null,
    mode: 'add',
    isDialogVisible: false,
    isButtonDisabled: false,
    isButtonLoading: false,
    isFormValid: false,
    form: {
      title: '',
      type: '',
      muscle: '',
      notes: ''
    }
  }),
  watch: {
    isFormValid: {
      handler(val) {
        this.isButtonDisabled = !val
      }
    },
  },
  computed: {
    rules() {
      return {
        title: [
          v => !!v
        ],
        type: [
          v => !!v
        ],
        muscle: [
          v => !!v
        ]
      }
    },
    typeList() {
      return typeList.map(value => ({
        text: this.$t(`exercises.type.${value}`),
        value
      }))
    },
    muscleList() {
      return muscleList.map(value => ({
        text: this.$t(`exercises.muscle.${value}`),
        value
      }))
    }
  },
  methods: {
    ...mapActions({
      fetchExercises: 'exercises/fetchExercises',
      postExercise: 'exercises/postExercise',
      updateExercise: 'exercises/updateExercise'
    }),
    resetForm() {
      for (const key in this.form) {
        this.form[key] = ''
      }
      this.$refs.form.resetValidation()
      this.mode = 'add'
      this.id = null
    },
    onDialogInput() {
      if (!this.isDialogVisible) this.resetForm()
    },
    async onFormSubmit() {
      this.isButtonDisabled = true
      this.isButtonLoading = true

      if (this.mode === 'edit') {
        await this.updateExercise({
          id: this.id,
          ...this.form
        })
      }
      if (this.mode === 'add') await this.postExercise(this.form)

      await this.fetchExercises()

      this.isButtonDisabled = false
      this.isButtonLoading = false

      this.isDialogVisible = false
    }
  }
}
</script>