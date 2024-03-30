import { defineStore } from 'pinia'
const useBlogStore = defineStore('blog', {
  state: () => ({
    data: null
  }),
  actions: {
    getData() {
      return this.data
    },
    setData(data) {
      this.data = data
    }
  }
})

export default useBlogStore
