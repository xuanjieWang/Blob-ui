<template>
  <div class="body">
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script setup>
import Header from './views/Header/index.vue'
import Footer from './views/Footer/index.vue'
</script>
<style lang="scss">
.body {
  width: 100vw;
  min-height: 100vh;
  max-height: 100%;
  font-size: 16px;
  position: relative;
  overflow: auto;
  // background-image: url('./assets/img/bj.png');
  background-color: #ffff;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top center;
  color: #000;
}
</style>
