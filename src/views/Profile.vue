<template>
  <section class="container">
    <div class="spacer" />
    <profile :user="user" />
  </section>
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

<style lang="scss" scoped>
.spacer {
  height: 100px;
}
</style>
