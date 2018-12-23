<template>
  <div class="main">
    <div v-if="state === 'loading'">
      ...... ..... ..... ..... loading .... .... .... ....
    </div>
    <div v-else>
      <div class="header">
        PewDiePie v/s T-Series
      </div>
      <div class="diff">
        <div v-if="diff >= 0">
          <div class="diff-good">
            <div class="left">
              Pewds is ahead by
            </div>
            <div class="num"> {{ diff }} </div>
            <div class="right">
              subscriber from T-Series
            </div>
          </div>
        </div>
        <div v-else>
          T-Series has won, we are all DOOMED.
        </div>
      </div>
      <div class="channels">
        <Channel :channel="pewds" />
        <Channel :channel="tseries" />
      </div>
      <div class="footer">
        <a target="_blank" href="https://www.youtube.com/user/PewDiePie?sub_confirmation=1">
          Do your part.
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import Channel from './Channel';

export default {
  name: 'Main',
  components: {
    Channel,
  },
  data() {
    return {
      id: null,
      state: 'loading',
      time: Date.now(),
      pewds: {},
      diff: 0,
      tseries: {},
    };
  },

  methods: {
    load() {
      fetch('https://6h15ggne4h.execute-api.us-east-1.amazonaws.com/prod', {
      // mode: 'no-cors',
    })
      .then(res => res.json())
      .then(response => {
        this.state = 'loaded';
        const sorted = response.channels.sort((left, right) => {
          return (new Date(right.publishedAt) - new Date(left.publishedAt));
        });
        this.pewds = sorted[0]
        this.tseries = sorted[1]
        this.diff = this.pewds.statistics.subscriberCount - this.tseries.statistics.subscriberCount;
        this.time = new Date(response.at);
      })
      .catch(ex => {
        this.state = 'error';
        console.error(ex);
      });
    },
  },

  mounted() {
    this.load();
    this.id = setInterval(() => {
      this.load();
    }, 2000);
  },

  beforeDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  },
};
</script>

<style scoped>
.channels {
  display: flex;
  justify-content: center;
}

.diff {
  font-size: 2em;
}

.diff-good {
  display: flex;
  justify-content: center;
  align-items:  center;
}

.diff-good div {
  padding: 0.2em;
}

.diff-good .num {
  font-size: 2em;
  font-weight: 900;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}

.header {
  text-align: center;
  font-weight: 500;
  vertical-align: middle;
  font-size: 2em;
  background: black;
  padding: 0.5em;
  color: white;
}

</style>

