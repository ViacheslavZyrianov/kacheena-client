export const state = () => ({
  currentTrainingScheduleId: null,
  trainingSchedules: []
})

export const getters = {
  getCurrentTrainingSchedule: ({ trainingSchedules, currentTrainingScheduleId }) => trainingSchedules.find(({ _id }) => _id === currentTrainingScheduleId),
  getTrainingSchedules: ({ trainingSchedules }) => trainingSchedules
}

export const actions = {
  async postTrainingSchedule(_, payload) {
    await this.axios.post('training-schedule', payload)
  },
  async fetchTrainingSchedulesByTraineeId({ commit }, traineeId) {
    const { data } = await this.axios.get('training-schedules', {
      params: {
        traineeId
      }
    })

    commit('SET_TRAINING_SCHEDULES', data)
  },
  async updateTrainingSchedule(_, payload) {
    await this.axios.put('training-schedule', payload)
  },
  async deleteTrainingSchedule(_, payload) {
    await this.axios.delete('training-schedule', {
      params: {
        id: payload
      }
    })
  }
}

export const mutations = {
  SET_CURRENT_TRAINING_SCHEDULE_ID(state, payload) {
    state.currentTrainingScheduleId = payload
  },
  SET_TRAINING_SCHEDULES(state, payload) {
    state.trainingSchedules = payload
  }
}