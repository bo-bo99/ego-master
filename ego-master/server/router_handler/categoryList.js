const db=require('../db/index')
exports.getCategoryListById=(req,res)=>{
  const id=req.query.id||1
  const sqlstr="select * from category where category_level=?"
  db.query(sqlstr,[id],(err,results)=>{
    if (err) return res.cc(err)
    if(results.length>0){
      res.send({
       status: 0,
       memsage: "获取产品类型信息成功",
       data: results,
     })
    }else{
      res.send({
       status: 1,
       memsage: "获取产品类型信息失败",
     })
    }
  })
}
exports.CategoryListByParentId=(req,res)=>{
  const id=req.query.id
  const sqlstr="select * from category where parent_id=?"
  db.query(sqlstr,[id],(err,results)=>{
    if (err) return res.cc(err)
    if(results.length>0){
      res.send({
       status: 0,
       memsage: "获取产品类型信息成功",
       data: results,
     })
    }else{
      res.send({
       status: 1,
       memsage: "获取产品类型信息失败",
     })
    }
  })
}
exports.getCategoryBycategoryName=(req,res)=>{
  const categoryName=req.query.categoryName
  const sqlstr="select * from category where category_name=?"
  db.query(sqlstr,[categoryName],(err,results)=>{
    if (err) return res.cc(err)
    if(results.length>0){
      res.send({
       status: 0,
       memsage: "获取产品类型信息成功",
       data: results,
     })
    }else{
      res.send({
       status: 1,
       memsage: "获取产品类型信息失败",
     })
    }
  })
}