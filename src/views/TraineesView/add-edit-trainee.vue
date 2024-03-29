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
        {{ $t('trainees.addButton') }}
      </v-btn>
    </template>

    <v-card>
      <v-tabs
        v-if="isModeAdd && _isGoogleAuthEnabled"
        v-model="addTraineeByTypeTabValue"
        fixed-tabs
      >
        <v-tab>
          {{ $t('trainees.byId.label') }}
        </v-tab>
        <v-tab>
          {{ $t('trainees.byRegistration.label') }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="addTraineeByTypeTabValue"
      >
        <v-tab-item>
          <v-card class="pa-4">
            <v-form
              v-model="isAddTraineeByIdFormValid"
            >
              <v-text-field
                v-model="traineeId.value"
                filled
                dense
                :label="$t('trainees.byId.id.label')"
                :placeholder="$t('trainees.byId.id.placeholder')"
              />
              <v-btn
                :disabled="isButtonAddTraineeByIdDisabled"
                :loading="isButtonAddTraineeByIdLoading"
                color="success"
                block
                x-large
                @click="onAddTraineeById"
              >
                {{ $t('trainees.byId.submitButton.label') }}
              </v-btn>
            </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="pa-4">
            <v-form
              v-model="isRegisterTraineeFormValid"
              ref="registrationForm"
            >
              <v-text-field
                v-model="traineeRegistration.name.value"
                :rules="traineeRegistration.name.rules"
                filled
                dense
                :label="$t('trainees.byRegistration.name.label')"
                :placeholder="$t('trainees.byRegistration.name.label')"
              />

              <v-text-field
                v-model="traineeRegistration.surname.value"
                :rules="traineeRegistration.surname.rules"
                filled
                dense
                :label="$t('trainees.byRegistration.surname.label')"
                :placeholder="$t('trainees.byRegistration.surname.label')"
              />

              <v-menu
                v-model="traineeRegistration.birthdate.isMenuVisible"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="traineeRegistration.birthdate.value | formatDate"
                    :label="$t('trainees.byRegistration.birthdate.label')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="traineeRegistration.birthdate.value"
                  :active-picker.sync="traineeRegistration.birthdate.activePicker"
                  :max="birthdateMax"
                  min="1950-01-01"
                  :allowed-dates="allowedDates"
                  width="268"
                  first-day-of-week="1"
                  no-title
                  show-adjacent-months
                  :show-current="false"
                  filled
                  @change="onDatepickerChange"
                />
              </v-menu>

              <v-select
                v-model="traineeRegistration.sex.value"
                :items="traineeRegistration.sex.list"
                :rules="traineeRegistration.sex.rules"
                filled
                required
                :label="$t('trainees.byRegistration.sex.label')"
                :placeholder="$t('trainees.byRegistration.sex.label')"
              />

              <v-select
                v-if="getClubsForSelect"
                v-model="traineeRegistration.club.value"
                :items="getClubsForSelect"
                filled
                required
                :label="$t('trainees.byRegistration.club.label')"
              />

              <v-row>
                <v-col>
                  <v-btn
                    v-if="isModeAdd"
                    :disabled="isButtonRegisterTraineeDisabled"
                    :loading="isButtonRegisterTraineeLoading"
                    color="success"
                    block
                    x-large
                    @click="onTraineeRegister"
                  >
                    {{ $t('trainees.byRegistration.submitButton.label') }}
                  </v-btn>
                  <v-btn
                    v-if="isModeEdit"
                    :disabled="isButtonUpdateTraineeDisabled"
                    :loading="isButtonUpdateTraineeLoading"
                    color="success"
                    block
                    x-large
                    @click="onTraineeUpdate"
                  >
                    {{ $t('general.save') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>          
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import formatDate from '@/mixins/formatDate'

import { createDateObjectFromString } from '@/utils/dateFormatting'

export default {
  name: 'TraineesAddTrainee',
  data: () => ({
    mode: 'add',
    isDialogVisible: false,
    addTraineeByTypeTabValue: 0,
    isAddTraineeByIdFormValid: false,
    id: null,
    traineeId: {
      value: '',
      rules: [
        v => !!v || 'Id is required',
        v => v.length === 21 || 'Id has to be 21 characters long',
      ]
    },
    traineeRegistration: {},
    isRegisterTraineeFormValid: false,
    isButtonAddTraineeByIdDisabled: false,
    isButtonAddTraineeByIdLoading: false,
    isButtonRegisterTraineeDisabled: false,
    isButtonRegisterTraineeLoading: false,
    isButtonUpdateTraineeDisabled: false,
    isButtonUpdateTraineeLoading: false
  }),
  mixins: [
    formatDate
  ],
  watch: {
    isRegisterTraineeFormValid(val) {
      this.isButtonRegisterTraineeDisabled = !val
    },
    isDialogVisible() {
      this.addTraineeByTypeTabValue = this._isGoogleAuthEnabled ? 0 : 1
    },
    'traineeRegistration.birthdate.isMenuVisible'(val) {
      val && setTimeout(() => (this.traineeRegistration.birthdate.activePicker = 'YEAR'))
    },
  },
  computed: {
    ...mapState({
      _isGoogleAuthEnabled: '_system/_isGoogleAuthEnabled'
    }),
    ...mapGetters({
      getMeId: 'users/getMeId',
      getClubsForSelect: 'clubs/getClubsForSelect'
    }),
    traineeRegistrationSexSwitchLabel() {
      return this.$t(`trainees.registration.sex.${this.traineeRegistration.sex}`)
    },
    birthdateMax() {
      const today = new Date()
      const yearsAgo = 12
      const dateAnyYearsAgo = new Date(today.getFullYear() - yearsAgo, today.getMonth(), today.getDate())
      return dateAnyYearsAgo
        .toLocaleDateString('en-GB', { format: 'YYYY-MM-DD' })
        .split('/')
        .reverse()
        .join('-')
    },
    isModeAdd() {
      return this.mode === 'add'
    },
    isModeEdit() {
      return this.mode === 'edit'
    }
  },
  methods: {
    ...mapActions({
      postUser: 'users/postUser',
      updateUser: 'users/updateUser',
      fetchTrainees: 'trainees/fetchTrainees',
      updateUserTrainerId: 'users/updateUserTrainerId'
    }),
    allowedDates(date) {
      return createDateObjectFromString(date) <= createDateObjectFromString(this.birthdateMax)
    },
    async onAddTraineeById() {
      await this.updateUserTrainerId({
        id: this.traineeId.value,
        trainerId: this.getMeId
      })
    },
    async onTraineeRegister() {
      this.isButtonRegisterTraineeDisabled = true
      this.isButtonRegisterTraineeLoading = true

      const payload = {
        name: `${this.traineeRegistration.name.value} ${this.traineeRegistration.surname.value}`,
        birthdate: this.traineeRegistration.birthdate.value,
        sex: this.traineeRegistration.sex.value,
        trainerId: this.getMeId,
        club: this.traineeRegistration.club.value,
      }

      await this.postUser(payload)
      await this.fetchTrainees()
      
      this.isDialogVisible = false
      setTimeout(() => {
        this.resetForm()
      }, 300)

      this.isButtonRegisterTraineeDisabled = false
      this.isButtonRegisterTraineeLoading = false
    },
    async onTraineeUpdate() {
      this.isButtonUpdateTraineeDisabled = true
      this.isButtonUpdateTraineeLoading = true

      const payload = {
        id: this.id,
        name: `${this.traineeRegistration.name.value} ${this.traineeRegistration.surname.value}`,
        birthdate: this.traineeRegistration.birthdate.value,
        sex: this.traineeRegistration.sex.value,
        club: this.traineeRegistration.club.value
      }

      await this.updateUser(payload)
      await this.fetchTrainees()
      
      this.isDialogVisible = false
      setTimeout(() => {
        this.resetForm()
      }, 300)

      this.isButtonUpdateTraineeDisabled = false
      this.isButtonUpdateTraineeLoading = false
    },
    resetForm() {
      for (const key in this.traineeRegistration) {
        this.traineeRegistration[key].value = ''
      }
      this.$refs.registrationForm.resetValidation()
      this.mode = 'add'
      this.id = null
      this.addTraineeByTypeTabValue = 0
    },
    onDialogInput() {
      if (!this.isDialogVisible) this.resetForm()
    },
    onDatepickerChange() {
      this.traineeRegistration.birthdate.isMenuVisible = false
    },
    applyDefaultDataForTraineeRegistration() {
      this.traineeRegistration = {
        name: {
          value: '',
          rules: [
            v => !!v || this.$t('trainees.byRegistration.name.errors.1'),
            v => v.length <= 20 || this.$t('trainees.byRegistration.name.errors.2')
          ]
        },
        surname: {
          value: '',
          rules: [
            v => !!v || this.$t('trainees.byRegistration.surname.errors.1'),
            v => v.length <= 20 || this.$t('trainees.byRegistration.surname.errors.2')
          ]
        },
        birthdate: {
          value: '',
          rules: [
            v => !!v || this.$t('trainees.byRegistration.birthdate.errors.1')
          ],
          isMenuVisible: false,
          activePicker: null
        },
        sex: {
          value: '',
          list: [
            {
              text: this.$t('trainees.byRegistration.sex.male'),
              value: 'male'
            },
            {
              text: this.$t('trainees.byRegistration.sex.female'),
              value: 'female'
            }
          ],
          rules: [
            v => !!v || this.$t('trainees.byRegistration.sex.errors.1'),
          ]
        },
        club: {
          value: this.getClubsForSelect[0]?.value,
        }
      }
    }
  },
  created() {
    this.applyDefaultDataForTraineeRegistration()
  }
}
</script>