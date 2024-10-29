import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        // home 
        home: resolve(__dirname, 'src/features/home/home.html'),
        homeJS: resolve(__dirname, 'src/features/home/home.js'),
        homeCSS: resolve(__dirname, 'src/features/home/home.css'),
        homeConfigJS: resolve(__dirname, 'src/features/home/config.js'),
        coverSliderJS: resolve(__dirname, 'src/features/home/coverSlider.js'),
        topAuthorsJS: resolve(__dirname, 'src/features/home/topAuthors.js'),

        // discover
        discover: resolve(__dirname, 'src/features/discover/discover.html'),
        discoverJS: resolve(__dirname, 'src/features/discover/discover.js'),
        discoverCSS: resolve(__dirname, 'src/features/discover/discover.css'),

        // write
        write: resolve(__dirname, 'src/features/write/write.html'),
        writeJS: resolve(__dirname, 'src/features/write/write.js'),
        writeCSS: resolve(__dirname, 'src/features/write/write.css'),

        // myBox
        myBox: resolve(__dirname, 'src/features/myBox/myBox.html'),
        myBoxJS: resolve(__dirname, 'src/features/myBox/myBox.js'),
        myBoxCSS: resolve(__dirname, 'src/features/myBox/myBox.css'),

        // author
        author: resolve(__dirname, 'src/features/author/author.html'),
        authorJS: resolve(__dirname, 'src/features/author/author.js'),
        authorCSS: resolve(__dirname, 'src/features/author/author.css'),

        // detail
        detail: resolve(__dirname, 'src/features/detail/detail.html'),
        detailJS: resolve(__dirname, 'src/features/detail/detail.js'),
        detailCSS: resolve(__dirname, 'src/features/detail/detail.css'),

        // start
        // start > main
        start: resolve(__dirname, 'src/features/start/start.html'),
        startJS: resolve(__dirname, 'src/features/start/start.js'),
        startCSS: resolve(__dirname, 'src/features/start/start.css'),
        // start > signUp
        signUp: resolve(__dirname, 'src/features/start/signUp.html'),
        signUpJS: resolve(__dirname, 'src/features/start/signUp.js'),

        // components
        // components > top-menu
        topMenu: resolve(__dirname, 'src/features/components/top-menu/top-menu.html'),
        topMenuJS: resolve(__dirname, 'src/features/components/top-menu/top-menu.js'),
        topMenuCSS: resolve(__dirname, 'src/features/components/top-menu/top-menu.css'),
        // components > navigation
        navigation: resolve(__dirname, 'src/features/components/navigation/navigation.html'),
        navigationJS: resolve(__dirname, 'src/features/components/navigation/navigation.js'),
        navigationCSS: resolve(__dirname, 'src/features/components/navigation/navigation.css'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://11.fesp.shop',
        changeOrigin: true,
        secure: false, // HTTPS 인증서 검증 건너뛰기
        rewrite: path => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'https://11.fesp.shop');
          });
        },
      },
    },
    cors: true, // CORS 활성화
    headers: {
      // 기본 헤더 설정
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  },
  appType: 'mpa',
});