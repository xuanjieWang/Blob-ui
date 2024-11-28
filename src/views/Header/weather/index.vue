<!--页面-->
<template>
  <div class="w-full h-full flex flex-col items-center gap-3 justify-around">
    <span>&nbsp;</span>
    <div class="flex justify-center items-center gap-3">
      <img src="./img/city.png" style="height: 35px" />
      <span>{{ info.cityName ? info.cityName : '' }}</span>
      <span>{{ info.temp ? info.temp[0] : '' }}</span>
    </div>
    <span>&nbsp;</span>
    <div class="flex gap-5">
      <span>{{ info.info ? info.info[0] : '' }}</span>
      <span>{{ info.level ? info.level[0] : '' }}</span>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { getWeather } from '@/api/weather.js'

const info = ref({})

const { proxy } = getCurrentInstance()
onMounted(async () => {
  const res = await getWeather()
  info.value = res.data || {}
})
</script>

<style lang="scss" scoped></style>
