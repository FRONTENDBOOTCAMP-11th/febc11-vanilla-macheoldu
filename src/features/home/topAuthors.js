import axios from 'axios';

const getImgUrl = imgPath => {
  if (!imgPath) return '/assets/images/home/author2.png';
  return `https://11.fesp.shop${imgPath}`;
};

const renderTopAuthors = authors => {
  console.log('Rendering authors:', authors);

  const container = document.querySelector(
    '.main__top-subscribed-authors-grid',
  );
  if (!container) {
    console.error('Top authors container not found!');
    return;
  }

  // 형식 검사 authors 변수가 배열인지 아닌지 검사하는 함수
  // authors 배열이라면 -> !Array.isArray(authors) 거짓
  // Array.isArray -> 배열이라면 참 아니라면 거짓
  if (!Array.isArray(authors) || authors.length === 0) {
    console.error('No authors data to render!');
    container.innerHTML = `<p class="no-authors-message">현재 TOP 구독 작가가 없습니다.</p>`;
    return;
  }

  const authorsHTML = authors
    .map((author, index) => {
      // 안전 코드
      if (!author) {
        console.error('Invalid author data at index:', index);
        return '';
      }

      return `
        <article class="main__top-subscribed-author">
          <div class="author-content">
            <img
              src="${getImgUrl(author.image)}"
              alt="${author.name || 'Author'}"
              class="main__top-subscribed-author-image"
              onerror="this.src='/assets/images/home/author2.png'"
            />
            <div class="author-text">
              <h3 class="main__top-subscribed-author-name">${author.name || 'Unknown Author'}</h3>
              <p class="main__top-subscribed-author-subscribers">구독자 ${author.bookmarkedBy?.users || 0}명</p>
              ${
                author.extra?.job
                  ? `<p class="main__top-subscribed-author-role">${author.extra.job}</p>`
                  : ''
              }
              ${
                author.extra?.biography
                  ? `<p class="main__top-subscribed-author-description">
                  ${author.extra.biography.slice(0, 50)}...
                </p>`
                  : ''
              }
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  container.innerHTML = authorsHTML;
};

const fetchTopAuthors = async () => {
  try {
    console.log('Fetching top authors...');

    // 구독자 수가 1 이상인 작가만 조회하도록 query 수정
    const response = await axios.get('https://11.fesp.shop/users', {
      params: {
        sort: JSON.stringify({ 'bookmarkedBy.users': -1 }),
        limit: 4,
        type: 'user',
        'bookmarkedBy.users': { $gt: 0 }, // 구독자 수가 0보다 큰 경우만 필터링
      },
      headers: {
        'client-id': 'vanilla03',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.data?.ok || !response.data?.item) {
      throw new Error('Invalid response from server');
    }

    // 혹시 모를 구독자 0명인 데이터 한번 더 필터링
    const topAuthors = response.data.item.filter(
      author => author.bookmarkedBy?.users > 0,
    );

    console.log('Fetched top authors:', topAuthors);

    // top 구독자 없을 때
    if (topAuthors.length === 0) {
      throw new Error('No authors with subscribers found');
    }

    renderTopAuthors(topAuthors);
  } catch (error) {
    console.error('Error in fetchTopAuthors:', error);
    const container = document.querySelector(
      '.main__top-subscribed-authors-grid',
    );
    if (container) {
      container.innerHTML = `<p class="no-authors-message">현재 TOP 구독 작가가 없습니다.</p>`;
    }
  }
};

const initializeTopAuthors = () => {
  console.log('Initializing top authors...');
  const container = document.querySelector(
    '.main__top-subscribed-authors-grid',
  );
  if (!container) {
    console.error('Top authors container not found during initialization!');
    return;
  }

  // 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .no-authors-message {
      text-align: center;
      padding: 20px 0;
      color: #666;
    }
    .main__top-subscribed-author-subscribers {
      color: #666;
      font-size: 0.9em;
      margin: 4px 0;
    }
  `;
  document.head.appendChild(style);

  fetchTopAuthors();
};

export default initializeTopAuthors;
