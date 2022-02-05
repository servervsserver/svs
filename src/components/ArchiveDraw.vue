<template>
  <div
    class="draw"
    :class="{ open: isOpen }"
    @click="openclose"
  >
    <h1>
      {{ title }} <i
        v-if="this.$data.isOpen"
        class="far fa-caret-square-up"
      /><i
        v-else
        class="far fa-caret-square-down"
      />
    </h1>
    <div
      class="draw_content"
      onclick="event.stopPropagation();"
    >
      <slot />
    </div>
  </div>
</template>

<script>

export default {
    props: {'title' : {type : String, default : 'Unknown'}},
    data () {
        return {
            isOpen : false
        }
    },
    methods : {
        openclose : function () {
            this.$data.isOpen = !(this.$data.isOpen)
        }
    }
}

</script>


<style scoped lang='scss'>
.draw {
    margin-top: 20px;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none;
    line-height: 120px;
    font-size: 10px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    min-height: 120px;
    transition: 0.5s;
    background-color: inherit;
    border-radius: 20px;
    cursor: pointer;

    .draw_content {
        display: none;
        margin: 0;
    }
}

i {
    display: inline;
    margin-left: 10px;
    position: relative;
}

.open {

    .draw_content {
        display: block;
    }

    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.128);

}

h1 {
    margin: 0;
}

.draw:hover {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.211);
}
</style>