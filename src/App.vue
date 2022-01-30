<template>
  <div id="app">
    <div id="nav">
      <router-link to='/'>
      <img src="/banner.png">
      </router-link>

      <router-link to="/main-event">Main event</router-link>
      <!-- <router-link to="/main-event/server-application">Server application</router-link> -->
      <router-link to="/about">About us</router-link>
    </div>

    <div class='router-view'>
      <router-view/>
    </div>

    <footer>
      <div id="socialmedia">
        <ul>
          <li v-for="x in SocMedLinks" :key="x.href">
            <a v-bind:href="x.href">
              <img v-bind:src="x.icon">{{x.text}}
            </a>
          </li>
          <!-- <li>
            <a href="https://www.twitch.tv/servervsserver">
              <img src="icons/twitch/16x16_black.svg">Discord
            </a>
          </li> -->
        </ul>
      </div>
    </footer>

  </div>
</template>

<script>

export default {
  data () {
    return {
      SocMedLinks: [
        {
          text: '@servervserver',
          icon: '/icons/twitter/16x16_black.svg',
          href: 'https://twitter.com/servervsserver?ref_src=twsrc%5Etfw'
        },
        {
          text: 'servervserver',
          icon: '/icons/twitch/16x16_black.svg',
          href: 'https://www.twitch.tv/servervsserver"'
        }

      ]
    }
  }
}

</script>

<style lang="scss">

@use 'assets/styles/main';

</style>
