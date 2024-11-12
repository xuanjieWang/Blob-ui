<!--页面-->
<template>
  <div class="box w-full h-full">
    <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span>

    <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span> <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span
    ><span>e</span> <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span> <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span
    ><span>m</span><span>e</span> <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, getCurrentInstance, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: String
  }
})

onMounted(() => {
  // 将传入的文字添加进来
  animate()
})

const animate = () => {
  gsap.timeline().fromTo(
    '.box span',
    {
      opacity: 0,
      y: 20, // 向上移动的距离
      scale: 0.5 // 缩放比例
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power1.out',
      stagger: 0.1 // 每个字符之间的延迟时间
    },
    '-=0.5'
  )
}
</script>
<style lang="scss" scoped>
.box {
  margin-top: 20px;
  padding: 10px 10px 0px 0px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
}
.box span {
  opacity: 0;
}
</style>
