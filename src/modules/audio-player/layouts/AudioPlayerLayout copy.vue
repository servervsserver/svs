<template>
  <div>
    <slot name="audioBar" />
    <slot name="coverArt" />
    <slot name="metadatas" />
    <slot name="time">
      <slot>
        <slot name="coreControls" />
        <slot name="volume" />
      </slot>
    </slot>
  </div>
</template>

<script>
export default {
  
}
</script>