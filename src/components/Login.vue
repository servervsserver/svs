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
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut  } from "firebase/auth";
import {app} from "@/assets/db.js"
const FIREBASE_APP = app;

const auth = getAuth();
export default {
  name: "Login",
  data:function(){return {
    test:""
  }},
  updated : function() {
    
    if(this.$auth.isAuthenticated){
        let str = this.$auth.user.sub
        let person = (str.split("|"));
        console.log(person[2] + "before fauth");
        this.fAuth(person[2]);
    }
    
    
  },
  mounted: function () {
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      this.$store.commit("set_uid",uid);
    } else {
      //this.$store.commit("set_uid",uid);
    }
  });
  },
  methods: {
    login: function () {
      this.$auth.loginWithRedirect();
    },

    fAuth: function (uid) {
      axios
        .get("http://localhost:3000/authenticate", {
          params: { uid: uid },
        })
        .then( (response) => {
    
            let token = response.data;
              signInWithCustomToken(auth,token)
              .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user.uid);
                this.$store.commit("set_uid",user.uid);
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
              });
        
        });
    },

    logout: function () {
      signOut(auth).then(() => {
        this.$store.commit("set_uid",undefined);
      this.$auth.logout({
        returnTo: "http://localhost:8080",
      });


      })
      
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


// TODO: AUTOROUTE TO PROFILE