<template>
  <div>
    <div v-show="this.state === 'loaded'">
      <vue-highcharts :highcharts="hc" :options="chartOptions" ref="lineCharts"></vue-highcharts>
    </div>
    <div class="event-list">
      <div :class="event.class" :key="event.date" v-for="event in events">
        <div class="event-head">
          <span class="date"> {{ new Date(event.date).toDateString() }} </span>
          <code class="effect"> {{ event.effect }} </code>
        </div>
        <div class="event-items">
          <div class="event-item" :key="item.link" v-for="item in event.value">
            <div class="ei-head">
              > <a :href="item.link" target="_blank"> {{ item.title }} </a>
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import history from '@/apis/history.js';
import Highcharts from 'highcharts';
import VueHighcharts from 'vue2-highcharts';
import Annotations from 'highcharts/modules/annotations.js';
Annotations(Highcharts);

function dayBefore(date) {
  const dt = new Date(date);
  return new Date(dt - 24 * 3600 * 1000).toISOString().split('T')[0];
}

function dayAfter(date) {
  const dt = new Date(date);
  return new Date(+dt + 24 * 3600 * 1000).toISOString().split('T')[0];
}

export default {
  name: 'History',

  components: {
    VueHighcharts
  },

  data() {
    return {
      state: 'loading',
      hc: Highcharts,
      subhistory: {
        pewds: null,
        tseries: null,
      },
      chartData: [],
      chartOptions: {
        chart: {
          type: 'area',
          zoomType: 'x',
          panning: true,
          // height: '700px',
          panKey: 'shift',
          scrollablePlotArea: {
            minWidth: 600
          },
        },

        legend: {
          enabled: false
        },

        title: {
          text: 'History of the Revolution',
        },

        subtitle: {
          text: 'Subscribe á PewdiePie',
        },

        xAxis: {
          type: 'datetime',
          title: {
              text: 'Date'
          }
        },

        yAxis: {
          maxPadding: 0.35,
          title: {
              text: null
          },
        },
      },
      events: null,
    };
  },

  methods: {
    base(val) {
      return btoa(val);
    },
  },

  mounted() {
    let lineCharts = this.$refs.lineCharts;
    lineCharts.delegateMethod('showLoading', 'Loading...');
    Promise.all([
      history.events(),
      history.subhistory('pewds', '2018'),
      history.subhistory('tseries', '2018'),
    ]).then(([events, sub_pewds, sub_tseries]) => {
      this.events = events.map(event => {
        const { date } = event
        const after = dayAfter(date);
        const before_diff = sub_pewds[date] - sub_tseries[date];
        const after_diff = sub_pewds[after] - sub_tseries[after];
        return Object.assign({
          before_diff,
          after_diff,
          effect: after_diff - before_diff,
          class: {
            is_good: after_diff >= before_diff,
            is_bad: after_diff < before_diff,
            event: true,
            big: event.bigIfTrue,
          }
        }, event)
      });

      let min = Infinity;
      Object.keys(sub_pewds).forEach((key) => {
        const date = key;
        const diff = sub_pewds[date] - sub_tseries[date];
        if (Number.isNaN(diff) === false && date > '2018-10-01') {
          if (diff < min) {
            min = diff;
          }
          this.chartData.push([+new Date(date), diff]);
        }
      });

      function divide(text) {
        const splits = text.split(/\s+/);
        return splits.reduce((arr, curr, idx) => {
          const index = Math.floor(idx / 3);
          if (!arr[index]) {
            arr[index] = curr;
          } else {
            arr[index] = `${arr[index]} ${curr}`;
          }
          return arr;
        }, []).join('<br/>');
      }

      this.subhistory = {
        pewds: sub_pewds,
        tseries: sub_tseries,
      };
      this.state = 'loaded';
      lineCharts.addSeries({
        data: this.chartData,
        lineColor: Highcharts.getOptions().colors[1],
        color: Highcharts.getOptions().colors[2],
        fillOpacity: 0.5,
        name: 'Diff',
        marker: {
            enabled: false
        },
        threshold: null
      });
      lineCharts.hideLoading();
      let xx = -45;
      this.events.forEach((event, index) => {
        if (event.bigIfTrue === true) {
          xx = -1 * xx;
          lineCharts.delegateMethod('addAnnotation', {
            useHTML: true,
            labelOptions: {
                shape: 'connector',
                align: 'center',
                justify: false,
                style: {
                    fontSize: '1em',
                    textOutline: '1px white'
                },
                crop: false,
                y: (Math.random() * 1.5 * -100) - 20,
                x: xx,
            },
            labels: [{
              point: {
                  xAxis: 0,
                  yAxis: 0,
                  x: +(new Date(event.date)),
                  y: event.before_diff,
              },
              text: divide(event.value.map(e => e.short).join(', ')),
            }],
          });
        }
      });
    });
  },
}
</script>

<style>

.event-list {
  padding: 0;
}

.event {
  padding: 1em;
  margin: 0;
  padding-bottom: 0;
  padding-top: 0;
}

.event .event-head {
  padding: 0.5em;
  background: rgba(240, 240, 240, 0.05);
  border: 1px solid rgba(200, 200, 200, 0.5);
}

.event.is_good .event-head {
  background: rgba(200, 255, 200, 0.4);
  border: 1px solid rgba(200, 255, 200, 1);
}

.event.big .event-head {
  background: rgba(255,223,0, 0.3);
  border: 1px solid rgba(255,223,100, 1);
}

.event-head .date {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
}

.event-head .effect {
  float: right;
  font-size: 2em;
}

.event-items {
  margin-left: 1em;
  padding: 1em;
  padding-bottom: 2em;
  box-sizing: border-box;
  border-left: 1px solid rgba(200, 200, 200, 0.5);
}

.event-item {
  margin: 0.5em 0;
}

.ei-head a {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-shadow: 2px 2px 0px #fff, 2px 4px 0px rgba(0,0,0,0.1);
  font-weight: 500;
  font-size: 1em;
  color: black;
  text-decoration: none;
}

.ei-head a:hover {
  text-shadow: 2px 3px 0px #fff, 4px 2px 0px rgba(0,0,0,0.2);
}

.event-item .desc {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 0.9em;
  margin-left: 1em;
}
</style>


