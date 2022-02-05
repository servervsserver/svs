<template>
  <div class="profile">
    tesr
    
    {{ uid }}
  </div>
</template>


<script>
import { getAuth, onAuthStateChanged, signInWithCustomToken  } from "firebase/auth";
import {app} from "@/assets/db.js"

export default {
    data(){ return {
        uid : ""
    }},
    mounted() {
        this.uid = this.$store._uid;
        
    }

}
</script>






<style scoped>

</style>