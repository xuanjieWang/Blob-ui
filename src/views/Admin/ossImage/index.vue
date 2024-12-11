<!--页面-->
<template>
  <div class="flex flex-col justify-center w-full p-5">
    <div class="flex items-center p-2 gap-3">
      <span>图片类型: &nbsp;</span>
      <a-space direction="vertical">
        <a-input v-model:value="queryParams.fileName" placeholder="请输入类型" />
      </a-space>
      <a-button type="primary" @click="getOssByType" style="width: 100px">查询</a-button>
    </div>
    <span class="text-white font-bold">共上传 {{ pagination.total }} 张oss图像</span>
    <a-table class="mt-1 p-2" :dataSource="ossList" :columns="columns" bordered :pagination="pagination">
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
import { ref, onMounted, reactive, toRefs } from 'vue'
import columns from './table'
import { list } from '@/api/ossImage'

var ossList = reactive([])
const showUrl = ref(null)

var pagination = reactive({
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30'],
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`,
  current: 1,
  total: 50,
  onChange: handlePageChange
})
const data = reactive({
  queryParams: {
    fileName: ''
  }
})

const { queryParams } = toRefs(data)

function handlePageChange(page, pageSize) {
  pagination.current = page
  pagination.pageSize = pageSize
  getOssByType()
}

onMounted(() => {
  getOssByType()
})

const getOssByType = async () => {
  queryParams.pageNum = pagination.current
  queryParams.pageSize = pagination.pageSize
  const res = await list(queryParams)
  Object.assign(ossList, res.rows)
  pagination.total = res.total
}
const clickImg = (open) => {
  showUrl.value = open
}
</script>
<style lang="scss" scoped></style>
