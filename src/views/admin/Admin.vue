<template>
  <div class="admin-container">
    <drawer ref="sidenav">
      <template v-slot:aside>
        <div class="menu" style="width: auto; max-width: 300px; overflow: hidden;">
          <p class="menu-label">
            General
          </p>
          <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li><a>Customers</a></li>
          </ul>
          <p class="menu-label">
            Administration
          </p>
          <ul class="menu-list">
            <li><a>Team Settings</a></li>
            <li>
              <a class="is-active">Manage Your Team</a>
              <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
              </ul>
            </li>
            <li><a>Invitations</a></li>
            <li><a>Cloud Storage Environment Settings</a></li>
            <li><a>Authentication</a></li>
          </ul>
          <p class="menu-label">
            Transactions
          </p>
          <ul class="menu-list">
            <li><a>Payments</a></li>
            <li><a>Transfers</a></li>
            <li><a>Balance</a></li>
          </ul>
        </div>
      </template>
      <template v-slot:content>

        <button style="margin-left: 60vw" class="button" @click="toggleDrawer()">
          Toggle
        </button>
        <div class="router-view">
          <router-view />
        </div>
      </template>
    </drawer>
    <!-- {{ $refs.sidenav }} -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {

    }
  },
  methods: {
    toggleDrawer () {
      this.$refs.sidenav.toggle()
    }
  }
}
</script>

<style scoped lang='scss'>
.admin-container {
  margin-top: -50px;

  .menu {
    background: orange;
  }
}
</style>
