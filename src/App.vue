<template>
  <div class="body flex flex-col">
    <!-- <div style="height: 100vh;"> -->
    <Header />
    <!-- </div> -->
    <router-view :key="$route.path" />
    <!-- <Content /> -->
    <!-- <RightSlider /> -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './views/Header/index.vue'
// import LeftSlider from './views/LeftSlider/index.vue'
// import RightSlider from './views/RightSlider/index.vue'
// import Content from './views/Context/index.vue'
import Footer from './views/Footer/index.vue'
</script>
<style lang="scss">
.body {
  // background-image: url('./assets/img/bg.jpg');
  // background-size: 100% 100%;
  // background-size: cover; /* 可选，根据需要设置背景大小 */
  // background-position: center; /* 可选，根据需要设置背景位置 */
  z-index: 10000;
  background: black;
}
</style>
