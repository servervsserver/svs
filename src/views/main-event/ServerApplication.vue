<template>
  <not-open-yet
    :message="'Server applications opens in'"
    :time="$store.state.svsMainEventInformations.serverApplicationPhaseStart.timeRemaining"
  >
    <div class="server-application container">
      <div v-if="isApplicationNotSent">
        <h1>
          Want to join the event?
        </h1>
        <div class="columns">
          <div class="column is-6">
            <p>
              If you are in a lead position in a discord server that wants to compete in SvS IV, fill out this form and we will get back to you!
            </p>
          </div>
        </div>

        <div>
          <div>
            <div class="columns">
              <div class="column is-half">
                <div class="field">
                  <label>Name of your Discord server</label>
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



                <div>
                  Is private?
                  <tooltip
                    :vertical="'top'"
                    :mode="'hover'"
                  >
                    <!-- <template v-slot:title>Yep'</template> -->
                    <template v-slot:message>
                      If your server is only accessible through direct invites
                      (Patreon Discords, Closed crews, ect.), toggle this on.
                    </template>
                    <span class="icon is-small is-left">
                      <i class="fas fa-info-circle" />
                    </span>
                  </tooltip>
                  <div class="field">
                    <input
                      id="is-private"
                      type="checkbox"
                      name="is-private"
                      class="switch is-rounded"
                    >
                    <label for="is-private" />
                  </div>
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
                      <label>
                        Server image
                        <tooltip
                          :vertical="'top'"
                          :mode="'hover'"
                        >
                          <template v-slot:message>
                            The server icon should be a square and under {{ MAX_SIZE | fileSize }}
                          </template>
                          <span class="icon is-small is-left">
                            <i class="fas fa-info-circle" />
                          </span>
                        </tooltip>
                      </label>
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
                      <p class="help">
                        {{ imageSize | fileSize }}
                      </p>
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
                  You must provide a square image.
                </p>
                <p
                  v-if="imageTooBig"
                  class="help is-danger"
                >
                  This is image is too big! It should be under {{ MAX_SIZE | fileSize }}
                </p>
                <p
                  v-if="hasImage && !hasSquaredImage"
                  class="help is-danger"
                >
                  You must provide a square image
                </p>
                <p
                  v-if="hasValidImage"
                  class="help"
                >
                  &nbsp;
                </p>

                <div class="field">
                  <label>
                    Discord tags of server leaders
                    <tooltip
                      :vertical="'top'"
                      :mode="'hover'"
                    >
                      <template v-slot:message>
                        List of people we should contact to confirm your server's participation.<br>
                        Until we reach out, please do not change your discord tags to ease the application process.
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

            <div class="field">
              <input
                id="coc-accept"
                v-model="hasReadAndAgreedCoC"
                type="checkbox"
                name="coc-accept"
                class="switch is-rounded"
              >
              <label for="coc-accept">
                I have read and agreed to the terms of the&#160;<router-link to="/code-of-conduct">Code of Conduct</router-link>
              </label>
            </div>

            <div class="field">
              <input
                id="rules-accept"
                v-model="hasReadAndAgreedRules"
                type="checkbox"
                name="rules-accept"
                class="switch is-rounded"
              >
              <label for="rules-accept">
                I have read and agreed to the&#160;<router-link to="/main-event/rules">Rules of the Competition</router-link>
              </label>
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
      <!-- Application sending -->
      <div v-if="isApplicationSending">
        <h1>Sending your application</h1>
        <p>
          You application is being sent, depending on our servers and your connexion it can take a few seconds!
        </p>
      </div>
      <!-- Application sent -->
      <div v-if="isApplicationSent">
        <h1>Here you go!</h1>
        <p>
          Thank you for your application, we will review it and come back to one of the people you listed to validate the application!
        </p>
      </div>
      <!-- Application failure -->
      <div v-if="isApplicationFailure">
        <h1>Hugh... something went wrong!</h1>
        <p>
          Your application didn't go through. It may just be a server shortage so try again later. <br>
          If it persists, contact us directly.
        </p>
        <button
          class="button"
          @click="recover"
        >
          <span>Go back to the application</span>
          <span class="icon">
            <i class="fas fa-rotate-left" />
          </span>
        </button>
      </div>
    </div>
  </not-open-yet>
</template>

<script>
import { Validators, Validate } from "../../models/properties/validators"
import { ServerApplication } from "../../models/dto/server-application"

const ApplicationStatus = Object.freeze({
  NOT_SENT: 0,
  SENDING: 1,
  SENT: 2,
  FAILURE: 3
})

export default {
  data: function () {
    return {
      hasReadAndAgreedCoC: false,
      hasReadAndAgreedRules: false,
      isPrivate: false,
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
      status: ApplicationStatus.NOT_SENT,
      MAX_SIZE: 2 * 1024 * 1024
    }
  },
  computed: {
    isApplicationNotSent() {
      return this.status == ApplicationStatus.NOT_SENT
    },
    isApplicationSending() {
      return this.status == ApplicationStatus.SENDING
    },
    isApplicationSent() {
      return this.status == ApplicationStatus.SENT
    },
    isApplicationFailure() {
      return this.status == ApplicationStatus.FAILURE
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
    imageSize () {
      if (!this.hasImage) return undefined
      return this.serverIcon.size
    },
    imageTooBig () {
      if (!this.hasImage) return false
      return !Validators.max(this.MAX_SIZE)(this.imageSize)
    },
    hasValidImage () {
      return Validate([
          Validators.required
        ])(this.serverIcon)
        && this.hasSquaredImage
        && !this.imageTooBig
    },
    canSubmit() {
      return this.validServerLink
        && this.serverNameIsValid
        && this.descriptionIsValid
        && this.hasEnoughPeopleInCharge
        && this.hasValidImage
        && this.hasReadAndAgreedCoC
        && this.hasReadAndAgreedRules
    }
  },
  mounted () {
    // this.serverName = "Default server name for tests " + (Math.random() * 1000).toFixed(1)
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
      this.status = ApplicationStatus.SENDING

      let serverApplication = new ServerApplication(
        this.serverName,
        this.serverInviteLink,
        this.serverIcon,
        this.adminNames,
        this.serverDescription,
        new Date(),
        this.isPrivate
      )

      this.$svsBackend.createServerApplicationToSvSIV(serverApplication)
      .then( res => {
        this.status = ApplicationStatus.SENT
      })
      .catch( err => {
        this.status = ApplicationStatus.FAILURE
        console.error(err)
      })

    },
    recover: function() {
      this.status = ApplicationStatus.NOT_SENT
    }
  }
}

</script>
