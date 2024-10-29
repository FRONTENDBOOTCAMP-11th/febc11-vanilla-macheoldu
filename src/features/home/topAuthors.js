import axios from 'axios';

/**
 * Top 구독 작가 섹션 초기화 함수
 * 페이지 로드 시 실행되며:
 * 1. 필요한 스타일을 추가하고
 * 2. 작가 정보를 가져오는 작업을 시작
 */

const initializeTopAuthors = () => {
  console.log('Initializing top authors...');

  // 작가 목록을 표시할 영역이 있는지 확인
  const container = document.querySelector(
    '.main__top-subscribed-authors-grid',
  );
  if (!container) {
    console.error('Top authors container not found during initialization!');
    return;
  }

  /**
   * 스타일 추가하기:
   * 1. style 태그를 만들고
   * 2. CSS 코드를 작성하여
   * 3. HTML의 head 태그에 추가
   */
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

  // 작가 데이터 가져오기 시작
  fetchTopAuthors();
};

/**
 * 유틸리티 함수란?
 * - 자주 사용되는 편리한 기능을 모아둔 작은 도구 같은 함수
 * - 반복적으로 사용되는 로직을 재사용하기 쉽게 만든 함수
 *
 * getImgUrl은 작가의 프로필 이미지 주소를 만드는 도구
 * @param {string} imgPath - 이미지 경로(서버에서 받은 이미지 주소의 일부분)
 * @returns {string} 완성된 이미지 URL
 *
 * 동작 방식:
 * 1. 이미지 경로가 없으면 -> 기본 이미지 주소를 사용
 * 2. 이미지 경로가 있으면 -> 서버 주소와 이미지 경로를 합쳐서 완전한 주소를 만듦
 */
const getImgUrl = imgPath => {
  if (!imgPath) return '/assets/images/home/author2.png';
  return `https://11.fesp.shop${imgPath}`;
};

/**
 * 화면에 작가 목록을 그려주는 함수
 * @param {Array} authors - 작가들의 정보가 담긴 목록
 *
 * 동작 방식:
 * 1. 화면에서 작가 목록을 표시할 영역을 찾음
 * 2. 작가 정보를 하나씩 확인하면서 HTML 코드로 변환
 * 3. 만든 HTML을 화면에 표시
 */
const renderTopAuthors = authors => {
  console.log('authors 렌더링:', authors);

  // 작가 목록을 표시할 영역 찾기
  const container = document.querySelector(
    '.main__top-subscribed-authors-grid',
  );
  if (!container) {
    console.error('Top authors container를 찾을 수 없습니다.');
    return;
  }

  /**
   * 데이터 안전성 검사
   * - authors가 배열이 맞는지 확인 (Array.isArray로 검사)
   * - 배열이 비어있는지 확인
   *
   * 문제가 있으면 "현재 TOP 구독 작가가 없습니다"라는 메시지를 보여줍니다
   */
  if (!Array.isArray(authors) || authors.length === 0) {
    console.error('No authors data to render!');
    container.innerHTML = `<p class="no-authors-message">현재 TOP 구독 작가가 없습니다.</p>`;
    return;
  }

  /**
   * 작가 정보를 HTML로 변환
   *
   * map 함수란?
   * - 배열의 각 항목을 다른 형태로 변환할 때 사용하는 함수
   * - 여기서는 작가 정보를 HTML 코드로 변환
   *
   * join 함수란?
   * - 배열의 모든 항목을 하나의 문자열로 합치는 함수
   * - 여기서는 각각의 HTML 코드를 하나로 합침
   */
  const authorsHTML = authors
    .map((author, index) => {
      // 작가 정보가 제대로 있는지 확인
      if (!author) {
        console.error('Invalid author data at index:', index);
        return '';
      }

      // 작가 정보를 담은 article 요소 생성
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
              <p class="main__top-subscribed-author-subscribers">구독자 ${author.bookmarkedBy?.users || 0}명</p>
              <h3 class="main__top-subscribed-author-name">${author.name || 'Unknown Author'}</h3>
              ${
                // 직업 정보가 있는 경우에만 표시
                author.extra?.job
                  ? `<p class="main__top-subscribed-author-role">${author.extra.job}</p>`
                  : ''
              }
              ${
                // 자기소개가 있는 경우에만 표시 (50자로 제한)
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

  // 만든 HTML을 화면에 표시
  container.innerHTML = authorsHTML;
};

/**
 * 비동기 함수란?
 * - 시간이 걸리는 작업(server에서 data 가져오기 등)을 처리하는 특별한 작업
 * - 다른 코드의 실행을 막지 않고 병렬적으로 실행
 * - async/await 문법을 사용해서 비동기 작업을 쉽게 처리
 *
 * 이 함수는 서버에서 Top 구독 작가 정보를 가져옴
 */
const fetchTopAuthors = async () => {
  try {
    console.log('Fetching top authors...');

    /**
     * axios로 서버에 데이터를 요청
     *
     * axios란?
     * - 서버와 통신하기 위한 도구
     * - 서버에 데이터를 요청하고 받아오는 작업을 쉽게 할 수 있게 해 줌
     *
     * params는 서버에 보내는 요청 조건:
     * - sort: 구독자 수가 많은 순서대로 정렬
     * - limit: 4명까지만 가져오기
     * - type: 'user' 타입만 가져오기
     * - bookmarkedBy.users: 구독자가 1명 이상인 작가만 가져오기
     */
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

    // 서버에서 받은 데이터가 올바른지 확인
    if (!response.data?.ok || !response.data?.item) {
      throw new Error('Invalid response from server');
    }

    /**
     * 추가 확인 작업:
     * 서버에서 받은 작가 목록 중에서
     * 실제로 구독자가 있는 작가만 다시 한 번 걸러냄
     */
    const topAuthors = response.data.item.filter(
      author => author.bookmarkedBy?.users > 0,
    );

    console.log('Fetched top authors:', topAuthors);

    // 구독자가 있는 작가가 하나도 없다면 오류 메시지를 표시
    if (topAuthors.length === 0) {
      throw new Error('No authors with subscribers found');
    }

    // 작가 목록을 화면에 표시
    renderTopAuthors(topAuthors);
  } catch (error) {
    // 오류가 발생하면 화면에 메시지를 표시
    console.error('Error in fetchTopAuthors:', error);
    const container = document.querySelector(
      '.main__top-subscribed-authors-grid',
    );
    if (container) {
      container.innerHTML = `<p class="no-authors-message">현재 TOP 구독 작가가 없습니다.</p>`;
    }
  }
};

// 모듈의 기본 내보내기로 초기화 함수 지정
export default initializeTopAuthors;
