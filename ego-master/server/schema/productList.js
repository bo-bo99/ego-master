const joi = require('joi')
const page = joi.number().integer().min(1).required()
const limit = joi.number().integer().min(1).required()
const product_id=joi.number().integer().min(1).required()
const category_id=joi.number().integer().min(1).required()
const create_time=joi.string()
const default_img=joi.string()
const discount_price=joi.string()
const product_count=joi.string().required()
const product_desc=joi.string()
const product_name=joi.string().required()
const product_price=joi.string().required()
const product_status= joi.number().integer().min(0).max(1).required()
exports.get_product_schema = {
    query: {
        page,limit
    },
}
exports.add_product_schema={
    body: {
        category_id,create_time,default_img,discount_price,product_count,product_desc,product_name,product_price,product_status
    },
}
exports.del_product_schema={
    body: {
        product_id
    },
}
exports.update_product_schema={
    body: {
        product_id,category_id,create_time,default_img,discount_price,product_count,product_desc,product_name,product_price,product_status
    },
}