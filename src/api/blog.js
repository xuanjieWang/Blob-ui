import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/blog/data/list',
    method: 'get',
    params: params
  })
}

export function getBlog(id) {
  return request({
    url: '/blog/data/' + id,
    method: 'get'
  })
}

export const addBlog = (data) => {
  return request({
    url: '/blog/data/addBlog',
    method: 'post',
    data: data
  })
}
export const updateBlog = (data) => {
  return request({
    url: '/blog/data/updateBlog',
    method: 'post',
    data: data
  })
}
