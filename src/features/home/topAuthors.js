import axios from 'axios';

const getImgUrl = imgPath => {
  if (!imgPath) return '/src/assets/images/home/author2.png';
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

  if (!Array.isArray(authors) || authors.length === 0) {
    console.error('No authors data to render!');
    container.innerHTML = `<p class="no-authors-message">현재 TOP 구독 작가가 없습니다.</p>`;
    return;
  }

  const authorsHTML = authors
    .map((author, index) => {
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
              onerror="this.src='/src/assets/images/home/author2.png'"
            />
            <div class="author-text">
              <h3 class="main__top-subscribed-author-name">${author.name || 'Unknown Author'}</h3>
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

  console.log('Generated HTML length:', authorsHTML.length);
  container.innerHTML = authorsHTML;
  console.log('Container updated. New child count:', container.children.length);
};

const fetchTopAuthors = async () => {
  try {
    console.log('Fetching authors...');
    const response = await axios.get('https://11.fesp.shop/users', {
      headers: {
        'client-id': 'vanilla03',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log('Raw API Response:', response.data);

    if (!response.data?.item) {
      throw new Error('Invalid API response structure');
    }

    const allUsers = response.data.item;
    console.log('All users:', allUsers);

    const onlyUserTypes = allUsers.filter(item => item?.user?.type === 'user');
    console.log('Only user types:', onlyUserTypes);

    const withSubscriberCounts = onlyUserTypes.map(item => {
      const subscriberCount = item.user.bookmarkedBy?.users || 0;
      return {
        ...item,
        subscriberCount,
      };
    });
    console.log('With subscriber counts:', withSubscriberCounts);

    // 구독자 수로 정렬
    const sorted = withSubscriberCounts.sort(
      (a, b) => b.subscriberCount - a.subscriberCount,
    );
    console.log('Sorted by subscribers:', sorted);

    // 모든 사용자의 구독자 수가 0인지 확인
    const hasSubscribers = sorted.some(item => item.subscriberCount > 0);

    const container = document.querySelector(
      '.main__top-subscribed-authors-grid',
    );

    if (!container) {
      console.error('Top authors container not found!');
      return;
    }

    if (!hasSubscribers) {
      // 모든 구독자 수가 0일 경우 간단한 텍스트만 표시
      container.innerHTML = `<p class="no-authors-message">현재 TOP 구독 작가가 없습니다.</p>`;
      return;
    }

    // 구독자가 있는 경우 상위 4명 표시
    const topFour = sorted.slice(0, 4).map(item => item.user);
    console.log('Top 4 users:', topFour);
    renderTopAuthors(topFour);
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
  `;
  document.head.appendChild(style);

  fetchTopAuthors();
};

export default initializeTopAuthors;

// 북마크 db를 수정해야함... 그래야 이걸 제대로 구현할 수 있음..
