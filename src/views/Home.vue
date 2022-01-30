<template>
  <div class="home">
    <h1>

      Welcome to <span style='color: #FFBA5E'> Server Versus Server</span>

    </h1>
    <p>SVS IV will happen the {{$store.state.nextSvsMainEventTime.toUTCString()}}</p>
    <event-countdown :time="$store.getters.nextSvsMainEventRemainingTime"></event-countdown>
  </div>
</template>

<script>

</script>

<style scoped lang='scss'>

</style>
