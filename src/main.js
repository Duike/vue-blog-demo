// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routes'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'//使用axios做请求
import Md5 from './utils/md5'

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.Md5 = Md5;


Vue.prototype.url = "http://localhost:8080";

//请求路径之后
router.afterEach((to,from,next) => {
});
//请求路径之前
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('Token');
  }
  let user = sessionStorage.getItem('Token');
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Md5,
  components: { App },
  template: '<App/>'
})
