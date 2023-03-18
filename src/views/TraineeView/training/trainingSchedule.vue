<template>
  <v-card>
    <v-switch
      v-model="switcherValue"
      :label="title"
      :value="valueAttr"
      :color="color"
      hide-details
      name="schedules"
      @change="onChange"
    />
    <div class="mt-2 d-flex flex-column">
      <v-btn
        :disabled="isEditButtonDisabled"
        :loading="isEditButtonLoading"
        color="info"
        class="mb-2"
        @click="onEdit"
      >
        {{ $t('general.edit') }}
      </v-btn>
      <v-btn
        :disabled="isDeleteButtonDisabled"
        :loading="isDeleteButtonLoading"
        color="error"
        @click="onDelete"
      >
        {{ $t('general.delete') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'TraineeViewTrainingTrainingSchedule',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Array],
      default: ''
    },
    valueAttr: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    switcherValue: null,
    isEditButtonDisabled: false,
    isEditButtonLoading: false,
    isDeleteButtonDisabled: false,
    isDeleteButtonLoading: false
  }),
  watch: {
    value: {
      handler(val) {
        this.switcherValue = val
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      fetchTrainingSchedulesByTraineeId: 'trainings/fetchTrainingSchedulesByTraineeId',
      deleteTrainingSchedule: 'trainings/deleteTrainingSchedule'
    }),
    ...mapMutations({
      SET_CURRENT_TRAINING_SCHEDULE_ID: 'trainings/SET_CURRENT_TRAINING_SCHEDULE_ID'
    }),
    onEdit() {
      this.SET_CURRENT_TRAINING_SCHEDULE_ID(this.id)
    },
    async onDelete() {
      this.isDeleteButtonDisabled = true
      this.isDeleteButtonLoading = true

      await this.deleteTrainingSchedule(this.id)
      await this.fetchTrainingSchedulesByTraineeId(this.$route.params.id)

      this.isDeleteButtonDisabled = false
      this.isDeleteButtonLoading = false
    },
    onChange() {
      this.$emit('input', this.switcherValue)
    }
  }
}
</script>