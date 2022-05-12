import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import engilsh from '@/lang/enlish.js'
import chinese from '@/lang/chinese.js'
Vue.use(VueI18n)

const messages={
  en:{
    ...engilsh,
    //导入element-ui里面的国际化语法
    ...enLocale
  },
  zh:{
    ...chinese,
    ...zhLocale
  },
 

}

const i18n=new VueI18n({
  locale:'zh',
  silentFallbackWarn:true, //控制台上不打印警告
  messages
})

//兼容写法
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
export default i18n