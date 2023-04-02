<template>
  <user-card
    :_id="_id"
    :id="id"
    :picture="picture"
    :name="name"
    :birthdate="birthdate"
    :sex="sex"
  >
    <template #footer>
      <v-btn
        :to="{ name: 'Trainee', params: { id: _id } }"
        color="primary"
        class="mt-4"
        block
      >
        {{ $t('trainees.traineeCard.fullInfoButton.label') }}
      </v-btn>
      <v-btn
        color="primary"
        class="mt-4"
        block
        @click="onEdit(_id)"
      >
        {{ $t('general.edit') }}
      </v-btn>
      <v-btn
        color="error"
        class="mt-4"
        block
        @click="onDelete(_id)"
      >
        {{ $t('general.delete') }}
      </v-btn>
    </template>
  </user-card>
</template>

<script>
import userCard from '@/components/UserCard/index.vue'

export default {
  name: 'TraineesViewTrainee',
  components: {
    userCard
  },
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
    }
  },
  methods: {
    onEdit(id) {
      this.$emit('onEdit', id)
    },
    onDelete(id) {
      this.$emit('onDelete', id)
    }
  }
}
</script>