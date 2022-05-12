const db=require('../db/index')
exports.getproductListLength=(req,res)=>{
  const sqlstr='select * from product'
  db.query(sqlstr,(err,results)=>{
    if (err) return res.cc(err)
    res.send({
      status: 0,
      memsage: "获取产品信息成功",
      data: results,
  })
  })
}
exports.getproductList=(req,res)=>{
  const page=(req.query.page-1)*req.query.limit||1
  const limit=parseInt(req.query.limit)
  const sqlstr='select * from product limit ?,?'
  db.query(sqlstr,[page,limit],(err,results)=>{
    if (err) return res.cc(err)
    res.send({
      status: 0,
      memsage: "获取产品信息成功",
      data: results,
  })
  })
}
exports.getproductSearchLength=(req,res)=>{
  var search=req.query.search;
  const sqlstr="select * from product where  product_name Like '%"+search+"%' or product_status Like '%"+search+"%' or category_id Like '%"+search+"%'"
  db.query(sqlstr,(err,results)=>{
    if (err) return res.cc(err)
    if(results.length>0){
    res.send({
      status: 0,
      memsage: "获取产品信息成功",
      data: results,
  })
}else{
  res.send({
    status: 1,
    memsage: "获取产品信息失败",
})
}
  })
}
exports.getproductSearch=(req,res)=>{
  var search=req.query.search;
  const page=(req.query.page-1)*req.query.limit||1
  const limit=parseInt(req.query.limit)
  // const sqlstr="select * from product  where  product_name Like '%"+search+"%' or product_status Like '%"+search+"%' or category_id Like '%"+search+"%'"
  const sqlstr="select * from product where  product_name Like '%"+search+"%' or product_status Like '%"+search+"%' or category_id Like '%"+search+"%' limit ?,?"
  db.query(sqlstr,[page,limit],(err,results)=>{
    if (err) return res.cc(err)
    if(results.length>0){
      res.send({
       status: 0,
       memsage: "获取产品信息成功",
       data: results,
     })
    }else{
      res.send({
       status: 1,
       memsage: "获取产品信息失败",
     })
    }
  })
}
exports.Addproduct=(req,res)=>{
 const category_id=req.body.category_id
const create_time=req.body.create_time
 const default_img=req.body.default_img
 const discount_price=req.body.discount_price
 const product_count=req.body.product_count
 const product_desc=req.body.product_desc
 const product_name=req.body.product_name
 const product_price=req.body.product_price
 const product_status=req.body.product_status
 const sellout='111'
 const commentcount='222'
  const sqlstr='insert into product(product_id,product_name,category_id,product_count,product_status,create_time,default_img,product_price,discount_price,sellout,commentcount,product_desc) values(null,?,?,?,?,?,?,?,?,?,?,?)'
  db.query(sqlstr,[product_name,category_id,product_count,product_status,create_time,default_img,product_price,discount_price,sellout,commentcount,product_desc],(err,results)=>{
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('新增产品失败！')
    res.cc('新增产品成功！', 0)
  })
}
exports.Delproduct=(req,res)=>{
  const product_id=req.query.product_id
   const sqlstr='delete from product where product_id=?'
   db.query(sqlstr,[product_id],(err,results)=>{
     if (err) return res.cc(err)
     if (results.affectedRows !== 1) return res.cc('删除产品失败！')
     res.cc('删除产品成功！', 0)
   })
 }
 exports.Updateproduct=(req,res)=>{
  const category_id=req.body.category_id
const create_time=req.body.create_time
 const default_img=req.body.default_img
 const discount_price=req.body.discount_price
 const product_count=req.body.product_count
 const product_desc=req.body.product_desc
 const product_name=req.body.product_name
 const product_price=req.body.product_price
 const product_status=req.body.product_status
 const product_id=req.body.product_id
   const sqlstr='update product set product_name=?,category_id=?,product_count=?,product_status=?,create_time=?,default_img=?,product_price=?,discount_price=?,product_desc=? where product_id=?'
   db.query(sqlstr,[product_name,category_id,product_count,product_status,create_time,default_img,product_price,discount_price,product_desc,product_id],(err,results)=>{
     if (err) return res.cc(err)
     if (results.affectedRows !== 1) return res.cc('修改产品商品信息失败！')
     res.cc('修改产品信息成功！', 0)
   })
 }