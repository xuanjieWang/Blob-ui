<!--页面-->
<template>
  <div class="flex flex-col justify-center w-full p-5">
    <div class="flex items-center p-2 gap-1">
      <span>类型: &nbsp;</span>
      <a-space direction="vertical">
        <a-input v-model:value="queryParams.type" placeholder="请输入类型" />
      </a-space>
      <span>演员: &nbsp;</span>
      <a-space direction="vertical">
        <a-input v-model:value="queryParams.people" placeholder="请输入演员" />
      </a-space>
      <a-button type="primary" @click="listBusInfo" style="width: 100px">查询</a-button>
      <span class="ml-20 text-white font-bold">共上传 {{ pagination.total }} 条数据</span>
    </div>
    <a-table class="mt-1 p-2 select-text" :dataSource="infoList" :columns="columns" bordered :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'title'">
          <div class="select-text w-[150px]">
            {{ record.title }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <div class="select-text w-[120px]">
            {{ record.type }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'people'">
          <div class="select-text w-[80px]">
            {{ record.people }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'url'">
          <div class="select-text w-[60px]">
            {{ record.url }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'imgList'">
          <div class="flex flex-wrap w-[700px]">
            <div v-for="item in record.imageUrlList" :key="item">
              <img :src="item" class="h-[50px] w-[100px]" @click="clickImg(item)" />
            </div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'time'">
          <div class="select-text w-[36px]">
            {{ record.time }}
          </div>
        </template>
      </template>
    </a-table>
    <img v-if="showUrl != null" :src="showUrl" class="h-[500px] w-[1000px] z-1000 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" @click="clickImg(null)" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs } from 'vue'
import columns from './table'
import { busInfoList } from '@/api/busInfo'

var infoList = reactive([])
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
    type: '',
    people: ''
  }
})

const { queryParams } = toRefs(data)

onMounted(() => {
  listBusInfo()
})

function handlePageChange(page, pageSize) {
  pagination.current = page
  pagination.pageSize = pageSize
  listBusInfo()
}

const listBusInfo = async () => {
  queryParams.pageNum = pagination.current
  queryParams.pageSize = pagination.pageSize
  const res = await busInfoList(queryParams)
  Object.assign(infoList, res.rows)
  pagination.total = res.total
}
const clickImg = (open) => {
  showUrl.value = open
}
</script>
<style lang="scss" scoped></style>
