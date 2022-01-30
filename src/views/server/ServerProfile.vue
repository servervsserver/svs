<template>
  <div>
    <h2>{{name}}</h2>
    <img v-bind:src="iconUrl" width="100"/>
    <p>{{description}}</p>

    <a target="about:blank" v-bind:href="serverLink">Join the server</a>
    <p>Listen to previous EPs</p>

  </div>
</template>

<script>
export default {
  name: 'ServerProfile',
  data: function () {
    return {
      name: 'Name of the server',
      description: 'Description of the server...',
      iconUrl: '/placeholders/server_placeholder_icon.jpg',
      serverLink: 'https://discord.gg/ddCjRh7Fhr'
    }
  }
}
</script>

<style>
</style>
