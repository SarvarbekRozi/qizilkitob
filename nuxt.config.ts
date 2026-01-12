// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-18',

  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/image', 'nuxt-icon', '@nuxtjs/google-fonts', '@vueuse/nuxt', 'nuxt-marquee'],

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'uz',
        iso: 'uz-UZ',
        file: 'uz.json',
        name: "O'zbek"
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English'
      }
    ],
    defaultLocale: 'uz',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Google Fonts
  googleFonts: {
    families: {
      Rubik: [300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap'
  },

  // CSS
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'swiper/css',
    'swiper/css/autoplay',
    'swiper/css/effect-fade',
    'swiper/css/pagination',
    'leaflet/dist/leaflet.css',
    '~/assets/css/variables.css',
    '~/assets/css/flaticon.css',
    '~/assets/css/main.css'
  ],

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/variables.css" as *;'
        }
      }
    }
  },

  // App configuration
  app: {
    head: {
      title: "Qizil Kitob - O'zbekiston",
      titleTemplate: '%s | Qizil Kitob',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: "Yo'qolib ketish xavfi ostidagi hayvonlar va o'simliklar haqida ma'lumot"
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
      ]
    }
  },

  // Target
  ssr: true
})