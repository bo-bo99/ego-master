import router from './index'
import store from '@/store/index.js'
//路由拦截
router.beforeEach((to,from,next)=>{
// console.log("to---",to);
//判断是否需要登录
if(to.matched.some(ele=>ele.meta.isLogin)){
  let token=store.state.loginModule.userinfo.token
  if(token){
    next()
  }else{
    next('/login')
  }
}
else{
  next();
}
})