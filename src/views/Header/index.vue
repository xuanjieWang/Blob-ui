<!--页面-->
<template>
  <div class="headerStyle flex items-center">
    <div class="name" @click="go('/index')">王玄杰</div>
    <TextButton text="博客" @click="go('/blog')"></TextButton>
    <TextButton text="留言板"></TextButton>
    <TextButton text="关于我"></TextButton>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style scoped>
.headerStyle {
  height: 50px;
  color: #fff;
  font-size: 16px;
  width: 74%;
  margin-left: 16%;
  margin-right: 10%;
  z-index: 10000;
  position: fixed;
  top: 0;
}

.headerStyle > div {
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.headerStyle div:nth-of-type(1) {
  font-size: 18px;
  font-weight: 700;
}
.headerStyle div:nth-of-type(1):hover {
  text-decoration: underline;
}
.headerStyle div:nth-of-type(2) {
  left: 50%;
}
.headerStyle div:nth-of-type(3) {
  left: 52%;
}
.headerStyle div:nth-of-type(4) {
  left: 54%;
}
.headerStyle div:nth-of-type(5) {
  left: 56%;
}
.headerStyle div:nth-of-type(6) {
  left: 58%;
}
</style>
