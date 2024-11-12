<!--文字加载动画-->
<template>
  <div class="textLoadingBox" id="textLoadingBox"></div>
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
    document.getElementById('textLoadingBox').innerHTML = line
    animate()
  }
)

const animate = () => {
  gsap.timeline().fromTo(
    '.textLoadingBox span',
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
    '-=0'
  )
}
</script>
<style lang="scss" scoped>
.textLoadingBox {
  margin-top: 20px;
  padding: 10px 10px 0px 0px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
}
.textLoadingBox span {
  opacity: 0;
}
</style>
