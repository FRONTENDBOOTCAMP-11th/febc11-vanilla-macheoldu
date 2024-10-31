/**
 * 애플리케이션의 전체 설정을 관리하는 설정 객체
 * 모든 중요한 상수 값, 설정 값들이 여기에 집중 되어있음
 */
const CONFIG = {
  /**
   * API 관련 설정
   * server와의 통신에 필요한 기본 URL과 Header 정보 포함
   */
  API: {
    // API 서버 기본 주소
    BASE_URL: 'https://11.fesp.shop',

    /**
     * API 요청 시 필요한 헤더 설정
     * client-id : 클라이언트 식별자
     * Content-Type: 서버로 보내는 데이터 형식 (JSON)
     * Accept: 서버로부터 받기를 원하는 데이터의 형식 (JSON)
     */
    HEADERS: {
      'client-id': 'vanilla03',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },

  /**
   * Local Storage에 저장되는 data key value
   * browser의 Local Storage에 data를 저장하고 불러올 때 사용
   */
  STORAGE_KEYS: {
    AUTHOR: 'todaysAuthor', // 오늘의 작가 정보
    POSTS: 'todaysAuthorPosts', // todaysPick 부분
    TIMESTAMP: 'todaysAuthorTimestamp', // 작가 정보가 저장된 시간
    FEATURED_BOOK: 'todaysFeaturedBook', // 오늘의 추천 도서
    FEATURED_BOOK_TIMESTAMP: 'todaysFeaturedBookTimestamp', // 추천 도서 저장 시간
  },

  /**
   * 요일 목록
   * 0(일요일) ~ 6(토요일)까지의 요일을 영어 소문자로 표현
   * 날짜 관련 기능에서 요일 표시할 때 사용
   */
  DAYS: [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ],

  /**
   * 하루를 ms로 변환한 값
   * 24h * 60m * 60s * 1000ms = 86,400,000 ms
   * 날짜 계산, timestamp 비교에 사용
   */
  ONE_DAY_MS: 24 * 60 * 60 * 1000,

  /**
   * 정적 자산(assets) 경로 설정
   * image, icon, logo 등의 파일이 저장된 디렉토리 경로
   */
  ASSETS: {
    IMAGES_PATH: '/assets/images/home', // 이미지 파일 경로
    ICONS_PATH: '/assets/icons', // 아이콘 파일 경로
    LOGOS_PATH: '/assets/logos', // 로고 파일 경로
  },
};

export default CONFIG;
