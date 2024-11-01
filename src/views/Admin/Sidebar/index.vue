<template>
  <a-menu
    style="width: 300px; height: 100vh"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="state.collapsed"
    :items="items"></a-menu>
</template>
<script setup>
import { reactive, watch, h } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
})
const items = reactive([
  {
    key: '0',
    icon: () => h(PieChartOutlined),
    label: '返回',
    title: '返回'
  },
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: '博客管理',
    title: '博客管理'
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: 'Option 2',
    title: 'Option 2'
  },
  {
    key: '3',
    icon: () => h(InboxOutlined),
    label: 'Option 3',
    title: 'Option 3'
  },
  {
    key: '4',
    icon: () => h(InboxOutlined),
    label: 'Option 4',
    title: 'Option 4'
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
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}
</script>
