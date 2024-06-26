export default defineNuxtConfig({
  app: {
    head: {
      title: 'ミトリメ',
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '語られうるものたち. つれづれに.' },
        { hid: 'og:title', property: 'og:title', content: 'ミトリメ' },
        { hid: 'og:description', property: 'og:description', content: '語られうるものたち. つれづれに.' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'ミトリメ' },
        { hid: 'og:url', property: 'og:url', content: 'https://mitori.me/' },
        { hid: 'og:image', property: 'og:image', content: 'https://lh3.googleusercontent.com/pw/AP1GczO3KZi7Fh8eSBa8RaHXea7xbzJ0-DzuZLZCZyaBiGHBGNUN-yJ2QehXE38gmVz-QuU0e-5IGKKArsaMUoM40U-AyFPbr8sMVUjgrulDQhygJ_90cyfFORgqMAgkG7we6YTOcqFgrbqLw1y2BZi6xFA=w1600-h900-s-no', },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@mitorime' }
      ],
      link: [{
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        }, {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700&display=swap",
          crossorigin: ""
        }]
    }
  },
  devtools: {
    enabled: true
  },
  css: [
    "@/assets/main.scss",
    "@/assets/md.scss"
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/var.scss";'
        }
      }
    }
  },
  modules: [
    '@nuxt/content'
  ],
  content: {
    contentHead: false,
    markdown: {
      anchorLinks: false,
      remarkPlugins: [
        'remark-breaks'
      ]
    }
  }
})
