<template>
  <div id="app" class="light-skin">
    <div class="app-container">
      <nav class="navbar" role="navigation" aria-label="main navigation">

        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <div class="navbar-brand-image svs-logo"></div>
          </router-link>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/main-event">Main event</router-link>
            <router-link class="navbar-item" to="/about">About us</router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light">
                  Log in with Discord
                </a>
              </div>
            </div>
          </div>
        </div>

      </nav>

      <div class='router-view'>
        <router-view/>
      </div>

      <footer class="footer">

        <div class="content has-text-centered">

          <div class="columns">
            <div class="column">
              <h4>Main event</h4>
              <ul>
                <li><router-link to="/main-event">Main event</router-link></li>
                <li><router-link to="/main-event/code-of-conduct">Code of conduct</router-link></li>
                <li><router-link to="/main-event/rules">Rules</router-link></li>
                <li><router-link to="/main-event/server-application">Server application</router-link></li>
              </ul>
            </div>

            <div class="column">
              <h4>Archive</h4>
              <ul>
                <li><router-link to="">A link</router-link></li>
                <li><router-link to="">Another  link</router-link></li>
                <li><router-link to="">Yet another link</router-link></li>
              </ul>
            </div>

            <div class="column">
              <h4>The event staff</h4>
              <router-link to="/about">About us</router-link>
            </div>

            <!-- <div class="column has-text-left">
              <div v-for="x in SocMedLinks" :key="x.href">
                <a v-bind:href="x.href">
                  <img v-bind:src="x.icon"> {{x.text}}
                </a>
              </div>
            </div> -->
          </div>

          <section class="social-medias columns">
            <div class="column" v-for="x in SocMedLinks" :key="x.href">
              <a v-bind:href="x.href">
                <img v-bind:src="x.icon" width="32"> {{x.text}}
              </a>
            </div>
          </section>

          <!-- <ul>
            <li v-for="x in SocMedLinks" :key="x.href">
              <a v-bind:href="x.href">
                <img v-bind:src="x.icon"> {{x.text}}
              </a>
            </li>
          </ul> -->
        </div>

      </footer>
    </div>
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

.router-view {
  padding-top: 60px;
  padding-bottom: 60px;
}

// #nav {
//   padding: 30px;
//   background-color: #333366;
//   width: 100%;
//   padding: 0;
//   height: 60px;
//   position: fixed;
//   top: 0;
//   z-index: 100;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   box-shadow: 0px 5px 10px #0000004e;
//
//   img {
//     height: 100%;
//   }
//
//
//   a {
//     color: #ffffff;
//     height: 60%;
//     margin-left: 10px;
//     text-decoration: none;
//     line-height: 36px;
//     margin-left: 20px;
//
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
//
//   a:hover {
//     color: #e9e9e9;
//   }
// }

</style>
