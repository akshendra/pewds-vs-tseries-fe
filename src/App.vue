<template>
  <div id="app">
    <Header />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 640px) {
}

@media (min-width: 641px) {
  #app {
    width: 98vw;
  }
}
</style>
