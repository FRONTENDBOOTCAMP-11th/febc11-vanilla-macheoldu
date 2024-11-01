import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        // home
        home: 'src/features/home/home.html',

        // discover
        discover: 'src/features/discover/discover.html',

        // write
        write: 'src/features/write/write.html',

        // myBox
        myBox: 'src/features/myBox/myBox.html',

        // author
        author: 'src/features/author/author.html',

        // detail
        detail: 'src/features/detail/detail.html',

        // start
        // start > main
        start: 'src/features/start/start.html',
        // start > signUp
        signUp: 'src/features/start/signUp.html',

        // components
        // components > top-menu
        topMenu: 'src/features/components/top-menu/top-menu.html',
        // components > navigation
        navigation: 'src/features/components/navigation/navigation.html',
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
