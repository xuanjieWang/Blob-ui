<!--页面-->
<template>
  <div>
    <div class="home">
      <video class="video-slide active" src="../../assets/home.mp4" autoplay muted loop></video>
      <video class="video-slide" src="../../assets/home2.mp4" autoplay muted loop></video>
      <div class="article">
        <p>你好, 我是</p>
        <p>王玄杰</p>
        <p>一名全栈开发工程师</p>
        <p>
          喜欢<span class="java">Java</span>、<span class="Python">Python</span>、<span class="Go">Go</span><span>&nbsp;和&nbsp;</span><span class="Vue">Vue</span>、<span class="React">React</span>
        </p>
        <p>我在这个网站记录我的成长，努力 💪 成为一个更好的程序员</p>
      </div>

      <div class="slider-navigation">
        <div class="nav-btn active"></div>
        <div class="nav-btn"></div>
      </div>
    </div>
    <div>
      <div class="mediaPage flex flex-col">
        <img src="@/assets/img/icon.jpg" alt="Rotating Image" class="icon" />
        <div>头像</div>
        <div>文章</div>
        <div>生活</div>
        <div>链接</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const count = ref(0)
const videoChangeTimer = ref(null)
onMounted(() => {
  const btns = document.querySelectorAll('.nav-btn')
  const slides = document.querySelectorAll('.video-slide')

  var sliderNav = function (manual) {
    btns.forEach((btn) => {
      btn.classList.remove('active')
    })

    slides.forEach((slide) => {
      slide.classList.remove('active')
    })

    btns[manual].classList.add('active')
    slides[manual].classList.add('active')
  }

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      sliderNav(i)
    })
  })
  videoChangeTimer.value = setInterval(function () {
    count.value++
    if (count.value >= slides.length) count.value = 0
    sliderNav(count.value)
  }, 3500)
})

onUnmounted(() => {
  clearInterval(videoChangeTimer.value)
})
</script>

<style scoped src="./index.scss"></style>
