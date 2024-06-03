<!--页面-->
<template>
  <div id="headerStyle" class="headerStyle" v-show="show">
    <div class="flex justify-items-center">
      <div class="name" @click="go('/index')">王玄杰</div>
      <div class="items flex items-center justify-around">
        <TextButton text="博客" @click="go('/blog')"></TextButton>
        <TextButton text="添加博客" @click="go('/addBlog')"></TextButton>
        <TextButton text="留言"></TextButton>
        <TextButton text="关于" @click="go('/aboutMe')"></TextButton>
      </div>
    </div>
    <!-- <div class="nav">
      <div class="item" v-for="item in list" :key="item">{{ item }}</div>
    </div> -->
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
const { proxy } = getCurrentInstance()

const list = ['前端', '后端', '运维', '生活']

const show = ref(true)
onMounted(() => {
  nextTick(() => {
    // window.addEventListener('scroll', function () {
    //   const scrollTop = document.documentElement.scrollTop
    //   if (scrollTop < 500) {
    //     document.getElementById('headerStyle').style.backgroundColor = '#181818'
    //     document.getElementById('headerStyle').style.color = '#fff'
    //     show.value = true
    //   } else if (scrollTop < 1500) {
    //     document.getElementById('headerStyle').style.backgroundColor = '#181818'
    //     document.getElementById('headerStyle').style.color = '#000'
    //     show.value = true
    //   } else {
    //     show.value = false
    //   }
    // })
  })
})

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style scoped src="./index.scss"></style>
