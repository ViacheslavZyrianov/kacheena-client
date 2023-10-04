<template>
  <v-card>
    <v-card-title>
      {{ $t('trainee.datepicker.trainings.label') }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-fade-transition
            :duration="200"
            leave-absolute
            group
          >
            <template v-if="trainingsByDay.length">
              <v-card
                v-for="({ id, title, date, time, type, exercises }, index) in trainingsByDay"
                :key="`${id}-${date}-${time}-${type}`"
                :class="trainingCardClassList(index)"
              >
                <div
                  :class="titleClassList(time)"
                >
                  {{ title }}
                </div>
                <v-chip
                  :disabled="isTrainingCancelled(time)"
                  :color="generateColorByTrainingType(type, time)"
                  class="mb-2"
                  outlined
                >
                  {{ $t(`trainee.training.type.${type}`) }}
                </v-chip>
                <div
                  v-if="time"
                  class="d-flex align-center mb-2"
                >
                  <v-icon class="mr-1">mdi-clock-time-five-outline</v-icon>
                  <div class="text-subtitle-2">{{ time }}</div>
                </div>
                <v-chip
                  v-for="exerciseId in exercises"
                  :key="exerciseId"
                  outlined
                >
                  {{ getExerciseById(exerciseId)?.title }}
                </v-chip>
                <edit-training-time
                  :id="id"
                  :date="date"
                  :initial-time-value="time"
                  :type="cancelOrRestoreTraining(time)"
                  @trainingTimeUpdated="onTrainingTimeUpdated"
                />
                <cancel-training
                  v-if="!isTrainingCancelled(time)"
                  :id="id"
                  :date="date"
                  @cancelled="onTrainingCancelled"
                />
              </v-card>
            </template>
            <v-card
              v-else
              key="emptyCard"
              height="172"
              outlined
            />
          </v-fade-transition>
        </v-col>
        <v-col cols="4">
          <v-date-picker
            v-model="datepickerValue"
            :events="eventsColors"
            color="blue-grey lighten-1"
            full-width
            first-day-of-week="1"
            show-adjacent-months
            reactive
            no-title
            @click:date="onDateClick"
          />
        </v-col>
        <v-col cols="4">
          <add-edit-training-schedule ref="addEditTrainingSchedule" />
          <template v-if="getTrainingSchedules.length">
            <training-schedule
              v-for="{_id, title, type} in getTrainingSchedules"
              :key="_id"
              v-model="trainingSchedulesValue"
              :value-attr="_id"
              :id="_id"
              :title="title"
              :color="generateColorByTrainingType(type)"
              class="pa-4 mb-2"
            />
          </template>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import addEditTrainingSchedule from './add-edit-training-schedule.vue'
import trainingSchedule from './trainingSchedule.vue'
import editTrainingTime from './edit-training-time.vue'
import cancelTraining from './cancel-training.vue'

import dayjs from '@/plugins/dayjs'

import formatDate from '@/mixins/formatDate'

export default {
  name: 'TraineeDatepickerTraining',
  components: {
    addEditTrainingSchedule,
    trainingSchedule,
    editTrainingTime,
    cancelTraining
  },
  mixins: [
    formatDate
  ],
  data: () => ({
    datepickerValue: '',
    dayNamesValue: [],
    trainingSchedulesValue: [],
    colors: {
      default: 'green',
      defaultCancelled: 'green lighten-4',
      personal: 'red',
      personalCancelled: 'red lighten-4',
      group: 'blue',
      groupCancelled: 'blue lighten-4'
    },
    trainingsByDay: [],
  }),
  computed: {
    ...mapGetters({
      getExerciseById: 'exercises/getExerciseById',
      getTrainingSchedules: 'trainings/getTrainingSchedules'
    }),
    trainingSchedulesSelected() {
      return this.getTrainingSchedules.filter(({ _id }) => this.trainingSchedulesValue.find(id => _id === id))
    }
  },
  methods: {
    ...mapActions({
      fetchTrainingSchedulesByTraineeId: 'trainings/fetchTrainingSchedulesByTraineeId'
    }),
    onDateClick(date) {
      this.trainingsByDay = this.generateTrainingsByDate(date)
    },
    applyDefaultTrainingScheduleValue() {
      this.trainingSchedulesValue = this.getTrainingSchedules.map(({ _id }) => _id)
    },
    generateColorByTrainingType(type, time) {
      const color = time === null ? `${type}Cancelled` : type
      return this.colors[color]
    },
    trainingCardClassList(index) {
      return [
        'pa-4',
        { 'mb-4': this.trainingsByDay.length - 1 !== index }
      ]
    },
    eventsColors(dateInDatepicker) {
      const colors = []

      this.trainingSchedulesSelected.forEach(({ schedule, type }) => {
        schedule.forEach(({ date, time }) => {
          if (dateInDatepicker === date) {
            const color = time === null ? `${type}Cancelled` : type
            colors.push(this.colors[color])
          }
        })
      })

      return colors
    },
    generateTrainingsByDate(dateValue) {
      dateValue = dateValue === 'today' ? dayjs().format('YYYY-MM-DD') : dateValue

      const trainingsByDate = []

      this.trainingSchedulesSelected.forEach(trainingSchedule => {
        const training = {}

        trainingSchedule.schedule.forEach(schedule => {
          if (dateValue === schedule.date) {
            Object.assign(training, schedule)
            training.id = trainingSchedule._id
            training.title = trainingSchedule.title
            training.type = trainingSchedule.type
            trainingsByDate.push(training)
          }
        })
      })

      return trainingsByDate
    },
    onTrainingTimeUpdated(date) {
      this.onDateClick(date)
    },
    onTrainingCancelled(date) {
      this.onDateClick(date)
    },
    isTrainingCancelled(time) {
      return time === null
    },
    cancelOrRestoreTraining(time) {
      return this.isTrainingCancelled(time) ? 'cancel' : 'restore'
    },
    titleClassList(time) {
      return [
        'mb-2 text-subtitle-1',
        { 'text-decoration-line-through text--disabled': this.isTrainingCancelled(time) },
      ]
    }
  },
  async created() {
    await this.fetchTrainingSchedulesByTraineeId(this.$route.params.id)
    this.applyDefaultTrainingScheduleValue()
    this.trainingsByDay = this.generateTrainingsByDate('today')
  }
}
</script>