<template>
  <div>
    <div class="container">
      <h1>Dashboard</h1>
      <table class="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Server name</th>
            <th>Discord Invite</th>
            <th>Icon</th>
            <th>Admins</th>
            <th>Descriptions</th>
            <th><button class="button svs-transparent-button" @click="orderByDate()">Submission date</button></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="sa in serverApplications"
            :key="sa.vueId"
          >
            <th>{{sa.name}}</th>
            <th>
              <a :href="sa.discordInvite">{{ sa.discordInvite | discordInviteHandle }}</a>
            </th>
            <th>{{sa.iconExt}}</th>
            <th>
              <span
                class="tag"
                v-for="a in sa.admins"
                :key="a"
              >
                {{a}}
              </span>
            </th>
            <th>{{sa.description}}</th>
            <th class="has-text-centered">{{sa.submission_date | date('dd/mm/yyyy hour:min') }} </th>
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
      serverApplications: [],
      ascending: false
    }
  },
  mounted () {
    this.$svsBackend.getAllServerApplications()
      .then(res => {
        console.log(res)
        this.serverApplications = res
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
