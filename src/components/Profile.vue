<template>
    
<div>
<img :src="profile.avatar" alt="" class="image">
{{$store._uid}}

{{profile.avatar}}

<button class="button">    <span class="icon">
      <i class="fas fa-sync"></i>
    </span> <span> Re-sync Profile</span></button>
</div>

</template>



<script>
const axios = require("axios");

export default {
    data(){
        return{
            profile:{avatar:"https://i.pravatar.cc/150"}
        }
    },
    mounted(){
         this.$nextTick(() => {
            let storedProfile = this.$store.state.profile;
            let uid = this.$store.state._uid;
        console.log(uid + " ", this.$store.state.profile);
            if(storedProfile){
                console.log("test");
                this.profile = storedProfile;
            }
            else if(uid != undefined){
                 axios
        .get(`http://localhost:3000/users/${uid}`)
        .then( response => {
        console.log(response.data);
        this.$store.dispatch("set_profile", response.data);
        this.profile = response.data;
        });


            }
        }) 

    }
}
</script>










<style lang="sass" scoped>

</style>














/****
1) check if user.profile exists in store
2) send request to AWS server to get user profile (save in store)
3) display that role details (if admin give access to admin stuff)
4) If not synced add a sync button which forces server to resync

 */