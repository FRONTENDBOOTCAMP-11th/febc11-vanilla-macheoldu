import CONFIG from '../config.js';

/**
 * Local Storage 관리 서비스
 * browser의 Local Storage에 data를 저장하고 불러오는 기능을 담당
 *
 * Local Storage?
 * - browser에서 제공하는 data 저장소
 * - page를 닫았다 열어도 데이터가 유지 됨
 * - 문자열 형태로 data를 저장
 */
export const storageService = {
  /**
   * 지정된 작가 정보가 유효한지 검사하는 함수
   * 오늘 자정을 기준으로 data의 유효성을 판단
   */
  isStoredAuthorValid: () => {
    const timestamp = localStorage.getItem(CONFIG.STORAGE_KEYS.TIMESTAMP);
    if (!timestamp) return false;

    // 현재 날짜와 자정 시간 구하기
    const now = new Date();
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

    // 저장된 시간이 오늘 자정 이전인지 확인
    const storedTime = new Date(parseInt(timestamp));
    const storedMidnight = new Date(
      storedTime.getFullYear(),
      storedTime.getMonth(),
      storedTime.getDate(),
      0,
      0,
      0,
      0,
    );

    return storedMidnight >= todayMidnight;
  },

  /**
   * 작가 데이터를 Local Storage에 저장하는 함수
   * 작가 정보, 게시글, 저장 시간을 함께 저장
   */
  storeAuthorData: (author, posts) => {
    localStorage.setItem(CONFIG.STORAGE_KEYS.AUTHOR, JSON.stringify(author));
    localStorage.setItem(CONFIG.STORAGE_KEYS.POSTS, JSON.stringify(posts));
    localStorage.setItem(
      CONFIG.STORAGE_KEYS.TIMESTAMP,
      new Date().getTime().toString(),
    );
  },

  // 저장된 작가 데이터 조회
  getStoredAuthorData: () => {
    try {
      return {
        author: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.AUTHOR)),
        posts: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.POSTS)),
      };
    } catch (error) {
      console.error('저장된 작가 데이터 파싱 오류:', error);
      return null;
    }
  },

  /**
   * 저장된 추천 도서 유효성 검사
   * 시간 체크 및 필수 데이터 존재 여부 확인
   */
  isStoredFeaturedBookValid: () => {
    const timestamp = localStorage.getItem(
      CONFIG.STORAGE_KEYS.FEATURED_BOOK_TIMESTAMP,
    );
    if (!timestamp) return false;

    // 시간 유효성 검사
    const now = new Date().getTime();
    if (now - parseInt(timestamp) >= CONFIG.ONE_DAY_MS) return false;

    // 저장된 데이터 유효성 검사
    try {
      const bookData = JSON.parse(
        localStorage.getItem(CONFIG.STORAGE_KEYS.FEATURED_BOOK),
      );
      if (!bookData) return false;

      // 필수 필드 존재 여부 확인
      const requiredFields = ['title', 'author', 'postId'];
      return requiredFields.every(field => bookData[field]);
    } catch (error) {
      console.error('추천 도서 데이터 검증 오류:', error);
      return false;
    }
  },

  /**
   * 추천 도서 저장
   * 필수 필드 검증 후 저장
   */
  storeFeaturedBook: bookData => {
    if (!bookData) return;

    // 필수 필드 검증
    const requiredFields = ['title', 'author', 'postId'];
    const isValid = requiredFields.every(field => bookData[field]);

    if (!isValid) {
      console.error('필수 필드가 누락된 도서 데이터:', bookData);
      return;
    }

    // 검증된 데이터만 저장
    const validatedData = {
      title: bookData.title,
      author: bookData.author,
      quote: bookData.quote || '',
      postId: bookData.postId,
    };

    localStorage.setItem(
      CONFIG.STORAGE_KEYS.FEATURED_BOOK,
      JSON.stringify(validatedData),
    );
    localStorage.setItem(
      CONFIG.STORAGE_KEYS.FEATURED_BOOK_TIMESTAMP,
      new Date().getTime().toString(),
    );
  },

  /**
   * 저장된 추천 도서 조회
   * 필수 필드가 있는 완전한 데이터만 반환
   */
  getStoredFeaturedBook: () => {
    try {
      const bookData = JSON.parse(
        localStorage.getItem(CONFIG.STORAGE_KEYS.FEATURED_BOOK),
      );

      if (!bookData) return null;

      // 필수 필드 검증
      const requiredFields = ['title', 'author', 'postId'];
      const isValid = requiredFields.every(field => bookData[field]);

      return isValid ? bookData : null;
    } catch (error) {
      console.error('저장된 추천 도서 데이터 파싱 오류:', error);
      return null;
    }
  },
};
