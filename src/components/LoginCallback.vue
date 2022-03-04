<template>
    <div>
      <Loading/>

    </div>
</template>
<script>
import Loading from "./Loading.vue"
const axios = require("axios");
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from "firebase/auth";

export default {
  name: "LoginCallback",
  mounted() {
      const auth = getAuth();
      var hash = window.location.hash.substring(1);
    let params = new URLSearchParams(hash)
    const [accessToken, tokenType] = [
      params.get("access_token"),
      params.get("token_type"),
    ];

    if (!accessToken) {
      return;
    }
    axios
      .get("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        const uid = response.data.id;
        axios
          .get(`https://svs4-327921.ew.r.appspot.com/authenticate?${uid}`, {
            params: { uid: uid },
          })
          .then((response) => {
            let token = response.data;
            signInWithCustomToken(auth, token)
              .then((userCredential) => {
                // Signed in
                const FUID = userCredential.user.uid;
                fetch(`https://svs4-327921.ew.r.appspot.com/users/${uid}`)
                  .then((response) => response.json())
                  .then((data) => {
                    if (!data.isStaff) {
                console.log(data);
                  }
                    else{
                        this.$store.dispatch("loginUser",data);
                        this.$router.push({name:"Profile"});

                    }


                  })
                  .catch(console.error);
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
              });
          });
      });
  },
};
</script>