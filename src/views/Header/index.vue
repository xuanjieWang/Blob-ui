<!--页面-->
<template>
  <div class="headerStyle">
    <div class="top flex items-center">
      <div class="name" @click="go('/index')">王玄杰</div>
      <TextButton text="博客" @click="go('/blog')"></TextButton>
      <TextButton text="留言板"></TextButton>
      <TextButton text="关于我"></TextButton>
    </div>
    <div class="nav">
      <div class="item" v-for="item in list" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const list = ['前端', '后端', '运维', '生活']

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style scoped src="./index.scss"></style>
