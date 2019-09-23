import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      avatar: '',
      role: 'User'
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
        state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    // log out
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser() {
      try {
        const { data, statusText } = await userAPI.getCurrentUser()
        // error handling
        if (statusText !== 'OK') throw new Error(statusText)
        // update state
        this.commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          role: data.role
        })
        return true
      } catch (error) {
        console.error('Cannot get user data')
        this.commit('revokeAuthentication')
        return false
      }
    }
  }
})
