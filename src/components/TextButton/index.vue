<!--页面-->
<template>
  <div class="flex flex-col justify-center items-center" @mouseenter="showText = true" @mouseleave="showText = false">
    <div class="button flex justify-center items-center gap-2">
      {{ props.text }}
      <div v-if="props.items" class="down-triangle"></div>
    </div>
    <div class="items flex flex-col items-center" v-if="showText && props.items.length > 0">
      <div v-for="item in props.items" class="gap-5" @click="go(item['path'])">
        <div class="optionItem">
          <span>{{ item['name'] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance } from 'vue'
import { ref } from 'vue'

const { proxy } = getCurrentInstance()
const showText = ref(false)
const props = defineProps({
  text: {
    type: String
  },
  items: {
    type: Array
  }
})

function go(path) {
  proxy.$router.push(path) // 编程式导航
}
</script>
<style lang="scss" scoped>
.button {
  min-width: 80px;
  height: 40px;
  line-height: 40px;
  margin: 0px 20px 0px 20px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
}
.button:hover {
  color: #e1ed00;
}
.items {
  width: 100%;
  background: #252424fe;
  border-radius: 5px;
}
.down-triangle {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff; /* 改变颜色以适应你的设计 */
}
.optionItem {
  color: #fff;
  width: 118px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.optionItem:hover {
  background: rgb(88, 86, 86);
}
</style>
