<template>
  <div class="channel">
    <div class="banner">
      <img :src="channel.images.bannerMobileImageUrl" :alt="`${channel.title}'s banner'`">
    </div>
    <div class="data">
      <div class="thumb">
        <img :src="channel.thumbnails.medium.url" :alt="channel.title">
      </div>
      <div class="count">
        <span> {{ channel.statistics.subscriberCount }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  props: {
    channel: Object,
  },
}
</script>

<style scoped>
.channel {
  overflow: hidden;
  padding: 2em;
  background: #FFE;
  border: 5px solid white;
  box-sizing: border-box;
  /* border: 1px solid gray; */
}

.thumb {
  width: 100%;
  margin-top: -5em;
  text-align: center;
}


.thumb img {
  border-radius: 70% 70%;
  background: #555;
}


.count {
  width: 100%;
  text-align: center;
}

.count span {
  font-weight: 700;
  font-family: 'Courier New', Courier, monospace;
  font-size: 5em;
}

@media (max-width: 1080px) {
  .channel {
    padding: 1em;
  }

  .banner {
    display: none;
  }

  .data {
    display: flex;
    justify-content: center;
    align-items:  center;
  }

  .thumb {
    text-align: center;
    margin: auto;
  }

  .thumb img {
    width: 100%;
    float: left;
    max-width: 5em;
    border: 1px solid red;
  }

  .count span {
    font-size: 2.5em;
  }
}


</style>
