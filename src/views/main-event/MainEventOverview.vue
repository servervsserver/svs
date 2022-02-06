<template>
  <div class="container">
    <div class="timeline">

      <header class="timeline-header">
        <span class="tag is-medium shadow-depth-1">
          SVS Edition IV
        </span>
      </header>

      <div
        v-for="milestone in $store.state.svsMainEventInformations.milestones"
        v-bind:key="milestone.name"
        class="timeline-item"
      >
        <div class="timeline-marker is-icon">
          <i class="fas fa-bullseye"></i>
        </div>
        <div class="timeline-content">
          <!-- <h2 class="supheading">{{ milestone.date | date('dd MONTH yyyy') }} </h2> -->
          <h1 class="heading">{{ milestone.name }}</h1>
          <h2 class="subheading">{{ milestone.date | date('dd MONTH yyyy') }} </h2>
          <p>{{milestone.description}}</p>
        </div>
      </div>

      <div class="timeline-header">
        <span class="tag is-medium">End</span>
      </div>
    </div>
    <blockquote>
      All dates are displayed with UTC time.<br>
      Start dates start from midnight of this day<br>
      End dates ends at mignight of this day
    </blockquote>
    <!-- <h2>List of participants</h2>
    <ul>
      <li>
        <router-link to="/server/server-id">
          A server
        </router-link>
      </li>
    </ul> -->
  </div>
</template>
