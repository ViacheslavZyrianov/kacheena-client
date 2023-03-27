export const state = () => ({
  weights: []
})

export const getters = {
  getWeights: ({ weights }) => weights,
  getWeightDataByDate: ({ weights }) => _date => weights.find(({ date }) => date === _date)
}

export const actions = {
  async fetchWeights({ commit }, payload) {
    const { data } = await this.axios.get('weights', {
      params: {
        traineeId: payload
      }
    })

    commit('SET_WEIGHTS', data)
  },
  async postWeight(_, payload) {
    await this.axios.post('weight', payload)
  },
  async updateWeight(_, payload) {
    await this.axios.put('weight', payload)
  },
  async deleteWeight(_, payload) {
    await this.axios.delete('weight', {
      params: {
        id: payload
      }
    })
  }
}

export const mutations = {
  SET_WEIGHTS(state, payload) {
    state.weights = payload
  }
}