<!--页面-->
<template>
  <div class="blog flex flex-col p-2 justify-center" style="height: 100%">
    <a-button type="primary" class="w-20 flex justify-center items-center" :loading="iconLoading" @click="goAllBlog">
      <template #icon><LeftOutlined /> </template>
      返回
    </a-button>

    <div class="w-10 h-10 bg-white" @click="save()">1111</div>

    <div class="flex w-full h-full">
      <textarea class="w-1/2 h-full textarea" v-model="compiledMarkdown" rows="100"></textarea>
      <div class="page p-4 h-full flex flex-col items-center justify-center">
        <span class="font-bold text-2xl leading-loose">{{ blogData.title }}</span>
        <span class="text-sm text-yellow-600">{{ blogData.createTime }}</span>
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { getBlog, updateBlog } from '@/api/blog'
import MarkdownIt from 'markdown-it'
import { css_beautify, html_beautify } from 'js-beautify'

const emit = defineEmits(['choseMenu'])

const props = defineProps({
  id: {
    type: Object
  }
})

const blogData = ref({})
const compiledMarkdown = ref({})
onMounted(async () => {
  const res = await getBlog(props.id)
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

const iconLoading = ref(false)
function goAllBlog() {
  iconLoading.value = true

  setTimeout(() => {
    emit('choseMenu', 'allBlog')
    iconLoading.value = false
  }, 200)
}

// 加载md解析
function loadingMD(data) {
  const md = new MarkdownIt({})
  md.use(mdPlugin)
  compiledMarkdown.value = md.render(data)
  compiledMarkdown.value = css_beautify(compiledMarkdown.value)
  compiledMarkdown.value = html_beautify(compiledMarkdown.value)
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

    const array = Array.from(tokens)
    array.forEach((item) => {
      console.log(item)
    })

    return self.renderToken(tokens, idx, options)
  }
}

function save() {
  console.log(compiledMarkdown.value)
}
</script>
<style lang="scss" scoped>
.textarea {
  background-color: #000;
  font-size: 18px;
  line-height: 24px;
  color: #c3bfbf;
}
.textarea-no-outline:focus {
  outline: none;
}
</style>
