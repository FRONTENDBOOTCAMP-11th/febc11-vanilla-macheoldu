import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'src/features/home/home.html'),
        discover: resolve(__dirname, 'src/features/discover/discover.html'),
        write: resolve(__dirname, 'src/features/write/write.html'),
        myBox: resolve(__dirname, 'src/features/myBox/myBox.html'),
        author: resolve(__dirname, 'src/features/author/author.html'),
        detail: resolve(__dirname, 'src/features/detail/detail.html'),
        start: resolve(__dirname, 'src/features/start/start.html'),
        signUp: resolve(__dirname, 'src/features/start/signUp.html'),
        startKakao: resolve(__dirname, 'src/features/start/start-kakao.html'),
        loginKakao: resolve(__dirname, 'src/features/start/login-kakao.html'),
        topMenu: resolve(
          __dirname,
          'src/features/components/top-menu/top-menu.html',
        ),
        navigation: resolve(
          __dirname,
          'src/features/components/navigation/navigation.html',
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