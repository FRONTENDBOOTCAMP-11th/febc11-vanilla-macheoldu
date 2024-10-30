import axios from 'axios';

/*
 * API 통신을 위한 axios 인스턴스 생성
 * - baseURL: API 서버의 기본 주소
 * - headers: 서버 통신에 필요한 인증 및 데이터 형식 정보
 */
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/*
 * DOM이 로드된 후 검색 기능 초기화
 * 페이지 내의 모든 주요 요소들을 찾아 변수에 할당하고
 * 이벤트 리스너와 기본 기능들을 설정
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * DOM 요소 참조 저장
   * 페이지 내의 주요 요소들을 쿼리셀렉터로 찾아 변수에 할당
   */
  const $searchInput = document.querySelector('.discover__header-input');
  const $postContent = document.querySelector('.post');
  const $authorContent = document.querySelector('.author');
  const $noneContent = document.querySelector('.discover__none');
  const $navTab = document.querySelectorAll('.discover__nav-tab');
  const $searchCount = document.querySelector('.discover__count-results');
  const $resetButton = document.querySelector('.discover__header-close');

  /*
   * 상태 관리 변수
   * currentTab: 현재 선택된 탭('post' 또는 'author')
   * posts: API로부터 받아온 게시물 데이터 저장 배열
   */
  let currentTab = 'post';
  let posts = [];

  /*
   * 모든 콘텐츠 영역을 숨기는 함수
   * 새로운 검색이나 탭 전환 시 호출되어 화면을 초기화
   */
  function hideAllContent() {
    $postContent.style.display = 'none';
    $authorContent.style.display = 'none';
    $noneContent.style.display = 'none';
    $searchCount.textContent = '';
  }

  /*
   * 검색 결과가 없을 때 표시할 UI를 생성하고 보여주는 함수
   * - 브런치 로고 이미지와 "검색 결과가 없습니다" 메시지를 표시
   * - 스크롤을 비활성화하여 UX 개선
   * @returns {string} 생성된 HTML 문자열
   */
  function showNoResults() {
    $noneContent.style.display = 'flex';
    $searchCount.textContent = '';
    document.body.style.overflowY = 'hidden';

    const noResultsHtml = `
      <div class="discover__result-noneImg">
        <img
          src="/src/assets/icons/etc/logo_brunch_italic.svg"
          alt="관련 이미지"
        />
      </div>
      <p class="discover__result-none">검색 결과가 없습니다.</p>`;

    $noneContent.innerHTML = noResultsHtml;
    return noResultsHtml;
  }

  /*
   * 서버에서 게시물 데이터를 가져오는 함수
   * @param {string} keyword - 검색어
   * @returns {Promise<Array>} 검색된 게시물 배열
   */
  async function fetchPosts(keyword) {
    try {
      const response = await api.get('/posts?type=info', {
        params: { keyword },
      });
      return response.data.item;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /*
   * 서버에서 작가 데이터를 가져오고 필터링하는 함수
   * @param {string} keyword - 검색할 작가 이름
   * @returns {Promise<Array>} 필터링된 작가 정보 배열
   */
  async function fetchWriter(keyword) {
    try {
      const response = await api.get('/users');

      if (response.data && response.data.item) {
        const authors = response.data.item.filter(user =>
          user.name.toLowerCase().includes(keyword.toLowerCase()),
        );
        return authors;
      }
      return [];
    } catch (error) {
      console.error('Error fetching writers:', error);
      return [];
    }
  }

  /*
   * 작가 검색을 수행하는 함수
   * - 입력된 키워드로 작가를 검색하고 결과를 화면에 표시
   * - '작가' 탭을 활성화 상태로 변경
   */
  async function searchWriter() {
    const keyword = $searchInput.value.trim();

    if (keyword) {
      hideAllContent();

      const authors = await fetchWriter(keyword);

      if (authors && authors.length > 0) {
        displayAuthorResults(authors, keyword);
      } else {
        showNoResults();
      }

      $navTab[0].classList.remove('active');
      $navTab[1].classList.add('active');
    }
  }

  /*
   * 검색 결과를 초기화하는 함수
   * 'X' 버튼 클릭 시 호출되어 모든 상태를 초기 상태로 되돌림
   */
  $resetButton.addEventListener('click', async function () {
    $searchInput.value = '';
    $postContent.innerHTML = '';
    $authorContent.innerHTML = '';
    $searchCount.textContent = '';

    $navTab.forEach(function (tab) {
      tab.classList.remove('active');
    });

    $postContent.style.display = 'none';
    $authorContent.style.display = 'none';
    $noneContent.style.display = 'none';

    currentTab = '';
  });

  /*
   * 통합 검색 수행 함수
   * 키워드를 받아 검색을 실행하고 결과를 표시하는 메인 함수
   * @param {string} keyword - 검색할 키워드
   */
  async function performSearch(keyword) {
    currentTab = 'post';
    hideAllContent();

    $navTab.forEach(function (tab) {
      tab.classList.remove('active');
    });
    $navTab[0].classList.add('active');

    try {
      posts = await fetchPosts(keyword);

      if (posts && posts.length > 0) {
        displayPostResults(posts, keyword);
        $searchCount.textContent = `글 검색 결과 ${posts.length}건`;
      } else {
        showNoResults();
      }
    } catch (error) {
      console.error('Search error:', error);
      showNoResults();
    }
  }

  /*
   * 글 검색 결과를 화면에 표시하는 함수
   * @param {Array} posts - 표시할 게시물 배열
   * @param {string} keyword - 하이라이트할 검색 키워드
   */
  function displayPostResults(posts, keyword) {
    $postContent.innerHTML = posts
      .map(function (post) {
        const imageUrl =
          post.image && Array.isArray(post.image) && post.image.length > 0
            ? 'https://11.fesp.shop' + post.image[0]
            : '/src/assets/images/no_profile.svg';

        return `
        <div class="post__lists">
          <a href="/src/features/detail/detail.html?postId=${post._id}">
            <div>
              <h3 class="post__list-title">
                ${highlightSearchTerm(post.title, keyword)}
              </h3>
            </div>
            <div class="post__list-content">
              <div class="content__text">
                <div>
                  <p class="content__text-main">
                    ${highlightSearchTerm(stripHtml(post.content), keyword)}
                  </p>
                  <div class="content__text-info">
                    ${formatDate(post.createdAt)}
                    <div class="circle"></div>
                    <em>by</em> ${highlightSearchTerm(post.user.name, keyword)}
                  </div>
                </div>
              </div>
              <div class="content__cover">
                <img 
                  src="${imageUrl}" 
                  alt="포스트 이미지" 
                  loading="lazy"
                />
              </div>
            </div>
          </a>
        </div>
        `;
      })
      .join('');

    $postContent.style.display = 'block';
  }

  /*
   * 작가 검색 결과를 화면에 표시하는 함수
   * @param {Array} authors - 표시할 작가 정보 배열
   * @param {string} keyword - 하이라이트할 검색 키워드
   */
  function displayAuthorResults(authors, keyword) {
    if (!authors || authors.length === 0) {
      showNoResults();
      return;
    }

    $authorContent.innerHTML = authors
      .map(author => {
        return `
          <div class="author__list">
            <a href="/src/features/author/author.html?no=${author._id}">
              <div class="author__info-wrapper">
                <img 
                  class="author__list-cover" 
                  src="${author.image ? 'https://11.fesp.shop' + author.image : '/src/assets/images/no_profile.svg'}" 
                  alt="작가 이미지" 
                />
                <div class="author__text-wrapper">
                  <h3 class="author__list-title">${highlightSearchTerm(author.name, keyword)}</h3>
                  <p class="author__list-info">${author.extra?.biography || author.extra?.job || ''}</p>
                </div>
              </div>
              <div class="author__keywords">
                ${
                  author.extra?.keyword
                    ? author.extra.keyword
                        .map(tag => `<span class="keyword">${tag}</span>`)
                        .join('')
                    : ''
                }
              </div>
            </a>
          </div>
        `;
      })
      .join('');

    $authorContent.style.display = 'block';
    $searchCount.textContent = `작가 검색 결과 ${authors.length}건`;
  }

  /*
   * 이벤트 리스너 설정
   * - 검색창 엔터 키 이벤트
   */
  $searchInput.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
      const keyword = $searchInput.value.trim();
      if (keyword) {
        await performSearch(keyword);
      }
    }
  });

  // 탭 전환 이벤트
  $navTab.forEach(function (tab) {
    tab.classList.remove('active');
  });

  $navTab.forEach(function (tab, index) {
    tab.addEventListener('click', async function () {
      const keyword = $searchInput.value.trim();
      if (!keyword) return;

      $navTab.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (index === 0) {
        await performSearch(keyword);
      } else {
        await searchWriter();
      }
    });
  });

  /*
   * HTML 태그를 제거하고 순수 텍스트만 추출하는 함수
   * @param {string} html - HTML 문자열
   * @returns {string} 태그가 제거된 순수 텍스트
   */
  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /*
   * 날짜를 'Apr 16. 2024' 형식으로 포맷팅하는 함수
   * @param {string} dateString - ISO 형식의 날짜 문자열
   * @returns {string} 포맷팅된 날짜 문자열
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}. ${year}`;
  }

  /*
   * 검색어를 하이라이트 처리하는 함수
   * 검색어와 일치하는 부분을 특별한 스타일의 span 태그로 감싸서 강조
   * @param {string} text - 원본 텍스트
   * @param {string} keyword - 강조할 검색어
   * @returns {string} 검색어가 하이라이트된 HTML 문자열
   */
  function highlightSearchTerm(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(keyword, 'gi');
    return text.replace(regex, function (match) {
      return `<span class="discover__keyword">${match}</span>`;
    });
  }
});
