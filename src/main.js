import Vue from 'vue';

import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import annotations from 'highcharts/modules/annotations';

import router from './router';
import App from './App.vue';

annotations(Highcharts);
Vue.use(HighchartsVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
