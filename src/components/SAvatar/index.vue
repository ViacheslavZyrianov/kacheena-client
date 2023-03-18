<template>
  <v-avatar
    :size="size"
    :color="color"
  >
    <img
      v-if="picture"
      :src="picture"
      :alt="avatarPlaceholder(name)"
    >
    <span
      v-else
      class="white--text text-h5"
    >
      {{ avatarPlaceholder(name) }}
    </span>
  </v-avatar>
</template>

<script>
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
  methods: {
    avatarPlaceholder(name) {
      return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
  }
}
</script>