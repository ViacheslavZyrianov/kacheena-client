<template>
  <v-avatar
    v-if="picture"
    :size="size"
    :color="color"
  >
    <img
      :src="picture"
      :alt="alt"
    >
  </v-avatar>
  <div
    v-else
    :style="avatarEmojiStyle"
    v-html="avatarEmoji"
  />
</template>

<script>
import generate from './emojis.js'

export default {
  name: 'SAvatar',
  props: {
    picture: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: Number,
      default: 88
    }
  },
  computed: {
    alt() {
      return `${this.name.split(' ')[0][0]}${this.name.split(' ')[1][0]}`
    },
    avatarEmoji() {
      return `&#x${generate(this.name)}`
    },
    avatarEmojiStyle() {
      return `font-size: ${this.size}px; line-height: 1.1666666667em;`
    }
  }
}
</script>