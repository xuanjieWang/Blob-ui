<!--页面-->
<template>
  <div id="headerStyle" class="headerStyle">
    <div class="flex justify-items-center">
      <div class="name" @click="go('/index')">王玄杰</div>
      <div class="items flex items-center justify-around">
        <TextButton text="博客" @click="go('/blog')"></TextButton>
        <TextButton text="留言板"></TextButton>
        <TextButton text="关于我"></TextButton>
      </div>
    </div>
    <!-- <div class="nav">
      <div class="item" v-for="item in list" :key="item">{{ item }}</div>
    </div> -->
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted } from 'vue'
const { proxy } = getCurrentInstance()

const list = ['前端', '后端', '运维', '生活']
onMounted(() => {
  nextTick(() => {
    console.log(111)
    window.addEventListener('scroll', function () {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop < 2) {
        document.getElementById('headerStyle').style.backgroundColor = 'transparent'
      } else {
        document.getElementById('headerStyle').style.backgroundColor = 'white'
      }
    })
  })
})

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style scoped src="./index.scss"></style>
