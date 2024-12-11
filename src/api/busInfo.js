import request from '@/utils/request'

export function busInfoList(params) {
  return request({
    url: '/busInfo/data/list',
    method: 'get',
    params: params
  })
}
export function busPeopleList(params) {
  return request({
    url: '/busPeople/data/list',
    method: 'get',
    params: params
  })
}

// export function list(params) {
//   return request({
//     url: '/blog/data/list',
//     method: 'get',
//     params: params
//   })
// }
