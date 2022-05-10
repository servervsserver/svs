<template>
  <li class="track-list-item shadow-depth-1">
    <div class="track-number">
      {{ index + 1 }}
    </div>
    <div class="track-title">
      <router-link :to="trackRoute(track)">
        {{ track.title }}
      </router-link>
    </div>
    <!-- <div class="track-genres">
      <div class="tags">
        <span
          v-for="(genre, gidx) in track.genres" 
          :key="index + '-' + gidx + '-' + genre" 
          class="tag is-small"
        >
          {{ genre }}
        </span>
      </div>
    </div> -->
    <div class="additional-buttons">
      <div class="buttons">
        <slot :track="track" />
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
      required: true
    },
    track: {
      type: Track,
      required: true
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
}
</style>