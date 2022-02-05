<template>
  <div class="container">
    <h1>Color palette</h1>

    <div
      v-for="p in palettes"
      :key="p.klass"
      :class="[p.klass]"
      class="palette"
    >
      <h2>{{ p.klass }}</h2>
      <div class="columns">
        <div class="column">
          <h3>Primary</h3>
          <div class="flat-color-block primary shadow-depth-1" />
        </div>
        <div class="column">
          <h3>Secondary</h3>
          <div class="flat-color-block secondary shadow-depth-1" />
        </div>
        <div class="column">
          <h3>Tertiary</h3>
          <div class="flat-color-block tertiary shadow-depth-1" />
        </div>
        <div class="column">
          <h3>Back</h3>
          <div class="flat-color-block back shadow-depth-1" />
        </div>
        <div class="column">
          <h3>Alternative</h3>
          <div class="flat-color-block alternative shadow-depth-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      palettes: [
        { klass: "dark-palette" },
        { klass: "light-palette" }
      ]
    }
  }
}
</script>

<style scoped lang='scss'>

@use "sass:map";
/* @use '../../assets/styles/color-palette'; */

$dark-palette: (
  "primary": #FFFADE,
  "secondary": #FFBA5E,
  "tertiary": #F5816B,
  "back": #333366,
  "alternative": #FFFFFF
);

$light-palette: (
  "primary": #333366,
  "secondary": #FFBA5E,
  "tertiary": #FFFFFF,
  "back": #FFFADE,
  "alternative": #F5816B
);


@mixin palette-view ($color-palette) {
  .flat-color-block {
    border-radius: 10px;
    width: 100%;
    height: 100px;

    &.primary {
      background-color: map.get($color-palette,"primary");
    }
    &.secondary {
      background-color: map.get($color-palette,"secondary");
    }
    &.tertiary {
      background-color: map.get($color-palette,"tertiary");
    }
    &.back {
      background-color: map.get($color-palette,"back");
    }
    &.alternative {
      background-color: map.get($color-palette,"alternative");
    }
  }
}

.dark-palette {
  @include palette-view($dark-palette);
}

.light-palette {
  @include palette-view($light-palette);
}


</style>
