import request from '@/utils/request'

export function getWeather() {
  return request({
    url: '/weather/data/getWeather',
    method: 'get'
  })
}
