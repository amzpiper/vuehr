// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import less from 'less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  getRequest
} from './utils/api'
import {
  postRequest
} from './utils/api'
import {
  deleteRequest
} from './utils/api'
import {
  putRequest
} from './utils/api'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})
Vue.use(less)
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

// 就是利用路由的导购守卫beforeEach在每次页面跳转前更改对应的title
// 第一步：首先在route里面给每个路由加上meta属性
// 第二步：在main.js里面加上导航守卫
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
  if (to.meta.requireAuth) {
    let token = Cookies.get('access_token');
    let anonymous = Cookies.get('user_name');
    if (token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
