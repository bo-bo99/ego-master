const express=require('express')
const router=express.Router()
const expressJoi = require('@escook/express-joi')
const categoryList=require('../router_handler/categoryList')
router.get('/CategoryListById',categoryList.getCategoryListById)
router.get('/CategoryListByParentId',categoryList.CategoryListByParentId)
router.get('/getCategoryBycategoryName',categoryList.getCategoryBycategoryName)
module.exports=router