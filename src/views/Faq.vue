<template>
  <div>
    <h1>F.A.Q</h1>

    <div>WTH is LUFS?</div>
    <p>LUFS is ...</p>

    <h3>{{ vote_uid }}</h3>
  </div>
</template>



<script>
import { User } from "@/models/dto/user";

export default {
  // props: {
  //   user: {
  //     type: User,
  //   },
  // },
  computed: {
    vote_uid() {
      return this.$svsAuth.user;
    },
  },
};
</script>




<style scoped lang='scss'></style>
