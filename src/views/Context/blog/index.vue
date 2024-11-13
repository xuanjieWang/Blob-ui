<!--页面-->
<template>
  <div class="blog w-full h-full flex gap-3">
    <div style="margin-top: 80px" class="page h-full flex flex-col items-center">
      <!---返回按钮-->
      <div class="flex items-start w-full">
        <a-button type="primary" @click="goBack">返回</a-button>
      </div>
      <!---文章标题和时间-->
      <span class="font-bold text-2xl leading-loose">{{ blogData.title }}</span>
      <span class="text-sm text-yellow-200">{{ blogData.createTime }}</span>
      <div v-html="compiledMarkdown" id="compiledMarkdown"></div>
    </div>

    <!--右侧的跳转栏目-->
    <div v-if="showPaeItem" class="emunItem fixed flex flex-col" id="mdItem">
      <ul>
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
import { ref, getCurrentInstance, onMounted, onUnmounted, h } from 'vue'
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
  console.log(document.getElementById('compiledMarkdown'))
})

// 加载md解析
function loadingMD(data) {
  const md = new MarkdownIt({})

  //添加anchor插件
  md.use(anchor, {
    permalink: true,
    permalinkClass: 'header-anchor',
    permalinkSymbol: '',
    level: [1, 6] // 指定要处理的标题级别，默认为 [1, 6],
  })

  // 添加自定义标签
  md.use(mdPlugin)
  md.use(myImagePlugin)

  compiledMarkdown.value = md.render(data)
}

//  插件 - 锚点
var list = new Array()
function mdPlugin(md) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    // 添加锚点
    if (tokens[idx].tag === 'h1' && tokens[idx + 1].content) {
      list.push(tokens[idx + 1].content)
      list.push(tokens[idx].attrGet('id'))
    }
    if (tokens[idx].tag === 'h2') {
      tokens[idx].attrSet('id', tokens[idx + 1].content + 'h2') // 添加进列表
      list.push(tokens[idx + 1].content)
      list.push(tokens[idx].attrGet('id'))
    }

    // 添加样式
    const array = Array.from(tokens)

    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      if (item['tag'] && item['nesting'] === 1) {
        item.attrSet('class', item['tag'] + '-style')
      }
    }

    return self.renderToken(tokens, idx, options)
  }
}

// 创建自定义插件
function myImagePlugin(md) {
  // 捕获渲染后的 open tag 事件
  const defaultRender =
    md.renderer.rules.p_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.p_open = function (tokens, idx, options, env, self) {
    // 替换 <p> 标签为 <img> 标签
    const aIndex = tokens[idx].attrIndex('src')
    if (aIndex >= 0) {
      tokens[idx].tag = 'img'
      tokens[idx].attrs[aIndex][1] = 'http://example.com/image.png' // 设置你的图片 URL
    }
    return defaultRender(tokens, idx, options, env, self)
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

const goBack = () => {
  proxy.$router.go(-1) // 编程式导航
}
</script>
<style lang="scss">
.blog {
  background-image: url('../../../assets/img/background-night.png');
  background-size: cover;
  min-height: 100vh;
  color: #aba8a8;
  font-size: 1rem;
  user-select: text; /* 防止用户选择文本 */
}
::selection {
  background-color: #1f8f93; /* 选中文本的背景颜色 */
  color: #000000; /* 选中文本的颜色 */
}

// 定义颜色变量
$h1-color: #ff0037;
$h2-color: #bf00ff;

.h1-style {
  font-size: 1.5em; /* 设置字体大小 */
  font-weight: 800;
  color: $h1-color;
  user-select: text; /* 防止用户选择文本 */
}
.h2-style {
  font-size: 1.3em; /* 设置字体大小 */
  font-weight: 700;
  color: $h2-color;
  user-select: text; /* 防止用户选择文本 */
}

.li-style {
  margin-left: 10px;
  line-height: 35px;
  color: #dfdada;
  user-select: text; /* 防止用户选择文本 */
}
.bash-style {
  background-color: #8c4545;
  color: red;
  font-size: 2rem;
  user-select: text; /* 防止用户选择文本 */
}

.blockquote-style {
  color: rgb(82, 81, 81);
  margin: 8px;
  font-size: 1.1rem;
}
.p-style {
  line-height: 40px;
  margin: 8px;
  font-size: 1.1rem;
  user-select: text; /* 防止用户选择文本 */
}
.strong-style {
  margin: 10px;
  color: #fff;
  user-select: text; /* 防止用户选择文本 */
}
.code-style {
  background-color: #2e2e2e;
}
.language-bash {
  background-color: #2e2e2e;
}
.language-js {
  background-color: #2e2e2e;
}
.language-java {
  background-color: rgb(163, 229, 22);
}

.image-style {
  height: 10%;
  width: 50%;
  background-color: red;
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
.emunItem {
  margin-top: 150px;
  height: 600px; /* 设置最大高度为500px */
  overflow: auto; /* 如果内容超出最大高度，则显示滚动条 */
  margin-left: 80%;
}
</style>
