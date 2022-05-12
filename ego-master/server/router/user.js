const express = require('express')
const router = express.Router()

const userHnadle = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
router.post('/reguser', expressJoi(reg_login_schema), userHnadle.regUser)
router.post('/login', expressJoi(reg_login_schema), userHnadle.login)
module.exports = router  