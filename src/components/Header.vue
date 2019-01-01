<template>
  <div class="header">
    <span class="name"> PewDiePie v/s T-Series </span>
    <span class="nav">
      <router-link to="/"> Home </router-link>
      <router-link to="/history"> History </router-link>
    </span>
  </div>
</template>


<style scoped>
.header {
  font-weight: 500;
  vertical-align: middle;
  background: black;
  padding: 0.5em;
  color: white;
}

.header .name {
  font-weight: 700;
}

.header .nav {
  float: right;
}

.nav a {
  color: white;
  margin-right: 1em;
}
</style>
