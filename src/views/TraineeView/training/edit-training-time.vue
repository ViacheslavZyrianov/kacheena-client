<template>
  <v-dialog
    v-model="isDialogVisible"
    width="330"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('trainee.training.item.changeTime') }}
      </v-btn>
    </template>
    <v-card class="pa-4">
      <v-time-picker
        v-model="time"
        :allowed-minutes="allowedMinutes"
        full-width
        format="24hr"
        class="mb-4"
      />
      <v-btn
        :disabled="isSaveButtonDisabled"
        :loading="isSaveButtonLoading"
        color="success"
        block
        @click="onSave"
      >
        {{ $t('general.save') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TraineeTrainingEditTime',
  props: {
    id: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    initialTimeValue: {
      type: String,
      default: '00:00'
    }
  },
  data: () => ({
    isDialogVisible: false,
    time: '00:00',
    isSaveButtonDisabled: false,
    isSaveButtonLoading: false
  }),
  methods: {
    ...mapActions({
      updateTrainingItemTime: 'trainings/updateTrainingItemTime'
    }),
    allowedMinutes(val) {
      return val % 5 === 0
    },
    async onSave() {
      this.isSaveButtonDisabled = true
      this.isSaveButtonLoading = true
      await this.updateTrainingItemTime({
        id: this.id,
        date: this.date,
        time: this.time
      })
      this.$emit('trainingTimeUpdated', this.date)
      this.isDialogVisible = false
      setTimeout(() => {
        this.isSaveButtonDisabled = false
        this.isSaveButtonLoading = false
      }, 300)
    }
  },
  created() {
    this.time = this.initialTimeValue
  }
}
</script>