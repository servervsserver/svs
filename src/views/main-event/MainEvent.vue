<template>
  <div class="container is-fluid">
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang='scss'>
@media (max-width: 768px) {
  .container {
    padding-left:10px !important; 
    padding-right:10px !important; 
  }
}
</style>
