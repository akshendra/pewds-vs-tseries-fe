import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import History from './views/History.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/history',
      name: 'History',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: History,
    },
  ],
});
