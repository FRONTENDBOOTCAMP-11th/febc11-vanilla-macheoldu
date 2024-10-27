import axios from 'axios';

// API 설정 상수
const API_CONFIG = {
  BASE_URL: 'https://11.fesp.shop',
  HEADERS: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// API 인스턴스 생성
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

// 유틸리티 함수
const utils = {
  // 이미지 URL 생성
  getImgUrl: imgPath => `${API_CONFIG.BASE_URL}${imgPath}`,

  // 구독자 수 계산
  getSubscriberCount: bookmarkedBy => {
    return Array.isArray(bookmarkedBy?.users)
      ? bookmarkedBy.users.length
      : bookmarkedBy?.users || 0;
  },

  // 텍스트 자르기
  truncateText: (text, length) => `${text.slice(0, length)}...`,
};

// 렌더링 서비스
const renderService = {
  // 작가 프로필 렌더링
  createAuthorProfile: author => {
    const imgUrl = utils.getImgUrl(author.image);

    return `
      <article class="main__top-subscribed-author">
        <div class="author-content">
          <img
            src="${imgUrl}"
            alt="${author.name}"
            class="main__top-subscribed-author-image"
            onerror="this.src='/src/assets/images/home/author2.png'"
          />
          <div class="author-text">
            <h3 class="main__top-subscribed-author-name">${author.name}</h3>
            ${
              author.extra?.job
                ? `<p class="main__top-subscribed-author-role">${author.extra.job}</p>`
                : ''
            }
            ${
              author.extra?.biography
                ? `<p class="main__top-subscribed-author-description">
                ${utils.truncateText(author.extra.biography, 50)}
              </p>`
                : ''
            }
          </div>
        </div>
      </article>
    `;
  },

  // 전체 작가 목록 렌더링
  renderTopAuthors: authors => {
    const authorsHTML = authors
      .map(author => renderService.createAuthorProfile(author))
      .join('');

    const $container = document.querySelector(
      '.main__top-subscribed-authors-grid',
    );
    if ($container) {
      $container.innerHTML = authorsHTML;
    }
  },
};

// 작가 데이터 서비스
const authorService = {
  // 작가 데이터 가져오기
  fetchTopAuthors: async () => {
    try {
      const response = await api.get('/users');
      return authorService.processAuthorsData(response.data.item);
    } catch (error) {
      console.error('top 구독작가 에러:', error);
      return [];
    }
  },

  // 작가 데이터 처리
  processAuthorsData: users => {
    // user 타입 필터링
    const userAuthors = users.filter(user => user.type === 'user');

    // 구독자 수로 정렬
    const sortedAuthors = userAuthors.sort((a, b) => {
      const aCount = utils.getSubscriberCount(a.bookmarkedBy);
      const bCount = utils.getSubscriberCount(b.bookmarkedBy);
      return bCount - aCount;
    });

    // 상위 4명 반환
    return sortedAuthors.slice(0, 4);
  },
};

// 초기화 함수
const initializeTopAuthors = async () => {
  try {
    const topAuthors = await authorService.fetchTopAuthors();
    renderService.renderTopAuthors(topAuthors);
  } catch (error) {
    console.error('Top Authors 초기화 에러:', error);
  }
};

export default initializeTopAuthors;
