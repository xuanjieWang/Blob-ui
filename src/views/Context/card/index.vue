<!--页面-->
<template>
  <div class="item flex flex-col">
    <img :src="data.image" style="width: 100%; height: 260px; border-radius: 5px" />
    <div class="flex flex-col rounded">
      <div class="topItem">
        <div class="title">{{ data.title }}</div>
        <div class="describe">
          <span>{{ formatDateToChinese(data.createTime) }}</span>
          <span>&nbsp;<EyeOutlined class="icon-center" />&nbsp;{{ data.videoCount }}</span>
          <span>&nbsp;<MessageOutlined class="icon-center" />&nbsp;{{ data.commonCount }}</span>
        </div>
      </div>
    </div>
    <div id="output" v-html="output"></div>

    <Common :blogId="data.id" />
  </div>
</template>

<script setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { EyeOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { ref, watch, getCurrentInstance, onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { list, getBlog } from '@/api/blog'
import Common from '../common/index.vue'
import { parseMD } from './index'

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

    // parseMD(input.value)

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
  }
  console.log(output.value)
  document.getElementById('output').innerHTML = '<h1> woshji </h1>'
  // console.log(docu)
})

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
<style>
.item {
  margin: 3% 20% 0% 20%;
  min-width: 400px;
  width: 60%;
  font-size: 16px;
  color: rgb(255, 255, 255);
}
.topItem {
  margin-top: 5px;
  border-radius: 8px 8px 0 0;
  background-color: #000;
}
.title {
  text-align: center; /* 水平居中 */
  line-height: 60px;
  font-size: 40px;
}
.describe {
  font-size: 16px;
  color: #8b8989;
  text-align: center;
}

.icon-center {
  vertical-align: middle; /* 垂直居中 */
  text-align: center; /* 水平居中，但通常与 flexbox 或 grid 结合使用效果更佳 */
}
h1 {
  font-size: 30px !important;
  color: red;
}
h2 {
  font-size: 30px !important;
  color: red;
}
h3 {
  font-size: 30px !important;
  color: red;
}
p {
  font-size: 20px;
  line-height: 2;
  text-indent: 20px;
}
li {
  font-size: 18px;
  line-height: 2;
  text-indent: 20px;
}
ol {
  font-size: 18px;
  line-height: 2;
  text-indent: 20px;
}
</style>
