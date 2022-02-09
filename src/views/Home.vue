<template>
  <div>
    <div class="home container">
      <h1>
        <!-- Welcome to <span style="color: #FFBA5E"> Server Versus Server</span> -->
        Welcome to <brand-name style="color: #ffba5e" />
      </h1>
      <p>
        <brand-name-short />&nbsp;IV - Main event <br>
        {{ $store.getters.nextMilestone.name }} -
        {{ $store.getters.nextMilestone.date | date('dd MONTH yyyy at hour:min', false, true) }}
      </p>

      <event-countdown :time="$store.getters.nextMilestone.timeRemaining" />

      <section class="block columns">
        <div class="column is-6">
          TODO: write something about the event
        </div>
        <div class="column is-6 has-text-centered">
          <h2>Wanna join the fourth edition?</h2>
          <router-link
            class="button svs-evolving-gradient is-large"
            style="text-decoration: none"
            to="/main-event/server-application"
          >
            Apply here!
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted () {
    console.log("Heya!")
    console.log(this.$svsBackend)
  }
}
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
