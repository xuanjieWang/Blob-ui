<!--页面-->
<template>
  <div class="item flex flex-col">
    <!-- <div class="flex flex-col rounded titleCard">
      <div class="title">{{ data.title }}</div>
      <div class="describe">
        <span>{{ formatDateToChinese(data.createTime) }}</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<EyeOutlined class="icon-center" />&nbsp;{{ data.videoCount }}</span>
      </div>
    </div> -->
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
