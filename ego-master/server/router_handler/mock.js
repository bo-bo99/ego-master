const  Mock  = require('mockjs')

exports.getmock=(req,res)=>{
  let data=Mock.mock({
    info:"对象",
    "string|1-10": "★",
    "list|6":[{
      "id|+1":1,
    }
    ]
  })
  res.send(data)
}