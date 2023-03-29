<template>
  <v-card class="pa-4">
    <div class="subtitle-1 mb-2">
      {{ title }}
    </div>
    <v-chip
      link
      target="_blank"
      :href="addressLink"
      class="mb-4"
    >
      <v-icon small>
        mdi-map-marker
      </v-icon>
      {{ address }}
    </v-chip>
    <v-card
      v-if="notes"
      outlined
      class="mb-4"
    >
      <v-card-text>
        {{ notes }}
      </v-card-text>
    </v-card>
    <div
      v-if="isAnyLink"
      class="d-flex align-center mb-4"
    >
      <v-btn
        v-if="instagram"
        :href="instagram"
        target="_blank"
        class="mr-2"
        fab
        dark
        small
        color="pink darken-1"
      >
        <v-icon dark>
          mdi-instagram
        </v-icon>
      </v-btn>
      <v-btn
        v-if="facebook"
        :href="facebook"
        target="_blank"
        class="mr-2"
        fab
        dark
        small
        color="indigo darken-1"
      >
        <v-icon dark>
          mdi-facebook
        </v-icon>
      </v-btn>
      <v-btn
        v-if="site"
        :href="site"
        target="_blank"
        class="mr-2"
        fab
        dark
        small
        color="purple darken-1"
      >
        <v-icon dark>
          mdi-link
        </v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClubsClubCard',
  data: () => ({
    isDeleteButtonDisabled: false,
    isDeleteButtonLoading: false
  }),
  props: {
    id: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    address: {
      default: '',
      type: String
    },
    instagram: {
      default: '',
      type: String
    },
    facebook: {
      default: '',
      type: String
    },
    site: {
      default: '',
      type: String
    },
    notes: {
      default: '',
      type: String
    }
  },
  computed: {
    ...mapGetters({
      getClubById: 'clubs/getClubById'
    }),
    isAnyLink() {
      return this.instagram || this.facebook || this.linkedin || this.site
    },
    addressLink() {
      return `https://maps.google.com/?q=${this.address}`
    }
  },
  methods: {
    ...mapActions({
      fetchClubs: 'clubs/fetchClubs',
      deleteClub: 'clubs/deleteClub'
    }),
    onEdit() {
      this.$parent.$refs.addEditClub.isDialogVisible = true
      this.$parent.$refs.addEditClub.mode = 'edit'
      this.$parent.$refs.addEditClub.id = this.id
      const {
        _id, // eslint-disable-line no-unused-vars
        trainerId, // eslint-disable-line no-unused-vars
        ...addEditExerciseForm
      } = this.getClubById(this.id)
      this.$parent.$refs.addEditClub.form = addEditExerciseForm
    },
    async onDelete() {
      this.isDeleteButtonDisabled = true
      this.isDeleteButtonLoading = true

      await this.deleteClub(this.id)
      await this.fetchClubs()

      this.isDeleteButtonDisabled = false
      this.isDeleteButtonLoading = false
    }
  }
}
</script>