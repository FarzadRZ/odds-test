import axios from 'axios'
import Vue from 'vue'

const state = {
  list: [],
}

const getters = {}

const mutations = {
  SET_TEAMS: (state, teams) => {
    Vue.set(state, 'list', teams)
  },

  FOLLOW_TEAM: (state, team) => {
    state.list.filter((t) => {
      if (t.id === team.id) {
        t.is_following = !t.is_following
      }
    })
  },
}

const actions = {
  async fetchTeams({ commit }) {
    const res = await axios.get('https://run.mocky.io/v3/ef80523b-0474-4104-8fe6-fe92f8360b28')
    commit('SET_TEAMS', res.data)
  },

  async followTeam({ commit }, team) {
    commit('FOLLOW_TEAM', team)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
