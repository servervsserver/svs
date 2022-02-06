<template>
    <div class="cookie_banner_container" scroll="no">
        <div class="cookie_banner">
            <h1>
                Cookie Consent
            </h1>
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
            <div v-if="isOpen" class="cookietable">
            <tr>
            <th>
            <div class="field">
            <label>Neccesary Cookies - Enabled by Default</label>
            </div>
            </th>
            <th>
                <a>How we use Neccesary cookies</a>
            </th>
            </tr>
            <tr>
            <th>
            <div class="field">
            <input id='func_cook' type="checkbox" name="switchExample" class="switch is-rtl is-info is-rounded is-outlined" checked="checked">
            <label for="func_cook">Functional Cookies</label>
            <p class="help">Disabling may remove some website functionality</p>
            </div>
            </th>
                        <th>
                <a>How we use Functional cookies</a>
            </th>
            </tr>
            <tr>
            <th>
            <div class="field">
            <input id='anal_cook' type="checkbox" name="switchExample" class="switch is-rtl is-info is-rounded is-outlined" checked="checked">
            <label for="anal_cook">Analytics Cookies</label>
            <p class="help">Disabling may remove some website functionality</p>
            </div>
            </th>
                        <th>
                <a>How we use Analytics cookies</a>
            </th>
            </tr>
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

h1 {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
}

th {
    min-height: 40px;
    margin-right: 30px;
    display: inline-flex;
    align-items: center;
}

.cookietable {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

a {
    color: rgb(0, 0, 112);
    text-decoration: underline;
    font-weight: 200;
}

p.infomessage {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: justify;
}

.cookie_banner_container {
    width: 100vw;
    height: 100vh;
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
    height: 80%;
    margin-left:auto;
    margin-right: auto;
    margin-top: 10vh;
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

div.dark-theme {
    background-color: yellow;
}

</style>