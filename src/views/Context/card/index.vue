<!--页面-->
<template>
  <div class="item flex flex-col">
    <div class="flex flex-col rounded titleCard">
      <div class="title">{{ data.title }}</div>
      <div class="describe">
        <span>文章发布于: {{ formatDateToChinese(data.createTime) }}</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<EyeOutlined class="icon-center" />&nbsp;{{ data.videoCount }}</span>
        <!-- <span>&nbsp;<MessageOutlined class="icon-center" />&nbsp;{{ data.commonCount }}</span> -->
      </div>
    </div>
    <div id="output" v-html="output"></div>
    <div>放置标签</div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { EyeOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { ref, watch, getCurrentInstance, onMounted, reactive, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { list, getBlog } from '@/api/blog'

const { proxy } = getCurrentInstance()
const route = useRoute()

const data = ref({})
const input = ref('')
const output = ref(null)

onMounted(async () => {
  const blogId = route.params && route.params.blogId
  const res = await getBlog(blogId)
  if (res.data) {
    data.value = res.data || {}
    input.value = data.value.text
    const options = {
      renderer: new marked.Renderer(), // 这个是必须填写的
      gfm: true, // 启动类似Github样式的Markdown,
      pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
      sanitize: false, // 原始输出，忽略HTML标签
      tables: true, // 支持Github形式的表格，必须打开gfm选项
      breaks: true, // 支持Github换行符，必须打开gfm选项
      smartLists: true, // 优化列表输出
      smartypants: true,
      highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
        return hljs.highlight(validLanguage, code).value
      }
    }
    output.value = marked(input.value, options)
    getPoint()
  }
})

const List = []
const h2List = []
const h3List = []
const h4List = []
const h5List = []

const hLists = {
  H2: h2List,
  H3: h3List,
  H4: h4List,
  H5: h5List
}

// 遍历标签，给标签添加锚点
function getPoint() {
  const data = document.getElementById('output')
  nextTick(() => {
    for (let i = 0; i < data.childNodes.length; i++) {
      const child = data.childNodes[i]
      if (!child.nodeName.includes('H')) continue //判断子节点是不是H节点
      const num = child.nodeName.slice(1)
      List.push('list_' + i)
      hLists[`H${num}`].push('list_' + i) //存储到对应的数组
      child.setAttribute('id', 'list_' + i)
    }

    // 锚点添加完成
    // 制作跳转

    const list1 = []

    // 需要写一个递归算法
    for (let i = 0; i < h2List.length; i++) {
      list1[i] = [h2List[i]]
      // if()

      // const element = array[i]
    }
  })

  // h2Tags.value = output.value.match(/<h2.*?<\/h2>/g)
  // // 标签添加
  // //  <h2 id="anchor1">这是锚点</h2>
  // //  <a href="#anchor2">跳转到锚点</a>
  // if (h2Tags.value) {
  //   for (let i = 0; i < h2Tags.value.length; i++) {
  //     // h2Tags.value[i] = h2Tags.value[i].replace(/<h2.*?>|<\/h2>/g, '')
  //     // h2Tags.value[i].
  //   }
  // }
  // console.log(h2Tags.value)
}

// 时间格式转换
function formatDateToChinese(dateTimeString) {
  const dateTime = new Date(dateTimeString)
  const year = dateTime.getFullYear()
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
  const date = dateTime.getDate().toString().padStart(2, '0')
  const hour = dateTime.getHours().toString().padStart(2, '0')
  const minute = dateTime.getMinutes().toString().padStart(2, '0')
  const second = dateTime.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}
</script>
<style src="./index.scss"></style>
