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
            <img :src="record.imageUrl" class="h-[50px] w-[100px]" />
            <p style="user-select: all">{{ record.imageUrl }}</p>
          </div>
        </template>
      </template>
    </a-table>
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

onMounted(async () => {
  getOssByType()
})

const getOssByType = async () => {
  const res = await list() // 获取全部的设备信息
  console.log(res)
  ossList = res.data
  total.value = res.total
}
</script>
<style lang="scss" scoped></style>
