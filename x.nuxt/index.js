import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_3713a416 from 'nuxt_plugin_plugin_3713a416' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_axios_657fed8e from 'nuxt_plugin_axios_657fed8e' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_api_785206da from 'nuxt_plugin_api_785206da' // Source: ..\\plugins\\api.js (mode: 'all')
import nuxt_plugin_utils_1ea7651c from 'nuxt_plugin_utils_1ea7651c' // Source: ..\\plugins\\utils.js (mode: 'all')
import nuxt_plugin_filter_3b4804c9 from 'nuxt_plugin_filter_3b4804c9' // Source: ..\\plugins\\filter.js (mode: 'all')
import nuxt_plugin_inject_7bfac410 from 'nuxt_plugin_inject_7bfac410' // Source: ..\\plugins\\inject.js (mode: 'all')
import nuxt_plugin_asciiclient_968c6c8e from 'nuxt_plugin_asciiclient_968c6c8e' // Source: ..\\plugins\\ascii.client.js (mode: 'client')
import nuxt_plugin_libaosclient_a29580b6 from 'nuxt_plugin_libaosclient_a29580b6' // Source: ..\\plugins\\lib-aos.client.js (mode: 'client')
import nuxt_plugin_libvuexpersistedstateclient_77ff3f19 from 'nuxt_plugin_libvuexpersistedstateclient_77ff3f19' // Source: ..\\plugins\\lib-vuex-persistedstate.client.js (mode: 'client')
import nuxt_plugin_libmavoneditorclient_7dc68e56 from 'nuxt_plugin_libmavoneditorclient_7dc68e56' // Source: ..\\plugins\\lib-mavon-editor.client.js (mode: 'client')
import nuxt_plugin_libvuelazyloadclient_363caf9d from 'nuxt_plugin_libvuelazyloadclient_363caf9d' // Source: ..\\plugins\\lib-vue-lazyload.client.js (mode: 'client')
import nuxt_plugin_liblive2dclient_22ca337a from 'nuxt_plugin_liblive2dclient_22ca337a' // Source: ..\\plugins\\lib-live2d.client.js (mode: 'client')
import nuxt_plugin_libaplayerclient_660b6a3c from 'nuxt_plugin_libaplayerclient_660b6a3c' // Source: ..\\plugins\\lib-aplayer.client.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Shizuku - TsukiSeele的个人小站","htmlAttrs":{"lang":"zh-CN"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","href":"\u002F\u002Fnetdna.bootstrapcdn.com\u002Ffont-awesome\u002F4.7.0\u002Fcss\u002Ffont-awesome.min.css"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_3713a416 === 'function') {
    await nuxt_plugin_plugin_3713a416(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_657fed8e === 'function') {
    await nuxt_plugin_axios_657fed8e(app.context, inject)
  }

  if (typeof nuxt_plugin_api_785206da === 'function') {
    await nuxt_plugin_api_785206da(app.context, inject)
  }

  if (typeof nuxt_plugin_utils_1ea7651c === 'function') {
    await nuxt_plugin_utils_1ea7651c(app.context, inject)
  }

  if (typeof nuxt_plugin_filter_3b4804c9 === 'function') {
    await nuxt_plugin_filter_3b4804c9(app.context, inject)
  }

  if (typeof nuxt_plugin_inject_7bfac410 === 'function') {
    await nuxt_plugin_inject_7bfac410(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_asciiclient_968c6c8e === 'function') {
    await nuxt_plugin_asciiclient_968c6c8e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libaosclient_a29580b6 === 'function') {
    await nuxt_plugin_libaosclient_a29580b6(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libvuexpersistedstateclient_77ff3f19 === 'function') {
    await nuxt_plugin_libvuexpersistedstateclient_77ff3f19(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libmavoneditorclient_7dc68e56 === 'function') {
    await nuxt_plugin_libmavoneditorclient_7dc68e56(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libvuelazyloadclient_363caf9d === 'function') {
    await nuxt_plugin_libvuelazyloadclient_363caf9d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_liblive2dclient_22ca337a === 'function') {
    await nuxt_plugin_liblive2dclient_22ca337a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libaplayerclient_660b6a3c === 'function') {
    await nuxt_plugin_libaplayerclient_660b6a3c(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
