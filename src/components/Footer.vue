<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <div class="columns">
        <div class="column">
          <h4>
            <router-link to="/main-event/overview">
              <brand-name /> IV
            </router-link>
          </h4>
          <ul>
            <li>
              <router-link to="/main-event/overview">
                Overview
              </router-link>
            </li>
            <li>
              <router-link to="/code-of-conduct">
                Code of Conduct
              </router-link>
            </li>
            <li>
              <router-link to="/main-event/rules">
                Rules
              </router-link>
            </li>
            <li>
              <router-link to="/main-event/server-application">
                Server Application
              </router-link>
            </li>
          </ul>
        </div>

        <!-- <div class="column">
          <h4>Archive</h4>
          <ul>
            <li>
              <router-link to="">
                A link
              </router-link>
            </li>
            <li>
              <router-link to="">
                Another  link
              </router-link>
            </li>
            <li>
              <router-link to="">
                Yet another link
              </router-link>
            </li>
          </ul>
        </div> -->

        <div class="column">
          <h4>Get in touch</h4>
          <ul>
            <li>
              <router-link to="/anonymous-concerns">
                Anonymous Concerns
              </router-link>
            </li>
            <li>
              <router-link to="/about">
                About us
              </router-link>
            </li>
          </ul>
        </div>

        <!-- <div class="column">
          <h4>Cookies</h4>
          <ul>
            <li>
              <router-link to="/cookie-policy">
                Cookie Policy
              </router-link>
            </li>
          </ul>
        </div> -->
      </div>




      <section class="social-medias columns">
        <div
          v-for="sml in socialMedias"
          :key="sml.link"
          class="column"
        >
          <a
            :href="sml.link"
            class="social-media-item"
          >
            <i
              :class="sml.iconClass"
              style="font-size: 1.5em;"
            />
            <!-- <br class="only-desktop"> -->
            <span style="whitespace: nowrap;">{{ sml.text }}</span>
          </a>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        socialMedias: [
          {
            text: 'Discord',
            iconClass: "fab fa-discord",
            link: 'https://discord.com/invite/8wsGFwxT5S'
          },
          {
            text: 'servervsserver',
            iconClass: "fab fa-twitch",
            link: 'https://www.twitch.tv/servervsserver'
          },
          {
            text: '@servervsserver_',
            iconClass: "fab fa-instagram",
            link: 'https://www.instagram.com/servervsserver_/'
          },
          {
            text: '@servervsserver_',
            iconClass: "fab fa-tiktok",
            link: 'https://www.tiktok.com/@servervsserver_'
          },
          {
            text: '@servervsserver_',
            iconClass: "fab fa-twitter",
            link: 'https://twitter.com/servervsserver_'
          },
          {
            text: 'servervsserver',
            iconClass: "fab fa-reddit",
            link: 'https://www.reddit.com/r/servervsserver/'
          },
          {
            text: 'SvS VODs',
            iconClass: "fab fa-youtube",
            link: 'https://www.youtube.com/channel/UCZuoaVtW6W0Eck9_OnB5F3Q'
          }
        ]
      }
    }
  }
</script>

<style scoped lang='scss'>
.social-media-item:hover {
  padding-left: 0 !important;
}
</style>
