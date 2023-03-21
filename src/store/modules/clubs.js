export const state = () => ({
  clubs: []
})

export const getters = {
  getClubs: ({ clubs }) => clubs,
  getClubById: ({ clubs }) => id => clubs.find(({ _id }) => _id === id)
}

export const actions = {
  async fetchClubs({ commit, rootGetters }) {
    const { data } = await this.axios.get('clubs', {
      params: {
        trainerId: rootGetters['users/getMeId']
      }
    })

    commit('SET_CLUBS', data)
  },
  async postClub({ rootGetters }, payload) {
    await this.axios.post('club', {
      ...payload,
      trainerId: rootGetters['users/getMeId']
    })
  },
  async updateClub(_, payload) {
    await this.axios.put('club', payload)
  },
  async deleteClub(_, payload) {
    await this.axios.delete('club', {
      params: {
        id: payload
      }
    })
  }
}

export const mutations = {
  SET_CLUBS (state, payload) {
    state.clubs = payload
  }
}