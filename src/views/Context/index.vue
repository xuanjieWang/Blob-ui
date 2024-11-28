<!--页面-->
<template>
  <!-- 主体内容 -->
  <div class="home flex flex-col justify-center items-center">
    <div style="height: 100vh">
      <video class="video-slide active" src="../../assets/home.mp4" autoplay muted loop></video>
      <video class="video-slide" src="../../assets/home2.mp4" autoplay muted loop></video>
      <div class="slider-navigation">
        <div class="nav-btn active"></div>
        <div class="nav-btn"></div>
      </div>
    </div>

    <div class="pages flex flex-col items-center">
      <div class="mediaPage flex flex-col p-5 items-center">
        <div class="flex gap-5">
          <img src="@/assets/img/icon.jpg" alt="Rotating Image" class="icon mr-5" />
          <div class="flex flex-col justify-center gap-2">
            <span style="font-size: 30px; word-break: break-all">王&nbsp;玄&nbsp;杰</span>
            <span>&nbsp;</span>
            <div class="flex soial-icon">
              <!-- <a-tooltip placement="bottom" color="#000">
                <template #title>QQ 频道</template>
                <img src="@/assets/icon/qq.png" @click="goLink('qq')" />
              </a-tooltip> -->
              <a-tooltip placement="bottom" color="#000">
                <template #title>BiliBili 主页</template>
                <img src="@/assets/icon/bilibili.png" @click="goLink('bilibili')" />
              </a-tooltip>
              <a-tooltip placement="bottom" color="#000">
                <template #title>Google 邮箱</template>
                <img src="@/assets/icon/gmail.png" @click="goLink('gmail')" />
              </a-tooltip>
              <a-tooltip placement="bottom" color="#000">
                <template #title>Gitee 主页</template>
                <img src="@/assets/icon/gitee.png" @click="goLink('gitee')" />
              </a-tooltip>
              <a-tooltip placement="bottom" color="#000">
                <template #title>Github 主页</template>
                <img src="@/assets/icon/github.png" @click="goLink('github')" />
              </a-tooltip>
            </div>
          </div>
          <Weather />
        </div>
        <TextLoading :data="randomQuote" />
        <UpDownLoading>
          <Article />
        </UpDownLoading>
        <UpDownLoading>
          <Life />
        </UpDownLoading>
        <!-- <div>
          <About />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import quotesList from './quotes.js'
import Article from './article/index.vue'
import Life from './life/index.vue'
import About from './about/index.vue'
import settingStore from '@/stores/setting.js'
import Weather from '../Header/weather'

const { proxy } = getCurrentInstance()

const setting = settingStore()

const count = ref(0)
const videoChangeTimer = ref(null)
const randomQuote = ref('')
onMounted(() => {
  window.addEventListener('mousewheel', WheelGo)

  setting.setHeaderShow(true)
  loadVideo()
  loadQuote()
})
function WheelGo(e) {
  const scrollHeight = window.pageYOffset
  if (scrollHeight > 0 && scrollHeight < window.innerHeight - 100 && e.deltaY > 0) {
    smoothScrollTo(window.innerHeight - 60, 500) // 1.5秒内滚动到距离顶部
  }
}
function smoothScrollTo(targetY, duration) {
  const start = window.pageYOffset
  const end = targetY
  const distance = end - start
  let startTime = null

  // 缓动函数
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t + b
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const timeElapsed = timestamp - startTime
    const run = easeInOutCubic(timeElapsed, start, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

const goLink = (data) => {
  if ('qq' == data) {
    window.open('https://tool.gljlw.com/qq/?qq=2071985621', '_blank')
  } else if ('github' == data) {
    window.open('https://github.com/xuanjieWang', '_blank')
  } else if ('gitee' == data) {
    window.open('https://gitee.com/xuanjie123', '_blank')
  } else if ('gmail' == data) {
    window.open('https://wxjxj572@gmail.com', '_blank')
  } else if ('bilibili' == data) {
    window.open('https://space.bilibili.com/356639112?spm_id_from=333.1007.0.0', '_blank')
  }
}

onUnmounted(() => {
  clearInterval(videoChangeTimer.value)
  window.removeEventListener('mousewheel', WheelGo)
})

const loadVideo = () => {
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
}

const loadQuote = () => {
  randomQuote.value = quotesList[Math.floor(Math.random() * quotesList.length)]
}
</script>

<style scoped src="./index.scss"></style>
