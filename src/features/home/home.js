// 외부 라이브러리 import
import axios from 'axios';
import initializeTopAuthors from './topAuthors.js';
import { initializeCoverSlider } from './coverSlider.js';

// API 설정 및 상수
const CONFIG = {
  API: {
    BASE_URL: 'https://11.fesp.shop',
    HEADERS: {
      'client-id': 'vanilla03',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  STORAGE_KEYS: {
    AUTHOR: 'todaysAuthor',
    POSTS: 'todaysAuthorPosts',
    TIMESTAMP: 'todaysAuthorTimestamp',
    FEATURED_BOOK: 'todaysFeaturedBook',
    FEATURED_BOOK_TIMESTAMP: 'todaysFeaturedBookTimestamp',
  },
  DAYS: [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ],
  ONE_DAY_MS: 24 * 60 * 60 * 1000,
  ASSETS: {
    IMAGES_PATH: '/src/assets/images/home',
    ICONS_PATH: '/src/assets/icons',
    LOGOS_PATH: '/src/assets/logos',
  },
};

const POSTS_API_ADDRESS = '/posts?type=info';

// API 인스턴스 생성
const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: CONFIG.API.HEADERS,
});

// 유틸리티 함수 객체
const utils = {
  // 날짜 계산 함수
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

  formatDate: date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  },

  getImgUrl: imgPath => `${CONFIG.API.BASE_URL}${imgPath}`,

  getWeekday: dateString => CONFIG.DAYS[new Date(dateString).getDay()],

  getCurrentDay: () => CONFIG.DAYS[new Date().getDay()],

  isNewPost: createdAt => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffHours = (now - postDate) / (1000 * 60 * 60);
    return diffHours <= 48;
  },

  truncateText: (text, length) => {
    return (
      text
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, length) + '...'
    );
  },

  // 동적 이미지 URL 생성 함수
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

  getPlaceholderImage: (type, index) => {
    const filename = `${type}${index}.png`;
    return utils.getAssetUrl('image', filename);
  },
};

// 스토리지 서비스 객체
const storageService = {
  // 저장된 작가 정보 유효성 검사
  isStoredAuthorValid: () => {
    const timestamp = localStorage.getItem(CONFIG.STORAGE_KEYS.TIMESTAMP);
    if (!timestamp) return false;

    // 현재 날짜의 자정 시간 구하기
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

  // 작가 데이터 저장
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

// 렌더링 서비스 객체
const renderService = {
  renderAuthorInfo: author => {
    return `
      <article class="main__featured-author__content">
        <div class="main__featured-author__info-wrapper">
          <div class="main__featured-author__info">
            <h3 class="main__featured-author__name">${author.name}</h3>
            ${author.extra?.job ? `<p class="main__featured-author__role">${author.extra.job}</p>` : ''}
          </div>
          <img
            src="${utils.getImgUrl(author.image)}"
            alt="${author.name}"
            class="main__featured-author__image"
          />
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
          <img
            src="${utils.getPlaceholderImage('authorBook', index + 1)}"
            alt="${post.title}"
            class="main__featured-author__books-image"
            onerror="this.src='${utils.getAssetUrl('image', 'book1.png')}'"
          />
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
            <a href="./detail/detail.html?postId=${post._id}">
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

// 작가 서비스 객체
const authorService = {
  // 랜덤 작가 선택
  getRandomTodaysAuthor: (authors, posts) => {
    const userAuthors = authors.filter(
      author =>
        typeof author.posts !== 'undefined' &&
        author.posts > 0 &&
        author.type === 'user',
    );

    const authorsWithPosts = userAuthors.filter(author =>
      posts.some(post => post.user._id === author._id),
    );

    if (authorsWithPosts.length === 0) {
      console.error('작가가 작성한 글이 없습니다');
      return null;
    }

    return authorsWithPosts[
      Math.floor(Math.random() * authorsWithPosts.length)
    ];
  },

  // 작가의 게시글 조회
  getAuthorsPosts: (posts, authorId) => {
    return posts.filter(post => post.user._id === authorId).slice(0, 2);
  },
};

// 요일별 연재
class WeeklyPostsManager {
  constructor() {
    this.$tabButtons = document.querySelectorAll('.weekly-serial__tab');
    this.$postsList = document.querySelector('.weekly-serial__list');
  }

  initialize() {
    this.setCurrentDay();
    this.initializeEventListeners();
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
  initializeEventListeners() {
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

// 초기화 함수들
const handleStoredAuthorData = async (
  storedData,
  featuredBook,
  $featuredBookSection,
) => {
  const $featuredAuthor = document.querySelector('.main__featured-author');
  $featuredAuthor.innerHTML = `
    <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
    ${renderService.renderAuthorInfo(storedData.author)}
    ${renderService.renderAuthorPosts(storedData.posts)}
  `;

  const apiUrl = `${POSTS_API_ADDRESS}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -14)}","$lt":"${utils.calculateDate()}"}}`;
  console.log('API URL:', apiUrl);

  const response = await api.get(apiUrl);
  console.log('API Response:', response.data);

  if (!featuredBook) {
    featuredBook = featuredBookService.getRandomBook(response.data.item);
    if (featuredBook && $featuredBookSection) {
      storageService.storeFeaturedBook(featuredBook);
      $featuredBookSection.innerHTML =
        featuredBookService.renderFeaturedBook(featuredBook);
    }
  }

  renderService.renderTodaysPick(response.data.item);
  await initializeTopAuthors();
};

const handleNewData = async ($featuredBookSection, featuredBook) => {
  const [usersResponse, postsResponse] = await Promise.all([
    api.get('/users'),
    api.get(POSTS_API_ADDRESS),
  ]);

  const posts = postsResponse.data.item;

  if (!featuredBook) {
    featuredBook = featuredBookService.getRandomBook(posts);
    if (featuredBook && $featuredBookSection) {
      storageService.storeFeaturedBook(featuredBook);
      $featuredBookSection.innerHTML =
        featuredBookService.renderFeaturedBook(featuredBook);
    }
  }

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

  const todaysPickResponse = await api.get(
    `${POSTS_API_ADDRESS}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -14)}","$lt":"${utils.calculateDate()}"}}`,
  );

  renderService.renderTodaysPick(todaysPickResponse.data.item);
  await initializeTopAuthors();
};

const handleNewAuthorData = (author, posts) => {
  storageService.storeAuthorData(author, posts);
  const $featuredAuthor = document.querySelector('.main__featured-author');
  $featuredAuthor.innerHTML = `
    <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
    ${renderService.renderAuthorInfo(author)}
    ${renderService.renderAuthorPosts(posts)}
  `;
};

const initialize = async () => {
  try {
    console.log('Starting initialization...');
    await initializeCoverSlider();
    console.log('Cover slider initialized');

    const weeklyPosts = new WeeklyPostsManager();
    weeklyPosts.initialize();

    const $featuredBookSection = document.querySelector('.main__featured-book');
    let featuredBook;

    if (storageService.isStoredFeaturedBookValid()) {
      featuredBook = storageService.getStoredFeaturedBook();
      if (featuredBook && $featuredBookSection) {
        $featuredBookSection.innerHTML =
          featuredBookService.renderFeaturedBook(featuredBook);
      }
    }

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

    await handleNewData($featuredBookSection, featuredBook);
  } catch (error) {
    console.error('초기화 오류:', error);
  }
};

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

export {
  WeeklyPostsManager,
  utils,
  renderService,
  authorService,
  storageService,
  featuredBookService,
};
