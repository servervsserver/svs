<template>
  <div>
    <div class="container">
      <h1>Dashboard</h1>
      <div class="table-container">
        <table class="table is-striped is-hoverable">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Server name</th>
              <th>Discord Invite</th>
              <th>Admins</th>
              <th>Descriptions</th>
              <th>
                <button
                  class="button svs-transparent-button"
                  @click="orderByDate()"
                >
                  Submission date
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sa in serverApplications"
              :key="sa.vueId"
            >
              <th>
                <!-- {{sa.iconExt}} -->
                <img
                  :src="'https://'+sa.icon_url"
                  style="min-width: 140px; max-width: 160px;"
                >
              </th>
              <th>{{ sa.name }}</th>
              <th>
                <a :href="sa.discordInvite">{{ sa.discordInvite | discordInviteHandle }}</a>
              </th>
              <th>
                <span
                  v-for="a in sa.admins"
                  :key="a"
                  class="tag"
                >
                  {{ a }}
                </span>
              </th>
              <th>{{ sa.description }}</th>
              <th class="has-text-centered">
                {{ sa.submission_date | date('dd/mm/yyyy hour:min') }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <br>

      <div class="table-container">
        <table class="table is-striped is-hoverable">
          <thead>
            <tr>
              <th>Ticket id</th>
              <th>Message</th>
              <th>Answer</th>
              <th>Submission date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ticket in anonymousConcernsTickers"
              :key="ticket.id"
            >
              <th>{{ ticket.id }}</th>
              <th>{{ ticket.message }}</th>
              <th>{{ ticket.answer }}</th>
              <th>{{ ticket.date | date('dd/mm/yyyy hour:min') }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      serverApplications: [],
      anonymousConcernsTickers: [],
      ascending: false
    }
  },
  mounted () {
    this.$svsBackend.getAllServerApplications()
      .then(res => {
        console.log(res)
        this.serverApplications = res
      })

    this.$svsBackend.getAllAnonymousConcernsTickets()
      .then(res => {
        console.log(res)
        this.anonymousConcernsTickers = res
      })
  },
  methods: {
    orderByDate () {
      this.ascending = !this.ascending
      this.serverApplications.sort((lhs,rhs) => lhs.submission_date - rhs.submission_date, this.ascending )
      if (this.ascending)
        this.serverApplications.reverse()
    }
  }

}
</script>

<style scoped lang='scss'></style>
