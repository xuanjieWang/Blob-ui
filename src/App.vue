<template>
  <div class="body">
    <div class="star"></div>
    <div class="medium-star"></div>
    <div class="big-star"></div>
    <Header />
    <router-view :key="$route.path" />
    <Footer />
  </div>
</template>

<script setup>
import Header from './views/Header/index.vue'
import Footer from './views/Footer/index.vue'
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1b2745 0%, #090a0f 100%);
  overflow: hidden;
}
// 定义星空大小
$sky-size: 2000;

@function generate-star($num) {
  $value: '#{random($sky-size)}px #{random($sky-size)}px #fff';

  @for $i from 2 through $num {
    $value: '#{$value}, #{random($sky-size)}px #{random($sky-size)}px #fff'; //每次循环都加上之前的星星
  }

  @return unquote($string: $value);
}
.star {
  width: 1px;
  height: 1px;
  background-color: transparent;
  box-shadow: generate-star(700); //生成700个星星
  animation: animate 80s linear infinite;
}
.medium-star {
  width: 2px;
  height: 2px;
  background-color: transparent;
  box-shadow: generate-star(400); //生成700个星星
  animation: animate 120s linear infinite;
}
.big-star {
  width: 3px;
  height: 3px;
  background-color: transparent;
  box-shadow: generate-star(100); //生成700个星星
  animation: animate 150s linear infinite;
}

@keyframes animate {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(unquote('-#($sky-size)px'));
  }
}
</style>
