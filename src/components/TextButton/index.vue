<!--页面-->
<template>
  <div class="button">{{ props.text }}</div>
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
.button {
  // border-radius: 8px;
  min-width: 80px;
  height: 40px;
  line-height: 40px;
  margin: 0px 20px 0px 20px;
  font-weight: 500;
  text-align: center;
}
.button:hover {
  border-bottom: 2px solid #000;
}
</style>
