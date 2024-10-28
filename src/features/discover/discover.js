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
  const $authorContent = document.querySelector('.author__lists'); // 작가 탭 콘텐츠
  const $noneContent = document.querySelector('.discover__none'); // '결과 없음' 표시 영역
  const $navTabs = document.querySelectorAll('.discover__nav-tab'); // 글/작가 탭 버튼
  const $searchCount = document.querySelector('.discover__count-results'); // 검색 결과 카운트
  const $resetButton = document.querySelector('.discover__header-close'); // X 버튼

  let currentTab = 'post'; // 현재 활성화된 탭을 저장 (기본은 '글' 탭)
  let posts = []; // API로부터 받아온 게시물들을 저장할 배열

  function hideAllContent() {
    $postContent.style.display = 'none';
    $authorContent.style.display = 'none';
    $noneContent.style.display = 'none';
    $searchCount.textContent = '';
  }

  // 검색 결과 없음
  function showNoResults() {
    $noneContent.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
  }

  // 검색을 다시 한 경우 내용이 넘치면 스크롤 바 만들어주기
  function showResults() {
    document.body.style.overflowY = 'scroll';
  }

  // 게시물 데이터를 긁어와서 posts 배열에 저장
  async function fetchPosts() {
    try {
      const response = await api.get('/posts?type=info');
      posts = response.data.item;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // "X" 버튼 클릭 시, 초기화
  $resetButton.addEventListener('click', async function () {
    $searchInput.value = ''; // 검색창 입력 초기화
    hideAllContent(); // 기존 콘텐츠 숨기기

    // 모든 탭에서 'active' 클래스 제거
    $navTabs.forEach(function (tab) {
      tab.classList.remove('active');
    });
    $navTabs[0].classList.add('active'); // 기본 탭인 글 탭 활성화

    $searchCount.textContent = ''; // 검색 결과 개수 초기화
    $mainContent.innerHTML = ''; // 검색 결과 내용 제거
    $mainContent.style.overflowY = 'hidden'; // 스크롤바 숨기기

    currentTab = 'post'; // 기본 탭을 'post'로 초기화
    posts = []; // posts 배열 초기화

    await fetchPosts(); // X 버튼 클릭 후 데이터 다시 불러오기
    $searchInput.focus(); // 검색창에 포커스 설정
  });

  // 검색 수행하는 함수
  function performSearch(searchTerm) {
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
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (filteredPosts.length > 0) {
      displayPostResults(filteredPosts, searchTerm); // 글 검색 결과 표시
      $searchCount.textContent = `글 검색 결과 ${filteredPosts.length}건`;
    } else {
      showNoResults(); // 결과 없음 표시
      $searchCount.textContent = '';
    }
  }

  // 글 검색 결과 표시
  function displayPostResults(posts, searchTerm) {
    $postContent.innerHTML = posts
      .map(function (post, index) {
        let imageUrl = null;

        // 글에 포함된 이미지 배열의 첫 번째 이미지를 사용
        if (post.image && Array.isArray(post.image) && post.image.length > 0) {
          imageUrl = post.image[0];
        } else if (post.content) {
          // 내용에서 이미지 태그 찾기
          const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        // product 이미지가 있을 경우 대체로 설정
        if (!imageUrl && post.product && post.product.image) {
          imageUrl = post.product.image;
        }

        // 작성자 이미지가 있을 경우 대체로 설정
        if (!imageUrl && post.user && post.user.image) {
          imageUrl = post.user.image;
        }

        const defaultImagePath = '/src/assets/images/home/pick1.png';
        const imageNumber = (index % 10) + 1;
        const fallbackImagePath = `/src/assets/images/home/pick${imageNumber}.png`;

        return `
          <div class="post__lists">
            <div>
              <h3 class="post__list-title">
                ${highlightSearchTerm(post.title, searchTerm)}
              </h3>
            </div>
            <div class="post__list-content">
              <div class="content__text">
                <div>
                  <p class="content__text-main">
                    ${highlightSearchTerm(stripHtml(post.content).substring(0, 100) + '...', searchTerm)}
                  </p>
                  <div class="content__text-info">
                    ${formatDate(post.createdAt)}
                    <div class="circle"></div>
                    <em>by</em> ${highlightSearchTerm(post.user.name, searchTerm)}
                  </div>
                </div>
              </div>
              <div class="content__cover">
                <img 
                  src="${imageUrl || fallbackImagePath}" 
                  alt="포스트 이미지" 
                  loading="lazy"
                  onerror="this.src='${defaultImagePath}'"
                />
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    $postContent.style.display = 'block';
  }

  // 작가 검색 결과 표시
  function displayAuthorResults(posts, searchTerm) {
    const uniqueAuthors = [
      ...new Set(
        posts.map(function (post) {
          return post.user;
        }),
      ),
    ];

    $authorContent.innerHTML = uniqueAuthors
      .map(function (author, index) {
        const defaultImagePath = '/src/assets/images/home/pick1.png';
        const imageNumber = (index % 10) + 1;
        const fallbackImagePath = `/src/assets/images/home/pick${imageNumber}.png`;

        return `
          <div class="author__list">
            <div>
              <img 
                class="author__list-cover" 
                src="${author.image || fallbackImagePath}" 
                alt="작가 이미지"
                onerror="this.src='${defaultImagePath}'"
              />
            </div>
            <div>
              <h3 class="author__list-title">
                ${highlightSearchTerm(author.name, searchTerm)}
              </h3>
              <p class="author__list-info">
                ${stripHtml(
                  posts.find(function (post) {
                    return post.user._id === author._id;
                  }).content,
                ).substring(0, 50)}...
              </p>
            </div>
          </div>
        `;
      })
      .join('');

    $authorContent.style.display = 'block';
  }

  // 검색어 입력 이벤트 (Enter키로 검색 실행)
  $searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const searchTerm = $searchInput.value.trim();
      if (searchTerm) {
        performSearch(searchTerm);
      }
    }
  });

  hideAllContent(); // 모든 콘텐츠 숨기기

  fetchPosts(); // 페이지 로드 시 서버로부터 게시물을 불러 옴

  // 처음 화면에서 모든 탭에서 active 클래스 제거
  $navTabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  // 작가 검색 시 중복된 작가 이름이 나타나지 않도록 설정
  $navTabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      // 현재 검색어가 있을 때만 탭 전환 수행
      const searchTerm = $searchInput.value.trim();
      if (!searchTerm) return;

      // 탭 상태 초기화 후 현재 탭 활성화
      $navTabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      currentTab = index === 0 ? 'post' : 'author';

      // 탭에 따라 검색 결과 표시
      hideAllContent();
      if (currentTab === 'post') {
        performSearch(searchTerm); // 글 검색 결과 표시
      } else {
        // 작가 검색 결과에서 중복 제거
        const uniqueAuthors = new Set();
        const authorFilteredPosts = posts.filter(function (post) {
          const authorName = post.user.name.toLowerCase();
          if (
            authorName.includes(searchTerm.toLowerCase()) &&
            !uniqueAuthors.has(authorName)
          ) {
            uniqueAuthors.add(authorName); // 중복되지 않는 작가 이름 추가
            return true;
          }
          return false;
        });

        if (authorFilteredPosts.length > 0) {
          displayAuthorResults(authorFilteredPosts, searchTerm); // 작가 검색 결과 표시
          $searchCount.textContent = `작가 검색 결과 ${authorFilteredPosts.length}건`;
        } else {
          showNoResults();
          $searchCount.textContent = '';
        }
      }
    });
  });

  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}. ${year}`;
  }

  function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, function (match) {
      return `<span class="discover__keyword">${match}</span>`;
    });
  }
});
