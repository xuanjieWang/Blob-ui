import { defineStore } from 'pinia'
const useBlogStore = defineStore('blog', {
  state: () => ({
    login: true,
    data: {}
  }),
  actions: {
    getData() {
      return this.data
    },
    setData(data) {
      this.data = data
    },
    setLoginStatus(data) {
      this.login = data
    }
  }
})

export default useBlogStore
