<template>
  <v-btn
    fab
    tile
    small
    :loading="isLoading"
    @click="onClick"
  >
    <v-icon>
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonSwitcher',
  props: {
    switchFrom: {
      type: String,
      default: ''
    },
    switchTo: {
      type: String,
      default: ''
    },
    defaultView: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    currentValue: null,
    isLoading: true
  }),
  computed: {
    icon() {
      return `mdi-${this.currentValue}`
    }
  },
  methods: {
    onClick() {
      if (this.currentValue === this.switchFrom) this.currentValue = this.switchTo
      else if (this.currentValue === this.switchTo) this.currentValue = this.switchFrom
      this.$emit('change', this.currentValue)
    }
  },
  created() {
    this.currentValue = this.defaultView
    this.isLoading = false
  }
}
</script>