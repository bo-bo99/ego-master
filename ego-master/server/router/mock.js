const express = require('express')
const router = express.Router()
const Mockhandle = require('../router_handler/mock')
router.get('/mock',Mockhandle.getmock)

module.exports=router