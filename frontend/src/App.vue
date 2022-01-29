<template>
  <div id="app">
    <div id="nav">
      <router-link to='/'>
      <img src="banner.png">
      </router-link>
    </div>
    <div class='router-view'>
    <router-view/>
    </div>
  </div>
</template>

<style lang="scss">

@use 'assets/styles/main';

</style>
