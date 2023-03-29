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
                v-for="({ title, date, time, type, exercises }, index) in trainingsByDay"
                :key="`${date}-${time}-${type}`"
                :class="trainingCardClassList(index)"
              >
                <div class="mb-2 text-subtitle-1">
                  {{ title }}
                </div>
                <v-chip
                  :color="generateColorByTrainingType(type)"
                  class="mb-2"
                  outlined
                >
                  {{ $t(`trainee.training.type.${type}`) }}
                </v-chip>
                <div class="d-flex align-center mb-2">
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

import dayjs from '@/plugins/dayjs'

import formatDate from '@/mixins/formatDate'

export default {
  name: 'TraineeDatepickerTraining',
  components: {
    addEditTrainingSchedule,
    trainingSchedule
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
      personal: 'red',
      group: 'blue'
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
    generateColorByTrainingType(type) {
      return this.colors[type]
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
        schedule.forEach(({ date }) => {
          if (dateInDatepicker === date) colors.push(this.colors[type])
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
            training.title = trainingSchedule.title
            training.type = trainingSchedule.type
            trainingsByDate.push(training)
          }
        })
      })

      return trainingsByDate
    }
  },
  async created() {
    await this.fetchTrainingSchedulesByTraineeId(this.$route.params.id)
    this.applyDefaultTrainingScheduleValue()
    this.trainingsByDay = this.generateTrainingsByDate('today')
  }
}
</script>