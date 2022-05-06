<template>
  <div class="mock-album-block">
    <div class="album-block-content has-text-centered">
      <squared-image-box class="image-box" />
      <div class="album-infos">
        <div class="album-name" />
        <div class="album-server-name" />
      </div>
    </div>
    <div class="mock-gradient" />
  </div>
</template>

<script>

export default {
}
</script>


<style scoped lang='scss'>
.mock-album-block {

  --gradient-direction: 0deg;
  padding-top: 10px;

  // animation:infinite 2s example; 
  position: relative;
  max-width: 230px;

  .mock-gradient {
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;

    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(var(--gradient-direction), #fff2, transparent);
      animation: infinite 2s example linear;
      transform-origin: center;
    }
  }
  // .cover-art {
  //   border-radius: 3px;
  //   background: #333366;
  //   box-shadow: 1px 2px 5px 0px #0004;
  //   width: 100%;
  // }
  .album-block-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .image-box {
    width: 200px;
  }
  .album-infos {
    font-family: 'Jost';
    padding: 5px;
    width: 100%;
    max-width: 200px;

    & > * { margin: 5px; }
    .album-name {
      &::before {content: "_"; color: transparent;}
      font-weight: 500;
      background: #aaa6;
      width: 80%;
      border-radius: 4px;
    }
    .album-server-name {
      font-size: 0.8em;
      &::before {content: "_"; color: transparent;}
      background: #aaa6;
      width: 60%;
      border-radius: 4px;
    }
  }

  @media (max-width:768px) {
    .image-box {
      width: calc((100vw - 20px - 1em) / 3);
    }

    .album-infos {
      font-size: 0.8rem;
    }
  }

  @keyframes example {
    0%   { transform: rotate(0deg) }
    25%  { transform: rotate(120deg)}
    50%  { transform: rotate(240deg)}
    100% { transform: rotate(360deg)}
  }
}
</style>