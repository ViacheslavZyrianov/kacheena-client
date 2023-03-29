export const state = () => ({
  trainees: []
})

export const getters = {
  getTrainees: ({ trainees }) => trainees,
  getTraineeById: ({ trainees }) => id => trainees.find(({ _id }) => _id === id)
}

export const actions = {
  async fetchTrainees({ rootGetters, commit }) {
    const { data } = await this.axios.get('trainees', {
      params: {
        trainerId: rootGetters['users/getMeId']
      }
    })

    commit('SET_TRAINEES', data)
  },
  async deleteTrainee(_, payload) {
    await this.axios.delete('trainee', {
      params: {
        id: payload
      }
    })
  }
}

export const mutations = {
  SET_TRAINEES(state, payload) {
    state.trainees = payload
  }
}