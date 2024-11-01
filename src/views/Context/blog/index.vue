<!--页面-->
<template>
  <div class="blog w-full h-full flex justify-center gap-3">
    <div style="margin-top: 100px" class="page h-full flex flex-col items-center">
      <span class="font-bold text-2xl leading-loose">{{ blogData.title }}</span>
      <span class="text-sm text-yellow-600">{{ blogData.createTime }}</span>
      <div v-html="compiledMarkdown"></div>
    </div>

    <!--右侧的跳转栏目-->
    <div v-if="showPaeItem" style="margin-top: 210px" class="flex flex-col" id="mdItem">
      <ul class="fixed">
        <span class="font-bold text-white">目录总览</span>
        <li v-for="(item, index) in list" :key="index" @click="handleClick(index)">
          <div v-if="index % 2 == 0">
            <span class="target cursor-pointer" v-if="checkItem(index)">{{ item }}</span>
            <span class="targetCh cursor-pointer" v-else>{{ item }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBlog } from '@/api/blog'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

const { proxy } = getCurrentInstance()
const route = useRoute()

const blogData = ref({})
const compiledMarkdown = ref({})

onMounted(async () => {
  const res = await getBlog(route.params.blogId)
  blogData.value = res.data
  loadingMD(res.data.text)

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  window.addEventListener('resize', function () {
    checkElementSize()
  })
})

// 加载md解析
function loadingMD(data) {
  const md = new MarkdownIt({})

  // 添加anchor插件
  md.use(anchor, {
    permalink: true,
    permalinkClass: 'header-anchor',
    permalinkSymbol: '',
    level: [1, 6] // 指定要处理的标题级别，默认为 [1, 6]
  })
  // 添加自定义标签
  md.use(mdPlugin)
  compiledMarkdown.value = md.render(data)
}

//  插件 - 锚点
var list = new Array()
function mdPlugin(md) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    if (tokens[idx].tag === 'h1' && tokens[idx + 1].content) {
      tokens[idx].attrSet('class', 'h1-style')
      list.push(tokens[idx + 1].content)
      list.push(tokens[idx].attrGet('id'))
    }
    if (tokens[idx].tag === 'h2') {
      tokens[idx].attrSet('class', 'h2-style') // 添加样式
      tokens[idx].attrSet('id', tokens[idx + 1].content + 'h2') // 添加进列表
      list.push(tokens[idx + 1].content)
      list.push(tokens[idx].attrGet('id'))
    }
    if (tokens[idx].tag === 'ol') {
      tokens[idx].attrSet('class', 'ol-style')
    }
    return self.renderToken(tokens, idx, options)
  }
}

// 锚点跳转
function handleClick(index) {
  const data = document.getElementById(list[index + 1])
  if (data) {
    data.scrollIntoView({ behavior: 'smooth' })
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const newScrollTop = scrollTop - 75
    // 平滑滚动到新的位置
    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth'
    })
  }
}
// 判断锚点
function checkItem(data) {
  if (list[data + 1].toString().includes('h2')) {
    return false
  }
  return true
}

// 页面太小就隐藏掉导航栏
const showPaeItem = ref(true)
function checkElementSize() {
  const screenWidth = window.innerWidth
  screenWidth >= 1024 ? (showPaeItem.value = true) : (showPaeItem.value = false)
}

onUnmounted(() => {
  window.removeEventListener('resize', checkElementSize)
})
</script>
<style lang="scss">
.blog {
  background-image: url('../../../assets/img/background-night.png');
  background-size: cover;
  min-height: 100vh;
  color: #aba8a8;
  font-size: 1rem;
}
::selection {
  background-color: #1f8f93; /* 选中文本的背景颜色 */
  color: #000000; /* 选中文本的颜色 */
}

// 定义颜色变量
$h1-color: #ccff00;
$h2-color: #157027;

.h1-style {
  font-size: 1.5em; /* 设置字体大小 */
  font-weight: 600;
  line-height: 4rem;
  color: $h1-color;
}
.h2-style {
  font-size: 1.3em; /* 设置字体大小 */
  font-weight: 600;
  line-height: 3rem;
  color: $h2-color;
}
.bash-style {
  background-color: #8c4545;
  color: red;
  font-size: 2rem;
}
.target {
  color: $h1-color;
  font-size: 1rem;
  line-height: 35px;
}
/* 鼠标移入时的样式 */
.target:hover {
  font-size: 1.1em; /* 字体大小增加 */
  transform: translateX(5px); /* 向右偏移 */
}
.targetCh {
  color: $h2-color;
  font-size: 0.8rem;
  line-height: 25px;
}
/* 鼠标移入时的样式 */
.targetCh:hover {
  font-size: 1em; /* 字体大小增加 */
  transform: translateX(5px); /* 向右偏移 */
}
</style>
