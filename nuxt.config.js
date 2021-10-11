import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: 'Web Clock',
    title: 'Web Clock',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },

      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'description', content: 'Clock Online - exact time with night mode, custom themes and digital view. More functionality awaits you in the future. Project without ads.' },
      { name: 'keywords', content: 'online clock, web clock, online time, time now, synchronizing clock, week' },
      { name: 'robots', content: 'index, follow' },
      { property: 'vk:image"', content: 'img/og_vkontakte.png' },

      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'Web Clock' },
      { property: 'og:description', content: 'Clock Online - exact time with night mode, custom themes and digital view. More functionality awaits you in the future. Project without ads.' },
      { property: 'og:image', content: 'img/og_facebook.png' },
      { property: 'og:url', content: 'webclock.online' },
      { property: 'og:site_name', content: 'webclock.online' },

      { name: 'twitter:title', content: 'Web Clock' },
      { name: 'twitter:description', content: 'Clock Online - exact time with night mode, custom themes and digital view. More functionality awaits you in the future. Project without ads.' },
      { name: 'twitter:image', content: 'img/og_twitter.png' },
      { name: 'twitter:site', content: 'webclock.online' },
      { name: 'twitter:creator', content: '@gonzales_pavel' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'img/icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'img/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'img/icons/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: 'img/icons/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'canonical', href: 'webclock.online' },
    ]
  },

  css: [
    '~/styles/main.css',
  ],

  plugins: [
    {src: '~/plugins/vue-gtag',}
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.lightBlue.accent3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
  }
}
