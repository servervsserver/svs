<template>
  <div class="container">
    <h1>Anonymous Concerns</h1>
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
</template>

<script>
export default {
  data: function () {
    return {
      anonymousConcernsTickers: [],
      ascending: false
    }
  },
  mounted () {
    this.$svsBackend.getAllAnonymousConcernsTickets()
      .then(res => {
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
