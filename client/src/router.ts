import * as VueRouter from "vue-router";
import post from "./view/post.vue";
import list from "./view/list.vue";
import detail from "./view/detail.vue";
import login from "./view/login.vue";
import register from "./view/register.vue";
import center from './view/center.vue'
import App from "./App.vue";
import {getToken} from "./utils/token";
import {useUser} from "./store/user";
import http from "./http";

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: "/",
      component: App,
      redirect: "/list",
    },
    {
      path: "/list",
      component: list,
    },
    {
      path: "/post",
      component: post,
    },
    {
      path: "/detail",
      component: detail,
    },
    {
      path: "/register",
      component: register,
    },
    {
      path: "/login",
      component: login,
    },
    {
      path: "/center",
      component: center,
    },
  ],
});
router.beforeEach((to,form,next)=>{
  const user = useUser()
  if(getToken()&&!Object.keys(user.user).length){
    user.fetchUser()
  }
  next()
})