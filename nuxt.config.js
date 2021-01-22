export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Shizuku',
    htmlAttrs: {
      lang: 'cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // FontAwesome图标库
      { rel: 'stylesheet', href: '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },
  /*
  axios: {
    retry: { retries: 3 },
    // 启用代理
    proxy: true,
    // CA认证
    credentials: true,
    // 
    //baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT||80}`,
    // 自动追加前缀
    //prefix: 'https://localhost/'
  },*/

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ress",
    "~/assets/css/styles.scss",
  ],

  // Plugins to run before rendering pasge: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.js',
    '~/plugins/utils.js',
    '~/plugins/filter.js',
    '~/plugins/inject.js',
    '~/plugins/lib-aos.client.js',
    '~/plugins/lib-vuex-persistedstate.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
