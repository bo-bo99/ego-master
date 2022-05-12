import request from '@/utils/request.js'
import qs from 'qs'
export const getproductList = function(page, limit) {
  return request.get('/admin/productList', {
    params: {
      page,
      limit
    }
  })
}
export const getproductListLength= function() {
  return request.get('/admin/productListLength', {
  })
}
export const getproductSearchLength= function(search) {
  return request.get('/admin/searchLength', {
    params: {
      search
    }
  })
}
export const getproductListSearch= function(search,page,limit) {
  return request.get('/admin/search', {
    params: {
      search,page,limit
    }
  })
}
export const getCategoryListById= function(cId) {
  return request.get('/admin/CategoryListById', {
    params: {
     id:cId
    }
  })
}
export const getCategoryListByParentId= function(cId) {
  return request.get('/admin/CategoryListByParentId', {
    params: {
     id:cId
    }
  })
}
export const getCategoryBycategoryName=function(categoryName){
  return request.get('/admin/getCategoryBycategoryName', {
    params: {
      categoryName
    }
  })
}
export const Addproduct=function(product){
  const data={
    'category_id':product.category_id,
    'create_time':product.create_time,
    'default_img':product.default_img,
    'discount_price':product.discount_price,
    'product_count':product.product_count,
    'product_desc':product.product_desc,
    'product_name':product.product_name,
    'product_price':product.product_price,
    'product_status':product.product_status
}
  return request({
    url:'/admin/Addproduct',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
  }
  )
}
export const DeleteProductById=function(product_id){
  return request.get('/admin/Delproduct', {
    params: {
      product_id
    }
  })
}
export const updateProductById=function(product){
  const data={
    'product_id':product.product_id,
    'category_id':product.category_id,
    'create_time':product.create_time,
    'default_img':product.default_img,
    'discount_price':product.discount_price,
    'product_count':product.product_count,
    'product_desc':product.product_desc,
    'product_name':product.product_name,
    'product_price':product.product_price,
    'product_status':product.product_status
}
  return request({
    url:'/admin/updateProductById',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
  }
  )
}