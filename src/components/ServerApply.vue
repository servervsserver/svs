<template>
<div class="">
  <form>
    <input type="text" name="name" id="name" placeholder="Server Name" v-model="application.name" />
    <input type="text" name="invite" id="invite" placeholder="Discord Invite" v-model="application.discord_invite" />
    <input type="number" name="size" id="size" placeholder="Discord Size" v-model="application.size" />
    <input
      type="file"
      name=""
      id=""
      accept="image/png, image/gif, image/jpeg"
      v-bind:value="application.icon"
    />
    <textarea
      type="text"
      name="admins"
      id="admins"
      placeholder="Admin Discord Tags Comma seperated"
    ></textarea>
    <textarea
      name="desc"
      id="desc"
      cols="30"
      rows="10"
      placeholder="Server Description"
    ></textarea>
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
