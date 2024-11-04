<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col justify-center items-center" style="height: 12vh">
      <p>玄杰的博客</p>
      <p>后台管理系统</p>
    </div>
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
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
})
const items = reactive([
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
    label: '日志管理',
    title: '日志管理',
    path: 'logging'
  }
  //   {
  //     key: 'sub1',
  //     icon: () => h(MailOutlined),
  //     label: 'Navigation One',
  //     title: 'Navigation One',
  //     children: [
  //       {
  //         key: '5',
  //         label: 'Option 5',
  //         title: 'Option 5'
  //       },
  //       {
  //         key: '6',
  //         label: 'Option 6',
  //         title: 'Option 6'
  //       },
  //       {
  //         key: '7',
  //         label: 'Option 7',
  //         title: 'Option 7'
  //       },
  //       {
  //         key: '8',
  //         label: 'Option 8',
  //         title: 'Option 8'
  //       }
  //     ]
  //   },
  //   {
  //     key: 'sub2',
  //     icon: () => h(AppstoreOutlined),
  //     label: 'Navigation Two',
  //     title: 'Navigation Two',
  //     children: [
  //       {
  //         key: '9',
  //         label: 'Option 9',
  //         title: 'Option 9'
  //       },
  //       {
  //         key: '10',
  //         label: 'Option 10',
  //         title: 'Option 10'
  //       },
  //       {
  //         key: 'sub3',
  //         label: 'Submenu',
  //         title: 'Submenu',
  //         children: [
  //           {
  //             key: '11',
  //             label: 'Option 11',
  //             title: 'Option 11'
  //           },
  //           {
  //             key: '12',
  //             label: 'Option 12',
  //             title: 'Option 12'
  //           }
  //         ]
  //       }
  //     ]
  //   }
])

onMounted(() => {
  state.selectedKeys = ['0']
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
    items.forEach((item) => {
      if (item['key'] == val) {
        emit('choseMenu', item['path'])
      }
    })
  }
)
</script>
