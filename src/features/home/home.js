// 외부 라이브러리와 컴포넌트 import
import axios from 'axios';
import initializeTopAuthors from './topAuthors.js';
import { initializeCoverSlider } from './coverSlider.js';
import CONFIG from './config.js';

// 게시글 API 주소 상수
const POSTS_API_ADDRESS = '/posts?type=info';

/**
 * axios 인스턴스 생성
 * - baseURL: 모든 요청의 기본이 되는 서버 주소
 * - headers: 서버와 통신할 때 필요한 인증 정보
 */
const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: CONFIG.API.HEADERS,
});

/**
 * 유틸리티 함수들을 모아둔 객체
 * 자주 사용되는 편리한 기능들을 모아놓은 도구 상자와 같음.
 */
const utils = {
  /**
   * 날짜를 계산하는 함수
   * @param {string} type - 계산할 단위 (year/month/day)
   * @param {number} value - 더하거나 뺄 값
   * @param {number} year - 특정 연도 (선택사항)
   * @param {number} month - 특정 월 (선택사항)
   * @param {number} day - 특정 일 (선택사항)
   * @returns {string} 계산된 날짜를 형식화한 문자열
   *
   * 예시:
   * calculateDate('day', -3) // 3일 전 날짜
   * calculateDate('month', 1) // 1달 후 날짜
   */
  calculateDate: (type, value, year, month, day) => {
    const baseDate = new Date();

    if (year !== undefined) baseDate.setFullYear(year);
    if (month !== undefined) baseDate.setMonth(month - 1);
    if (day !== undefined) baseDate.setDate(day);

    if (type) {
      switch (type.toLowerCase()) {
        case 'year':
          baseDate.setFullYear(baseDate.getFullYear() + value);
          break;
        case 'month':
          baseDate.setMonth(baseDate.getMonth() + value);
          break;
        case 'day':
          baseDate.setDate(baseDate.getDate() + value);
          break;
        default:
          throw new Error(
            '유효하지 않은 타입입니다. year, month, day 중 하나를 사용하세요.',
          );
      }
    }

    return utils.formatDate(baseDate);
  },

  /**
   * 날짜를 형식화하는 함수
   * 날짜 객체를 'YYYY.MM.DD HH:mm:ss' 형식의 문자열로 반환
   */
  formatDate: date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  },

  /**
   * 이미지 URL을 생성하는 함수
   * sever 이미지 경로를 전체 URL로 반환
   */
  getImgUrl: imgPath => `${CONFIG.API.BASE_URL}${imgPath}`,

  /**
   * 요일을 가져오는 함수들
   * - getWeekDay : 주어진 날짜의 요일을 반환
   * - getCurrentDay : 오늘의 요일을 반환
   */
  getWeekday: dateString => CONFIG.DAYS[new Date(dateString).getDay()],
  getCurrentDay: () => CONFIG.DAYS[new Date().getDay()],

  /**
   * 새 글인지 확인하는 함수
   * 게시글이 48시간(2일) 이내에 작성되었는지 확인
   */
  isNewPost: createdAt => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffHours = (now - postDate) / (1000 * 60 * 60);
    return diffHours <= 48;
  },

  /**
   * 긴 텍스트를 지정된 길이로 자르는 함수
   * HTML 태그를 제거하고 텍스트만 추출해서 자름
   */
  truncateText: (text, length) => {
    return (
      text
        .replace(/<[^>]*>/g, '') // HTML 태그 제거
        .trim() // 앞뒤 공백 제거
        .slice(0, length) + '...' // 지정된 길이만큼 자르고 ... 추가
    );
  },

  /**
   * 정적 자산(이미지/아이콘 등)의 URL을 생성하는 함수
   * @param {string} type - 자산 유형 (image/icon/logo)
   * @param {string} filename - 파일 이름
   */
  getAssetUrl: (type, filename) => {
    let basePath;
    switch (type) {
      case 'image':
        basePath = CONFIG.ASSETS.IMAGES_PATH;
        break;
      case 'icon':
        basePath = CONFIG.ASSETS.ICONS_PATH;
        break;
      case 'logo':
        basePath = CONFIG.ASSETS.LOGOS_PATH;
        break;
      default:
        throw new Error('Invalid asset type');
    }
    return new URL(`${basePath}/${filename}`, import.meta.url).href;
  },

  /**
   * 플레이스 홀더 이미지 URL을 생성하는 함수
   * 이미지가 없을 때 사용할 대체 이미지 주소를 반환
   */
  getPlaceholderImage: (type, index) => {
    const filename = `${type}${index}.png`;
    return utils.getAssetUrl('image', filename);
  },
};

/**
 * Local Storage 관리 서비스
 * browser의 Local Storage에 data를 저장하고 불러오는 기능을 담당
 *
 * Local Storage?
 * - browser에서 제공하는 data 저장소
 * - page를 닫았다 열어도 데이터가 유지 됨
 * - 문자열 형태로 data를 저장
 */
const storageService = {
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

  // 저장된 추천 도서 유효성 검사
  isStoredFeaturedBookValid: () => {
    const timestamp = localStorage.getItem(
      CONFIG.STORAGE_KEYS.FEATURED_BOOK_TIMESTAMP,
    );
    if (!timestamp) return false;
    const now = new Date().getTime();
    return now - parseInt(timestamp) < CONFIG.ONE_DAY_MS;
  },

  // 추천 도서 저장
  storeFeaturedBook: bookData => {
    localStorage.setItem(
      CONFIG.STORAGE_KEYS.FEATURED_BOOK,
      JSON.stringify(bookData),
    );
    localStorage.setItem(
      CONFIG.STORAGE_KEYS.FEATURED_BOOK_TIMESTAMP,
      new Date().getTime().toString(),
    );
  },

  // 저장된 추천 도서 조회
  getStoredFeaturedBook: () => {
    try {
      return JSON.parse(
        localStorage.getItem(CONFIG.STORAGE_KEYS.FEATURED_BOOK),
      );
    } catch (error) {
      console.error('저장된 추천 도서 데이터 파싱 오류:', error);
      return null;
    }
  },
};

/**
 * 화면 렌더링 서비스
 * HTML 요소들을 생성하고 화면에 표시하는 기능을 담당
 */
const renderService = {
  /**
   * 작가 정보를 HTML로 변환하는 함수
   * 작가의 이름, 직업, 이미지, 소개 등을 포함한 카드를 생성
   */
  renderAuthorInfo: author => {
    return `
      <article class="main__featured-author__content">
        <div class="main__featured-author__info-wrapper">
          <div class="main__featured-author__info">
            <h3 class="main__featured-author__name">${author.name}</h3>
            ${author.extra?.job ? `<p class="main__featured-author__role">${author.extra.job}</p>` : ''}
          </div>
          <a href="/src/features/author/author.html?userId=${author._id}">
            <img
              src="${utils.getImgUrl(author.image)}"
              alt="${author.name}"
              class="main__featured-author__image"
            />
          </a>
        </div>
        ${
          author.extra?.biography
            ? `<p class="main__featured-author__description">${author.extra.biography.slice(0, 50)}...</p>`
            : ''
        }
      </article>
    `;
  },

  renderAuthorPosts: posts => {
    if (!posts.length) return '';

    const postsHTML = posts
      .map(
        (post, index) => `
      <li class="main__featured-author__books-item">
        <div class="main__featured-author__books-image-wrapper">
          <a href="/src/features/detail/detail.html?postId=${post._id}">
            <img
              src="${utils.getPlaceholderImage('authorBook', index + 1)}"
              alt="${post.title}"
              class="main__featured-author__books-image"
              onerror="this.src='${utils.getAssetUrl('image', 'book1.png')}'"
            />
          </a>
        </div>
        <div class="main__featured-author__books-info">
          <h3 class="main__featured-author__books-title">${post.title}</h3>
          <p class="main__featured-author__books-description">${utils.truncateText(post.content, 50)}</p>
        </div>
      </li>
    `,
      )
      .join('');

    return `<ul class="main__featured-author__books">${postsHTML}</ul>`;
  },

  renderWeeklyPost: (post, index) => {
    return `
      <li class="weekly-serial__item">
        <article class="weekly-serial__info">
          <h3 class="weekly-serial__title">${post.extra?.subTitle || ''}</h3>
          <p class="weekly-serial__details">${post.title}
            ${
              utils.isNewPost(post.createdAt)
                ? `<img src="${utils.getAssetUrl('icon', 'status/new.svg')}" alt="새 글" class="weekly-serial__new" />`
                : ''
            }
          </p>
          <p class="weekly-serial__author">
            <em>by</em> ${post.user.name}
          </p>
        </article>
        <img 
          src="${utils.getPlaceholderImage('pick', (index % 10) + 1)}"
          alt="${post.title}"
          class="weekly-serial__image"
          onerror="this.src='${utils.getAssetUrl('image', 'serial1.png')}'"
        />
      </li>
    `;
  },

  renderTodaysPick: posts => {
    const postsHTML = posts
      .slice(0, 10)
      .map(
        (post, index) => `
          <li class="main__todays-pick__item">
            <a href="/src/features/detail/detail.html?postId=${post._id}">
              <div class="main__todays-pick__info">
                <div class="main__todays-pick__text">
                  <h3 class="main__todays-pick__item-title">${post.title}</h3>
                  <p class="main__todays-pick__author">
                    <em style="font-family: Georgia">by</em> ${post.user.name}
                  </p>
                  <p class="main__todays-pick__description">${utils.truncateText(post.content, 100)}</p>
                </div>
                <img
                  src="${post.image?.[0] ? utils.getImgUrl(post.image[0]) : utils.getPlaceholderImage('pick', Math.floor(Math.random() * 10) + 1)}"
                  alt="${post.title}"
                  class="main__todays-pick__image"
                  onerror="this.src='${utils.getAssetUrl('image', 'pick1.png')}'"
                />
              </div>
            </a>
          </li>
        `,
      )
      .join('');

    const $container = document.querySelector('.main__todays-pick__list');
    if ($container) {
      $container.innerHTML = postsHTML;
    }
  },
};

/**
 * 작가 관리 서비스
 * 작가 데이터를 처리하고 관리하는 기능을 담당
 */
const authorService = {
  /**
   * 오늘의 작가를 랜덤하게 선택하는 함수
   * - 게시글이 있는 작가들 중에서만 선택
   * - type이 user인 작가만 선택 대상이 됨
   */
  getRandomTodaysAuthor: (authors, posts) => {
    // 게시글이 있는 type이 user인 작가만 필터링
    const userAuthors = authors.filter(
      author =>
        typeof author.posts !== 'undefined' &&
        author.posts > 0 &&
        author.type === 'user',
    );

    // 실제로 게시글이 있는 작가만 선택
    const authorsWithPosts = userAuthors.filter(author =>
      posts.some(post => post.user._id === author._id),
    );

    if (authorsWithPosts.length === 0) {
      console.error('작가가 작성한 글이 없습니다');
      return null;
    }

    // 랜덤하게 한 명의 작가 선택
    return authorsWithPosts[
      Math.floor(Math.random() * authorsWithPosts.length)
    ];
  },

  /**
   * 특정 작가의 게시글을 가져오는 함수
   * 최대 2개의 게시글만 반환
   */
  getAuthorsPosts: (posts, authorId) => {
    return posts.filter(post => post.user._id === authorId).slice(0, 2);
  },
};

// 추천 도서 서비스 객체
const featuredBookService = {
  getRandomBook: posts => {
    if (!posts || posts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * posts.length);
    const post = posts[randomIndex];
    const quote = featuredBookService.extractRandomQuote(post.content);

    return {
      title: post.title,
      author: post.user.name,
      quote: quote,
    };
  },

  extractRandomQuote: content => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const sentences = plainText
      .split(/[.!?]/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 10 && sentence.length < 100);

    if (sentences.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  },

  renderFeaturedBook: bookData => {
    if (!bookData) return '';

    return `
      <div class="main__featured-book-content">
        <div class="main__featured-book-info">
          <h3 class="main__featured-book-title">${bookData.title}</h3>
          <p class="main__featured-book-author"><em>by</em> ${bookData.author}</p>
        </div>

        <div class="main__featured-book-image-container">
          <img
            src="${utils.getAssetUrl('image', 'featuredBook.png')}"
            alt="${bookData.title} 책 표지 이미지"
            class="main__featured-book-image"
          />
        </div>
      </div>

      <div class="main__featured-book-quote">
        <div class="main__featured-book-quote-label-container">
          <p class="main__featured-book-quote-label">책 속 한 구절 ——</p>
          <img
            src="${utils.getAssetUrl('logo', 'logo_symbol.svg')}"
            alt="브런치스토리 로고 심볼"
            class="main__logo-symbol"
            width="18px"
            height="18px"
          />
        </div>
        <div class="main__featured-book-quote-text">
          ${bookData.quote || '여행의 끝에서 일상으로 돌아오는 것은 몸의 기억을 되살리는 일이다.'}
        </div>
      </div>
    `;
  },
};

/**
 * 요일별 연재 관리 클래스
 * 요일 탭을 관리하고 연재 컨텐츠를 표시하는 기능을 담당
 */
class WeeklyPostsManager {
  constructor() {
    this.$tabButtons = document.querySelectorAll('.weekly-serial__tab');
    this.$postsList = document.querySelector('.weekly-serial__list');
  }

  /**
   * 초기화 함수
   * - 현재 요일 설정
   * - 이벤트 리스너 등록
   */
  init() {
    this.setCurrentDay();
    this.setupEventListeners();
  }

  // 현재 요일 설정
  setCurrentDay() {
    const currentDay = utils.getCurrentDay();
    const $currentTab = document.querySelector(`[data-day="${currentDay}"]`);
    if ($currentTab) {
      this.selectTab($currentTab);
    }
  }

  // 탭 선택 시 스타일 변경
  selectTab($selectedButton) {
    // 모든 탭의 선택 상태 해제
    this.$tabButtons.forEach($tab => {
      $tab.setAttribute('aria-selected', 'false');
      $tab.classList.remove('active');
      $tab.style.borderBottom = 'none';
    });

    // 선택된 탭 스타일 적용
    $selectedButton.setAttribute('aria-selected', 'true');
    $selectedButton.classList.add('active');
    $selectedButton.style.borderBottom = '2px solid var(--point-color)';
  }

  // 이벤트 리스너 설정
  setupEventListeners() {
    // 탭 클릭 이벤트
    this.$tabButtons.forEach($button => {
      $button.addEventListener('click', () => {
        this.selectTab($button);
      });
    });

    // 정렬 옵션 버튼 클릭 이벤트
    const $optionButtons = document.querySelectorAll('.weekly-serial__option');
    $optionButtons.forEach($button => {
      $button.addEventListener('click', () => {
        // 모든 버튼 기본 스타일로
        $optionButtons.forEach($btn => {
          $btn.classList.remove('active');
          $btn.style.fontWeight = 'normal';
        });

        // 선택된 버튼 강조
        $button.classList.add('active');
        $button.style.fontWeight = 'bold';
      });
    });
  }
}

/**
 * 저장된 작가 데이터를 처리하는 함수
 * 로컬 스토리지에 저장된 작가 정보를 화면에 표시하고,
 * 추가로 필요한 데이터를 서버에서 가져옴
 *
 * @param {Object} storedData - 저장된 작가 데이터
 * @param {Object} featuredBook - 추천 도서 정보
 * @param {Element} $featuredBookSection - 추천 도서를 표시할 DOM 요소
 */
const handleStoredAuthorData = async (
  storedData,
  featuredBook,
  $featuredBookSection,
) => {
  // 1. 저장된 작가 정보를 화면에 표시
  const $featuredAuthor = document.querySelector('.main__featured-author');
  $featuredAuthor.innerHTML = `
    <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
    ${renderService.renderAuthorInfo(storedData.author)}
    ${renderService.renderAuthorPosts(storedData.posts)}
  `;

  // 2. 최근 2주간의 인기 게시글 데이터 요청
  const apiUrl = `${POSTS_API_ADDRESS}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -14)}","$lt":"${utils.calculateDate()}"}}`;
  console.log('API URL:', apiUrl);

  const response = await api.get(apiUrl);
  console.log('API Response:', response.data);

  // 3. 추천 도서가 없는 경우 새로 선택
  if (!featuredBook) {
    featuredBook = featuredBookService.getRandomBook(response.data.item);
    if (featuredBook && $featuredBookSection) {
      storageService.storeFeaturedBook(featuredBook);
      $featuredBookSection.innerHTML =
        featuredBookService.renderFeaturedBook(featuredBook);
    }
  }

  // 4. 인기 게시글과 구독 작가 목록 표시
  renderService.renderTodaysPick(response.data.item);
  await initializeTopAuthors();
};

/**
 * 새로운 데이터를 처리하는 함수
 * 서버에서 새로운 데이터를 가져와 화면을 구성
 *
 * @param {Element} $featuredBookSection - 추천 도서 섹션 요소
 * @param {Object} featuredBook - 추천 도서 정보
 */
const handleNewData = async ($featuredBookSection, featuredBook) => {
  // 1. 작가와 게시글 데이터를 동시에 요청
  const [usersResponse, postsResponse] = await Promise.all([
    api.get('/users'),
    api.get(POSTS_API_ADDRESS),
  ]);

  const posts = postsResponse.data.item;

  // 2. 추천 도서 처리
  if (!featuredBook) {
    featuredBook = featuredBookService.getRandomBook(posts);
    if (featuredBook && $featuredBookSection) {
      storageService.storeFeaturedBook(featuredBook);
      $featuredBookSection.innerHTML =
        featuredBookService.renderFeaturedBook(featuredBook);
    }
  }

  // 3. 랜덤 작가 선택 및 처리
  const randomAuthor = authorService.getRandomTodaysAuthor(
    usersResponse.data.item,
    posts,
  );

  if (randomAuthor) {
    const authorPosts = authorService.getAuthorsPosts(posts, randomAuthor._id);
    if (authorPosts.length > 0) {
      handleNewAuthorData(randomAuthor, authorPosts);
    }
  }

  // 4. 인기 게시글 데이터 요청 및 표시
  const todaysPickResponse = await api.get(
    `${POSTS_API_ADDRESS}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -14)}","$lt":"${utils.calculateDate()}"}}`,
  );

  renderService.renderTodaysPick(todaysPickResponse.data.item);
  await initializeTopAuthors();
};

/**
 * 새로운 작가 데이터를 처리하는 함수
 * 작가 정보를 저장하고 화면에 표시
 *
 * @param {Object} author - 작가 정보
 * @param {Array} posts - 작가의 게시글 목록
 */
const handleNewAuthorData = (author, posts) => {
  // 1. 작가 데이터를 로컬 스토리지에 저장
  storageService.storeAuthorData(author, posts);

  // 2. 화면에 작가 정보 표시
  const $featuredAuthor = document.querySelector('.main__featured-author');
  $featuredAuthor.innerHTML = `
    <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
    ${renderService.renderAuthorInfo(author)}
    ${renderService.renderAuthorPosts(posts)}
  `;
};

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

// 필요한 기능들을 외부로 내보내기
export {
  WeeklyPostsManager,
  utils,
  renderService,
  authorService,
  storageService,
  featuredBookService,
};
