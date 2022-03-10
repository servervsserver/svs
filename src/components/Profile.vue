<template>
  <section class="profile">
    <div v-if="user" class="columns">
      <div class="column is-three-quarters">
        <img :src="user.icon" width="180" />
        <h2 class="server-name">{{ user.nickname }} | {{ user.discordTag }}</h2>

        <div>
          <span v-if="user.isStaff" class="tag"> Staff </span>
          &#160;
          <span v-if="user.isServerLeader" class="tag"> Server leader </span>
        </div>
      </div>
    </div>
    <div v-if="!user">No user</div>
  </section>
</template>



<script>
import { User } from "@/models/dto/user";

export default {
  props: {
    user: {
      type: User,
      required: true,
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
