<!--页面-->
<template>
  <div class="flex flex-col justify-center w-full p-5">
    <div class="flex items-center p-2 gap-3">
      <span>图片类型: &nbsp;</span>
      <a-tree-select
        v-model:value="type"
        style="width: 20%"
        :tree-data="treeData"
        tree-checkable
        allow-clear
        :show-checked-strategy="SHOW_PARENT"
        placeholder="请选择图片类型"
        tree-node-filter-prop="label" />
      <a-button type="primary" @click="getOssByType" style="width: 100px">查询</a-button>
    </div>
    <span class="text-white font-bold">共上传 {{ total }} 张oss图像</span>
    <a-table class="mt-1 p-2" :dataSource="ossList" :columns="columns" bordered :pagination="{ pageSize: 10 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'imageUrl'">
          <div class="flex justify-start items-center gap-5">
            <img :src="record.imageUrl" class="h-[50px] w-[100px]" @click="clickImg(record.imageUrl)" />
            <p style="user-select: all">{{ record.imageUrl }}</p>
          </div>
        </template>
      </template>
    </a-table>
    <img v-if="showUrl != null" :src="showUrl" class="h-[500px] w-[1000px] z-1000" @click="clickImg(null)" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, defineEmits } from 'vue'
import columns from './table'
import { list } from '@/api/ossImage'
import { TreeSelect } from 'ant-design-vue'

const SHOW_PARENT = TreeSelect.SHOW_PARENT

const type = ref()

var ossList = reactive([])
const total = ref(0)

var treeData = reactive([])

const showUrl = ref(null)

onMounted(async () => {
  getOssByType()
})

const getOssByType = async () => {
  const res = await list() // 获取全部的设备信息
  ossList = res.data
  total.value = res.total
}
const clickImg = (open) => {
  showUrl.value = open

  console.log(showUrl.value)
}
</script>
<style lang="scss" scoped></style>
