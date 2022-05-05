<template>
  <div class="container-fluid home">
    <section class="main-home-section">
      <div
        class="columns"
        style="width: 100%;"
      >
        <div
          class="column is-12 is-hidden-desktop"
          style="height: 10vh;"
        />
        <div class="column is-5 is-offset-1">
          <h1 class="main-title">
            Welcome to <brand-name style="color: #ffba5e" />
          </h1>

          <event-countdown
            :title="$store.getters.nextMilestone.name"
            :time="$store.getters.nextMilestone.timeRemaining"
          />

          <div class="has-text-centered">
            <!-- <div style="padding: 0px 5vw;">
              <blockquote>
                <span class="icon"><i class="fa-solid fa-warning" /></span><br>
                After discussion with our community leaders, SvS Staff has decided to extend the EP deadline to
                <br>
                <tooltip
                  :vertical="'top'"
                  :mode="'hover'"
                >
                  <strong>
                    {{ deadlineMilestone.date | date("DAY, dd MONTH yyyy") }}
                    - {{ deadlineMilestone.date | date("hour:min") }} UTC</strong>
                  <template v-slot:message>
                    <span>
                      Your local time: <br>
                      {{ deadlineMilestone.date | date("DAY, dd MONTH yyyy", true) }} <br>
                      {{ deadlineMilestone.date | date("hour:min", true) }}
                    </span>
                  </template>
                </tooltip>
                (previously the 23th)
                <br>
                All subsequent dates are also pushed by one week.<br>
                <router-link to="/svs-iv/overview">
                  See the updated dates
                </router-link>
              </blockquote>
            </div> -->
            <p class="main-message">
              The theme of SvS IV <br><strong class="theme">SECRETS</strong>
            </p>
          </div>
        </div>
        <div class="column is-5">
          <section class="listening-event-section shadow-depth-2">
            <listening-festival-carrousel />
          </section>
        </div>
      </div>
    </section>


    
    <section class="sample-pack-section shadow-depth-3">
      <div class="sample-pack-section-inner">
        <div
          class="columns"
          style="margin: 0"
        >
          <div class="column is-5">
            <div
              class="
                cover-art-container
                has-text-right-on-desktop has-text-centered-on-mobile
              "
            >
              <flip-album
                :size="300"
                :image="'/sample-pack/cover_art.jpg'"
              >
                <p>
                  1 GB worth of samples of all types <br>
                  provided by the community!
                </p>
                <a
                  class="button svs-evolving-gradient is-small"
                  style="text-decoration: none"
                  href="https://servervsserver.gumroad.com/l/sfs1"
                >
                  Get the pack! </a>&nbsp;
                <a
                  class="button svs-evolving-gradient is-small"
                  style="text-decoration: none"
                  href="https://tiltify.com/@svs/samples-for-solidarity"
                >
                  Donate to Project Hope
                </a>
              </flip-album>
            </div>
          </div>
          <div class="column is-1" />
          <div class="column is-4 has-text-centered">
            <h2>Samples for Solidarity</h2>
            <div class="sfs-logos">
              <hr>
              <img
                class="sfs-logo sfs-svs"
                src="/icons/svs/svs_square_light_icon.svg"
              >
              <img
                class="sfs-logo sfs-churchgrimart"
                src="/icons/churchgrimart/small_white.png"
              >
              <img
                class="sfs-logo sfs-projecthope"
                src="/icons/projecthope/small_blue.png"
              >
            </div>

            <!--<script src="https://gumroad.com/js/gumroad.js"></script>
            <a class="gumroad-button" href="https://app.gumroad.com/l/demo">Buy on</a>-->
            <p>
              Our community and ChurchGrim Art have teamed up to <br>build a
              sample pack to raise money for Project Hope.<br>
              You can also directly donate to Project Hope to support civilians
              in Ukraine.
            </p>
            <a
              class="button svs-evolving-gradient"
              style="text-decoration: none"
              href="https://servervsserver.gumroad.com/l/sfs1"
            >
              Get the pack! 
            </a>
            &nbsp;
            <a
              class="button svs-evolving-gradient"
              style="text-decoration: none"
              href="https://tiltify.com/@svs/samples-for-solidarity"
            >
              Donate to Project Hope
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="charity-section shadow-depth-3">
      <div class="charity-section-inner">
        <div
          class="columns"
          style="margin: 0"
        >
          <div class="column is-2" />
          <div class="column is-4 has-text-centered">
            <h2>Give A Beat</h2>
            <hr>
            <p>
              Give a Beat’s mission is to use the power of music as a pathway to healing and opportunity for those impacted by the criminal justice system, 
              while inspiring communities to take action. 
            </p>
            <p>
              They use music education and mentoring programs in juvenile halls, schools, 
              their Prison Electronic Music Program, and their Reentry Mentoring Program to fulfill their mission.
            </p>
            <p>
              Give a Beat engages the music industry to help widen the pathways for people to thrive, 
              encourage empathy, reduce recidivism, and unite to contribute to the larger transformation of the USA's criminal justice system. 
            </p>
            <a
              class="button svs-evolving-gradient"
              style="text-decoration: none"
              href="https://www.giveabeat.org"
            >
              Learn more or get involved
            </a>
            &nbsp;
            <a
              class="button svs-evolving-gradient"
              style="text-decoration: none"
              href="https://tiltify.com/@svs/svs-iv-gab"
            >
              Donate to help the cause!
            </a>
          </div>
          <div class="column is-1" />
          <div class="column is-4 icon-block">
            <img
              src="/icons/giveabeat/GiveaBeat_Logo_shadow.png"
              width="400"
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FlipAlbum from "@/components/FlipAlbum.vue";
import ListeningFestivalCarrousel from "@/components/listening-festival/ListeningFestivalCarrousel.vue"

export default {
  name: "Home",
  components: {
    "flip-album": FlipAlbum,
    "listening-festival-carrousel": ListeningFestivalCarrousel
  },
  computed: {
    deadlineMilestone() {
      return this.$store.state.svsMainEventInformations.competitionEnd
    }
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.home {
  padding-top: 0px !important;
}

@media (max-width: 768px) {
  .home {
    font-size: 0.8em;
  }
}
.main-home-section {
  // height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  h1 {
    margin-top: 30px;
    text-align: center;
  }

  
  .main-message {
    font-size: 1em;
    .theme {
      letter-spacing: 5px;
      font-size: 1.5em;
      text-shadow: 3px 4px 0px rgb(255, 186, 94, 0.2);
    }
  }

  .main-title {
    text-transform: uppercase;
    font-family: "Montserrat", "Jost", sans-serif;
    font-size: 3em;
    &,
    * {
      font-weight: 500 !important;
    }
    letter-spacing: 5px;
    text-shadow: 3px 4px 0px rgb(255, 186, 94, 0.2);
  }
}

// .listening-event-section {
//   width: 100%;
//   min-height: 20px;
// }
.charity-section {
  margin-top: 60px;
  padding: 1px 0px;
  background-color: #edcd99;
  // background-image: url("/backgrounds/bg_light.png");

  .charity-section-inner {
    background-color: #333366;
    position: relative;
    box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%),
      0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 40%);
  }

  .icon-block {
    display: flex;
    align-items: center;
  }

  hr {
    margin: 1rem auto;
    height: 1px;
    width: 60%;
  }
}

.sample-pack-section {
  padding: 1px 0px;
  background-color: #edcd99;
  background-image: url("/backgrounds/bg_light.png");

  .sample-pack-section-inner {
    background-color: #333366;
    position: relative;
    padding: 20px 0px;
    box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%),
      0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 40%);
  }

  .sfs-logos {
    $logos-height: 60px;
    $svs-logo-pad: $logos-height * 0.14;
    position: relative;
    height: $logos-height;

    .sfs-logo {
      height: 100%;
      filter: brightness(200%) saturate(200%) brightness(1000%)
        drop-shadow(0 0 1px white) sepia(0.9);
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
