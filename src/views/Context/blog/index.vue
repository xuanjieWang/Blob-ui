<!--页面-->
<template>
  <div class="blog w-full h-full">
    <div style="margin-top: 100px" class="w-full h-full flex flex-col items-center">
      <span class="font-bold text-xl leading-loose">{{ blogData.title }}</span>
      <div class="page" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBlog } from '@/api/blog'
import MarkdownIt from 'markdown-it'
import markdownItHighlight from 'markdown-it-highlight'
import hljs from 'highlight.js'

const { proxy } = getCurrentInstance()
const route = useRoute()

const blogData = ref({})
const compiledMarkdown = ref({})

hljs.configure({ languages: ['javascript', 'xml', 'css', 'html', 'bash'] })
onMounted(async () => {
  const blogId = ref(route.params.blogId)
  const res = await getBlog(blogId.value)
  blogData.value = res.data

  const md = new MarkdownIt().use(markdownItHighlight, hljs).use(h1Plugin)
  compiledMarkdown.value = md.render(res.data.text)
})

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

function h1Plugin(md) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    if (Array.isArray(tokens)) {
      tokens.forEach((item) => {
        if (item.tag === 'code') {
          // console.log(item)
          if (item.info === 'bash' && !item.content.includes('bash')) {
            console.log(item)
            console.log('-')
            // item.content = `<div class="bash-style">${item.content}</div>`
            // item.content = `<pre class="bash-style"><code class="bash-style">$${item.content}</code></pre>`
            // 以换行进行分割
            const lines = item.content.split(/\n/).slice(0, -1)
            // 添加自定义行号
            let html = lines
              .map((item, index) => {
                return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
              })
              .join('')
            html = '<ol>' + html + '</ol>'
            // 添加代码语言
            if (lines.length) {
              html += '<b class="name">' + lang + '</b>'
            }
            return '<pre class="hljs"><code>' + html + '</code></pre>'
          }
        }
      })
    }
    if (tokens[idx].tag === 'h1') {
      tokens[idx].attrSet('class', 'h1-style')
    }
    if (tokens[idx].tag === 'h2') {
      tokens[idx].attrSet('class', 'h2-style')
    }
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const srcItem = tokens[idx].attrs.find((item) => {
      return item[0] === 'src'
    })
    const src = srcItem[1]
    const alt = tokens[idx].content
    return `<p>
        <div class="light-link" data-fancybox="gallery" no-pjax="" data-type="image" data-caption="${alt}">
            <img src="${src}" alt="${alt}" />
            <span class="post-img-desc">${alt}</span>
        </div>
    </p>`
  }
}
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

@media screen and (max-width: 766px) {
  .blog {
    margin-top: 200px;
  }
}

@media screen and (max-width: 600px) {
  .page {
    width: 95%;
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .page {
    width: 75%;
  }
}

@media screen and (min-width: 1025px) {
  .page {
    width: 60%;
  }
}

.h1-style {
  font-size: 1.5em; /* 设置字体大小 */
  font-weight: 600;
  line-height: 4rem;
  color: #e7e1e1;
}
.h2-style {
  font-size: 1.3em; /* 设置字体大小 */
  font-weight: 600;
  line-height: 3rem;
  color: #e7e1e1;
}
.bash-style {
  background-color: #8c4545;
  color: red;
  font-size: 2rem;
}
</style>
