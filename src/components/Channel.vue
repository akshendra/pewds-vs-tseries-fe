<template>
  <div class="channel">
    <div class="banner">
      <img :src="channel.images.bannerMobileImageUrl" :alt="`${channel.title}'s banner'`">
    </div>
    <div class="thumb">
      <img :src="channel.thumbnails.medium.url" :alt="channel.title">
    </div>
    <div class="count">
      <span> {{ channel.statistics.subscriberCount }} </span>
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
  box-sizing: border-box;
  /* border: 1px solid gray; */
}

.thumb {
  width: 100%;
  text-align: center;
}

.thumb img {
  border-radius: 70% 70%;
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


</style>
