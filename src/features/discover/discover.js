import axios from 'axios';

// 기본 URL 및 필요한 헤더와 함께 Axios 인스턴스를 생성
const api = axios.create({
  baseURL: 'https://11.fesp.shop', // API 요청의 기본 URL
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 검색, 결과 및 여러 DOM 노드 획득
document.addEventListener('DOMContentLoaded', function () {
  const $searchInput = document.querySelector('.discover__header-input'); // 검색 입력창
  const $mainContent = document.querySelector('.discover__main'); // 메인 콘텐츠 영역
  const $postContent = document.querySelector('.post'); // 글 탭 콘텐츠
  const $authorContent = document.querySelector('.author'); // 작가 탭 콘텐츠
  const $noneContent = document.querySelector('.discover__none'); // '결과 없음' 표시 영역
  const $navTab = document.querySelectorAll('.discover__nav-tab'); // 글/작가 탭 버튼
  const $searchCount = document.querySelector('.discover__count-results'); // 검색 결과 카운트
  const $resetButton = document.querySelector('.discover__header-close'); // X 버튼

  let currentTab = 'post'; // 현재 활성화된 탭을 저장 (기본은 '글' 탭)
  let posts = []; // API로부터 받아온 게시물들을 저장할 배열

  // 처음 화면에서 모든 탭에서 active 클래스 제거
  $navTab[0].classList.remove('active');
  $navTab[1].classList.remove('active');

  // 게시물 데이터를 긁어와서 posts 배열에 저장
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

  // 작가 데이터 긁어오기
  async function fetchAuthor(keyword) {
    try {
      const response = await api.get('/users', {
        params: { name: keyword },
      });
      return response.data.item;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 글 검색 함수
  async function searchPost() {
    const keyword = $searchInput.value.trim();

    if (keyword) {
      const posts = await fetchPosts(keyword);

      // 글 목록 화면에 출력
      displayPostResults(posts, keyword);

      // 탭 활성화
      $navTab[0].classList.add('active'); // "글" 탭 활성화
      $navTab[1].classList.remove('active'); // "작가" 탭 active 제거
    }
  }

  // 작가 검색 함수
  async function searchAuthor() {
    const keyword = $searchInput.value.trim();

    if (keyword) {
      const posts = await fetchAuthor(keyword);

      // 작가 목록 화면에 출력
      displayAuthorResults(posts, keyword);

      // 탭 활성화
      $navTab[0].classList.remove('active'); // "글" 탭 active 제거
      $navTab[1].classList.add('active'); // "글" 탭 활성화
    }
  }

  // 검색어 입력 이벤트 (Enter키로 검색 실행)
  $searchInput.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
      const keyword = $searchInput.value.trim();

      if (keyword) {
        const posts = await fetchPosts(keyword);
        performSearch(keyword);
        displayPostResults(posts, keyword);
      }
    }
  });

  // "X" 버튼 클릭 시, 초기화
  $resetButton.addEventListener('click', async function () {
    $searchInput.value = ''; // 검색창 입력 초기화
    $postContent.innerHTML = ''; // 글 목록 초기화
  });

  // 결과 화면 비우는 함수
  function hideAllContent() {
    $postContent.style.display = 'none';
    $authorContent.style.display = 'none';
    $noneContent.style.display = 'none';
    $searchCount.textContent = '';
  }

  // 검색을 수행하는 함수
  function performSearch(keyword) {
    // 항상 "글" 탭이 기본 활성화 상태로 시작
    currentTab = 'post';

    // 기존 콘텐츠 숨기기 및 탭 초기화
    hideAllContent();
    $navTabs.forEach(function (tab) {
      tab.classList.remove('active');
    });
    $navTabs[0].classList.add('active'); // "글" 탭 활성화

    // "글" 탭 검색: 제목과 내용에서 검색
    const filteredPosts = posts.filter(function (post) {
      return (
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        post.content.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    if (filteredPosts.length > 0) {
      displayPostResults(filteredPosts, keyword); // 글 검색 결과 표시
      $searchCount.textContent = `글 검색 결과 ${filteredPosts.length}건`;
    } else {
      showNoResults(); // 결과 없음 표시
      $searchCount.textContent = '';
    }
  }

  // 글 목록 화면에 출력
  function displayPostResults(posts, keyword) {
    $postContent.innerHTML = posts
      .map(function (post) {
        // 이미지 URL 설정
        const imageUrl =
          post.image && Array.isArray(post.image) && post.image.length > 0
            ? 'https://11.fesp.shop' + post.image[0] // 첫 번째 이미지 사용
            : '/src/assets/images/no_profile.svg'; // post.image가 없으면 기본 이미지 설정

        return `
          <div class="post__lists">
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
          </div>
        `;
      })
      .join('');

    $postContent.style.display = 'block';
  }

  // 작가 목록 화면에 출력
  function displayAuthorResults(posts, keyword) {
    const uniqueAuthors = [
      ...new Set(
        posts.map(function (post) {
          return post.user;
        }),
      ),
    ];

    $authorContent.innerHTML = uniqueAuthors
      .map(author => {
        return `
        <div class="author__list">
          <a src="https://11.fesp.shop/src/features/author/author.html?no'+ ${
            author._id
          }">
            <div>
              <img class="author__list-cover" src="${
                author.image || '/src/assets/images/no_profile.svg'
              }" alt="작가 이미지" />
            </div>
            <div>
              <h3 class="author__list-title">${highlightSearchTerm(
                author.name,
                keyword,
              )}</h3>
              <p class="author__list-info"></p>
            </div>
          </a>
        </div>
      `;
      })
      .join('');

    $authorContent.style.display = 'block';
  }

  // 검색 결과 없음 화면에 출력
  function showNoResults() {
    $noneContent.style.display = 'flex';
    $searchCount.textContent = '';
    document.body.style.overflowY = 'hidden';

    return `
      <div class="discover__result-noneImg">
        <img
          src="/src/assets/icons/etc/logo_brunch_italic.svg"
          alt="관련 이미지"
        />
      </div>
      <p class="discover__result-none">검색 결과가 없습니다.</p>`;
  }

  // 태그 제외하고 순수 텍스트만 보여주는 함수
  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // 날짜를 Apr 16. 2024 형태로 만들어주는 함수
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}. ${year}`;
  }

  // 키워드 포인트 컬러로 변경
  function highlightSearchTerm(text, keyword) {
    if (!keyword) return text;
    // 정규 표현식, g플래그: 전체 검색 / i플래그: 대소문자 구분 X
    const regex = new RegExp(keyword, 'gi');
    return text.replace(regex, function (match) {
      // keyword에 해당하는 인스턴스를 찾아 수정한 버전을 span태그로 감싸서 반환
      return `<span class="discover__keyword">${match}</span>`;
    });
  }
});
