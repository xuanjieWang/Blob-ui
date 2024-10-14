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
      <!-- 
      <div class="content active">
        <h1>美丽大海<br /><span>最美丽的大海</span></h1>
        <p>
          If our time is usefully employed, it will either turn out some useful and important piece of work which will fetch its price in the market, or it will add to our experience and increase our
          capacities so as to enable us to earn money when the proper opportunity comes. Let those, who think nothing of wasting time, remember this.
        </p>
        <a href="#">欢迎来到我的博客</a>
      </div>

      <div class="content">
        <h1>美丽大海<br /><span>最美丽的大海</span></h1>
        <p>
          如果我们的时间得到有效利用，它要么会产出一些有用和重要的工作，在市场上获得价格，要么会增加我们的经验，提高我们的能力，
          以便在适当的机会到来时让我们赚钱。让那些毫不在意浪费时间的人记住这一点。
        </p>
        <a href="#">欢迎来到我的博客</a>
      </div> -->

      <div class="slider-navigation">
        <div class="nav-btn active"></div>
        <div class="nav-btn"></div>
      </div>
    </div>
    <div>
      <div class="mediaPage">
        <span>下面是博客首页</span>
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
    if (count.value >= slides.length) count.value = 0
    sliderNav(count.value)
  }, 3500)
})

onUnmounted(() => {
  clearInterval(videoChangeTimer.value)
})
</script>

<style scoped src="./index.scss"></style>
