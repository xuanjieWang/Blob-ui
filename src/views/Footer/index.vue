<!--页面-->
<template>
  <div class="footerStyle flex">
    <div class="flex route">
      <div class="flex flex-col route">
        <p class="title">导航</p>
        <p @click="go('/index')">首页</p>
        <p @click="go('/blog')">博客</p>
        <p>片段</p>
        <p @click="go('/aboutMe')">关于</p>
      </div>
      <div class="flex flex-col">
        <p class="title">统计</p>
        <p>网站总访问量{{ 100 }}</p>
        <p>网站已经持续运行{{ 1000 }}天</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style lang="scss" scoped>
.footerStyle {
  width: 100%;
  height: 230px;
  color: #fff;
  background: black;
}
p {
  margin-left: 10px;
  font-size: 16px;
  width: 400px;
  color: #8b8888;
}
p:hover {
  color: #fff;
  font-weight: 600;
}

.route {
  margin: 1% 30% 0 15%;
  width: 30%;
}
.title {
  margin-left: -4px;
  text-align: left;
  font-size: 20px;
  color: #fff;
  font-weight: 600;
}
</style>
