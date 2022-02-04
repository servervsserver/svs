<template>
  <div class="server-application container">
    <h1>
      Wanna join the event?
    </h1>
    <h2>If you are in lead position in your discord, fill this form and we will get back to you!</h2>

    <div>
      <div>

        <div class="columns">

          <div class="column is-half">

            <div class="field">
              <label>Name of the Discord server</label>
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="My awesome Discord server">
                <span class="icon is-small is-left"><i class="fas fa-discord"></i></span>
              </div>
            </div>

            <div class="field">
              <label>Permanent invite link</label>
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="https://discord.gg/my-permanent-link"
                  v-model="serverInviteLink"
                  >
                <span class="icon is-small is-left"><i class="fas fa-link"></i></span>
              </div>
              <p
                v-if="validServerLink || !serverInviteLink"
                class="help" style="color: transparent">
                &nbsp;
              </p>
              <p
                v-if="!validServerLink && serverInviteLink"
                class="help is-danger">
                Your link is invalid
              </p>
            </div>

            <div class="field">
              <label>Description</label>
              <div class="control has-icons-left">
                <textarea
                  class="textarea"
                  placeholder="My Discord is awesome because we have cookies! Loads of cookies!">
                </textarea>
              </div>
            </div>

          </div>

          <div class="column">

            <div class="columns">
              <div class="column">
                <div class="field ">
                  <label>Server image</label>
                  <div class="has-text-centered">
                    <div class="file has-name is-boxed">
                      <label class="file-label">
                        <input
                          accept="image/*"
                          class="file-input"
                          type="file"
                          @change="onImageChange"
                          >
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label">
                            Choose a file…
                          </span>
                        </span>
                        <span class="file-name">
                          {{serverIconFileName}}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <img :src="serverIconUrl" width="140px" height="140px"/>
              </div>
            </div>




            <div class="field">

              <label>
                Discord tags of people in charge
                <tooltip
                  :vertical="'top'"
                  :mode="'hover'">
                  <!-- <template v-slot:title>Yep'</template> -->
                  <template v-slot:message>
                    List people we should contact to confirm your server's participation.<br>
                    Until we reach out, do not change your discord tags to ease the process.
                  </template>
                  <span class="icon is-small is-left">
                    <i class="fas fa-info-circle"></i>
                  </span>
                </tooltip>
              </label>

              <div class="columns">

                <div class="column is-three-quarters">
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="ImTheChief#1234"
                      v-model="userName"
                      >
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>

                  </div>
                </div>

                <div class="column">
                  <button
                    class="button"
                    :disabled="!canAddUserName"
                    @click="addUserName()">
                    <span class="icon is-small">
                      <i class="fas fa-user-plus"></i>
                    </span>
                  </button>
                </div>

              </div>
              <p
                v-if="!validUserName && userName"
                class="help is-danger">Invalid username format.
                Perhaps you forgot the hashtag?
              </p>
              <p
                v-if="alreadyAdded"
                class="help is-danger">
                You already proposed this user!
              </p>
            </div>

            <div
              class="field is-grouped is-grouped-multiline"
              >
              <div
                class="control"
                v-for="username in adminNames"
                :key="username"
                >
                <div class="tags has-addons">
                  <span class="tag is-link">{{username}}</span>
                  <a class="tag is-delete" @click="dropAdmin(username)"></a>
                </div>
              </div>
            </div>

          </div>

        </div>
        <!-- <div class="field">
          <label>Server icon</label>
          <input class="input" type="file" />
        </div> -->
<!--
        <span>Server Size (number of people in the server)</span>
        <input
          type="number"
          step="1"
        > -->

      </div>
    </div>
  </div>
</template>

<script>
import { Validators } from "../../models/properties/validators"

export default {
  data: function () {
    return {
      serverInviteLink: "",
      serverIconUrl: "/placeholders/server_placeholder_icon.jpg",
      serverIconFileName: "...",
      userName: "",
      adminNames: [
        "TheShiningDandrobat#1234",
        "Nobody#5678"
      ]
    }
  },
  computed: {
    validUserName () {
      return Validators.discordUserName(this.userName)
    },
    alreadyAdded () {
      return Validators.oneOf(this.adminNames)(this.userName)
    },
    canAddUserName () {
      return this.validUserName && !this.alreadyAdded
    },
    validServerLink () {
      return Validators.discordInviteLink(this.serverInviteLink)
    }
  },
  methods: {
    onImageChange: function (event) {
      const [file] = event.target.files
      if (file) {
        this.serverIconUrl = URL.createObjectURL(file)
        this.serverIconFileName = file.name
      }
    },
    addUserName: function() {
      this.adminNames.push(this.userName)
      this.userName = ""
    },
    dropAdmin: function(username) {
      let idx = this.adminNames.indexOf(username)
      this.adminNames.splice(idx, 1)
    }
  }
}

</script>

<style scoped lang="scss">
</style>
