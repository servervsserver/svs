<template>
  <div class="theme-switch">
    <input
      id="checkbox"
      v-model="checked"
      type="checkbox"
      class="checkbox"
      @click="themeChange"
    >
    <label
      for="checkbox"
      class="label"
    >
      <i class="fas fa-moon" />
      <i class="fas fa-sun" />
      <div class="ball" />
    </label>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      theme: 'dark-theme',
      checked: true
    }
  },
  methods: {
    themeChange (event) {
      if (this.checked) {
        this.theme = 'dark-theme'
      } else {
        this.theme = 'light-theme'
      }
      this.$emit('themeChanged', this.theme)
    }
  }
}
</script>

<style scoped lang='scss'>

$label-width: 25px;
  $label-height: 13px;

  .checkbox {
    opacity: 0;
    position: absolute;
  }

  .label {
    background-color: #111;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: $label-width;
    position: relative;
    padding: 5px;
    width: $label-width;
    height: $label-height;
    transform: scale(1.5);
    cursor: pointer;
  }

  .ball {
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    height: $label-height - 4px;
    width: $label-height - 4px;
    transition: transform 0.2s linear;
  }

  .checkbox:checked + .label .ball {
    transform: translateX($label-width / 2);
  }

  .label {
    background: #333366;
    font-size: 6px;
  }

  .ball {
    background: #FFFADE;
  }

  .dark-theme {
    .label {
      background: #333366;
      color: #FFFADE;
    }

    .ball {
      background: #FFFADE;
      color: #333366;
    }
  }

  .light-theme {

    .label {
      background: #FFFADE;
    }
    .ball {
      background: #333366;
    }
  }
</style>
