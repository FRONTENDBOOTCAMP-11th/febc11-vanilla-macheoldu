import axios from 'axios';

const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const $searchInput = document.querySelector('.discover__header-input');
  const $mainContent = document.querySelector('.discover__main');
  const $postContent = document.querySelector('.post');
  const $authorContent = document.querySelector('.author__lists');
  const $homeContent = document.querySelector('.discover__home');
  const $noneContent = document.querySelector('.discover__none');
  const $navTabs = document.querySelectorAll('.discover__nav-tab');
  const $searchCount = document.querySelector('.discover__count-results');

  let currentTab = 'post';
  let posts = [];

  hideAllContent();
  showHomeContent();

  fetchPosts();

  $navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      $navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.textContent === '글' ? 'post' : 'author';

      if ($searchInput.value) {
        performSearch($searchInput.value);
      }
    });
  });

  $searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const searchTerm = $searchInput.value.trim();
      if (searchTerm) {
        performSearch(searchTerm);
      }
    }
  });

  const $resetButton = document.querySelector('.discover__header-close');
  $resetButton.addEventListener('click', () => {
    $searchInput.value = '';
    hideAllContent();
    showHomeContent();
  });

  async function fetchPosts() {
    try {
      const response = await api.get('/posts?type=info');
      posts = response.data.item;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  function performSearch(searchTerm) {
    const filteredPosts = posts.filter(post => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    hideAllContent();

    if (filteredPosts.length === 0) {
      showNoResults();
      return;
    }

    if (currentTab === 'post') {
      displayPostResults(filteredPosts, searchTerm);
    } else {
      displayAuthorResults(filteredPosts, searchTerm);
    }

    $searchCount.textContent = `${currentTab === 'post' ? '글' : '작가'} 검색 결과 ${filteredPosts.length}건`;
  }

  // CHANGES START
  function displayPostResults(posts, searchTerm) {
    $postContent.innerHTML = posts
      .map((post, index) => {
        // 이미지 URL 결정 로직
        let imageUrl = null;

        // 1. content에서 이미지 URL 추출 시도
        if (post.content) {
          const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        // 2. product.image 확인
        if (!imageUrl && post.product && post.product.image) {
          imageUrl = post.product.image;
        }

        // 3. user.image 확인
        if (!imageUrl && post.user && post.user.image) {
          imageUrl = post.user.image;
        }

        // 4. 폴백 이미지 설정
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

  function displayAuthorResults(posts, searchTerm) {
    const uniqueAuthors = [...new Set(posts.map(post => post.user))];

    $authorContent.innerHTML = uniqueAuthors
      .map((author, index) => {
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
                ${stripHtml(posts.find(post => post.user._id === author._id).content).substring(0, 50)}...
              </p>
            </div>
          </div>
        `;
      })
      .join('');

    $authorContent.style.display = 'block';
  }

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
    return text.replace(
      regex,
      match => `<span class="discover__keyword">${match}</span>`,
    );
  }
  // CHANGES END

  function hideAllContent() {
    $postContent.style.display = 'none';
    $authorContent.style.display = 'none';
    $homeContent.style.display = 'none';
    $noneContent.style.display = 'none';
  }

  function showHomeContent() {
    $homeContent.style.display = 'block';
  }

  function showNoResults() {
    $noneContent.style.display = 'flex';
  }
});
