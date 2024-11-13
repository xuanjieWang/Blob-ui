<!--文字加载动画-->
<template>
  <div class="BlogLoadingBox" id="BlogLoadingBox"></div>
</template>

<script setup>
import gsap from 'gsap'
import { watch, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: String    
  }
})

watch(
  () => props.data,
  () => {
    var line = props.data
      .split('')
      .map(function (char) {
        return `<span>` + char + `</span>`
      })
      .join('')
    document.getElementById('BlogLoadingBox').innerHTML = line
    animate()
  }
)

const animate = () => {
  gsap.timeline().fromTo(
    '.BlogLoadingBox span',
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
    '-=1'
  )
}
</script>
<style lang="scss" scoped>
.BlogLoadingBox {
  margin-top: 20px;
  padding: 10px 10px 0px 0px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  width: 80%;
}
.BlogLoadingBox span {
  opacity: 0;
}
</style>
