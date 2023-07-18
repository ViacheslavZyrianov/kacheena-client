<template>
  <div class="page">
    <portal to="toolbar-content">
      <v-row class="align-center">
        <v-col class="flex-grow-0">
          <v-switch
            v-model="isGrouped"
            v-if="getClubs"
            :label="$t('trainee.groupedByClubs')"
            hide-details
            class="mt-0"
            @change="onIsGroupedChange"
          />
        </v-col>
        <v-col class="flex-grow-0">
          <button-switcher
            switch-from="table"
            switch-to="grid"
            :default-view="view"
            @change="onViewChange"
          />
        </v-col>
        <v-col>
          <add-edit-trainee ref="addEditTrainee"/>
        </v-col>
      </v-row>
    </portal>
    <template v-if="getTrainees">
      <template v-if="isGrid">
        <template v-if="isGrouped">
          <div
            v-for="(trainees, clubId) in traineesByClub"
            :key="clubId"
            class="mb-12"
          >
            <v-row>
              <v-card class="py-2 px-4 ml-3">
                <div class="text-h6">
                  {{ clubTitle(clubId) }}
                </div>
              </v-card>
            </v-row>
            <v-row>
              <v-col
                v-for="{ _id, id, picture, name, birthdate, sex } in trainees"
                :key="id"
                lg="3"
                md="4"
              >
                <trainee
                  :_id="_id"
                  :id="id"
                  :picture="picture"
                  :name="name"
                  :birthdate="birthdate"
                  :sex="sex"
                  @onEdit="onEdit"
                  @onDelete="onDelete"
                />
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-else>
          <v-row>
            <v-col
              v-for="{ _id, id, picture, name, birthdate, sex } in getTrainees"
              :key="id"
              lg="3"
              md="4"
            >
              <trainee
                :_id="_id"
                :id="id"
                :picture="picture"
                :name="name"
                :birthdate="birthdate"
                :sex="sex"
                @onEdit="onEdit"
                @onDelete="onDelete"
              />
            </v-col>
          </v-row>
        </template>
      </template>
      <trainees-table
        v-if="isTable"
        :items="getTrainees"
        :is-grouped-by-club="isGrouped"
        @onEdit="onEdit"
        @onDelete="onDelete"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import trainee from './trainee.vue'
import traineesTable from './trainees-table.vue'
import addEditTrainee from './add-edit-trainee.vue'
import buttonSwitcher from '@/components/ButtonSwitcher'

export default {
  name: 'TraineesView',
  components: {
    trainee,
    traineesTable,
    addEditTrainee,
    buttonSwitcher
  },
  data: () => ({
    view: 'table',
    isGrouped: false
  }),
  computed: {
    ...mapGetters({
      getTrainees: 'trainees/getTrainees',
      getTraineeById: 'trainees/getTraineeById',
      getClubs: 'clubs/getClubs',
      getClubById: 'clubs/getClubById'
    }),
    traineesByClub() {
      return this.getTrainees.reduce((acc, val) => {
        acc[val.club] = [val]
        return acc
      }, {})
    },
    isGrid() {
      return this.view === 'grid'
    },
    isTable() {
      return this.view === 'table'
    }
  },
  methods: {
    ...mapActions({
      fetchClubs: 'clubs/fetchClubs',
      fetchTrainees: 'trainees/fetchTrainees',
      deleteTrainee: 'trainees/deleteTrainee'
    }),
    clubTitle(clubId) {
      return this.getClubById(clubId)?.title || this.$t('trainees.clubless')
    },
    onViewChange(val) {
      this.view = val
      window.localStorage.setItem('kacheena_trainees-view', val)
    },
    onEdit(id) {
      const { _id, name, birthdate, sex, club } = this.getTraineeById(id)
      this.$refs.addEditTrainee.isDialogVisible = true
      this.$refs.addEditTrainee.mode = 'edit'
      this.$refs.addEditTrainee.addTraineeByTypeTabValue = 1
      this.$refs.addEditTrainee.id = _id
      this.$refs.addEditTrainee.traineeRegistration.name.value = name.split(' ')[0]
      this.$refs.addEditTrainee.traineeRegistration.surname.value = name.split(' ')[1]
      this.$refs.addEditTrainee.traineeRegistration.birthdate.value = birthdate
      this.$refs.addEditTrainee.traineeRegistration.sex.value = sex
      this.$refs.addEditTrainee.traineeRegistration.club.value = club
    },
    async onDelete(id) {
      await this.deleteTrainee(id)
      await this.fetchTrainees()
    },
    onIsGroupedChange(val) {
      window.localStorage.setItem('kacheena_trainees-isGrouped', val)
    },
    applyDefaultOptions() {
      this.view = window.localStorage.getItem('kacheena_trainees-view') || 'table'
      const isGroupedFromLS = window.localStorage.getItem('kacheena_trainees-isGrouped')
      this.isGrouped = isGroupedFromLS ? JSON.parse(isGroupedFromLS) : false
    }
  },
  async created() {
    this.applyDefaultOptions()

    await this.fetchClubs()
    await this.fetchTrainees()
  }
}
</script>