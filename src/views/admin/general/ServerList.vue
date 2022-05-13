<template>
  <div class="container">
    <h1>
      Servers
      <button
        class="button"
        @click="downloadData"
      >
        <span class="icon"><i class="fa fa-download" /></span>
        <span>Download</span>
      </button>
    </h1>
    <div class="table-container">
      <table class="table is-striped is-hoverable">
        <thead>
          <tr>
            <th @click="sortBy('icon_url')">
              Icon
            </th>
            <th @click="sortBy('name')">
              Server name
            </th>
            <th @click="sortBy('discord_invite')">
              Discord Invite
            </th>
            <th @click="sortBy('is_private')">
              Private?
            </th>
            <th @click="sortBy('admins')">
              Admins
            </th>
            <th @click="sortBy('description')">
              Descriptions
            </th>
            <th @click="sortBy('submission_date')">
              Submission date
            </th>

            <th>Accept?</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="sa in sorted(serverApplications)"
            :key="sa.vueId"
          >
            <th>
              <!-- {{sa.iconExt}} -->
              <img
                :src="'https://' + sa.icon_url"
                style="min-width: 140px; max-width: 160px"
              >
            </th>
            <th>{{ sa.name }}</th>
            <th>
              <a :href="sa.discord_invite">{{
                sa.discord_invite | discordInviteHandle
              }}</a>
            </th>
            <th>{{ sa.isPrivate ? "Yes" : "no" }}</th>
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
              {{ sa.submission_date.toDate() | date("dd/mm/yyyy hour:min") }}
            </th>
            <th class="has-text-centered">
              <button class="button is-primary">
                Accept
              </button>

              <button class="button is-warning">
                Decline
              </button>
            </th>
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
      sortKey: "submission_date",

      reverse: false,

      search: "",

      columns: [
        "icon_url",
        "name",
        "discord_invite",
        "is_private",
        "admins",
        "description",
        "submission_date",
      ],
      pendingApplications: [],
      ascending: false,
      serverApplications: [],
    };
  },
  computed: {},
  mounted() {
    this.$svsBackend.getAppServers(0).then((res) => {
      this.serverApplications = res;
      this.pendingApplications = res;
    });
  },
  methods: {
    sorted(arr) {
      return arr;
    },

    sortBy(sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;

      this.sortKey = sortKey;
    },
    downloadData() {
      alert(`coming soon sorry`);

    },

    orderByDate() {
      let arr = this.serverApplications;
      this.ascending = !this.ascending;
      arr.sort(
        (lhs, rhs) => lhs.submission_date - rhs.submission_date,
        this.ascending
      );
      if (true) arr.reverse();
      this.serverApplications = arr;
    },
  },
};
</script>
