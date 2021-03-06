const pkg = require('./package')


module.exports = {
  mode: 'universal',

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    script: [
      {src: "https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js"}
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  manifest: {
    theme_color: '#1B1B1D',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fdf4ff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vue-awesome', ssr: false },
    { src: '~plugins/vue-axios', ssr: false },
    { src: '~plugins/vue-touch', ssr: false },
    { src: '~plugins/drag_and_drop', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

}
