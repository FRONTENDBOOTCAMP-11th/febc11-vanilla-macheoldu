import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        // home
        home: resolve(__dirname, 'src/features/home/home.html'),
        homeCSS: resolve(__dirname, 'src/features/home/home.css'),
        homeJS: resolve(__dirname, 'src/features/home/home.js'),
        homeConfigJS: resolve(__dirname, 'src/features/home/config.js'),
        homeUtilsJS: resolve(__dirname, 'src/features/home/utils.js'),
        // home components
        homeComponentsoverSliderJS: resolve(
          __dirname,
          'src/features/home/components/CoverSlider.js',
        ),
        homeComponentsTopAuthorsJS: resolve(
          __dirname,
          'src/features/home/components/TopAuthors.js',
        ),
        homeComponentsWeeklySeriesManagerJS: resolve(
          __dirname,
          'src/features/home/components/WeeklySeriesManager.js',
        ),
        // home services
        homeServicesAuthorDataHandlerJS: resolve(
          __dirname,
          'src/features/home/services/authorDataHandler.js',
        ),
        homeServicesAuthorServiceJS: resolve(
          __dirname,
          'src/features/home/services/authorService.js',
        ),
        homeServicesFeaturedBookServiceJS: resolve(
          __dirname,
          'src/features/home/services/featuredBookService.js',
        ),
        homeServicesRenderServiceJS: resolve(
          __dirname,
          'src/features/home/services/renderService.js',
        ),
        homeServicesStorageServiceJS: resolve(
          __dirname,
          'src/features/home/services/storageService.js',
        ),

        // discover
        discover: resolve(__dirname, 'src/features/discover/discover.html'),
        discoverCSS: resolve(__dirname, 'src/features/discover/discover.css'),
        discoverJS: resolve(__dirname, 'src/features/discover/discover.js'),

        // write
        write: resolve(__dirname, 'src/features/write/write.html'),
        writeCSS: resolve(__dirname, 'src/features/write/write.css'),
        writeJS: resolve(__dirname, 'src/features/write/write.js'),

        // myBox
        myBox: resolve(__dirname, 'src/features/myBox/myBox.html'),
        myBoxCSS: resolve(__dirname, 'src/features/myBox/myBox.css'),
        myBoxJS: resolve(__dirname, 'src/features/myBox/myBox.js'),

        // author
        author: resolve(__dirname, 'src/features/author/author.html'),
        authorCSS: resolve(__dirname, 'src/features/author/author.css'),
        authorJS: resolve(__dirname, 'src/features/author/author.js'),

        // detail
        detail: resolve(__dirname, 'src/features/detail/detail.html'),
        detailCSS: resolve(__dirname, 'src/features/detail/detail.css'),
        detailJS: resolve(__dirname, 'src/features/detail/detail.js'),

        // start
        // start > main
        start: resolve(__dirname, 'src/features/start/start.html'),
        startCSS: resolve(__dirname, 'src/features/start/start.css'),
        startJS: resolve(__dirname, 'src/features/start/start.js'),
        // start > signUp
        signUp: resolve(__dirname, 'src/features/start/signUp.html'),
        signUpJS: resolve(__dirname, 'src/features/start/signUp.js'),

        // components
        // components > top-menu
        topMenu: resolve(
          __dirname,
          'src/features/components/top-menu/top-menu.html',
        ),
        topMenuCSS: resolve(
          __dirname,
          'src/features/components/top-menu/top-menu.css',
        ),
        topMenuJS: resolve(
          __dirname,
          'src/features/components/top-menu/top-menu.js',
        ),
        // components > navigation
        navigation: resolve(
          __dirname,
          'src/features/components/navigation/navigation.html',
        ),
        navigationCSS: resolve(
          __dirname,
          'src/features/components/navigation/navigation.css',
        ),
        navigationJS: resolve(
          __dirname,
          'src/features/components/navigation/navigation.js',
        ),
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
