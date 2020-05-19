// ie兼容问题
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入iview
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import '@/assets/icons/iconfont.css'

//引入elmentui



// // 鼠标滚动预警
import 'default-passive-events'
import xss from 'xss'
import config from '@/config'
import installPlugin from '@/plugin'

// // 全局文件
import global_ from './libs/variable.js'
import './assets/styles/base.less'
import './assets/styles/common.less'

// customer component
import '@/components'
Vue.prototype.GLOBAL = global_

Vue.use(router)
Vue.use(ViewUI)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$xss = xss

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
