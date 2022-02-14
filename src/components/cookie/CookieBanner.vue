<template>
  <div
    v-if="showBanner"
    class="cookie_banner_container"
  >
    <div class="cookie_banner">
      <div class="cookie_banner_content">
        <p class="title is-3">
          Cookie Consent
        </p>
        <p class="infomessage">
          This website uses cookies to improve your experience. These cookies are grouped into different categories. For more information on how we use cookies, and to customise your cookie settings, click "preferences".
        </p>
        <div class="preferencewrapper">
          <div @click="togglePreferenceExpansion">
            Preferences <i
              v-if="preferencesExpanded"
              class="far fa-caret-square-up"
            /><i
              v-else
              class="far fa-caret-square-down"
            />
          </div>
        </div>
        <div v-if="preferencesExpanded">
          <table
            class="cookietable"
          >
            <tr>
              <td>
                <div class="field">
                  <label>Neccesary Cookies - Enabled by Default</label>
                </div>
              </td>
              <td>
                <a href="/cookie-policy#strictlyneccesary">How we use Neccesary cookies</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="field">
                  <input
                    id="func_cook"
                    v-model="cookiePreference.functional"
                    type="checkbox"
                    name="switchExample"
                    class="switch is-rtl is-info is-rounded is-outlined"
                    checked="checked"
                  >
                  <label for="func_cook">Functional Cookies</label>
                  <p class="help">
                    Disabling may remove some website functionality
                  </p>
                </div>
              </td>
              <td>
                <a href="/cookie-policy#functional">How we use Functional cookies</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="field">
                  <input
                    id="anal_cook"
                    v-model="cookiePreference.analytical"
                    type="checkbox"
                    name="switchExample"
                    class="switch is-rtl is-info is-rounded is-outlined"
                    checked="checked"
                  >
                  <label for="anal_cook">Analytics Cookies</label>
                  <p class="help">
                    Disabling may remove some website functionality
                  </p>
                </div>
              </td>
              <td>
                <a href="/cookie-policy#analytical">How we use Analytics cookies</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="field">
                  <input
                    id="third_cook"
                    v-model="cookiePreference.thirdparty"
                    type="checkbox"
                    name="switchExample"
                    class="switch is-rtl is-info is-rounded is-outlined"
                    checked="checked"
                  >
                  <label for="third_cook">Third Party Cookies</label>
                  <p class="help">
                    Disabling may remove some website functionality
                  </p>
                </div>
              </td>
              <td>
                <a href="/cookie-policy#thirdparty">How we use Third party cookies</a>
              </td>
            </tr>
          </table>
          <div class="buttons_wrapper">
            <button
              class="button is-info"
              @click="savePreference()"
            >
              Accept Custom
            </button>
          </div>
        </div>
        <div class="buttons_wrapper">
          <button
            class="button is-info"
            @click="rejectAllAndSave()"
          >
            Reject All
          </button>
          <button
            class="button is-info"
            @click="acceptAllAndSave()"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { CookiePreference } from "@/plugins/settings/settings.js"

export default {
  data () {
    return {
      preferencesExpanded: false,
      cookiePreference: new CookiePreference()
    }
  },
  computed: {
    showBanner() {
      if (this.$route.name == 'CookiePolicy') return false
      if (this.$svsSettings.hasCookiePreference) return false
      return true
    }
  },
  methods: {
    togglePreferenceExpansion () {
      this.preferencesExpanded = !this.preferencesExpanded
    },
    savePreference() {
      this.$svsSettings.cookiePreference = this.cookiePreference
    },
    rejectAllAndSave() {
      this.cookiePreference.rejectAll()
      this.savePreference()
    },
    acceptAllAndSave() {
      this.cookiePreference.acceptAll()
      this.savePreference()
    }
  }
}

</script>


<style scoped lang='scss'>

.buttons_wrapper {
    margin-left: 5%;
}

.cookie_banner {
    display: flex;
    align-items: center;
}

button {
    margin-right: 20px;
    margin-bottom: 20px;
}

h1 {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
}

td {
    padding: 15px;
    padding-left: 0;
}

.cookietable {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}


a {
    color: rgb(0, 0, 112);
    text-decoration: underline;
    font-weight: 200;
}

p.infomessage {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    text-align: justify;
}

.cookie_banner_container {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding: 0;
    position: fixed;
    top: 0;
    z-index: 200;
    background: rgba(255, 255, 255, 0.165);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.cookie_banner {
    background-color: white;
    color: black;
    width: 50%;
    padding: 20px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.227);
    margin-left:auto;
    margin-right: auto;
    margin-top: 10vh;
    margin-bottom: 10vh;
    border-radius: 10px;

    div.preferencewrapper {
        display: flex;
        justify-content: left;
        margin-left: 5%;
        padding-bottom:40px;
        cursor: pointer;

        i {
            margin-left: 10px;
        }

    }

}

.title {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

div.dark-theme {
    background-color: yellow;
}

</style>
