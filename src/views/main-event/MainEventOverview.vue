<template>
  <div class="container">
    <h1>Server vs Server IV Overview</h1>

    <div class="columns is-8 is-variable">
      <div class="column is-8">
        <h2>Timeline</h2>

          <div class="timeline">
            <header class="timeline-header">
              <span class="tag is-medium shadow-depth-1">
                <brand-name-short /> &#160;IV
              </span>
            </header>

            <div
              v-for="milestone in $store.state.svsMainEventInformations.milestones"
              :key="milestone.name"
              class="timeline-item"
            >
              <div class="timeline-marker is-icon">
                <i class="fas fa-bullseye" />
              </div>
              <div class="timeline-content">
                <!-- <h2 class="supheading">{{ milestone.date | date('dd MONTH yyyy') }} </h2> -->
                <h1 class="heading">
                  {{ milestone.name }}
                </h1>
                <h2 class="subheading">
                  {{ milestone.date | date('DAY, dd MONTH yyyy') }} - {{ milestone.date | date('hour:min') }}
                </h2>
                <p>{{ milestone.description }}</p>
              </div>
            </div>

            <div class="timeline-header">
              <span class="tag is-medium">End</span>
            </div>
          </div>


        <blockquote>
          All dates are displayed in UTC time.<br>
          Start dates start from midnight of this day<br>
          End dates ends at mignight of this day
        </blockquote>
      </div>
      <div class="column is-4">
        <h2>News!</h2>
        <a class="twitter-timeline" data-dnt="true" data-theme="dark" href="https://twitter.com/servervsserver_?ref_src=twsrc%5Etfw">
          Tweets by servervsserver_</a>
      </div>
    </div>
  </div>
</template>

<script>
import TwitterWidgetsLoader from "twitter-widgets"
export default {
 mounted() {
  TwitterWidgetsLoader.load();
 }
}
</script>
