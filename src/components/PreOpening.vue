<template>
  <div>
    <div
      v-if="$store.getters.isPreOpening"
      class="app-container"
    >
      <div
        id="main-router-view"
        class="router-view"
      >
        <div class="pre-opening">
          <div class="front-container">
            <h1 class="main-title">
              <brand-name style="color: #ffba5e" />
            </h1>

            <event-countdown
              :title="'The website opens in'"
              :time="$store.getters.nextMilestone.timeRemaining"
            />
          </div>
        </div>
      </div>
    </div>
    <slot v-if="!$store.getters.isPreOpening" />
  </div>
</template>

<style scoped lang='scss'>
.pre-opening {

  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  .front-container {
    align-self: flex;
  }

  h1 {
    margin-top: 30px;
    text-align: center;
  }

  .main-title {
    text-transform: uppercase;
    font-family: "Montserrat", "Jost", sans-serif;
    font-size: 3em;
    letter-spacing: 5px;
    text-shadow: 3px 4px 0px rgb(255, 186, 94, 0.2);

    &, * {
      font-weight: 500 !important;
    }

  }

}
</style>
