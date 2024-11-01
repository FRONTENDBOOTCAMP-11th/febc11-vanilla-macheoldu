// 외부 라이브러리와 컴포넌트 import
import { initializeCoverSlider } from './components/CoverSlider.js';
import { WeeklyPostsManager } from './components/WeeklySeriesManager.js';
import { storageService } from './services/storageService.js';
import { featuredBookService } from './services/featuredBookService.js';
import {
  handleStoredAuthorData,
  handleNewData,
} from './services/authorDataHandler.js';

/**
 * 페이지 초기화 함수
 * 페이지에 필요한 모든 데이터를 가져오고 화면을 구성
 *
 * 초기화 순서:
 * 1. 커버 슬라이더 초기화
 * 2. 요일별 연재 섹션 초기화
 * 3. 추천 도서 처리
 * 4. 작가 데이터 처리
 */
const initialize = async () => {
  try {
    console.log('Starting initialization...');

    // 1. 커버 슬라이더 초기화
    await initializeCoverSlider();
    console.log('Cover slider initialized');

    // 2. 요일별 연재 초기화
    const weeklyPosts = new WeeklyPostsManager();
    weeklyPosts.init();

    // 3. 추천 도서
    const $featuredBookSection = document.querySelector('.main__featured-book');
    let featuredBook;

    // 4. 저장된 추천 도서 확인
    if (storageService.isStoredFeaturedBookValid()) {
      featuredBook = storageService.getStoredFeaturedBook();
      if (featuredBook && $featuredBookSection) {
        $featuredBookSection.innerHTML =
          featuredBookService.renderFeaturedBook(featuredBook);
      }
    }

    // 5. 저장된 작가 데이터 확인 및 처리
    if (storageService.isStoredAuthorValid()) {
      const storedData = storageService.getStoredAuthorData();
      if (storedData?.author && storedData?.posts) {
        await handleStoredAuthorData(
          storedData,
          featuredBook,
          $featuredBookSection,
        );
        return;
      }
    }

    // 6. 새로운 데이터 가져오기
    await handleNewData($featuredBookSection, featuredBook);
  } catch (error) {
    console.error('초기화 오류:', error);
  }
};

/**
 * 페이지 로드 시 초기화 실행
 * DOM이 완전히 로드된 후 초기화를 시작합
 */
if (document.readyState === 'loading') {
  // 아직 DOM이 로드 중인 경우
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // 이미 DOM이 로드된 경우
  initialize();
}
