<template>
  <v-menu
    :ref="name"
    v-model="isMenuVisible"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-x
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :disabled="disabled"
        fab
        dark
        small
        color="primary"
      >
        <v-icon>
          mdi-clock-time-four-outline
        </v-icon>
      </v-btn>
    </template>
    <v-time-picker
      v-if="isMenuVisible"
      :value="value"
      :allowed-minutes="allowedMinutes"
      full-width
      format="24hr"
      @click:minute="onTimepickerClose"
      @change="onTimepickerChange"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'TraineeTrainingTimepicker',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isMenuVisible: false
  }),
  methods: {
    allowedMinutes(val) {
      return val % 5 === 0
    },
    onTimepickerChange(val) {
      this.$emit('input', val)
    },
    onTimepickerClose() {
      this.isMenuVisible = false
    }
  }
}
</script>