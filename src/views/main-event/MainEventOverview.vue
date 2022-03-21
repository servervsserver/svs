<template>
  <div class="container">
    <h1><brand-name /> overview</h1>

    <div class="columns">
      <div class="column is-7">
        <h2>Timeline</h2>

        <div class="timeline">
          <header class="timeline-header">
            <span class="tag is-medium shadow-depth-1">
              <brand-name-short /> &#160;IV
            </span>
          </header>

          <div
            v-for="milestone in milestones"
            :key="milestone.name"
            class="timeline-item"
          >
            <div
              v-if="nextMilestone !== milestone"
              class="timeline-marker is-icon"
            >
              <span
                v-if="milestone.isPast"
                style="font-size: 1.2em !important"
              >
                <i class="fa-solid fa-calendar-check" />
              </span>
              <span
                v-if="milestone.isIncoming"
                style="font-size: 1.2em !important"
              >
                <i class="fa-regular fa-calendar" />
              </span>
            </div>
            <div
              v-if="nextMilestone === milestone"
              class="timeline-marker is-icon"
            >
              <span style="font-size: 1.3em !important">
                <i class="fas fa-bullseye" />
              </span>
            </div>
            <div class="timeline-content">
              <div class="heading-section">
                <tooltip
                  :vertical="'top'"
                  :horizontal="'right'"
                  :mode="'hover'"
                >
                  <h2 class="heading">
                    {{ milestone.name }}
                  </h2>
                  <div class="subheading">
                    {{ milestone.date | date("DAY, dd MONTH yyyy") }}
                    - {{ milestone.date | date("hour:min") }} UTC
                  </div>
                  <template v-slot:message>
                    <span>
                      Your local time: <br>
                      {{ milestone.date | date("DAY, dd MONTH yyyy", true) }} <br>
                      {{ milestone.date | date("hour:min", true) }}
                    </span>
                  </template>
                </tooltip>
              </div>
              <p>{{ milestone.description }}</p>
            </div>
          </div>

          <div class="timeline-header">
            <span class="tag is-medium">End</span>
          </div>
        </div>

        <blockquote>
          All dates are displayed in UTC time. (it should be
          {{ displayTimezoneOffset }})<br>
          Start dates start from midnight of this day<br>
          <strong>TBA</strong> stands for To Be Announced
        </blockquote>
      </div>
      <div class="column is-1" />
      <div class="column is-4">
        <h2>News!</h2>
        <section class="news-section">
          <a
            class="twitter-timeline"
            data-height="1000"
            data-dnt="true"
            data-theme="dark"
            href="https://twitter.com/servervsserver_?ref_src=twsrc%5Etfw"
          >
            Tweets by servervsserver_</a>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TwitterWidgetsLoader from "twitter-widgets";
export default {
  computed: {
    milestones() {
      return this.$store.state.svsMainEventInformations.milestones;
    },
    nextMilestone() {
      return this.$store.getters.nextMilestone;
    },
    displayTimezoneOffset() {
      let hourOffset = (new Date().getTimezoneOffset() / 60).toFixed();
      let singular = hourOffset;
      let end = "";
      if (hourOffset > 0) {
        end = "ahead of your time";
      } else if (hourOffset < 0) {
        end = "behind your time";
      }
      return `${Math.abs(hourOffset)} hour${
        Math.abs(hourOffset) <= 1 ? "" : "s"
      } ${end}`;
    },
  },
  mounted() {
    TwitterWidgetsLoader.load();
  },
};
</script>

<style>
.heading {
  /* letter-spacing: 1px; */
  text-shadow: 0.1em 0.1em 1px rgb(255 186 94 / 40%);
}

.subheading {
  font-family: "Jost", "Montserrat";
  font-weight: 500;
  font-style: italic;
  letter-spacing: 1px;
}
.news-section > * {
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}
</style>
