<template>
  <div class="archive">
    <h1> SVS Archive: </h1>
    <h2> Past EPs: </h2>
    <Draw
      v-for="(x,index) in PastEPs"
      :key="x"
      :title="index"
    />
  </div>
</template>

<script>
import Draw from '../components/ArchiveDraw.vue'

export default {
    components : {
        Draw
    },
    data () {
        return (
            {
                PastEPs : {
                    SVS1 : [],
                    SVS2 : [],
                    SVS4 : []
                }
            }
        )
    }
}

</script>


<style scoped lang='scss'>

.archive {
    width: 100%;
    text-align: center;
}

h1 {
    margin-top: 0;
}

h2 {
    margin-top: 0;
}

</style>