export const state = () => ({
  me: null
})

export const getters = {
  getMe: ({ me }) => me,
  getMeId: ({ me }) => me?.id,
  getMeGoogleId: ({ me }) => me?.googleId,
  getUserGoogleId: ({ user }) => user?.googleId
}

export const actions = {
  async postUser(_, payload) {
    const { data } = await this.axios.post('user/create', payload)

    return data
  },
  async updateUserTrainerId(_, payload) {
    await this.axios.post('user/update-user-trainer-id', payload)
  },
  async fetchUserById(_, id) {
    const { data } = await this.axios.get('user/get', {
      params: {
        id
      }
    })

    data.id = data._id
    delete data._id

    return data
  },
  async fetchUserByGoogleId(_, googleId) {
    const { data } = await this.axios.get('user/get', {
      params: {
        googleId
      }
    })

    data.id = data._id
    delete data._id

    return data
  },
  async updateUser(_, payload) {
    await this.axios.put('user', payload)
  }
}

export const mutations = {
  SET_ME(state, payload) {
    state.me = payload
    if (payload) localStorage.kacheena_me = JSON.stringify(payload)
    else localStorage.removeItem('kacheena_me')
  }
}