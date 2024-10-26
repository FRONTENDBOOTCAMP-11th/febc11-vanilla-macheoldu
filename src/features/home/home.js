import axios from 'axios';

// Top 구독작가 js...
import initializeTopAuthors from './topAuthors.js';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// posts api 주소
let postsApiAddress = '/posts?type=info';

/**
 * 날짜 계산 함수
 * @param {string} type - 계산 유형 ('year', 'month', 'day' 중 하나)
 * @param {number} value - 더하거나 뺄 값
 * @param {number} [year] - 시작 연도 (생략시 현재 연도)
 * @param {number} [month] - 시작 월 (생략시 현재 월)
 * @param {number} [day] - 시작 일 (생략시 현재 일)
 * @returns {string} YYYY-MM-DD 형식의 날짜 문자열
 */
function calculateDate(type, value, year, month, day) {
  // 기준 날짜 설정
  const baseDate = new Date();

  // 사용자가 지정한 날짜가 있으면 해당 날짜로 설정
  if (year !== undefined) baseDate.setFullYear(year);
  if (month !== undefined) baseDate.setMonth(month - 1); // JavaScript의 월은 0부터 시작
  if (day !== undefined) baseDate.setDate(day);

  if (type) {
    // 타입에 따른 날짜 계산
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

  // 날짜 포맷팅
  const resultYear = baseDate.getFullYear();
  const resultMonth = String(baseDate.getMonth() + 1).padStart(2, '0');
  const resultDay = String(baseDate.getDate()).padStart(2, '0');

  return `${resultYear}.${resultMonth}.${resultDay}`;
}

// 이미지 URL 생성 함수
const getImgUrl = imgPath => {
  return `https://11.fesp.shop${imgPath}`;
};

// 오늘의 작가를 24시간 마다 랜덤으로 나타내기 위해서 24시간을 밀리초로 변환
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// 오늘의 작가 과련 로컬 스토리지 키
const STORAGE_KEYS = {
  AUTHOR: 'todaysAuthor',
  POSTS: 'todaysAuthorPosts',
  TIMESTAMP: 'todaysAuthorTimestamp',
};

// 오늘의 작가를 랜덤으로 선택하는 함수
const getRandomTodaysAuthor = (authors, posts) => {
  // 디버깅을 위한 로그
  console.log('All authors:', authors);

  // type이 'user'이고 posts 속성이 있으며 0보다 큰 작가만 필터링
  const userAuthors = authors.filter(author => {
    const hasPostsProperty = typeof author.posts !== 'undefined';
    const isValidPostCount = hasPostsProperty && author.posts > 0;
    const isUserType = author.type === 'user';

    console.log(`Author ${author.name}:`, {
      hasPostsProperty,
      isValidPostCount,
      isUserType,
      postsCount: author.posts,
    });

    return isUserType && isValidPostCount;
  });

  console.log('Filtered user authors:', userAuthors);

  // 글을 작성한 작가만 한 번 더 필터링 (실제 posts에서 확인)
  const authorsWithPosts = userAuthors.filter(author => {
    const authorPosts = posts.filter(post => post.user._id === author._id);
    console.log(`${author.name}'s actual posts:`, authorPosts.length);
    return authorPosts.length > 0;
  });

  console.log('Authors with actual posts:', authorsWithPosts);

  // 글을 작성한 작가가 없는 경우 처리
  if (authorsWithPosts.length === 0) {
    console.error('작가가 작성한 글이 없습니다');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * authorsWithPosts.length);
  return authorsWithPosts[randomIndex];
};

// 지정된 작가 정보가 유효한지 확인하는 함수
const isStoredAuthorValid = () => {
  const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
  if (!timestamp) return false;

  const now = new Date().getTime();
  const storedTime = parseInt(timestamp);

  // 24시간이 지났는지 확인..
  return now - storedTime < ONE_DAY_MS;
};

// 오늘의 작가가 쓴 글 필터링 함수
const getAuthorsPosts = (posts, authorId) => {
  return posts.filter(post => post.user._id === authorId).slice(0, 2); // 최대 2개의 글만 표시
};

// 작가 정보 렌더링 함수
const renderAuthorInfo = author => {
  return `
    <article class="main__featured-author__content">
      <div class="main__featured-author__info-wrapper">
        <div class="main__featured-author__info">
          <h3 class="main__featured-author__name">${author.name}</h3>
          ${
            author.extra?.job
              ? `<p class="main__featured-author__role">${author.extra.job}</p>`
              : ''
          }
        </div>
        <img
          src="${getImgUrl(author.image)}"
          alt="${author.name}"
          class="main__featured-author__image"
        />
      </div>
      ${
        author.extra?.biography
          ? `<p class="main__featured-author__description">${author.extra.biography.slice(
              0,
              50,
            )}...</p>`
          : ''
      }
    </article>
  `;
};

// 작가 정보를 로컬 스토리지에 저장하는 함수
const storeAuthorData = (author, posts) => {
  localStorage.setItem(STORAGE_KEYS.AUTHOR, JSON.stringify(author));
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  localStorage.setItem(STORAGE_KEYS.TIMESTAMP, new Date().getTime().toString());
};

// 저장된 작가 정보를 가져오는 함수
const getStoredAuthorData = () => {
  try {
    const author = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTHOR));
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS));
    return { author, posts };
  } catch (error) {
    console.error('Error parsing stored author data:', error);
    return null;
  }
};

// 작가의 글 목록 렌더링 함수
const renderAuthorPosts = posts => {
  if (!posts.length) return '';
  const postsHTML = posts
    .map((post, index) => {
      const description =
        post.content.replace(/<[^>]*>/g, '').slice(0, 50) + '...';

      // 이미지 경로를 index + 1을 사용하여 생성 (1 또는 2)
      const imageNumber = index + 1;
      const imagePath = `/src/assets/images/home/authorBook${imageNumber}.png`; // 현재 posts에 user 이미지는 있는데 글에 대한 이미지가 안 보임

      return `
      <li class="main__featured-author__books-item">
        <div class="main__featured-author__books-image-wrapper">
          <img
            src="${imagePath}"
            alt="${post.title}"
            class="main__featured-author__books-image"
            onerror="this.src='/src/assets/images/home/book1.png'"
          />
        </div>
        <div class="main__featured-author__books-info">
          <h3 class="main__featured-author__books-title">
            ${post.title}
          </h3>
          <p class="main__featured-author__books-description">
            ${description}
          </p>
        </div>
      </li>
    `;
    })
    .join('');

  return `<ul class="main__featured-author__books">${postsHTML}</ul>`;
};

// 오늘의 작가 섹션 메인 랜더링 함수
const renderTodaysAuthor = (author, posts) => {
  const container = document.querySelector('.main__featured-author');
  if (!container) return;

  const authorInfo = renderAuthorInfo(author);
  const authorPosts = renderAuthorPosts(posts);

  container.innerHTML = `
    <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">
      오늘의 작가
    </h2>
    ${authorInfo}
    ${authorPosts}
  `;
};

// Today's Pick 렌더링 함수
const renderTodaysPick = posts => {
  const postsHTML = posts
    .slice(0, 10)
    .map((post, index) => {
      // HTML 태그 제거하고 첫 100자만 추출
      const description =
        post.content
          .replace(/<[^>]*>/g, '')
          .trim()
          .slice(0, 100) + '...';

      // 이미지 경로를 index + 1을 사용하여 생성
      const imageNumber = index + 1;
      const imagePath = `/src/assets/images/home/pick${imageNumber}.png`;

      return `
      <li class="main__todays-pick__item">
        <div class="main__todays-pick__info">
          <div class="main__todays-pick__text">
            <h3 class="main__todays-pick__item-title">
              ${post.title}
            </h3>
            <p class="main__todays-pick__author">
              <em style="font-family: Georgia">by</em> ${post.user.name}
            </p>
            <p class="main__todays-pick__description">
              ${description}
            </p>
          </div>
          <img
            src="${imagePath}"
            alt="${post.title}"
            class="main__todays-pick__image"
            onerror="this.src='/src/assets/images/home/pick1.png'"
          />
        </div>
      </li>
    `;
    })
    .join('');

  const container = document.querySelector('.main__todays-pick__list');
  if (container) {
    container.innerHTML = postsHTML;
  }
};

// Today's Pick 데이터 가져오기
const fetchTodaysPick = async () => {
  try {
    const response = await api.get(
      // TODO 현재는 오늘 날짜 기준으로 최대 30일 전까지 발간된 글만 보이는 데 나중에는 7일로 바꿔야 함
      `${postsApiAddress}&sort={"views": -1}&custom={"createdAt": {"$gte": "${calculateDate('day', -30)}", "$lt": "${calculateDate()}"}}`,
    ); // 조회수 내림차순
    const posts = response.data.item;
    renderTodaysPick(posts);
  } catch (error) {
    console.error("Today's Pick 에러:", error);
  }
};

// 현재 요일 가져오기 (0: 일요일, 1: 월요일, ...)
const getCurrentDay = () => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const today = new Date().getDay();
  return days[today];
};

// 모든 탭 버튼을 선택하고 이벤트를 설정하는 함수
const initializeTabs = () => {
  const $tabButtons = document.querySelectorAll('.weekly-serial__tab');

  // 탭 선택 함수
  const selectTab = $selectedButton => {
    $tabButtons.forEach($tab => {
      $tab.setAttribute('aria-selected', 'false');
    });
    $selectedButton.setAttribute('aria-selected', 'true');
  };

  // 각 탭 버튼에 클릭 이벤트 리스너 추가
  $tabButtons.forEach($button => {
    $button.addEventListener('click', () => {
      selectTab($button);
    });
  });

  // 현재 요일 탭 선택
  const currentDay = getCurrentDay();
  const $currentTab = document.querySelector(`[data-day="${currentDay}"]`);
  if ($currentTab) {
    selectTab($currentTab);
  }
};

// initialize 함수
const initialize = async () => {
  try {
    // 저장된 작가 정보가 유효한지 확인 (24시간이 지나지 않았다면 기존 작가 정보 사용)
    if (isStoredAuthorValid()) {
      const storedData = getStoredAuthorData();
      if (storedData && storedData.author && storedData.posts) {
        console.log('Using stored author:', storedData.author);
        // 저장된 정보로 렌더링
        renderTodaysAuthor(storedData.author, storedData.posts);

        // 다른 초기화 함수들 실행
        initializeTabs();
        fetchTodaysPick();
        initializeTopAuthors();
        return;
      }
    }

    // 24시간이 지났거나 저장된 정보가 없는 경우에만 새로운 작가 선택
    const [usersResponse, postsResponse] = await Promise.all([
      api.get('/users'),
      api.get(postsApiAddress),
    ]);

    const posts = postsResponse.data.item;
    const randomAuthor = getRandomTodaysAuthor(usersResponse.data.item, posts);
    console.log('선택된 새 작가:', randomAuthor);

    // 유효한 작가를 찾지 못한 경우 처리
    if (!randomAuthor) {
      console.error('유효한 작가를 찾을 수 없습니다');
      return;
    }

    const authorPosts = getAuthorsPosts(posts, randomAuthor._id);
    if (authorPosts.length === 0) {
      console.error('선택된 작가의 게시물이 없습니다');
      return;
    }

    // 새로운 작가 정보 저장
    storeAuthorData(randomAuthor, authorPosts);

    // 오늘의 작가 섹션 렌더링
    renderTodaysAuthor(randomAuthor, authorPosts);

    // 다른 초기화 함수들 실행
    initializeTabs();
    fetchTodaysPick();
    initializeTopAuthors();
  } catch (error) {
    console.error('Error initializing:', error);
  }
};
// 페이지 로드 시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
