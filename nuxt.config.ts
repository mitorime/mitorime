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
        { hid: 'og:image', property: 'og:image', content: 'https://lh3.googleusercontent.com/pw/AP1GczMG0G3yfEw5Wbd31ku769zFBBoKRvKUsbM5w3mTdqEBEKMKaqDrrgCkg3CPjo8O6-QDTMSYrer6Mm7HuiZMeGabYvj4QoUjeD9HEnI1TJPD7nEXaz9nVHTfqzj9iE2kVa9BnKqJ2otulBtAnXvgNmFF=w1600-h838-s-no', },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@mitorime' }
      ],
      link: [{
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        }, {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap",
          crossorigin: ""
        }, {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "@/public/apple-touch-icon.png"
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
