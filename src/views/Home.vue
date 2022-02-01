<template>
  <div class="home">
    <h1>
      Welcome to <span style="color: #FFBA5E"> Server Versus Server</span>
    </h1>
    <p>SVS IV will happen the {{ $store.state.nextSvsMainEventTime.toUTCString() }}</p>
    <event-countdown :time="$store.getters.nextSvsMainEventRemainingTime" />

    <div
      id="about"
      class="about"
    >
      <!-- <h1>This is an about page</h1> -->
      <h1>
        About Us
      </h1>
      <p>
        SvS  is  a  Discord-based  music-making  event  that  began  Spring 2020 in response to the COVID-19 pandemic. Our objective  is  to  unite  the  rich  variety  of  online  music  communities  that  have  been  growing  on  Discord  through  the  simple shared goal of making music. By the end of the festival, each  server  that  participates  ends  with  purely  collaborative  work showcasing the skills and creativity of all the musicians who  contributed  their  time  and  effort.  Their  work  is  then  shared with all participants in a live Twitch festival at the end of  the  event,  which  also  acts  as  a  charity  fundraiser  event.
      </p>
      <h1>Brand guide</h1>
      <p>What we do ...</p>
      <h1>Mission statement</h1>
      <p>What we strive for ...</p>
      <h1>Who are the peps?</h1>
      <p>Who are the staff ...</p>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang='scss'>

.home {
h1 {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}

p {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;

}

.about {
  margin-top: 50px;

  p {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

}

}

</style>
