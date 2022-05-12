const express=require('express')
const router=express.Router()
const upload=require('../router_handler/uploadImg')
router.post('/uploadimg',upload.uploadimg)
module.exports=router