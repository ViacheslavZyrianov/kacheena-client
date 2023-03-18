<template>
  <v-dialog
    v-model="isDialogVisible"
    width="800"
    @input="onDialogInput"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="success"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('trainee.training.add.button') }}
      </v-btn>
    </template>

    <v-card class="pa-4">
      <v-form v-model="isFormValid">
        <v-text-field
          v-model="title"
          :placeholder="$t('trainee.training.title.placeholder')"
          :label="$t('trainee.training.title.label')"
        />

        <v-select
          v-model="type"
          required
          hide-details
          class="mb-2"
          :items="typeList"
          :label="$t('trainee.training.type.label')"
        />

        <v-card
          v-for="{ value, label } in getDayNames"
          :key="`${value}-${label}`"
          class="pa-4 my-4"
          :color="cardTrainingColor()"
        >
          <v-row align="center">
            <v-col cols="2">
              <div class="overline">{{ label }}</div>
            </v-col>
            <v-col cols="8">
              <v-autocomplete
                v-if="schedule[value]"
                v-model="schedule[value].exercises"
                :items="getExercisesForSelect"
                :label="$t('trainee.training.chooseExercises.label')"
                hide-details
                chips
                multiple
                solo
                class="mr-auto"
              />
              <v-text-field
                v-else
                :label="$t('trainee.training.chooseExercises.placeholder')"
                hide-details
                solo
                disabled
                class="mr-auto"
              />
            </v-col>
            <v-col
              cols="2"
              class="d-flex align-center"
            >
              <div
                class="ml-auto mr-2"
                :class="scheduleValueClassList(schedule[value]?.time)"
              >
                {{ scheduleValue(schedule[value]?.time) }}
              </div>
              <timepicker
                :value="schedule[value]?.time"
                :name="`regularTrainingTimepickerDay-${value}`"
                @input="onTimepickerInput(value, $event)"
              />
            </v-col>
          </v-row>
        </v-card>

        <v-select
          v-model="duration"
          required
          hide-details
          class="mb-6"
          :items="durationList"
          :label="$t('trainee.training.duration.label')"
        />

        <!-- <v-select
          v-model="startFrom"
          required
          hide-details
          class="mb-6"
          :items="startFromList"
          :label="$t('trainee.training.startFrom.label')"
        /> -->

        <v-btn
          v-if="getCurrentTrainingSchedule"
          color="success"
          block
          :disabled="isSubmitDisabled"
          :loading="isSubmitLoading"
          @click="onEditTrainingSchedule"
        >
          {{ $t('general.save') }}
        </v-btn> 

        <v-btn
          v-else
          color="success"
          block
          :disabled="isSubmitDisabled"
          :loading="isSubmitLoading"
          @click="onAddTrainingSchedule"
        >
          {{ $t('general.add') }}
        </v-btn>        
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import dayjs from '@/plugins/dayjs'

import timepicker from './timepicker.vue'

export default {
  name: 'AddEditTrainingSchedule',
  components: {
    timepicker
  },
  data: () => ({
    isDialogVisible: false,
    dayNamesValue: [],
    isFormValid: false,
    datepickerIrregularTrainingValue: [],
    title: '',
    type: 'default',
    regularity: 'regular',
    schedule: {},
    duration: 1,
    dates: [],
    startFrom: 'closestDate',
    startFromDate: null,
    isSubmitDisabled: false,
    isSubmitLoading: false
  }),
  watch: {
    dayNamesValue: {
      handler(newVal, oldVal) {
        const dayToDelete = this.calculateArraySum(oldVal) - this.calculateArraySum(newVal)
        delete this.schedule[dayToDelete]
      }
    },
    getCurrentTrainingSchedule(val) {
      if (!val) return
      this.isDialogVisible = true
      this.title = val.title
      this.type = val.type
      this.schedule = val.scheduleDOW
      this.duration = val.duration
      this.startFromDate = val.startFromDate
    },
    // startFrom: {
      // handler(newVal) {
        // if (newVal === 'closestDate') this.startFromDate = newVal
      // }
    // }
  },
  computed: {
    ...mapGetters({
      getLocale: 'settings/getLocale',
      getExercisesForSelect: 'exercises/getExercisesForSelect',
      getCurrentTrainingSchedule: 'trainings/getCurrentTrainingSchedule'
    }),
    getDayNames() {      
      return [...Array(7).keys()].map((d, value) => ({
        value,
        label: new Intl.DateTimeFormat(this.getLocale, { weekday: 'long', timeZone: 'UTC' }).format(new Date(`2017-01-0${d+2}T00:00:00+00:00`))
      }))
    },
    typeList() {
      return [
        {
          text: this.$t('trainee.training.type.default'),
          value: 'default'
        },
        {
          text: this.$t('trainee.training.type.personal'),
          value: 'personal'
        },
        {
          text: this.$t('trainee.training.type.group'),
          value: 'group'
        }
      ]
    },
    regularityList() {
      return [
        {
          text: this.$t('trainee.training.regularity.regular'),
          value: 'regular'
        },
        {
          text: this.$t('trainee.training.regularity.irregular'),
          value: 'irregular'
        }
      ]
    },
    durationList() {
      return [
        {
          text: this.$t('trainee.training.duration.month1'),
          value: 1
        },
        {
          text: this.$t('trainee.training.duration.month3'),
          value: 3
        },
        {
          text: this.$t('trainee.training.duration.month6'),
          value: 6
        },
        {
          text: this.$t('trainee.training.duration.month12'),
          value: 12
        }
      ]
    },
    startFromList() {
      return [
        {
          text: this.$t('trainee.training.startFrom.closestDate'),
          value: 'closestDate'
        },
        // {
        //   text: this.$t('trainee.training.startFrom.nextWeek'),
        //   value: 'nextWeek'
        // },
        // {
        //   text: this.$t('trainee.training.startFrom.nextMonth'),
        //   value: 'nextMonth'
        // },
        {
          text: this.$t('trainee.training.startFrom.customDate'),
          value: 'customDate'
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      postTrainingSchedule: 'trainings/postTrainingSchedule',
      updateTrainingSchedule: 'trainings/updateTrainingSchedule',
      fetchTrainingSchedulesByTraineeId: 'trainings/fetchTrainingSchedulesByTraineeId',
      fetchExercises: 'exercises/fetchExercises'
    }),
    ...mapMutations({
      SET_CURRENT_TRAINING_SCHEDULE_ID: 'trainings/SET_CURRENT_TRAINING_SCHEDULE_ID'
    }),
    async onAddTrainingSchedule() {
      this.isSubmitDisabled = true
      this.isSubmitLoading = true

      await this.postTrainingSchedule({
        traineeId: this.$route.params.id,
        title: this.title,
        type: this.type,
        regularity: this.regularity,
        schedule: this.schedule,
        duration: this.duration,
        startFromDate: dayjs().format('YYYY-MM-DD')
      })

      await this.fetchTrainingSchedulesByTraineeId(this.$route.params.id)

      this.isSubmitDisabled = false
      this.isSubmitLoading = false

      this.isDialogVisible = false
    },
    async onEditTrainingSchedule() {
      this.isSubmitDisabled = true
      this.isSubmitLoading = true

      await this.updateTrainingSchedule({
        id: this.getCurrentTrainingSchedule._id,
        title: this.title,
        type: this.type,
        regularity: this.regularity,
        schedule: this.schedule,
        duration: this.duration,
        startFromDate: this.startFromDate
      })

      await this.fetchTrainingSchedulesByTraineeId(this.$route.params.id)

      this.isSubmitDisabled = false
      this.isSubmitLoading = false

      this.isDialogVisible = false
    },
    calculateArraySum(arr) {
      return arr.reduce((acc, val) => {
        acc += val
        return acc
      }, 0)
    },
    onTimepickerInput(day, time) {
      this.$set(this.schedule, [day], {
        time,
        exercises: this.schedule[day]?.exercises || []
      })
    },
    scheduleValue(val) {
      return val || '00:00'
    },
    scheduleValueClassList(val) {
      return {
        'text--disabled': val === undefined
      }
    },
    cardTrainingColor() {
      // blue-grey darken-4
      return ''
    },
    resetForm() {
      this.title = ''
      this.type = 'default'
      this.schedule = {}
      this.duration = 1
      this.startFromDate = null
      this.SET_CURRENT_TRAINING_SCHEDULE_ID(null)
    },
    onDialogInput() {
      if (!this.isDialogVisible) this.resetForm()
    },
  },
  async created() {
    if (!this.getExercisesForSelect.length) await this.fetchExercises()
  }
}
</script>