<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image">
              <img :src="profile.icon" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ profile.name }}</p>
            <p class="subtitle is-6">{{ profile.tag }}</p>
            <span class="tag" v-if="profile.isStaff">#Staff </span>
            <span class="tag" v-if="profile.isLeader">#Leader </span>
          </div>
        </div>

        <div class="content">Member of :</div>
      </div>
    </div>

    <button class="button" @click="pullData">
      <span class="icon">
        <i class="fas fa-sync" />
      </span>
      <span> Re-sync Profile</span>
    </button>
  </div>
</template>



<script>
const axios = require("axios");

export default {
  data() {
    return {
      profile: {
        icon: "https://i.pravatar.cc/150",
        name: "Loading...",
        tag: "One moment pls.",
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.profile.name = "Any Moment now...";
        this.pullData();
      }, 2500);
    });
  },
  methods: {
    pullData() {
      let storedProfile = this.$svsAuth.getData();
      console.log(storedProfile);
      if (storedProfile) {
        this.profile = storedProfile;
      }
    },
  },
};
</script>










<style lang="sass" scoped>
</style>














/****
1) check if user.profile exists in store
2) send request to AWS server to get user profile (save in store)
3) display that role details (if admin give access to admin stuff)
4) If not synced add a sync button which forces server to resync

 */