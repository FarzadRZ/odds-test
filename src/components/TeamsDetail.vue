<template>
  <div class="team">
    <div class="team__search">
      <h3 class="team__title">search teams</h3>
      <div class="team__search-box">
        <img class="team__search-icon" src="../assets/icons/search.svg" alt="search icon" />
        <input type="text" placeholder="Search for a team" v-model.trim="searchQuery" />
        <img @click="clearSearch" v-if="searchQuery.length > 0" class="team__search-clear" src="../assets/icons/close.svg" alt="clear icon" />
      </div>
    </div>
    <ul class="team__result" v-if="searchQuery">
      <li v-for="(team, index) in filteredTeams" :key="team.id" :class="['team__result-item', { 'team__result-item--focused': focusedIndex === index }]" :ref="`team-${index}`" @mouseover="updateFocusIndex(index)" @focus="updateFocusIndex(index)">
        <div class="team__result-detail">
          <div class="team__result-logo">
            <img src="../assets/images/team-logo.png" alt="team logo" />
          </div>
          <div class="team__result-info">
            <p class="team__league">
              <span v-for="league in team.leagues" :key="league.index">
                {{ league }}
              </span>
            </p>
            <p>
              <span class="team__name">{{ team.name }}</span>
              <span class="team__stadium">
                <img src="../assets/icons/stadium.svg" alt="stadium icon" />
                {{ team.stadium }}
              </span>
            </p>
          </div>
        </div>
        <button @click="follow(team)" class="team__result-follow" :class="{ team__followed: team.is_following }">
          <span v-if="team.is_following">following</span>
          <span v-else>follow</span>
        </button>
      </li>
    </ul>
    <div class="team__result team__noresult" v-if="filteredTeams.length == 0">
      <img src="../assets/icons/no-results.svg" alt="no result" />
      <p>No Teams Found</p>
    </div>
    <div class="myteam">
      <h3 class="team__title">my teams</h3>
      <div class="myteam__list">
        <p class="myteam__list-empty" v-if="!followingTeams">You aren't following any teams yet.</p>
        <div v-else v-for="team in filteredTeams" :key="team.id" v-show="team.is_following" class="myteam__result">
          <div class="team__result-logo">
            <img src="../assets/images/team-logo.png" alt="team logo" />
          </div>
          <span class="team__result-name">{{ team.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TeamsDetail',

  data: () => ({
    searchQuery: '',
    focusedIndex: 0,
  }),

  methods: {
    ...mapActions(['fetchTeams', 'followTeam']),

    follow(team) {
      const followingTeam = {
        id: team.id,
        leagues: team.leagues,
        name: team.name,
        stadium: team.stadium,
        is_following: !team.is_following,
      }
      this.followTeam(followingTeam)
    },

    clearSearch() {
      this.searchQuery = ''
    },

    updateFocusIndex(index) {
      this.focusedIndex = index
    },
  },

  computed: {
    ...mapState({
      teams: (state) => state.teams.list,
    }),

    filteredTeams() {
      if (!this.searchQuery) {
        return this.teams
      } else {
        let filteredList = []
        this.teams.forEach((team) => {
          let searchText = `${team.name}${team.stadium}${team.leagues}`.toLowerCase()
          if (searchText.indexOf(this.searchQuery) > -1) {
            filteredList.push(team)
          }
        })

        return filteredList
      }
    },

    followingTeams() {
      return this.filteredTeams.some((t) => t.is_following)
    },
  },

  mounted() {
    document.onkeydown = (e) => {
      e = e || window.event
      if (e.keyCode == '38' && this.focusedIndex > 0) {
        this.focusedIndex = this.focusedIndex - 1
      } else if (e.keyCode == '40' && this.focusedIndex < this.filteredTeams.length - 1) {
        this.focusedIndex = this.focusedIndex + 1
      }
    }
  },

  created() {
    this.fetchTeams()
  },
}
</script>
