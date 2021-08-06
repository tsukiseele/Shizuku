import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bd11d598 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _4313cfcc = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _dce96940 = () => interopDefault(import('..\\pages\\links.vue' /* webpackChunkName: "pages/links" */))
const _ea52d9e0 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _e8d61ece = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages/post/index" */))
const _3bc9926a = () => interopDefault(import('..\\pages\\timeline.vue' /* webpackChunkName: "pages/timeline" */))
const _39a13659 = () => interopDefault(import('..\\pages\\admin\\comment.vue' /* webpackChunkName: "pages/admin/comment" */))
const _106dac00 = () => interopDefault(import('..\\pages\\admin\\edit.vue' /* webpackChunkName: "pages/admin/edit" */))
const _410c1820 = () => interopDefault(import('..\\pages\\admin\\link.vue' /* webpackChunkName: "pages/admin/link" */))
const _82d1feb2 = () => interopDefault(import('..\\pages\\admin\\manager.vue' /* webpackChunkName: "pages/admin/manager" */))
const _11549ce0 = () => interopDefault(import('..\\pages\\archives\\_id.vue' /* webpackChunkName: "pages/archives/_id" */))
const _238a0a74 = () => interopDefault(import('..\\pages\\post\\_post.vue' /* webpackChunkName: "pages/post/_post" */))
const _7da2200e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _bd11d598,
    name: "about"
  }, {
    path: "/admin",
    component: _4313cfcc,
    name: "admin"
  }, {
    path: "/links",
    component: _dce96940,
    name: "links"
  }, {
    path: "/login",
    component: _ea52d9e0,
    name: "login"
  }, {
    path: "/post",
    component: _e8d61ece,
    name: "post"
  }, {
    path: "/timeline",
    component: _3bc9926a,
    name: "timeline"
  }, {
    path: "/admin/comment",
    component: _39a13659,
    name: "admin-comment"
  }, {
    path: "/admin/edit",
    component: _106dac00,
    name: "admin-edit"
  }, {
    path: "/admin/link",
    component: _410c1820,
    name: "admin-link"
  }, {
    path: "/admin/manager",
    component: _82d1feb2,
    name: "admin-manager"
  }, {
    path: "/archives/:id?",
    component: _11549ce0,
    name: "archives-id"
  }, {
    path: "/post/:post",
    component: _238a0a74,
    name: "post-post"
  }, {
    path: "/",
    component: _7da2200e,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
