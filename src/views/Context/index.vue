<!--页面-->
<template>
  <div>
    <div class="home">
      <video class="video-slide active" src="../../assets/home.mp4" autoplay muted loop></video>
      <video class="video-slide" src="../../assets/home2.mp4" autoplay muted loop></video>

      <div class="content active">
        <p>王玄杰1111111111111111111111111111</p>

        <h1>Wonderful.<br /><span>IsLand</span></h1>
        <p>
          If our time is usefully employed, it will either turn out some useful and important piece of work which will fetch its price in the market, or it will add to our experience and increase our
          capacities so as to enable us to earn money when the proper opportunity comes. Let those, who think nothing of wasting time, remember this.
        </p>
        <a href="#"> Read More</a>
      </div>

      <div class="content">
        <h1>美丽大海<br /><span>最美丽的大海</span></h1>
        <p>
          If our time is usefully employed, it will either turn out some useful and important piece of work which will fetch its price in the market, or it will add to our experience and increase our
          capacities so as to enable us to earn money when the proper opportunity comes. Let those, who think nothing of wasting time, remember this.
        </p>
        <a href="#"> Read More</a>
      </div>

      <div class="slider-navigation">
        <div class="nav-btn active"></div>
        <div class="nav-btn"></div>
      </div>
    </div>
    <div>
      <div class="mediaPage"></div>
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
  const contents = document.querySelectorAll('.content')

  var sliderNav = function (manual) {
    btns.forEach((btn) => {
      btn.classList.remove('active')
    })

    slides.forEach((slide) => {
      slide.classList.remove('active')
    })

    contents.forEach((content) => {
      content.classList.remove('active')
    })

    btns[manual].classList.add('active')
    slides[manual].classList.add('active')
    contents[manual].classList.add('active')
  }

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      sliderNav(i)
    })
  })
  videoChangeTimer.value = setInterval(function () {
    count.value++
    if (count.value >= slides.length) {
      count.value = 0
    }
    console.log(slides.length, '111', count.value)
    sliderNav(count.value)
  }, 5000)
})

onUnmounted(() => {
  clearInterval(videoChangeTimer.value)
})
</script>

<style scoped src="./index.scss"></style>
