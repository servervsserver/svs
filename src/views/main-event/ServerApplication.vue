<template>
  <div class="server-application container">
    <div v-if="isApplicationNotSent">
      <h1>
        Wanna join the event?
      </h1>
      <p>
        If you are in a lead position in a discord server, fill out this form and we will get back to you!
      </p>

      <div>
        <div>
          <div class="columns">
            <div class="column is-half">
              <div class="field">
                <label>Name of the Discord server</label>
                <div class="control has-icons-left">
                  <input
                    v-model="serverName"
                    class="input"
                    type="text"
                    placeholder="My awesome Discord server"
                  >
                  <span class="icon is-small is-left"><i class="fab fa-discord" /></span>
                </div>
                <p
                  v-if="!serverName"
                  class="help is-danger"
                >
                  You must provide a server name
                </p>
                <p
                  v-if="serverName && serverNameIsTooShort"
                  class="help is-danger"
                >
                  Your server name is too short
                </p>
                <p
                  v-if="serverName && serverNameIsTooLong"
                  class="help is-danger"
                >
                  Your server name is too long (100 chars limit)
                </p>
                <p
                  v-if="serverName && serverNameIsValid"
                  class="help"
                  style="color: transparent"
                >
                  &nbsp;
                </p>
              </div>

              <div class="field">
                <label>Permanent invite link</label>
                <div class="control has-icons-left">
                  <input
                    v-model="serverInviteLink"
                    class="input"
                    type="text"
                    placeholder="https://discord.gg/my-permanent-link"
                  >
                  <span class="icon is-small is-left"><i class="fas fa-link" /></span>
                </div>
                <p
                  v-if="!serverInviteLink"
                  class="help is-danger"
                >
                  You must provide an invite link
                </p>
                <p
                  v-if="serverInviteLink && !validServerLink"
                  class="help is-danger"
                >
                  Your link is invalid
                </p>
                <p
                  v-if="serverInviteLink && validServerLink"
                  class="help"
                  style="color: transparent"
                >
                  &nbsp;
                </p>
              </div>

              <div class="field">
                <label>Description</label>
                <div class="control has-icons-left">
                  <textarea
                    v-model="serverDescription"
                    class="textarea"
                    rows="9"
                    :class="{ 'is-danger': !descriptionIsValid }"
                    placeholder="My Discord is awesome because we have cookies! Loads of cookies!"
                  />
                </div>
                <p
                  class="help"
                  style="text-align: right;"
                >
                  {{ serverDescription.length || 0 }} / 500
                </p>
                <p
                  v-if="!serverDescription"
                  class="help is-danger"
                >
                  You must provide a description
                </p>
                <p
                  v-if="serverDescription && descriptionIsTooShort"
                  class="help is-danger"
                >
                  Provide a substantial descrition (min 100 chars)
                </p>
                <p
                  v-if="serverDescription && descriptionIsTooLong"
                  class="help is-danger"
                >
                  Your description is too long (500 chars limit)
                </p>
                <p
                  v-if="serverDescription && descriptionIsValid"
                  class="help"
                  style="color: transparent"
                >
                  &nbsp;
                </p>
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
                              <i class="fas fa-upload" />
                            </span>
                            <span class="file-label">
                              Choose a file…
                            </span>
                          </span>
                          <span class="file-name">
                            {{ serverIconFileName }}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <squared-image-box style="max-width: 250px">
                    <img
                      ref="serverIconEl"
                      class="shadow-depth-2"
                      :src="serverIconUrl"
                    >
                  </squared-image-box>
                </div>
              </div>
              <p
                v-if="!hasImage"
                class="help is-danger"
              >
                You must provide a squared image.
              </p>
              <p
                v-if="hasImage && !hasSquaredImage"
                class="help is-danger"
              >
                You must provide a squared image
              </p>
              <p
                v-if="hasValidImage"
                class="help"
              >
                &nbsp;
              </p>

              <div class="field">
                <label>
                  Discord tags of people in charge
                  <tooltip
                    :vertical="'top'"
                    :mode="'hover'"
                  >
                    <template v-slot:message>
                      List people we should contact to confirm your server's participation.<br>
                      Until we reach out, do not change your discord tags to ease the process.
                    </template>
                    <span class="icon is-small is-left">
                      <i class="fas fa-info-circle" />
                    </span>
                  </tooltip>
                </label>

                <div class="columns">
                  <div class="column is-three-quarters">
                    <div class="control has-icons-left">
                      <input
                        v-model="userName"
                        class="input"
                        type="text"
                        placeholder="ImTheChief#1234"
                      >
                      <span class="icon is-small is-left">
                        <i class="fas fa-user" />
                      </span>
                    </div>
                  </div>

                  <div class="column">
                    <button
                      class="button"
                      :disabled="!canAddUserName"
                      @click="addUserName()"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-user-plus" />
                      </span>
                    </button>
                  </div>
                </div>
                <p
                  v-if="!validUserName && userName"
                  class="help is-danger"
                >
                  Invalid username format.
                  Perhaps you forgot the hashtag?
                </p>
                <p
                  v-if="alreadyAdded"
                  class="help is-danger"
                >
                  You already proposed this user!
                </p>
                <p
                  v-if="!userName || (validUserName && !alreadyAdded)"
                  class="help"
                >
                  &nbsp;
                </p>
              </div>

              <div
                class="field is-grouped is-grouped-multiline"
              >
                <div
                  v-for="username in adminNames"
                  :key="username"
                  class="control"
                >
                  <div class="tags has-addons">
                    <span class="tag">{{ username }}</span>
                    <a
                      class="tag is-delete"
                      @click="dropAdmin(username)"
                    />
                  </div>
                </div>
              </div>
              <p
                v-if="!hasEnoughPeopleInCharge"
                class="help is-danger"
              >
                We need at least one person to contact.
              </p>
              <p
                v-if="hasEnoughPeopleInCharge"
                class="help"
              >
                &nbsp;
              </p>
            </div>
          </div>

          <button
            :disabled="!canSubmit"
            class="button is-medium"
            @click="submit"
          >
            <span>Submit</span>
            <span class="icon">
              <i class="fas fa-paper-plane" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isApplicationSending">
      <h1>Sending your application</h1>
      <p>
        You application is being sent, depending on our servers and your connexion it can take a few seconds!
      </p>
    </div>
    <div v-if="isApplicationSent">
      <h1>Here you go!</h1>
      <p>
        Thank you for your application, we will review it and come back to one of the people you listed to validate the application!
      </p>
    </div>
    <div v-if="isApplicationFailure">
      <h1>Hugh... something went wrong!</h1>
      <p>
        Your application didn't go through. It may just be a server shortage so try again later. <br>
        If it persists, contact us directly.
      </p>
    </div>
  </div>
</template>

<script>
import { Validators, Validate } from "../../models/properties/validators"
import { ServerApplication } from "../../models/dto/server-application"

const APPLICATION_STATUS = Object.freeze({
  NOT_SENT: 0,
  SENDING: 1,
  SENT: 2,
  FAILURE: 3
})

export default {
  data: function () {
    return {
      application_ref: '',
      serverName: "",
      serverInviteLink: "",
      serverIconUrl: "",
      serverIconFileName: "...",
      serverIcon: undefined,
      serverIconDims: null,
      userName: "",
      adminNames: [],
      serverDescription: "",
      status: APPLICATION_STATUS.NOT_SENT
    }
  },
  computed: {
    isApplicationNotSent() {
      return this.status == APPLICATION_STATUS.NOT_SENT
    },
    isApplicationSending() {
      return this.status == APPLICATION_STATUS.SENDING
    },
    isApplicationSent() {
      return this.status == APPLICATION_STATUS.SENT
    },
    isApplicationFailure() {
      return this.status == APPLICATION_STATUS.FAILURE
    },
    serverNameIsTooShort () {
      return !Validators.minCharCount(1)(this.serverName)
    },
    serverNameIsTooLong () {
      return !Validators.maxCharCount(100)(this.serverName)
    },
    serverNameIsValid () {
      return !this.serverNameIsTooShort && !this.serverNameIsTooLong
    },
    validServerLink () {
      return Validators.discordInviteLink(this.serverInviteLink)
    },
    descriptionIsTooShort () {
      return !Validators.minCharCount(100)(this.serverDescription)
    },
    descriptionIsTooLong () {
      return !Validators.maxCharCount(500)(this.serverDescription)
    },
    descriptionIsValid () {
      return !this.descriptionIsTooShort && !this.descriptionIsTooLong
    },
    validUserName () {
      return Validators.discordUserName(this.userName)
    },
    alreadyAdded () {
      return Validators.oneOf(this.adminNames)(this.userName)
    },
    canAddUserName () {
      return this.validUserName && !this.alreadyAdded
    },
    hasEnoughPeopleInCharge () {
      return Validators.minCount(1)(this.adminNames)
    },
    hasImage () {
      return !!this.serverIcon
    },
    hasSquaredImage () {
      return this.serverIconDims
        && (this.serverIconDims.width > 0 && this.serverIconDims.height > 0)
        && (this.serverIconDims.width == this.serverIconDims.height)
    },
    hasValidImage () {
      return Validate([
          Validators.required
        ])(this.serverIcon) && this.hasSquaredImage
    },
    canSubmit() {
      return this.validServerLink
        && this.serverNameIsValid
        && this.descriptionIsValid
        && this.hasEnoughPeopleInCharge
        && this.hasValidImage
    }
  },
  mounted () {
    // this.serverName = "Default server name for tests"
    // this.serverInviteLink = "https://discord.com/invite/8wsGFwxT5S"
    // this.adminNames = ["Jiwayt#1234"]
    // this.serverDescription = "I should Hideaway to tell a new story about having a fake description...and make it twice as long because this story doesn't pass my validator. ROFL"
  },
  methods: {
    onImageChange: function (event) {
      const [file] = event.target.files
      if (file) {
        let imageSize = null
        this.$refs.serverIconEl.onload = () => {
          this.serverIconDims = {
            width: this.$refs.serverIconEl.clientWidth,
            height: this.$refs.serverIconEl.clientHeight
          }
        }
        this.serverIcon = file
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
    },
    submit: function() {

      try {
        this.$svsBackend.createServerApplication(new ServerApplication(
          this.serverName,
          this.serverInviteLink,
          this.serverIcon,
          this.adminNames,
          this.serverDescription
        )).then(res => {
          console.log(res)
        })
      } catch (error) {
        console.error(error)
      }

      // let appObj = {
      //   name: this.serverName,
      //   discord_invite: this.serverInviteLink,
      //   // icon_name: this.serverIconUrl,
      //   icon_file: this.iconFile,
      //   admins: this.adminNames,
      //   description: this.serverDescription
      // };
      //
      // const newServerRef = this.application_ref ? this.application_ref : doc(collection(db, "servers"));
      // let uid = (newServerRef.id);
      // fetch(appObj.icon)
      //   .then((r) => {
      //     var file = this.serverIcon
      //     var fileName = `${uid}.jpg`;
      //     const params = {
      //       Bucket: process.env.VUE_APP_AWS_BUCKET_NAME,
      //       Key: `${uid}.jpg`,
      //       Body: file,
      //       Prefix:"servers_icons/"
      //     };
      //
      //     s3.upload(params, (err, data) => {
      //       if (err) {
      //         console.log(err)
      //       }
      //       appObj.icon = ("d16ax4eys2wwsd.cloudfront.net/" + fileName);
      //       setDoc(newServerRef, appObj).then(function(data){
      //         const appRef = ref(rtdb, 'applications/');
      //         push(appRef,uid);
      //       });
      //     });
      //   });
    }
  }
}

</script>
