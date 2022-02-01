<template>
  <div>
    <h1>
      SVS Main event
    </h1>

    <ul>
      <li>
        <router-link to="/main-event/code-of-conduct">
          Code of conduct
        </router-link>
      </li>
      <li>
        <router-link to="/main-event/rules">
          Rules
        </router-link>
      </li>
      <li>
        <router-link to="/main-event/server-application">
          Server application
        </router-link>
      </li>
    </ul>

    <h2>List of participants</h2>
    <ul>
      <li>
        <router-link to="/server/server-id">
          A server
        </router-link>
      </li>
      <li>
        <router-link to="/server/server-id">
          A server
        </router-link>
      </li>
      <li>
        <router-link to="/server/server-id">
          A server
        </router-link>
      </li>
      <li>
        <router-link to="/server/server-id">
          A server
        </router-link>
      </li>
    </ul>

    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
