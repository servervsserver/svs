<template>
  <div>
    <h1>Track test</h1>
    {{ track.name }}<br>
    {{ track.credits }}<br>
    <textarea
      :value="track.lyrics"
      class="textarea"
      readonly
      rows="4"
    />
    <a :href="track.link">Track link</a><br>
    {{ track.serverId }}<br>
    {{ track.epId }}
  </div>
</template>

<script>

import { Track } from '../../models/dto/track'

const track = new Track()
track.name = 'Default test name'
track.credits = {}
track.lyrics = `I\'m just random lyrics\nDivided in multiple lines\nNobodies gonna read it\nI can tell you why`
track.link = 'https://youtu.be/_6uHui2mZns'
track.serverId = '123456789'
track.epId = '123456789'

export default {
  data: function () {
    return {
      track: track
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
