import request from '@/utils/request.js'
import qs from 'qs'
export const getLogin=function(username,password){
  const data={
    username,password
  }

  return request({
    url:'/admin/login',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
  }
  )
}