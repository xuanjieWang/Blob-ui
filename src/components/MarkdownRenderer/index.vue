<template>
  <div class="page" v-html="compiledMarkdown"></div>
</template>

<script setup>
import { getBlog } from '@/api/blog'
import { onMounted, ref, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'

// const props = defineProps({
//   BlogId: {
//     type: Sting
//   }
// })
const compiledMarkdown = ref({})

onMounted(() => {
  nextTick(async () => {
    const md = new MarkdownIt()
    // const res = await getBlog(props.BlogId)
    const res = await getBlog(1)
    compiledMarkdown.value = md.render(res.data.text)
    console.log(compiledMarkdown.value)
  })
})

// const List = []
// const h2List = []
// const h3List = []
// const h4List = []
// const h5List = []

// const hLists = {
//   H2: h2List,
//   H3: h3List,
//   H4: h4List,
//   H5: h5List
// }

// // 遍历标签，给标签添加锚点
// function getPoint() {
//   const data = document.getElementById('output')
//   nextTick(() => {
//     for (let i = 0; i < data.childNodes.length; i++) {
//       const child = data.childNodes[i]
//       if (!child.nodeName.includes('H')) continue //判断子节点是不是H节点
//       const num = child.nodeName.slice(1)
//       List.push('list_' + i)
//       hLists[`H${num}`].push('list_' + i) //存储到对应的数组
//       child.setAttribute('id', 'list_' + i)
//     }

//     // 锚点添加完成
//     // 制作跳转

//     const list1 = []

//     // 需要写一个递归算法
//     for (let i = 0; i < h2List.length; i++) {
//       list1[i] = [h2List[i]]
//       // if()

//       // const element = array[i]
//     }
//   })
// }

// // 时间格式转换
// function formatDateToChinese(dateTimeString) {
//   const dateTime = new Date(dateTimeString)
//   const year = dateTime.getFullYear()
//   const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
//   const date = dateTime.getDate().toString().padStart(2, '0')
//   const hour = dateTime.getHours().toString().padStart(2, '0')
//   const minute = dateTime.getMinutes().toString().padStart(2, '0')
//   const second = dateTime.getSeconds().toString().padStart(2, '0')
//   return `${year}-${month}-${date} ${hour}:${minute}:${second}`
// }
</script>

<style scoped>
/* 你的样式 */
.page {
  width: 100%;
  height: 100%;
  background: #fff;
  color: #000;
}
</style>
