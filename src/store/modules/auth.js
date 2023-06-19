export const actions = {
  async postRegister(_, payload) {
    try {
      await this.axios.post('/auth/register', payload)
    } catch (err) {
      throw Error(err)
      // err?.response?.status
    }
  },

  async postLogin({ commit }, payload) {
    try {
      const { data } = await this.axios.post('/auth/login', payload)
      commit('users/SET_ME', data, { root: true })
    } catch(err) {
      throw new Error(err)
    }
  },

  async googleAuthInit({ dispatch, commit }, code) {
    const { data: { id: googleId, name, picture } } = await this.axios.post('/oauth/google', {
      code
    })    

    let me = await dispatch('users/fetchUserByGoogleId', googleId, { root: true })

    const isSignUp = typeof me === 'string' && me === ''
    const isSignIn = typeof me === 'object' && Object.values(me).length

    if (isSignUp) {
      const meGoogle = { googleId, name, picture }
      const id = await dispatch('users/postUser', meGoogle, { root: true })
      me = {
        id,
        ...meGoogle
      }
    }

    if (isSignIn) {
      me = await dispatch('users/fetchUserByGoogleId', googleId, { root: true })
    }

    commit('users/SET_ME', me, { root: true })
  }
}