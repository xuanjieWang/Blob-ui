<!--页面-->
<template>
  <div class="blog flex flex-col p-2" style="height: 100%">
    <a-button type="primary" class="w-20 flex justify-center items-center" @click="goAllBlog">
      <template #icon><LeftOutlined /> </template>
      返回
    </a-button>
    <div class="flex flex-col p-5 gap-5">
      <div class="flex gap-5">
        <p>文章标题:</p>
        <input v-model="blogData.title" placeholder="请输入文章标题" />
        <p>文章类型:</p>
        <a-tree-select
          v-model:value="blogData.blogType"
          style="width: 300px"
          :tree-data="treeData"
          tree-checkable
          allow-clear
          :show-checked-strategy="TreeSelect.SHOW_All"
          placeholder="请选择博客类型"
          tree-node-filter-prop="label" />
      </div>
      <div class="flex gap-5">
        <p>创建时间:</p>
        <input type="datetime-local" id="datetimePicker" />
        <span>{{ blogData.createTime }}</span>
      </div>

      <div class="flex gap-5 items-center">
        <p>文章封面:</p>
        <img :src="blogData.image" style="height: 100px" />
        <input type="file" id="imageInput" name="image" accept="image/*" />
        <a-button type="primary" class="w-20 flex justify-center items-center" @click="save()">
          <template #icon><EditOutlined /> </template>
          保存
        </a-button>
      </div>
    </div>

    <div class="flex w-full h-full">
      <div id="vditor"></div>
      <div class="w-1/2 page p-4 h-full flex flex-col items-center justify-center">
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { LeftOutlined, EditOutlined } from '@ant-design/icons-vue'
import { TreeSelect } from 'ant-design-vue'
import { getBlog, updateBlog } from '@/api/blog'
import { listAll } from '@/api/blogType'
import MarkdownIt from 'markdown-it'
import { css_beautify, html_beautify } from 'js-beautify'
import Vditor from 'vditor'

import 'vditor/dist/index.css'

const emit = defineEmits(['choseMenu'])

const props = defineProps({
  id: {
    type: Object
  }
})

var treeData = reactive([])
var typeList = reactive([])

const vditor = ref(null)

const blogData = ref({})
const compiledMarkdown = ref({})

onMounted(async () => {
  const res = await getBlog(props.id)
  console.log(res.data)
  blogData.value = res.data
  loadingEdit(res.data.text)
  loadingMD(res.data.text)
  getBlogType()
})

const getBlogType = async () => {
  const typeRes = await listAll({})
  if (typeRes.data) Object.assign(typeList, typeRes.data)
  typeList.forEach((item) => {
    if (!item.parentType) {
      treeData.push({
        label: item.type,
        value: item.type,
        children: []
      })
      typeList.forEach((child) => {
        if (child.parentType && child.parentType === item.type) {
          treeData[treeData.length - 1].children.push({
            label: child.type,
            value: child.type
          })
        }
      })
    }
  })
}

function goAllBlog() {
  emit('choseMenu', 'allBlog')
}

// 加载md解析
function loadingMD(data) {
  const md = new MarkdownIt({})
  md.use(mdPlugin)
  compiledMarkdown.value = md.render(data)
  compiledMarkdown.value = css_beautify(compiledMarkdown.value)
  compiledMarkdown.value = html_beautify(compiledMarkdown.value)
}
function mdPlugin(md) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const array = Array.from(tokens)
    array.forEach((item) => {
      if (item['tag'] && item['nesting'] === 1) {
        item.attrSet('class', item['tag'] + '-style')
      }
    })
    return self.renderToken(tokens, idx, options)
  }
}

function setUpdateTime() {
  const datetimePicker = document.getElementById('datetimePicker')
  if (!datetimePicker.value) return
  const selectedDateTime = datetimePicker.value

  // 将输入的日期时间字符串转换为 yyyy-MM-dd HH:mm:ss 格式
  const date = new Date(selectedDateTime)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  blogData.value.updateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function loadingEdit(data) {
  vditor.value = new Vditor('vditor', {
    // mode: 'ir', // 即时渲染模式
    cache: {
      enable: false
    },
    value: data,
    toolbarConfig: {
      pin: true
    },
    height: 'auto',
    width: '50%'
  })
}

const save = async () => {
  // 图片更新
  const imageInput = document.getElementById('imageInput')
  const file = imageInput.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      blogData.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // md文件上传
  blogData.value.text = vditor.value.getValue()

  // 时间更新
  setUpdateTime()
  await updateBlog(blogData.value)

  setTimeout(async () => {
    const res = await getBlog(props.id)
    blogData.value = res.data
    loadingEdit(res.data.text)
    loadingMD(res.data.text)
  }, 1000)
}
</script>
<style lang="scss" scoped>
.textarea {
  background-color: #000;
  font-size: 18px;
  line-height: 40px;
  color: rgb(209, 204, 204);
}
.textarea-no-outline:focus {
  outline: none;
}
</style>
