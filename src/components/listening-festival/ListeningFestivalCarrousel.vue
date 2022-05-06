<template>
  <div 
    class="listening-festival-carroussel"
    :style="{ background: activeDayColors.backgroundColor}"
  >
    <div 
      class="circle"
      :style="{ '--circle-color': activeDayColors.circleColor }"
    >
      <div 
        class="servers-list"
        :style="{ color: activeDayColors.serversColor }"
      >
        <div
          v-for="s in activeDay.servers" 
          :key="s" 
          class="server-name"
        >
          {{ s }}
        </div>
      </div>
    </div>

    <div
      class="lfc-title"
      :style="{ color: activeDayColors.titleColor }"
    >
      <h2>SVS FESTIVAL DAY {{ activeDayIdx + 1 }}</h2>
      <span>on <a href="https://www.twitch.tv/servervsserver">twitch.tv/servervsserver</a></span>
    </div>

    <div 
      class="date"
      :style="{ color: activeDayColors.dateColor }"
    >
      <span>{{ activeDay3LDay }}</span>
      <span>{{ activeDayDate }} May</span>
      <span>{{ activeDayHour }} utc</span>
    </div>

    <div
      class="thumbs"
      :style="{ '--thumb-color': activeDayColors.titleColor }"
    >
      <div 
        v-for="(d, idx) in days" 
        :key="idx"
        class="thumb clickable" 
        :class="{ 'is-active': activeDayIdx == idx }" 
        @click="toDayIdx(idx)"
      />
    </div>
  </div>
</template>

<script>
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// const MONTHS = ['January', 'February', 'March', 'April']
export class Day {
  constructor(
    servers,
    date
  ) {

    this.servers = servers
    this.date = date
  }
}

export class ColorSet {
  constructor(
    titleColor,
    serversColor,
    dateColor,
    circleColor,
    backgroundColor
  ) {
    this.titleColor = titleColor
    this.serversColor = serversColor
    this.dateColor = dateColor
    this.circleColor = circleColor
    this.backgroundColor = backgroundColor
  } 
}

let colorsets = [
  new ColorSet(
    "#FFFADE",
    "#333366",
    "#FFFADE",
    "#F5816B",
    "#333366"
  ),
    new ColorSet(
    "#FFFADE",
    "#F5816B",
    "#333366",
    "#FFFADE",
    "#FFBA5E"
  )
]

let days = [
  new Day(
    ["Anomalie's New Space", "SABI", "Claws", "20XX", "Hugo Moroux's Community", "Memblem"],
    new Date(Date.UTC(2022,4,6,21))
  ),
  new Day(
    ["unfa", "Untitled Virtual Ensemble", "The Hideaway", "Homecourt", "lilbadsnacks' server", "KILOBASE"],
    new Date(Date.UTC(2022,4,7,21))
  ),
  new Day(
    ["WSAP", "J-Fusion", "Xenharmonic Alliance", "Renaissance", "KBD: Continuum"],
    new Date(Date.UTC(2022,4,8,19))
  ),
    new Day(
    ["The Modulated Realm", "Somber", "Producer Hub", "imagiro's house", "Parable Collective"],
    new Date(Date.UTC(2022,4,13,21))
  )
]

export default {
  data() {
    return {
      days: days,
      colorSets: colorsets,
      previousDayIdx: 0, 
      activeDayIdx: 1
    }
  },
  computed: {
    previousDay() {
      return this.days[this.apreviousDayIdx]
    },
    activeDay() {
      return this.days[this.activeDayIdx]
    },
    previousDayColors() {
      return this.colorSets[this.previousDayIdx % this.colorSets.length]
    },
    activeDayColors() {
      return this.colorSets[this.activeDayIdx % this.colorSets.length]
    },
    activeDay3LDay() {
      return DAYS[this.activeDay.date.getUTCDay()].substring(0,3)
    },
    activeDayDate() {
      let d = this.activeDay.date.getUTCDate()
      if (d == 1) return "1st"
      if (d == 2) return "2nd"
      if (d == 3) return "3rd"
      return d + "th"
    },
    activeDayHour() {
      let h = this.activeDay.date.getUTCHours()
      if (h > 12) return (h - 12) + " PM"
      return h + " AM"
    }
  },
  mounted() {
    setInterval(
      () => {
        this.toNextDay()
      },
      4000
    )
  },
  methods: {
    toNextDay() {
      let newIdx = (this.activeDayIdx + 1) % this.days.length
      this.previousDayIdx = this.activeDayIdx
      this.activeDayIdx = newIdx
    },
    toDayIdx(idx) {
      this.previousDayIdx = this.activeDayIdx
      this.activeDayIdx = idx
    }
  }
}
</script>

<style lang="scss" scoped>
$duration: 1s;
$height: 80vh;
.listening-festival-carroussel {
  height: $height;
  width: 100%;
  position: relative;
  overflow: hidden;
  --circle-radius: #{$height * 0.35};

  .lfc-title {
    text-align: right;
    h2 {
      letter-spacing: 0.3em;
      padding: #{$height * 0.02};
      font-size: 2em;
      margin: 0px;
    }
    span {
      padding: #{$height * 0.02};
      a {
        text-decoration: none;
      }
    }
  }

  .circle {
    --circle-color: red;
    position: absolute;
    width: 0px;
    height: 0px;
    left: calc(100% - #{$height * 0.25});
    top: #{$height * 0.75};

    &::before {
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      left: 0%;
      top: 0%;
      border: solid var(--circle-radius);
      margin: calc(0px - var(--circle-radius));
      border-color: var(--circle-color);
      border-radius: 50%;
      transition: background $duration, color $duration, border-color $duration !important;
    }
  }

  .servers-list {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    overflow: visible;
    text-align: right;
    // transition: alig
    min-width: calc(var(--circle-radius) * 1.2);
    transform: translate(-50%, -50%);

    .server-name {
      font-family: "Jost", 'Montserrat';
      font-weight: 700;
      font-size: calc(var(--circle-radius) * 0.1);
      white-space: nowrap;
    }
  }

  .date {
    &, * {
      font-family: "Jost", 'Montserrat';
      font-weight: 700;
      text-transform: uppercase;
    }

    position: absolute;
    top: #{$height * 0.15};
    left: #{$height * 0.05};
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    height: calc(#{$height} - var(--circle-radius) * 1.75);
    font-size: calc((#{$height} - var(--circle-radius) * 1.75) * 0.18);
  }

  .thumbs {

    --thumb-color: red;
    position: absolute;

    bottom: #{$height * 0.0};
    left: #{$height * 0.0};
    .thumb {
        background: var(--thumb-color);
        width: 0px;
        height: 0px;
        border: solid var(--thumb-color) #{$height * 0.008};
        border-radius: 50%;
        margin: #{$height * 0.03};
        opacity: 0.6;
        &.is-active {
          opacity: 1;
        }
    }
  }

  &, * {
    transition: background $duration, 
      color 0s, 
      border-color $duration !important;
  }
}
</style>