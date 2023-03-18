<template>
  <v-card
    :class="userCardClassList"
  >
    <s-avatar
      :picture="picture"
      :name="name"
    />
    <div :class="userCardInfoClassList">    
      <div class="overline text-truncate font-weight-bold">
        {{ name }}<template v-if="birthdate">, {{ calculateAge(birthdate) }}</template>
      </div>
      <div
        v-if="birthdate"
        class="caption"
      >
        {{ birthdate | formatDate }}
      </div>
      <div
        v-if="sex"
        class="caption"
      >
        {{ $t(`trainees.${sex}`) }}
      </div>
    </div>
    <slot name="footer" />
  </v-card>
</template>

<script>
import SAvatar from '@/components/SAvatar/index.vue'

import formatDate from '@/mixins/formatDate'

export default {
  name: 'UserCard',
  props: {
    _id: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    birthdate: {
      type: String,
      default: ''
    },
    sex: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'vertical'
    }
  },
  mixins: [
    formatDate
  ],
  components: {
    SAvatar
  },
  computed: {
    isLayoutVertical() {
      return this.layout === 'vertical'
    },
    isLayoutHorizontal() {
      return this.layout === 'horizontal'
    },
    userCardClassList() {
      return [
        'd-flex pa-4',
        { 'align-center flex-column': this.isLayoutVertical },
        { 'align-center': this.isLayoutHorizontal }
      ]
    },
    userCardInfoClassList() {
      return [
        { 'text-center mt-2': this.isLayoutVertical },
        { 'd-flex flex-column ml-4': this.isLayoutHorizontal }
      ]
    }
  },
  methods: {
    calculateAge(birthdate) {
      const birthdateDate = new Date(birthdate)

      const diff_ms = Date.now() - birthdateDate.getTime()
      const age_dt = new Date(diff_ms)
    
      return Math.abs(age_dt.getUTCFullYear() - 1970)
    }
  }
}
</script>