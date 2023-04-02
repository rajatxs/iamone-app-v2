// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   pages: true,
   components: false,
   ssr: false,
   app: {
      head: {
         link: [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;700&display=swap' },
            { 
               rel: 'shortcut icon', 
               type: 'image/x-icon', 
               href: 'https://rajatxs.github.io/iamone-static/icons/favicon.ico',
            },
            { 
               rel: 'icon', 
               type: 'image/png',
               sizes: '16x16',
               href: 'https://rajatxs.github.io/iamone-static/icons/favicon-16x16.png',
            },
            { 
               rel: 'icon', 
               type: 'image/png',
               sizes: '32x32',
               href: 'https://rajatxs.github.io/iamone-static/icons/favicon-32x32.png',
            },
            { 
               rel: 'icon', 
               type: 'image/png',
               sizes: '192x192',
               href: 'https://rajatxs.github.io/iamone-static/icons/android-chrome-192x192.png',
            },
         ]
      }
   },
   css: [
      '@/assets/scss/base.scss',
      '@/assets/scss/global.scss',
   ]
})
