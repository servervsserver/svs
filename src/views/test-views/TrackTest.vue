<template>
  <div>
    <h1>Track test</h1>
    <ep-upload-form :ep="ep" />
  </div>
</template>

<script>

import {
  EpUploadFormComponent,
  Track,
  CreditEntry,
  Ep
} from "@/components/forms/ep-upload"

export default {
  components: {
    'ep-upload-form': EpUploadFormComponent
  },
  data: function () {
    return {
      ep: new Ep()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
