<template>
  <div class="container-fluid home">
    <section class="main-home-section">
      <h1 class="main-title">
        Welcome to <brand-name style="color: #ffba5e" />
      </h1>

      <event-countdown
        :title="$store.getters.nextMilestone.name"
        :time="$store.getters.nextMilestone.timeRemaining"
      />

      <div class="has-text-centered">
        <!-- <h2>Wanna join the fourth edition?</h2> -->
        <router-link
          class="button svs-evolving-gradient is-large"
          style="text-decoration: none"
          to="/main-event/server-application"
        >
          Apply here!
        </router-link>
      </div>
    </section>
    <section class="sample-pack-section shadow-depth-3">
      <div class="sample-pack-section-inner">
        <div class="columns">
          <div class="column is-4">
            <div class="cover-art-container has-text-right-on-desktop has-text-centered-on-mobile">
              <img class="sample-pack-cover-art"
                src="/sample-pack/cover_art.jpg" width="200" height="200" />
            </div>
          </div>
          <div class="column is-2"></div>
          <div class="column is-4 has-text-centered">
            <h2>Samples for Solidarity</h2>
            <div class="sfs-logos">
              <hr>
              <img class="sfs-logo sfs-svs" src="/icons/svs/svs_square_light_icon.svg" />
              <img class="sfs-logo sfs-churchgrimart" src="/icons/churchgrimart/small_white.png" />
              <img class="sfs-logo sfs-projecthope" src="/icons/projecthope/small_blue.png" />
            </div>

            <!--<script src="https://gumroad.com/js/gumroad.js"></script>
            <a class="gumroad-button" href="https://app.gumroad.com/l/demo">Buy on</a>-->
            <p>
              Our community and ChurchGrim Art have teamed up to <br/>build a sample pack to raise money for Project Hope.<br/>
              You can also directly donate to Project Hope to support civilians in Ukraine.
            </p>
            <a class="button svs-evolving-gradient" style="text-decoration: none" href="https://servervsserver.gumroad.com/l/sfs1">
              Get the pack!
            </a>&nbsp;
            <a class="button svs-evolving-gradient" style="text-decoration: none" href="https://tiltify.com/@svs/samples-for-solidarity">
              Donate to Project Hope
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted () {

  }
}
</script>

<style scoped lang='scss'>
.home {
  padding-top: 0px !important;
}
.main-home-section {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  .front-container {
    /* align-self: flex; */
  }

  h1 {
    margin-top: 30px;
    text-align: center;
  }

  .main-title {
    text-transform: uppercase;
    font-family: "Montserrat", "Jost", sans-serif;
    font-size: 3em;
    &, * { font-weight: 500 !important; }
    letter-spacing: 5px;
    text-shadow: 3px 4px 0px rgb(255, 186, 94, 0.2);
  }

}

.sample-pack-section {
  padding: 100px 0px;
  background-color: #edcd99;
  background-image: url("/backgrounds/bg_light.png");

  .sample-pack-section-inner {
    background-color: #333366;
    position: relative;
    box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 40%);
  }

  .cover-art-container {
    perspective: 400px;

  }

  .sample-pack-cover-art {
    transform-origin: center;
    transform: scale(1.4) rotateY(5deg);
    transition: 0.5s transform;
    box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 40%);

    &:hover {
      transform: scale(1.5) rotateY(15deg);
    }
  }

  .sfs-logos {
    $logos-height: 60px;
    $svs-logo-pad: $logos-height * 0.14;
    position: relative;
    height: $logos-height;

    .sfs-logo {
      height: 100%;
      filter: brightness(200%) saturate(200%) brightness(1000%) drop-shadow(0 0 1px white) sepia(0.9);
    }
    .sfs-svs,
    .sfs-projecthope {
      padding: $svs-logo-pad;
    }

    hr {
      margin: 1rem auto;
      height: 1px;
      width: 60%;
    }
  }


}


</style>
