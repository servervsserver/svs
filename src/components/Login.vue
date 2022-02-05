<template>
  <div class="buttons">
    <a
      v-if="!$auth.isAuthenticated"
      class="button is-dark"
      @click="login"
    >
      Log in with Discord
    </a> 
    <button
      v-if="$auth.isAuthenticated"
      class="button is-dark"
    >
      {{ $auth.user.name }}
    </button>
    <button
      v-if="$auth.isAuthenticated"
      class="button is-dark"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>

<script>
const axios = require("axios");
import { getAuth, onAuthStateChanged, signInWithCustomToken  } from "firebase/auth";
import {app} from "@/assets/db.js"
import { getAnalytics } from "firebase/analytics";
const analytics = getAnalytics(app);

const auth = getAuth();
export default {
  name: "HelloWorld",
  data:function(){return {
    test:""
  }},
  updated : function() {
    console.log(this.$auth.isAuthenticated);
    if(this.$auth.isAuthenticated){
        this.fAuth(this.$auth.user.sub.split("|")[2]);
    }
    
  },
  mounted: function () {
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      this.$store.commit("set_uid",uid);
    } else {
      // User is signed out
      console.log("NOT LOGGED IN");
    }
  });
  },
  methods: {
    login: function () {
      this.$auth.loginWithRedirect();
    },

    fAuth: function (uid) {
      axios
        .get("http://ec2-34-215-138-39.us-west-2.compute.amazonaws.com:3000/authenticate", {
          params: { uid: uid },
        })
        .then(function (response) {
    
            let token = response.data;
              signInWithCustomToken(auth,token)
              .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                this.test = ('USER'+ user.uid);
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
              });
        
        });
    },

    logout: function () {
      this.$auth.logout({
        returnTo: "https://localhost:8080",
      });
    },
  },
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
