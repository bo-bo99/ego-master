# 易购管理系统

## 项目启动准备
```
npm install
```

### 项目启动
```
npm run serve
```

### 项目打包
```
npm run build
```

### 导入数据库mydb02.sql（大多数没有图片）

### 开启服务器（nodejs实现的）

#### 先开始进入server文件夹

```
cd server
```

```
nodemon app.js
```

#### config.js设置jwt的秘钥和持续时间

```
module.exports = {
    JwtSecretkey: "dzy^_^",
    expiresIn: '10h',
}
```

#### db文件夹里index.js 连接数据库

```
const mysql=require('mysql')
const db=mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'mydb02'
})
module.exports=db
```



### 效果

[image-20220313193702061.png](https://gitee.com/user1542043226/ego/blob/master/image-20220313193702061.png)

商品列表

![image-20220313193824264](https://gitee.com/user1542043226/ego/blob/master/image-20220313193824264.png)

添加

![image-20220313194001822](https://gitee.com/user1542043226/ego/blob/master/image-20220313194001822.png)

编辑

![image-20220313193840415](https://gitee.com/user1542043226/ego/blob/master/image-20220313193840415.png)

删除

![image-20220313194033555](https://gitee.com/user1542043226/ego/blob/master/image-20220313194033555.png)

vuex国际化

![image-20220313193931674](https://gitee.com/user1542043226/ego/blob/master/image-20220313193931674.png)

登录界面

![image-20220313194055861](https://gitee.com/user1542043226/ego/blob/master/image-20220313194055861.png)

账号admina

密码111111
