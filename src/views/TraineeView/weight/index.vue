<template>
  <v-card>
    <v-card-title>
      {{ $t('trainee.weight.label') }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <line-chart
            v-if="chart.data"
            :key="`chart-weight-${chart.data.labels.length}`"
            :data="chart.data"
            :options="chart.options"
          />
          <v-card
            v-else
            outlined
            height="288"
          />
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col>
              <v-date-picker
                v-model="datepickerValue"
                :events="eventsColors"
                color="blue-grey lighten-1"
                min="1930-01-01"
                first-day-of-week="1"
                no-title
                show-adjacent-months
                filled
                full-width
                @click:date="onDateClick"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-form
                @submit.prevent="onWeightSave"
              >
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      v-model="weightValue"
                      filled
                      dense
                      hide-details
                      :suffix="$t('general.kg')"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-btn
                      :disabled="isButtonAddDisabled"
                      :loading="isButtonAddLoading"
                      color="success"
                      type="submit"
                      block
                      height="40"
                    >
                      {{ $t('general.save') }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      :disabled="isButtonDeleteDisabled"
                      :loading="isButtonDeleteLoading"
                      color="error"
                      block
                      @click="onWeightDelete"
                    >
                      {{ $t('general.delete') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import dayjs from '@/plugins/dayjs'
import line from '@/plugins/chartjs/line'

export default {
  name: 'TraineeWeight',
  components: {
    lineChart: line
  },
  data: () => ({
    chart: {
      data: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }
      }
    },
    datepickerValue: null,
    weightValue: null,
    weightData: null,
    isButtonAddDisabled: false,
    isButtonAddLoading: false,
    isButtonDeleteDisabled: false,
    isButtonDeleteLoading: false,
    mode: 'add'
  }),
  watch: {
    weightDataId: {
      handler(val) {
        this.isButtonDeleteDisabled = !val
        this.mode = val ? 'update' : 'add'
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      getWeights: 'weights/getWeights',
      getWeightDataByDate: 'weights/getWeightDataByDate'
    }),
    weightDataId() {
      return this.weightData ? this.weightData._id : null
    },
    weightDataWeight() {
      return this.weightData ? this.weightData.weight : null
    }
  },
  methods: {
    ...mapActions({
      fetchWeights: 'weights/fetchWeights',
      postWeight: 'weights/postWeight',
      updateWeight: 'weights/updateWeight',
      deleteWeight: 'weights/deleteWeight'
    }),
    eventsColors(_date) {
      return this.getWeights.find(({ date }) => date === _date) ? '#4DB6AC' : null
    },
    updateWeightData() {
      this.weightData = this.getWeightDataByDate(this.datepickerValue)
    },
    updateWeightInInput() {
      this.updateWeightData()
      this.weightValue = this.weightDataWeight
    },
    onDateClick() {
      this.updateWeightInInput()
    },
    async onWeightSave() {
      this.isButtonDeleteDisabled = true
      this.isButtonDeleteLoading = true

      if (this.mode === 'add') {
        await this.postWeight({
          traineeId: this.$route.params.id,
          weight: this.weightValue,
          date: this.datepickerValue
        })
      }
      if (this.mode === 'update') {
        console.log('update')
        await this.updateWeight({
          id: this.weightDataId,
          weight: this.weightValue
        })
      }

      await this.updateChart()
      this.updateWeightInInput()

      this.isButtonDeleteDisabled = false
      this.isButtonDeleteLoading = false
    },
    async onWeightDelete() {
      this.isButtonDeleteDisabled = true
      this.isButtonDeleteLoading = true

      await this.deleteWeight(this.weightDataId)

      await this.updateChart()
      this.updateWeightInInput()

      this.isButtonDeleteDisabled = false
      this.isButtonDeleteLoading = false
    },
    async updateChart() {
      await this.fetchWeights(this.$route.params.id)
      this.chart.data = this.getWeights.reduce((acc, { date, weight }) => {
        acc.labels.push(date.split('-').reverse().join('.'))
        acc.datasets[0].data.push(weight)

        return acc
      }, { labels: [], datasets: [{ data: [] }] })
    }
  },
  async created() {
    this.datepickerValue = dayjs().format('YYYY-MM-DD')
    await this.updateChart()
    this.updateWeightInInput()
  }
}
</script>