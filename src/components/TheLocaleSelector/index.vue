<template>
  <v-speed-dial
    v-model="isOpened"
    absolute
    :top="top"
    :bottom="bottom"
    :left="left"
    :right="right"
    :direction="direction"
    :transition="transition"
    :open-on-hover="openOnHover"
  >
    <template v-slot:activator>
      <v-btn
        v-model="isOpened"
        :color="color"
        dark
        fab
      >
        <v-icon v-if="isOpened">
          mdi-close
        </v-icon>
        <object
          v-else
          v-html="activeLocaleFlag"
          class="svg-object"
        />
      </v-btn>
    </template>

    <v-btn
      v-for="({ label, svg }) in flagsToShow"
      :key="label"
      fab
      dark
      small
      @click="onLocaleChange(label)"
    >
      <object
        v-html="svg"
        class="svg-object"
      />
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import en from '@/plugins/flags/en.js'
import uk from '@/plugins/flags/uk.js'

export default {
  name: 'TheLocaleSwitcher',
  props: {
    position: {
      default: 'bottom-right',
      type: String
    },
    direction: {
      default: 'top',
      type: String
    },
    openOnHover: {
      default: false,
      type: Boolean
    },
    transition: {
      default: 'slide-y-reverse-transition',
      type: String
    },
    color: {
      default: 'blue darken-2',
      type: String
    }
  },
  data: () => ({
    isOpened: false
  }),
  computed: {
    ...mapGetters({
      getLocale: 'settings/getLocale'
    }),
    top() {
      return this.position.includes('top')
    },
    bottom() {
      return this.position.includes('bottom')
    },
    left() {
      return this.position.includes('left')
    },
    right() {
      return this.position.includes('right')
    },
    flags() {
      return [
        {
          label: 'en',
          svg: en
        },
        {
          label: 'uk',
          svg: uk
        }
      ]
    },
    flagsToShow() {
      return this.flags.filter(({ label }) => label !== this.getLocale)
    },
    activeLocaleFlag() {
      return this.flags.find(({ label }) => label === this.getLocale)?.svg
    }
  },
  methods: {
    ...mapMutations({
      SET_LOCALE: 'settings/SET_LOCALE'
    }),
    onLocaleChange(val) {
      this.SET_LOCALE(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-object {
  width: 30px;
  height: 22px;
  pointer-events: none;
}
</style>