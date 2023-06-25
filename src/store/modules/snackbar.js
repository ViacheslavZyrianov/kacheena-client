export const state = () => ({
  isVisible: false,
  icon: null,
  content: 'Error',
  color: 'primary',
  timeout: null
})

export const getters = {
  getSnackbar: ({ isVisible, icon, content, color, timeout }) => ({ isVisible, icon, content, color, timeout })
}

export const mutations = {
  SET_DEFAULT (state) {
    state.isVisible = false
    state.icon = null
    state.content = ''
    state.color = 'default'
    state.timeout = null
  },
  SET_TIMEOUTED (state, timeout = 2000) {
    state.isVisible = true
    state.timeout = timeout
    setTimeout(() => {
      this.commit('snackbar/SET_DEFAULT')
    }, state.timeout)
  },
  SET_INFO (state, payload) {
    this.commit('snackbar/SET_TIMEOUTED')
    state.icon = 'mdi-information-outline'
    state.content = payload
    state.color = 'primary'
  },
  SET_ERROR (state, payload) {
    this.commit('snackbar/SET_TIMEOUTED')
    state.icon = 'mdi-alert-circle-outline'
    state.content = payload
    state.color = 'error'
  }
}