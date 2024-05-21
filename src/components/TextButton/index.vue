<!--页面-->
<template>
  <div class="body">{{ props.text }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    type: String
  }
})
</script>
<style lang="scss" scoped>
.body {
  border-radius: 8px;
  height: 35px;
  line-height: 35px;
  padding: 0 15px 0 15px;
  font-weight: 500;
}
.body:hover {
  background: #27272a;
}
</style>
