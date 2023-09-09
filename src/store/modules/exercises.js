export const state = () => ({
  exercises: [],
  exercisesTypes: {},
  exercisesMuscles: {}
})

export const getters = {
  getExercises: ({ exercises }) => exercises,
  getExercisesForSelect: ({ exercises }) => exercises.map(({ _id: value, title: text }) => ({ value, text })),
  getExerciseById: ({ exercises }) => (id) => exercises.find(({ _id }) => _id === id),
  getExercisesTypes: ({ exercisesTypes }) => exercisesTypes,
  getExercisesMuscles: ({ exercisesMuscles }) => exercisesMuscles
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
  },
  async fetchExercisesTypes({ rootGetters, commit }) {
    const { data } = await this.axios.get('exercises-types', {
      params: {
        trainerId: rootGetters['users/getMeId']
      }
    })

    commit('SET_EXERCISES_TYPES', data)

    return data
  },
  async postExercisesType({ rootGetters }, payload) {
    await this.axios.post('exercises-types', {
      trainerId: rootGetters['users/getMeId'],
      exercise: payload
    })
  },
  async updateExercisesTypes({ rootGetters }, payload) {
    await this.axios.put('exercises-types', {
      trainerId: rootGetters['users/getMeId'],
      list: payload
    })
  },
  async deleteExerciseType({ rootGetters }, payload) {
    await this.axios.delete('exercises-types', {
      params: {
        trainerId: rootGetters['users/getMeId'],
        id: payload
      }
    })
  },
  async fetchExercisesMuscles({ rootGetters, commit }) {
    const { data } = await this.axios.get('exercises-muscles', {
      params: {
        trainerId: rootGetters['users/getMeId']
      }
    })

    commit('SET_EXERCISES_MUSCLES', data)

    return data
  },
  async postExercisesMuscle({ rootGetters }, payload) {
    await this.axios.post('exercises-muscles', {
      trainerId: rootGetters['users/getMeId'],
      exercise: payload
    })
  },
  async updateExercisesMuscles({ rootGetters }, payload) {
    await this.axios.put('exercises-muscles', {
      trainerId: rootGetters['users/getMeId'],
      list: payload
    })
  },
  async deleteExerciseMuscle({ rootGetters }, payload) {
    await this.axios.delete('exercises-muscles', {
      params: {
        trainerId: rootGetters['users/getMeId'],
        id: payload
      }
    })
  }
}

export const mutations = {
  SET_EXERCISES (state, payload) {
    state.exercises = payload
  },
  SET_EXERCISES_TYPES (state, payload) {
    state.exercisesTypes = payload
  },
  SET_EXERCISES_MUSCLES (state, payload) {
    state.exercisesMuscles = payload
  }
}