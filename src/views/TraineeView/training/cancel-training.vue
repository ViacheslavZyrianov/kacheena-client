<template>
  <v-btn
    block
    color="error"
    class="mt-2"
    @click="onCancel"
  >
    {{ $t('trainee.training.item.cancel') }}
  </v-btn>
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
      }
    },
    data: () => ({
      isDialogVisible: false,
      isCancelButtonDisabled: false,
      isCancelButtonLoading: false
    }),
    methods: {
      ...mapActions({
        cancelTrainingItem: 'trainings/cancelTrainingItem',
        fetchTrainingSchedulesByTraineeId: 'trainings/fetchTrainingSchedulesByTraineeId',
      }),
      async onCancel() {
        this.isCancelButtonDisabled = true
        this.isCancelButtonLoading = true
        await this.cancelTrainingItem({
          id: this.id,
          date: this.date
        })
        await this.fetchTrainingSchedulesByTraineeId(this.$route.params.id)
        this.$emit('cancelled', this.date)
        this.isDialogVisible = false
        setTimeout(() => {
          this.isCancelButtonDisabled = false
          this.isCancelButtonLoading = false
        }, 300)
      }
    }
  }
  </script>