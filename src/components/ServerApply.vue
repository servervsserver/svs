<template>
  <div class="">
    <form>
      <input
        id="name"
        v-model="application.name"
        type="text"
        name="name"
        placeholder="Server Name"
      >
      <input
        id="invite"
        v-model="application.discord_invite"
        type="text"
        name="invite"
        placeholder="Discord Invite"
      >
      <input
        id="size"
        v-model="application.size"
        type="number"
        name="size"
        placeholder="Discord Size"
      >
      <input
        id=""
        type="file"
        name=""
        accept="image/png, image/gif, image/jpeg"
        :value="application.icon"
      >
      <textarea
        id="admins"
        type="text"
        name="admins"
        placeholder="Admin Discord Tags Comma seperated"
      />
      <textarea
        id="desc"
        name="desc"
        cols="30"
        rows="10"
        placeholder="Server Description"
      />
    </form>
    <span> {{ application.icon }}</span>
  </div>
</template>

<script>
import { s3, db, rtbd} from "../assets/db.js"
import { doc, setDoc } from "firebase/firestore"; 

export default {

    data () {
        return {
            application_uid: '',
            application: { name: '', discord_invite: '', icon: '', admins: '', description: '', size: 0 }
        }
    },

    computed () {
        return {
        }
    },

    methods: {
        save: function () {
            if (!this.application_uid) {

            }
        }
    }

}
</script>

<style scoped lang="less">
</style>
