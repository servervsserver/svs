<template>
  <div>
    <h1>Track test</h1>
    <ep-upload-form :ep="ep" />
    <button class="button" @click="submitEp">
      Submit EP
    </button>
    <button class="button" @click="submitTrack">
      Submit random track
    </button>
    <text-input v-model="trackId" ></text-input>
    <button class="button" @click="deleteTrack">
      Delete track
    </button>
    <button class="button" @click="getEp">
      Get EP
    </button>
  </div>
</template>

<script>

import {
  TextInputComponent
} from "@/modules/forms"

import {
  EpUploadFormComponent,
  Track,
  CreditEntry,
  Ep
} from "@/components/forms/ep-upload"

import * as FirestoreModel from "@/plugins/backend/firestore"

let ep = new Ep()
ep.infos.name = "EP Name"
ep.infos.streamingLink = "stream.link"
let track = new Track()
track.name = "Yikes bumber 1"
track.lyrics = "I've seen enough \n But I want to see more"
track.hasLyrics = true
track.genre = "Acid"
let cred = new CreditEntry()
cred.artistName = "Jiway"
cred.description = "Jiw, ay"
cred.discordTag = "Boomboclat#1234"
track.credits.push(cred)
cred = new CreditEntry()
cred.artistName = "Jiway"
cred.description = "Jiw, ay"
track.credits.push(cred)
ep.tracks.push(track)

track = new Track()
track.name = "Yikes bumber 2"
track.lyrics = null
track.genre = "Jazz"
track.secondGenre = "Funk"
cred = new CreditEntry()
cred.artistName = "teauoi"
cred.description = "Ay, aya"
cred.anonymous = true
track.credits.push(cred)
ep.tracks.push(track)

export default {
  components: {
    'ep-upload-form': EpUploadFormComponent,
    'text-input': TextInputComponent
  },
  data: function () {
    return {
      ep: ep,
      trackId: ""
    }
  },
  mounted() {

  },
  methods: {
    async submitEp() {
      let ep = this.ep
      let fEp = new FirestoreModel.Ep()
      fEp.name            = ep.infos.name
      fEp.streaminglink   = ep.infos.streamingLink

      fEp.tracks_ids = await Promise.all(ep.tracks.map( async (track) => {
        let fTrack = new FirestoreModel.Track()
        fTrack.name     = track.name
        fTrack.lyrics   = track.lyrics
        fTrack.explicit = track.explicit
        fTrack.genres   = [track.genre]
        if (track.secondGenre) {
          fTrack.genres.push(track.secondGenre)
        }

        fTrack.credits_ids = await Promise.all(track.credits.map(ce => {
          let fCredit = new FirestoreModel.TrackCreditsEntry()
          fCredit.artist_name = ce.artistName
          fCredit.discord_tag = ce.discordTag
          fCredit.roles       = ce.description.split(",")
          fCredit.anonymous   = ce.anonymous
          return this.$svsBackend.createCreditsEntry(fCredit)
        }))

        return this.$svsBackend.createTrack(fTrack, track.audioFile)
      }))
      await this.$svsBackend.createEp(fEp, ep.infos.coverArtFile)
    },
    async submitTrack() {
      this.trackId = await this.$svsBackend.createTrack(new FirestoreModel.Track())
    },
    async deleteTrack() {
      console.log()
      await this.$svsBackend.deleteTrack(this.trackId)
      this.trackId = null
    },
    async getEp() {
      let ep = await this.$svsBackend.getEpById(this.trackId)
      console.log(ep)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
