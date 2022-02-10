<template>
  <div>
    <div class="home container">
      <h1>
        <!-- Welcome to <span style="color: #FFBA5E"> Server Versus Server</span> -->
        Welcome to <brand-name style="color: #ffba5e" />
      </h1>
      <p>
        <!-- <brand-name-short/>&nbsp;IV - Main event <br> -->
        {{ $store.getters.nextMilestone.name }} -
        {{ $store.getters.nextMilestone.date | date('dd MONTH yyyy at hour:min', false, false) }} UTC
      </p>

      <event-countdown :time="$store.getters.nextMilestone.timeRemaining" />

      <section class="block columns">
        <div
          class="column is-6"
          style="text-align: justify"
        >
          TODO: write something about the event || Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eleifend nunc id porta pellentesque. Fusce ac mauris egestas magna tempus iaculis vel eu nibh. Nam nulla massa, hendrerit sed lectus a, ultricies tempus neque. Maecenas et neque eleifend, sollicitudin lacus eget, ultrices lectus. Mauris eleifend, ex eget elementum lobortis, nisi mi ornare urna, eget semper ipsum diam in felis. Vivamus euismod augue sed dolor tincidunt ultrices. Quisque arcu arcu, convallis nec ornare vel, porttitor id orci. Suspendisse non quam nibh. Sed a nulla dui. Phasellus vitae purus sapien. Phasellus eros dolor, tristique at eleifend id, vulputate rutrum justo.

          Phasellus viverra nisi ut mi pretium, mollis efficitur sapien tempor. Aenean non scelerisque nisl. Nulla varius, lacus at convallis placerat, tellus purus ultricies enim, ut finibus ipsum odio at augue. Pellentesque eget dui et nisl aliquam molestie. Mauris ipsum leo, auctor in neque eu, rhoncus facilisis nisi. Aenean eu ante tincidunt, venenatis urna ut, vehicula tellus. Proin vestibulum, ex at malesuada vestibulum, nunc lacus lacinia enim, in commodo odio nibh quis dui. Nam consequat, neque vel euismod tempus, metus odio ullamcorper ex, ut iaculis purus risus sed sem. Nulla aliquet ipsum vitae massa eleifend consequat. Phasellus cursus tincidunt mattis. In non odio ut massa pulvinar mattis. Praesent blandit massa ut congue pharetra. Suspendisse ut ex dolor. Vestibulum tincidunt quam eu ante maximus efficitur.
        </div>
        <div class="is-divider-vertical" />
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
  name: 'Home'}
</script>

<style scoped lang='scss'>


.home {

  width: 93%;

h1 {
  margin-top: 30px;
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
