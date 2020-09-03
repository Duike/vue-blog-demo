import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Blog from "../views/blog/blogList"
import WebSocket from "../views/demo/webSocket"


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },


    {
      path: '/blog/blogList',
      component: Blog,
      name: 'blog'
    },
    {
      path: '/demo/webSocket',
      component: WebSocket,
      name: 'webSocket'
    },

  ]


})
