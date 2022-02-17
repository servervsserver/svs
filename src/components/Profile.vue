<template>
  <div>
    <img
      :src="profile.icon"
      alt=""
      class="image"
    >

    {{ profile.name }} |
    {{ profile.tag }} |
    {{ profile.isStaff }} | 
    {{ profile.isLeaders }} |
    <button
      class="button"
      @click="pullData"
    >
      <span class="icon">
        <i class="fas fa-sync" />
      </span> <span> Re-sync Profile</span>
    </button>
  </div>
</template>



<script>
const axios = require("axios");

export default {
    data(){
        return{
            profile:{icon:"https://i.pravatar.cc/150"}
        }
    },
    mounted(){
         this.$nextTick(() => {
       setTimeout(() => {
         this.pullData();
       }, 1000); 
      });
    },
    methods:{
        pullData(){
let storedProfile = this.$store.state.profile;
            let uid = this.$store.state._uid;
            if(storedProfile){
                this.$set(profile,storedProfile);
            }
            else if(uid != undefined){
                 axios
        .get(process.env.VUE_APP_SVS_BACKEND_SERVER+`/users/${uid}`)
        .then( (response)=>{
        this.$store.commit("set_profile", response.data);
        this.profile = response.data;

 });

            }}


    },
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