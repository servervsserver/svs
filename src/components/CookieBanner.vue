<template>
  <div
    class="cookie_banner_container"
  >
    <div class="cookie_banner">
      <div class="cookie_banner_content">
        <p class="title is-3">
          Cookie Consent
        </p>
        <p class="infomessage">
          This website uses cookies to improve your experience. These cookies are grouped into different categories. For more information on how we use cookies, and to customise your cookie settings, click 'preferences.'
        </p>
        <div class="preferencewrapper">
          <div @click="openclose">
            Preferences <i
              v-if="this.$data.isOpen"
              class="far fa-caret-square-up"
            /><i
              v-else
              class="far fa-caret-square-down"
            />
          </div>
        </div>
        <div v-if="isOpen">
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
                <a>How we use Neccesary cookies</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="field">
                  <input
                    id="func_cook"
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
                <a>How we use Functional cookies</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="field">
                  <input
                    id="anal_cook"
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
                <a>How we use Analytics cookies</a>
              </td>
            </tr>
          </table>
          <div class="buttons_wrapper">
            <button class="button is-info">
              Accept Custom
            </button>
          </div>
        </div>
        <div class="buttons_wrapper">
          <button class="button">
            Reject All
          </button>
          <button class="button is-info">
            Accept All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

    data () {
        return {
            isOpen : false
        }
    },
    methods : {
        openclose : function () {
            this.$data.isOpen = !(this.$data.isOpen)
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
    overflow: scroll;
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
}

.cookie_banner {
    background-color: white;
    color: black;
    width: 80%;
    padding: 50px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.227);
    margin-left:auto;
    margin-right: auto;
    margin-top: 10vh;
    margin-bottom: 10vh;
    border-radius: 30px;
    
    div.preferencewrapper {
        display: flex;
        justify-content: center;
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