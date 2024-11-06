import request from '@/utils/request'

export function listAll(data) {
  return request({
    url: '/blog/type/listAll',
    method: 'post',
    data: data
  })
}
//增加
export function addBlogType(data) {
  return request({
    url: '/blog/type/addBlogType',
    method: 'post',
    data: data
  })
}

export function delBlogType(id) {
  return request({
    url: '/blog/type/' + id,
    method: 'delete'
  })
}

export function updateMBlogType(data) {
  return request({
    url: '/blog/type/updateMBlogType',
    method: 'put',
    data: data
  })
}
