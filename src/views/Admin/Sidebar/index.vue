<template>
  <div class="flex flex-col h-full">
    <a-menu
      style="width: 240px; height: 100%; min-height: 100vh; font-size: 18px"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"></a-menu>
  </div>
</template>
<script setup>
import { reactive, watch, h, onMounted, getCurrentInstance } from 'vue'
import { PieChartOutlined, DesktopOutlined, InboxOutlined } from '@ant-design/icons-vue'

const { proxy } = getCurrentInstance()
const emit = defineEmits(['choseMenu'])

const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: ['0'],
  preOpenKeys: ['sub1']
})
const items = [
  {
    key: '-1',
    icon: () => h(PieChartOutlined),
    label: '返回博客',
    title: '返回博客',
    path: 'back'
  },
  {
    key: '0',
    icon: () => h(PieChartOutlined),
    label: '首页',
    title: '首页',
    path: 'index'
  },
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: '博客管理',
    title: '博客管理',
    path: 'allBlog'
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: '添加博客',
    title: '添加博客',
    path: 'addBlog'
  },
  {
    key: '3',
    icon: () => h(InboxOutlined),
    label: '博客类型管理',
    title: '博客类型管理',
    path: 'blogType'
  },
  {
    key: '4',
    icon: () => h(InboxOutlined),
    label: 'OSS图片',
    title: 'OSS图片',
    path: 'ossImage'
  },
  {
    key: '6',
    icon: () => h(InboxOutlined),
    label: '视频管理',
    title: '视频管理',
    path: 'bus'
  },
  {
    key: '5',
    icon: () => h(InboxOutlined),
    label: '访问日志',
    title: '访问日志',
    path: 'logging'
  },
  {
    key: 'sub1',
    icon: () => h(InboxOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      {
        key: '5',
        label: 'Option 5',
        title: 'Option 5'
      },
      {
        key: '6',
        label: 'Option 6',
        title: 'Option 6'
      },
      {
        key: '7',
        label: 'Option 7',
        title: 'Option 7'
      },
      {
        key: '8',
        label: 'Option 8',
        title: 'Option 8'
      }
    ]
  }
]

onMounted(() => {
  const cache = JSON.parse(localStorage.getItem('choseMenu'))
  if (!cache || cache == 'back') {
    state.selectedKeys = ['1']
    return
  }
  items.forEach((item) => {
    if (item['path'] === cache) {
      state.selectedKeys = [item['key']]
    }
  })
})

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)

watch(
  () => state.selectedKeys,
  (val) => {
    if (state.selectedKeys[0] == -1) {
      proxy.$router.push('/index') // 编程式导航
    } else {
      items.forEach((item) => {
        if (item['key'] == val) {
          emit('choseMenu', item['path'])
        }
      })
    }
  }
)
</script>
