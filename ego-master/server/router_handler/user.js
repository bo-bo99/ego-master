const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config');
exports.regUser = (req, res) => {
    const userInfo = req.body
    const sqlstr = 'select * from users where username=?'
    db.query(sqlstr, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc("用户名已被注册,请更换其他用户名")
        }
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sqlstr = 'insert into users set ?'
        db.query(sqlstr, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("用户注册失败,请稍后再试")
            }

            res.cc("用户注册成功", 0)
        })

    })
}
exports.login = (req, res) => {
    const userInfo = req.body
    const sqlstr = 'select * from users where username=?'
    db.query(sqlstr, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length !== 1) return res.cc("用户不存在")
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('密码错误')
        }
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.JwtSecretkey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: "登录成功",
            token: 'Bearer ' + tokenStr,
            username:userInfo.username
        })
    })
}