<!--页面-->
<template>
  <div class="headerStyle flex justify-between items-center">
    <Top />
    <User />
  </div>
</template>

<script setup>
import Top from './top/index.vue'
import User from './user/index.vue'
</script>
<style scoped>
.headerStyle {
  height: 65px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  background: transparent;
  backdrop-filter: blur(5px); /* 应用模糊效果，值越大越模糊 */
  transition: background-color 0.3s;
  z-index: 0;
}
.headerStyle:hover {
  background: linear-gradient(to right, #ffcccc, rgba(135, 206, 235, 0.5));
  transition: opacity 5s;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
