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
    <MarkdownRenderer />
    <div>放置标签</div>
  </div>
</template>

<script setup>
import { EyeOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { ref, watch, getCurrentInstance, onMounted, reactive, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { list, getBlog } from '@/api/blog'

const { proxy } = getCurrentInstance()
const route = useRoute()

const data = ref({})

onMounted(async () => {})
</script>
<style src="./index.scss"></style>
