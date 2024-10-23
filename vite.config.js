import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'), // 기본 index.html
        home: resolve(__dirname, '/src/features/home/home.html'), // 홈 페이지 .html
        discover: resolve(__dirname, '/src/features/discover/discover.html'), // 발견 페이지 .html
        write: resolve(__dirname, '/src/features/write/write.html'), // 글쓰기 페이지 .html
        myBox: resolve(__dirname, '/src/features/myBox/myBox.html'), // 내 서랍 페이지 .html
        author: resolve(__dirname, '/src/features/author/author.html'), // 작가 홈 페이지 .html
        detail: resolve(__dirname, '/src/features/detail/detail.html'), // 상세 페이지 .html
        topMenu: resolve(__dirname, '/src/features/components/top-menu/top-menu.html'), // 상단 메뉴 .html
        navigation: resolve(__dirname, '/src/features/components/navigation/navigation.html'), // 상세 페이지 .html
        // login: resolve(__dirname, 'src/pages/auth/login.html'), // 추가 HTML 파일
        // list: resolve(__dirname, 'src/pages/board/list.html'), // 추가 HTML 파일
        // 필요한 다른 HTML 파일을 여기에 추가
      },
    },
  },
  appType: 'mpa', // fallback url 사용안함
});