// 요일별 연재 버전..

import axios from 'axios';
import initializeTopAuthors from './topAuthors.js';

// 상수 및 설정
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
};

// API 설정
const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: CONFIG.API.HEADERS,
});

const postsApiAddress = '/posts?type=info';

// 유틸리티 함수들
const utils = {
  calculateDate(type, value, year, month, day) {
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

    return this.formatDate(baseDate);
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  },

  getImgUrl(imgPath) {
    return `${CONFIG.API.BASE_URL}${imgPath}`;
  },

  getWeekday(dateString) {
    const date = new Date(dateString);
    return CONFIG.DAYS[date.getDay()];
  },

  getCurrentDay() {
    return CONFIG.DAYS[new Date().getDay()];
  },

  isNewPost(createdAt) {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffHours = (now - postDate) / (1000 * 60 * 60);
    return diffHours <= 48;
  },

  truncateText(text, length) {
    return (
      text
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, length) + '...'
    );
  },

  getPlaceholderImage(type, index) {
    return `/src/assets/images/home/${type}${index}.png`;
  },
};

// 스토리지 서비스
const storageService = {
  isStoredAuthorValid() {
    const timestamp = localStorage.getItem(CONFIG.STORAGE_KEYS.TIMESTAMP);
    if (!timestamp) return false;
    const now = new Date().getTime();
    return now - parseInt(timestamp) < CONFIG.ONE_DAY_MS;
  },

  storeAuthorData(author, posts) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.AUTHOR, JSON.stringify(author));
    localStorage.setItem(CONFIG.STORAGE_KEYS.POSTS, JSON.stringify(posts));
    localStorage.setItem(
      CONFIG.STORAGE_KEYS.TIMESTAMP,
      new Date().getTime().toString(),
    );
  },

  getStoredAuthorData() {
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
};

// 렌더링 서비스
const renderService = {
  renderAuthorInfo(author) {
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
            ? `<p class="main__featured-author__description">${utils.truncateText(author.extra.biography, 50)}</p>`
            : ''
        }
      </article>
    `;
  },

  renderAuthorPosts(posts) {
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
            onerror="this.src='/src/assets/images/home/book1.png'"
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

  renderTodaysPick(posts) {
    const postsHTML = posts
      .slice(0, 10)
      .map(
        (post, index) => `
      <li class="main__todays-pick__item">
        <div class="main__todays-pick__info">
          <div class="main__todays-pick__text">
            <h3 class="main__todays-pick__item-title">${post.title}</h3>
            <p class="main__todays-pick__author">
              <em style="font-family: Georgia">by</em> ${post.user.name}
            </p>
            <p class="main__todays-pick__description">${utils.truncateText(post.content, 100)}</p>
          </div>
          <img
            src="${utils.getPlaceholderImage('pick', index + 1)}"
            alt="${post.title}"
            class="main__todays-pick__image"
            onerror="this.src='/src/assets/images/home/pick1.png'"
          />
        </div>
      </li>
    `,
      )
      .join('');

    const container = document.querySelector('.main__todays-pick__list');
    if (container) {
      container.innerHTML = postsHTML;
    }
  },
};

// 주간 연재 관리자
class WeeklyPostsManager {
  constructor() {
    this.serialsByDay = null;
    this.currentSortOrder = 'latest';
    this.$tabButtons = document.querySelectorAll('.weekly-serial__tab');
    this.$postsList = document.querySelector('.weekly-serial__list');
    this.mockSerials = [
      {
        title: '우리가 빛나는 순간',
        subtitle: '오늘도 별자리를 그리다',
        author: '하루별',
        category: '에세이',
        days: ['monday', 'thursday'],
      },
      {
        title: '일주일의 레시피',
        subtitle: 'ep.32 할머니의 된장찌개',
        author: '달콤한식탁',
        category: '요리',
        days: ['tuesday', 'friday'],
      },
      {
        title: '서울문학산책',
        subtitle: '경복궁의 봄을 걷다',
        author: '도시산책자',
        category: '여행',
        days: ['wednesday', 'saturday'],
      },
      {
        title: '매일 쓰는 시',
        subtitle: '창밖의 봄비가 내리고',
        author: '시인의아침',
        category: '시',
        days: ['monday', 'friday'],
      },
      {
        title: '필름 다이어리',
        subtitle: '오늘의 한 컷 - 골목길 풍경',
        author: '필름로그',
        category: '사진',
        days: ['thursday', 'sunday'],
      },
      {
        title: '커피 한 잔, 글 한 페이지',
        subtitle: '제주도 카페에서 쓴 편지',
        author: '커피리스트',
        category: '에세이',
        days: ['tuesday', 'saturday'],
      },
      {
        title: '고양이와 살아가는 법',
        subtitle: '냥이의 새로운 친구',
        author: '캣다방',
        category: '반려동물',
        days: ['wednesday', 'sunday'],
      },
      {
        title: '스물다섯, 파리에서',
        subtitle: '몽마르트 언덕의 아침',
        author: '파리지엔',
        category: '해외생활',
        days: ['monday', 'thursday'],
      },
      {
        title: '베란다 정원 일기',
        subtitle: '첫 번째 방울토마토',
        author: '식물집사',
        category: '취미',
        days: ['tuesday', 'friday'],
      },
      {
        title: '오늘의 작은 음악회',
        subtitle: '비오는 날의 재즈',
        author: '멜로디',
        category: '음악',
        days: ['wednesday', 'saturday'],
      },
    ];
  }

  async initialize() {
    this.generateMockSerials();
    this.initializeTabs();
    this.initializeEventListeners();
  }

  generateMockSerials() {
    // 요일별로 연재물 정리
    this.serialsByDay = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    // 각 연재물을 해당 요일에 배치
    this.mockSerials.forEach((serial, index) => {
      const mockSerial = {
        ...serial,
        id: Math.floor(Math.random() * 1000),
        isNew: Math.random() > 0.7, // 30% 확률로 NEW 표시
        createdAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        // Picsum을 사용한 랜덤 이미지 URL
        imageUrl: `https://picsum.photos/400/300?random=${index}`,
      };

      // 각 연재물을 지정된 요일에 추가
      serial.days.forEach(day => {
        this.serialsByDay[day].push({
          ...mockSerial,
          // 같은 연재물이라도 요일별로 다른 이미지 사용
          imageUrl: `https://picsum.photos/400/300?random=${index}-${day}`,
        });
      });
    });

    // 현재 요일의 연재물 표시
    this.displaySerials(utils.getCurrentDay());
  }

  displaySerials(day) {
    if (!this.serialsByDay || !this.serialsByDay[day]) {
      this.$postsList.innerHTML = '<li>해당 요일의 연재물이 없습니다.</li>';
      return;
    }

    const serials = this.sortSerials(this.serialsByDay[day]);
    this.$postsList.innerHTML = serials
      .map((serial, index) => this.createSerialHTML(serial, index))
      .join('');
  }

  sortSerials(serials) {
    if (this.currentSortOrder === 'latest') {
      return [...serials].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }
    return serials;
  }

  createSerialHTML(serial, index) {
    return `
      <li class="weekly-serial__item">
        <article class="weekly-serial__info">
          <h3 class="weekly-serial__title">${serial.title}</h3>
          <p class="weekly-serial__details">
            ${serial.subtitle}
            ${serial.isNew ? '<img src="/src/assets/icons/status/new.svg" alt="새 글" class="weekly-serial__new" />' : ''}
          </p>
          <p class="weekly-serial__author">
            <em>by</em> ${serial.author}
            <span class="weekly-serial__category">${serial.category}</span>
          </p>
        </article>
        <img 
          src="${serial.imageUrl}"
          alt="${serial.title}"
          class="weekly-serial__image"
          onerror="this.src='https://picsum.photos/400/300?random=${Math.random()}'"
        />
      </li>
    `;
  }

  initializeTabs() {
    const currentDay = utils.getCurrentDay();
    const $currentTab = document.querySelector(`[data-day="${currentDay}"]`);
    if ($currentTab) {
      this.selectTab($currentTab);
    }
  }

  selectTab($selectedButton) {
    this.$tabButtons.forEach($tab => {
      $tab.setAttribute('aria-selected', 'false');
    });
    $selectedButton.setAttribute('aria-selected', 'true');
  }

  initializeEventListeners() {
    this.$tabButtons.forEach($button => {
      $button.addEventListener('click', () => {
        this.selectTab($button);
        this.displaySerials($button.dataset.day);
      });
    });

    document.querySelectorAll('.weekly-serial__option').forEach($button => {
      $button.addEventListener('click', () => {
        const newOrder = $button.textContent.includes('최신순')
          ? 'latest'
          : 'likeit';
        if (this.currentSortOrder !== newOrder) {
          this.currentSortOrder = newOrder;
          const currentDay = document.querySelector(
            '.weekly-serial__tab[aria-selected="true"]',
          ).dataset.day;
          this.displaySerials(currentDay);
        }
      });
    });
  }
}

// 메인 초기화
async function initialize() {
  try {
    // 요일별 연재 초기화
    const weeklyPosts = new WeeklyPostsManager();
    await weeklyPosts.initialize();

    // 오늘의 작가 & 투데이스 픽 초기화
    if (storageService.isStoredAuthorValid()) {
      const storedData = storageService.getStoredAuthorData();
      if (storedData?.author && storedData?.posts) {
        document.querySelector('.main__featured-author').innerHTML = `
          <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">
            오늘의 작가
          </h2>
          ${renderService.renderAuthorInfo(storedData.author)}
          ${renderService.renderAuthorPosts(storedData.posts)}
        `;
      }
    } else {
      // Mock 오늘의 작가 데이터
      const mockAuthor = {
        name: weeklyPosts.mockSerials[0].author,
        image: 'https://picsum.photos/150/150?random=author', // 랜덤 작가 이미지
        extra: {
          job: weeklyPosts.mockSerials[0].category,
          biography: '작가 소개글이 들어갈 자리입니다.',
        },
      };
      const mockPosts = [
        {
          title: weeklyPosts.mockSerials[0].title,
          content: weeklyPosts.mockSerials[0].subtitle,
        },
      ];

      document.querySelector('.main__featured-author').innerHTML = `
        <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">
          오늘의 작가
        </h2>
        ${renderService.renderAuthorInfo(mockAuthor)}
        ${renderService.renderAuthorPosts(mockPosts)}
      `;
    }

    // Mock Today's Pick 데이터
    const mockTodaysPicks = weeklyPosts.mockSerials.map(serial => ({
      title: serial.title,
      content: serial.subtitle,
      user: {
        name: serial.author,
      },
    }));
    renderService.renderTodaysPick(mockTodaysPicks);

    // Top Authors 초기화 (기존 함수 사용)
    initializeTopAuthors();
  } catch (error) {
    console.error('초기화 오류:', error);
  }
}

// 페이지 로드 시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// 필요한 것들 export
export { WeeklyPostsManager, utils, renderService, storageService };
