<!--页面加载动画，上下滚动-->
<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  animate()
})

const animate = () => {
  const t1 = gsap.timeline()

  t1.to('.box', {
    y: 20,
    opacity: 0, // 改变透明度
    duration: 0.05 // 动画持续时间
  })

  t1.to('.box', {
    y: 0,
    opacity: 1, // 恢复透明度
    duration: 0.75 // 动画持续时间
  })
}
</script>
<style lang="scss" scoped></style>
