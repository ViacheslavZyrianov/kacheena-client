<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    hide-default-footer
    :group-by="groupBy"
  >
    <template v-slot:[`item.sex`]="{ item: { sex } }">
      {{ $t(`trainees.${sex}`) }}
    </template>
    <template v-slot:[`item.birthdate`]="{ item: { birthdate } }">
      {{ birthdate | formatDate }}
    </template>
    <template v-slot:[`item.club`]="{ item: { club } }">
      {{ getClubById(club).title }}
    </template>
    <template v-slot:[`item.actions`]="{ item: { _id } }">
      <v-btn
        color="primary"
        fab
        x-small
        class="mr-2"
        @click="onEdit(_id)"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        color="error"
        fab
        x-small
        @click="onDelete(_id)"
      >
        <v-icon>
          mdi-trash-can
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:[`group.header`]="{ isOpen, items, toggle }">
      <td
        style="cursor: pointer"
        colspan="4"
        @click="toggle"
      >
        <v-icon v-if="isOpen">
          mdi-chevron-up
        </v-icon>
        <v-icon v-else>
          mdi-chevron-down
        </v-icon>
        {{ getClubById(items[0].club).title }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import formatDate from '@/mixins/formatDate'
import { mapGetters } from 'vuex'

export default {
  name: 'TraineesTraineesTable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isGroupedByClub: {
      type: Boolean,
      default: false
    }
  },
  mixins: [
    formatDate
  ],
  computed: {
    ...mapGetters({
      getClubById: 'clubs/getClubById'
    }),
    headers() {
      return [
        {
          text: this.$t('trainee.name'),
          value: 'name',
          sortable: false
        },
        {
          text: this.$t('trainee.sex'),
          value: 'sex',
          sortable: false
        },
        {
          text: this.$t('trainee.birthdate'),
          value: 'birthdate',
          sortable: false
        },
        {
          text: this.$t('trainee.club'),
          value: 'club',
          sortable: false
        },
        {
          text: this.$t('general.actions'),
          value: 'actions',
          align: 'center',
          sortable: false
        }
      ]
    },
    groupBy() {
      return (this.isGroupedByClub || null) && 'club'
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