import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      // 应用清单
      manifest: {
        name: 'Web Chat',
        short_name: 'Web Chat',
        description: 'Web Chat',
        theme_color: '#579690',
        icons: [
          {
            src: 'pwa.webp',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'pwa.webp',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa.webp',
            sizes: '1024x1024',
            type: 'image/png'
          }
        ]
      },
      // 注册ws方式
      injectRegister: 'auto',
      // 设置缓存资源
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,jpg,jpeg}']
      },
      //dev环境也开启pwa
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
