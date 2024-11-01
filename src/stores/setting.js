import { defineStore } from 'pinia'
const settingStore = defineStore('setting', {
  state: () => ({
    headerShow: true
  }),
  actions: {
    setHeaderShow(data) {
      this.headerShow = data
      return this.headerShow
    },
    getHeaderShow() {
      return this.headerShow
    }
  }
})

export default settingStore
