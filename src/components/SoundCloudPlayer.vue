<template>
  <div v-if="JSON.parse(this.$cookie.get('cookiepreference')).thirdparty == true">
    <iframe
      width="100%"
      height="300"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' + playlist_id"
    />
  </div>
  <div v-else>
    Third Party cookies must be enabled to view this item
  </div>
</template>

<script>

export default ({
    props : {
        playlist_id : {default: '1366455853', type : String},
    }
})
</script>

<style scoped lang='scss'>

div {
    height : 300px;
    text-align: center;
    width : 95%;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
}

iframe {
    border-radius: 10px;
}

</style>