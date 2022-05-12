const express =require('express')
const router=express.Router();
const expressJoi = require('@escook/express-joi')
const productList=require('../router_handler/productList')
const {get_product_schema,add_product_schema,del_product_schema,update_product_schema}=require('../schema/productList')
router.get('/productListLength',productList.getproductListLength)
router.get('/productList',expressJoi(get_product_schema),productList.getproductList)
router.get('/search',productList.getproductSearch)
router.get('/searchLength',productList.getproductSearchLength)
router.post('/Addproduct',expressJoi(add_product_schema),productList.Addproduct)
router.get('/Delproduct',productList.Delproduct)
router.post('/updateProductById',productList.Updateproduct)
module.exports = router