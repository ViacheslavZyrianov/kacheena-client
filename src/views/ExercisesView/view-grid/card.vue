<template>
  <v-card class="pa-4">
    <div class="text-h6 mb-2">
      {{ title }}
    </div>
    <v-chip-group class="mb-2 pa-0">
      <v-chip
        outlined
        class="my-0"
      >
        {{ types[type] }}
      </v-chip>
      <v-chip
        outlined
        class="my-0"
      >
        {{ muscles[muscle] }}
      </v-chip>
    </v-chip-group>
    <v-card
      v-if="notes"
      outlined
      class="mb-4"
    >
      <v-card-text>
        {{ notes }}
      </v-card-text>
    </v-card>
    <div class="mt-2 d-flex flex-column">
      <v-btn
        :disabled="isDeleteButtonDisabled"
        :loading="isDeleteButtonLoading"
        color="info"
        class="mb-2"
        @click="onEdit"
      >
        {{ $t('general.edit') }}
      </v-btn>
      <v-btn
        color="error"
        @click="onDelete"
      >
        {{ $t('general.delete') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'ExerciseViewGridCard',
    props: {
      id: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      muscle: {
        type: String,
        default: ''
      },
      types: {
        type: Object,
        default: () => ({})
      },
      muscles: {
        type: Object,
        default: () => ({})
      },
      notes: {
        type: String,
        default: ''
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
      onEdit() {
        this.$emit('edit', this.id)
      },
      onDelete() {
        this.$emit('delete', this.id)
      }
    }
  }
</script>