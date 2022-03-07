<template>
  <div>
    <profile :user="user" />
  </div>
</template>



<script>
import { User } from "@/models/dto/user"
import Profile from "@/components/Profile.vue"

export default {
  components: {
    'profile': Profile
  },
  computed: {
    user() {
      return this.$svsAuth.user
    }
  }
}
</script>


<style lang="sass" scoped>

</style>














/****
1) check if user.profile exists in store
2) send request to AWS server to get user profile (save in store)
3) display that role details (if admin give access to admin stuff)
4) If not synced add a sync button which forces server to resync



1) Check if profile is in database
2) User Discord Bot to get details of user
3) Check if user is admin
4) Store in database
5) Return User data to app

 */
