<template>
    <main class="main">
        <div class="main__card">
            <div class="main__profile">
                <div class="main__profile-avatar">
                    <img class="main__profile-photo" src="../assets/images/avatar.png" alt="profile picture">
                    <span class="main__profile-level">level 5</span>
                </div>
                <h2 class="main__profile-name">RichyRich</h2>
            </div>
            <ul class="main__tabs">
                <li @click="activeTab = '1'" :class="[ activeTab === '1' ? 'main__tabs-item main__tabs-item--active' : 'main__tabs-item' ]">my teams</li>
                <li @click="activeTab = '2'" :class="[ activeTab === '2' ? 'main__tabs-item main__tabs-item--active' : 'main__tabs-item' ]">about</li>
            </ul>
            <div class="main__content">
                <TeamsDetail v-if="activeTab === '1'" />
                <AboutTeams v-if="activeTab === '2'" />
            </div>
        </div>
    </main>
</template>

<script>
import TeamsDetail from '../components/TeamsDetail.vue'
import AboutTeams from '../components/AboutTeams.vue'

export default {
    name: 'Main',

    components: {
        TeamsDetail,
        AboutTeams
    },

    data: () => ({
        activeTab: '1'
    })
}
</script>