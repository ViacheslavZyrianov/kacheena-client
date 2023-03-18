export const state = () => ({
  exercises: []
})

export const getters = {
  getExercises: ({ exercises }) => exercises,
  getExercisesForSelect: ({ exercises }) => exercises.map(({ _id: value, title: text }) => ({ value, text })),
  getExerciseById: ({ exercises }) => (id) => exercises.find(({ _id }) => _id === id)
}

export const actions = {
  async fetchExercises({ commit, rootGetters }) {
    const { data } = await this.axios.get('exercises', {
      params: {
        trainerId: rootGetters['users/getMeId']
      }
    })

    commit('SET_EXERCISES', data)
  },
  async postExercise({ rootGetters }, payload) {
    await this.axios.post('exercise', {
      ...payload,
      trainerId: rootGetters['users/getMeId']
    })
  },
  async updateExercise(_, payload) {
    await this.axios.put('exercise', payload)
  },
  async deleteExercise(_, payload) {
    await this.axios.delete('exercise', {
      params: {
        id: payload
      }
    })
  }
}

export const mutations = {
  SET_EXERCISES (state, payload) {
    state.exercises = payload
  }
}