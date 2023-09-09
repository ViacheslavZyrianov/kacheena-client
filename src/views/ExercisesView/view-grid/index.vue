<template>
  <v-row>
    <v-col
      v-for="{ _id, title, type, muscle, notes } in items"
      :key="_id"
      xl="2"
      lg="3"
      md="4"
      cols="12"
    >
      <card
        :id="_id"
        :title="title"
        :type="type"
        :muscle="muscle"
        :types="types"
        :muscles="muscles"
        :notes="notes"
        :is-delete-button-disabled="isDeleteButtonDisabled"
        :is-delete-button-loading="isDeleteButtonLoading"
        @edit="onEdit"
        @delete="onDelete"
      />
    </v-col>
  </v-row>
</template>

<script>
import card from './card.vue'

export default {
  name: 'ExercisesViewGrid',
  components: {
    card
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    types: {
      type: Object,
      default: () => ({})
    },
    muscles: {
      type: Object,
      default: () => ({})
    },
    isDeleteButtonDisabled: {
      type: Boolean,
      default: false
    },
    isDeleteButtonLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onEdit(id) {
      this.$emit('edit', id)
    },
    onDelete(id) {
      this.$emit('delete', id)
    }
  }
}
</script>