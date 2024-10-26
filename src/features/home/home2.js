// 요일별 모아보기 버전..

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

// 스토리지 관련 함수들
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
            ? `<p class="main__featured-author__description">${author.extra.biography.slice(0, 50)}...</p>`
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

  renderWeeklyPost(post, index) {
    return `
      <li class="weekly-serial__item">
        <article class="weekly-serial__info">
          <h3 class="weekly-serial__title">${post.title}</h3>
          <p class="weekly-serial__details">${post.extra?.subTitle || ''}
            ${
              utils.isNewPost(post.createdAt)
                ? '<img src="/src/assets/icons/status/new.svg" alt="새 글" class="weekly-serial__new" />'
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
          onerror="this.src='/src/assets/images/home/serial1.png'"
        />
      </li>
    `;
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

// 작가 서비스
const authorService = {
  getRandomTodaysAuthor(authors, posts) {
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

  getAuthorsPosts(posts, authorId) {
    return posts.filter(post => post.user._id === authorId).slice(0, 2);
  },
};

// 주간 포스트 관리자
class WeeklyPostsManager {
  constructor() {
    this.postsByDay = null;
    this.currentSortOrder = 'latest';
    this.$tabButtons = document.querySelectorAll('.weekly-serial__tab');
    this.$postsList = document.querySelector('.weekly-serial__list');
  }

  async initialize() {
    await this.fetchPosts();
    this.initializeTabs();
    this.initializeEventListeners();
  }

  async fetchPosts() {
    try {
      const response = await api.get(postsApiAddress);
      this.postsByDay = this.categorizePostsByDay(response.data.item);
      this.displayPosts(utils.getCurrentDay());
    } catch (error) {
      console.error('게시글 가져오기 실패:', error);
    }
  }

  categorizePostsByDay(posts) {
    return posts.reduce((acc, post) => {
      const weekday = utils.getWeekday(post.createdAt);
      if (!acc[weekday]) acc[weekday] = [];
      acc[weekday].push(post);
      return acc;
    }, {});
  }

  displayPosts(day) {
    if (!this.postsByDay || !this.postsByDay[day]) {
      this.$postsList.innerHTML =
        '<li>해당 요일에 작성된 작가의 글이 없습니다!</li>';
      return;
    }

    const posts = this.sortPosts(this.postsByDay[day]);
    this.$postsList.innerHTML = posts
      .map((post, index) => renderService.renderWeeklyPost(post, index))
      .join('');
  }

  sortPosts(posts) {
    if (this.currentSortOrder === 'latest') {
      return [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }
    return posts;
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
        this.displayPosts($button.dataset.day);
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
          this.displayPosts(currentDay);
        }
      });
    });
  }
}

// 메인 초기화
async function initialize() {
  try {
    const weeklyPosts = new WeeklyPostsManager();
    await weeklyPosts.initialize();

    if (storageService.isStoredAuthorValid()) {
      const storedData = storageService.getStoredAuthorData();
      if (storedData?.author && storedData?.posts) {
        document.querySelector('.main__featured-author').innerHTML = `
          <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
          ${renderService.renderAuthorInfo(storedData.author)}
          ${renderService.renderAuthorPosts(storedData.posts)}
        `;

        const response = await api.get(
          `${postsApiAddress}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -30)}","$lt":"${utils.calculateDate()}"}}`,
        );
        renderService.renderTodaysPick(response.data.item);
        initializeTopAuthors();
        return;
      }
    }

    const [usersResponse, postsResponse] = await Promise.all([
      api.get('/users'),
      api.get(postsApiAddress),
    ]);

    const posts = postsResponse.data.item;
    const randomAuthor = authorService.getRandomTodaysAuthor(
      usersResponse.data.item,
      posts,
    );

    if (randomAuthor) {
      const authorPosts = authorService.getAuthorsPosts(
        posts,
        randomAuthor._id,
      );
      if (authorPosts.length > 0) {
        storageService.storeAuthorData(randomAuthor, authorPosts);
        document.querySelector('.main__featured-author').innerHTML = `
          <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
          ${renderService.renderAuthorInfo(randomAuthor)}
          ${renderService.renderAuthorPosts(authorPosts)}
        `;
      }
    }

    const todaysPickResponse = await api.get(
      `${postsApiAddress}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -30)}","$lt":"${utils.calculateDate()}"}}`,
    );
    renderService.renderTodaysPick(todaysPickResponse.data.item);
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

export {
  WeeklyPostsManager,
  utils,
  renderService,
  authorService,
  storageService,
};
