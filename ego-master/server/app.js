const express=require('express')
const app=express()
const joi = require('joi')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
      res.send({
          status,
          message: err instanceof Error ? err.message : err
      })
  }
  next()
})
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({
    secret: config.JwtSecretkey,
    algorithms: ['HS256'],
}).unless({
    path: [/^\/admin/]
}))
app.use(express.static('upload'))
const productList = require('./router/productList')
app.use('/admin', productList)
const categoryList = require('./router/categoryList')
app.use('/admin', categoryList)
const upload = require('./router/upload')
app.use('/admin',upload)
const userRouter = require('./router/user')
app.use('/admin', userRouter)
const Mock = require('./router/mock')
app.use('/admin',Mock)
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  return res.cc(err)
})
app.listen(8889,()=>{
  console.log('已开启连接到http://localhost:8889');
})