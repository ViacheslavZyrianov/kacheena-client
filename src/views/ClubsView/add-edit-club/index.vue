<template>
  <v-dialog
    v-model="isDialogVisible"
    width="300"
    @input="onDialogInput"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="success"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('clubs.addButton') }}
      </v-btn>
    </template>
    <v-card class="pa-4">
      <v-form
        v-model="isFormValid"
        ref="form"
      >
        <v-text-field
          v-model="form.title"
          :rules="rules.title"
          :label="$t('clubs.form.title.label')"
          :placeholder="$t('clubs.form.title.placeholder')"
          filled
          dense
          hide-details
          class="mb-6"
        />
        <v-text-field
          v-model="form.address"
          :rules="rules.address"
          :label="$t('clubs.form.address.label')"
          :placeholder="$t('clubs.form.address.placeholder')"
          filled
          dense
          hide-details
          class="mb-6"
        />
        <v-text-field
          v-model="form.instagram"
          :label="$t('clubs.form.instagram.label')"
          :placeholder="$t('clubs.form.instagram.placeholder')"
          filled
          dense
          hide-details
          class="mb-6"
        />
        <v-text-field
          v-model="form.facebook"
          :label="$t('clubs.form.facebook.label')"
          :placeholder="$t('clubs.form.facebook.placeholder')"
          filled
          dense
          hide-details
          class="mb-6"
        />
        <v-text-field
          v-model="form.site"
          :label="$t('clubs.form.site.label')"
          :placeholder="$t('clubs.form.site.placeholder')"
          filled
          dense
          hide-details
          class="mb-6"
        />
        <v-textarea
          v-model="form.notes"
          :label="$t('exercises.notes.label')"
          :placeholder="$t('exercises.notes.placeholder')"
          class="mb-6"
          filled
          rows="4"
          hide-details
          auto-grow
        />
        <v-btn
          :disabled="isButtonDisabled"
          :loading="isButtonLoading"
          color="success"
          block
          @click="onFormSubmit"
        >
          {{ $t('general.save') }}
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ClubsAddEditClub',
  data: () => ({
    isDialogVisible: false,
    isButtonDisabled: true,
    isButtonLoading: false,
    isFormValid: false,
    mode: 'add',
    id: null,
    form: {
      title: '',
      address: '',
      instagram: '',
      facebook: '',
      site: '',
      notes: ''
    }
  }),
  watch: {
    isFormValid(val) {
      this.isButtonDisabled = !val
    }
  },
  computed: {
    rules() {
      return {
        title: [
          v => !!v
        ],
        address: [
          v => !!v
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      fetchClubs: 'clubs/fetchClubs',
      postClub: 'clubs/postClub',
      updateClub: 'clubs/updateClub'
    }),
    resetForm() {
      for (const key in this.form) {
        this.form[key] = ''
      }
      this.$refs.form.resetValidation()
    },
    onDialogInput() {
      if (!this.isDialogVisible) this.resetForm()
    },
    async onFormSubmit() {
      this.isButtonDisabled = true
      this.isButtonLoading = true

      if (this.mode === 'edit') {
        await this.updateClub({
          id: this.id,
          ...this.form
        })
      }

      if (this.mode === 'add') await this.postClub(this.form)

      await this.fetchClubs()

      this.isButtonDisabled = false
      this.isButtonLoading = false

      this.isDialogVisible = false
    }
  }
}
</script>