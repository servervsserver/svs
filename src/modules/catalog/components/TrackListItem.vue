<template>
  <li 
    class="track-list-item shadow-depth-1"
    :class="{ 'is-mock': isMock }"  
  >
    <div class="track-number">
      <span v-if="!isMock">{{ index + 1 }}</span>
    </div>
    <div class="track-title">
      <router-link 
        v-if="!isMock" 
        :to="trackRoute(track)"
      >
        {{ track.title }}
      </router-link>
      <span class="is-loading" />
    </div>
    <div class="additional-buttons">
      <div class="buttons">
        <slot
          v-if="!isMock"
          name="trackButtons"
          :track="track"
        />
        <button 
          v-if="isMock" 
          class="button is-loading svs-button-transparent"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { Track } from '../models'
import { RouterHelperMixin } from "../mixins"

export default {
  mixins: [
    RouterHelperMixin
  ], 
  props: {
    index: {
      type: Number,
      required: false,
      default: undefined
    },
    track: {
      type: Track,
      required: false,
      default: null
    }
  },
  computed: {
    isMock() {
      return !this.track || this.index === null || this.index === undefined
    }
  }
}
</script>

<style lang="scss" scoped>
$gap: 1em;
.track-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(58deg, black, #333366, #f5816b80, transparent);
  margin: 4px 0px;
  border-radius: 3px;
  transition: 0.5s opacity;

  & > * {
    padding: #{$gap * 0.5};
    // padding-left: $gap * 0.5;
    // padding-right: $gap * 0.5;
    &:first-child {
      padding-left: $gap;
    }
    &:last-child {
      padding-right: $gap;
    }
  }

  .track-number {
    font-variant-numeric: tabular-nums;
    width: 3em;
    text-align: center;
    flex-grow: 0;
  }
  .track-title {
    flex-grow: 1;
    a { text-decoration: none; }
  }

  &.is-mock {
    opacity: 0.5;
  }
}
</style>