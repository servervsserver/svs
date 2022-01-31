<template>
  <div>
    <h1>Track test</h1>
    {{track.name}}<br>
    {{track.credits}}<br>
    <p v-html="track.lyrics"></p>
    <a v-bind:href="track.link">Track link</a><br>
    {{track.serverId}}<br>
    {{track.epId}}
  </div>
</template>

<script>

import { Track } from '../../models/dto/track'

const track = new Track()
track.name = 'Default test name'
track.credits = {}
track.lyrics = `I\'m just random lyrics<br>Divided in multiple lines<br>Nobodies gonna read it<br>I can tell you why`
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
