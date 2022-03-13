<template>
  <div>
    <h1>Track test</h1>
    <ep-upload-form />
    <!-- <track-upload-form :track="track"/> -->
    <!-- {{ track.name }}<br>
    {{ track.credits }}<br>
    <textarea
      :value="track.lyrics"
      class="textarea"
      readonly
      rows="4"
    />
    <a :href="track.link">Track link</a><br>
    {{ track.serverId }}<br>
    {{ track.epId }} -->
  </div>
</template>

<script>

import {
  EpUploadFormComponent,
  Track,
  CreditEntry
} from "@/components/forms/ep-upload"

let track = new Track()

export default {
  components: {
    'ep-upload-form': EpUploadFormComponent
  },
  data: function () {
    return {
      track: track
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
