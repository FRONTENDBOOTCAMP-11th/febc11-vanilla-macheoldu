import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 프로필 이미지 URL 생성 함수
const getImgUrl = imgPath => {
  return `https://11.fesp.shop${imgPath}`;
};

// Top 구독 작가 렌더링 함수
const renderTopAuthors = authors => {
  // 작가 데이터를 HTML로 변환
  const authorsHTML = authors
    .map((author, index) => {
      const subscriberCount = Array.isArray(author.bookmarkedBy?.users)
        ? author.bookmarkedBy.users.length
        : author.bookmarkedBy?.users || 0;

      // 이미지 URL 생성
      const imgUrl = getImgUrl(author.image);

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
                  ? `
                <p class="main__top-subscribed-author-role">${author.extra.job}</p>
              `
                  : ''
              }
              ${
                author.extra?.biography
                  ? `
                <p class="main__top-subscribed-author-description">
                  ${author.extra.biography.slice(0, 50)}...
                </p>
              `
                  : ''
              }
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // HTML을 DOM에 삽입
  const container = document.querySelector(
    '.main__top-subscribed-authors-grid',
  );
  if (container) {
    container.innerHTML = authorsHTML;
  }
};

// Top 구독 작가 데이터 가져오기
const fetchTopAuthors = async () => {
  try {
    const response = await api.get('/users');
    const users = response.data.item;

    // user 타입 사용자만 필터링
    const user = users.filter(user => user.type === 'user');

    // 구독자 수로 정렬 (내림차순)
    const sortedSellers = user.sort((a, b) => {
      const aCount = Array.isArray(a.bookmarkedBy?.users)
        ? a.bookmarkedBy.users.length
        : a.bookmarkedBy?.users || 0;
      const bCount = Array.isArray(b.bookmarkedBy?.users)
        ? b.bookmarkedBy.users.length
        : b.bookmarkedBy?.users || 0;
      return bCount - aCount;
    });

    // 상위 4명만 선택
    const topAuthors = sortedSellers.slice(0, 4);
    renderTopAuthors(topAuthors);
  } catch (error) {
    console.error('top 구독작가 에러:', error);
  }
};

// 초기화 함수에 추가
const initializeTopAuthors = () => {
  fetchTopAuthors();
};

export default initializeTopAuthors;
