<!--页面-->
<template>
  <div class="">天气页面信息</div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import { getWeather } from '@/api/weather.js'

const { proxy } = getCurrentInstance()
onMounted(async () => {
  const res = await getWeather()
  console.log(res)
})
</script>

<style lang="scss" scoped></style>
