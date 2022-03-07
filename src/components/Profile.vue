<template>
  <section class="profile">
    <div
      v-if="user"
      class="columns"
    >
      <div class="column is-three-quarters">
        <img
          :src="user.picture"
          width="180"
        >
        <h2 class="server-name">
          {{ user.nickname }} | {{ user.discordTag }}
        </h2>

        <div>
          <span
            v-if="user.isStaff"
            class="tag"
          >
            Staff
          </span>

          <span
            v-if="!user.isStaff"
            class="tag"
          >
            Not Staff
          </span>

          <span
            v-if="user.isServerLeader"
            class="tag"
          >
            Server leader
          </span>

          <span
            v-if="!user.isServerLeader"
            class="tag"
          >
            Not Server Leader
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="!user"
    >
      No user
    </div>
  </section>
  <!-- <div>
    <img
      :src="profile.icon"
      alt=""
      class="image"
    >

    {{ profile.name }} |
    {{ profile.tag }} |
    {{ profile.isStaff }} |
    {{ profile.isLeaders }} |
    <button
      class="button"
      @click="pullData"
    >
      <span class="icon">
        <i class="fas fa-sync" />
      </span> <span> Re-sync Profile</span>
    </button>
  </div> -->
</template>



<script>

export default {
  props: {
    user: {
      required: true
    }
  }
}

// const axios = require("axios");
//
// export default {
//     data(){
//         return{
//             profile:{icon:"https://i.pravatar.cc/150"}
//         }
//     },
//     mounted(){
//          this.$nextTick(() => {
//        setTimeout(() => {
//          this.pullData();
//        }, 1000);
//       });
//     },
//     methods:{
//         pullData(){
// let storedProfile = this.$svsAuth.getData();
// console.log(storedProfile);
//             if(storedProfile){
//               this.profile = storedProfile;
//             }
//             }
//
//
//     },
// }
</script>










<style lang="sass" scoped>

</style>














/****
1) check if user.profile exists in store
2) send request to AWS server to get user profile (save in store)
3) display that role details (if admin give access to admin stuff)
4) If not synced add a sync button which forces server to resync

 */
