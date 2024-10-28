import axios from 'axios';

function initializeSlider(slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // 마우스 누를 때 시작 위치 기록
  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  // 마우스를 떼면 드래그 중지
  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  // 드래그가 끝날 때
  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  // 마우스 움직일 때 카드 슬라이드
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });

  // 터치 이벤트 (모바일 대응)
  slider.addEventListener('touchstart', e => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
  });

  slider.addEventListener('touchmove', e => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });
}
// 모든 슬라이더에 적용
const sliders = document.querySelectorAll('.cards');
sliders.forEach(slider => initializeSlider(slider));

// 관심작가 섹션의 슬라이더
const authorSliders = document.querySelectorAll('.interested-authors__ul');
authorSliders.forEach(slider => initializeSlider(slider));

/**
 * ----------------
 * 기능구현 코드
 * ----------------
 */

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    window.location.href = '/src/features/login/login.html';
  } else {
    loadMyBoxData(accessToken);
    loadRecentlyViewedPosts(); // 세션에서 최근 본 글 불러오기
  }
});

function loadMyBoxData(token) {
  // 관심 작가 북마크 데이터 요청
  axios({
    method: 'get',
    url: '/post/bookmarks/user', // 사용자 북마크 데이터
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      const bookmarkedAuthors = response.data.item;
      renderInterestedAuthors(bookmarkedAuthors);
    })
    .catch(error => console.error('관심 작가 로드 오류:', error));

  // 관심 글 북마크 데이터 요청
  axios({
    method: 'get',
    url: '/post/bookmarks/post', // 게시글 북마크 데이터
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      const likedPosts = response.data.item;
      renderInterestedPosts(likedPosts);
    })
    .catch(error => console.error('관심 글 로드 오류:', error));
}

// 세션 스토리지에서 최근 본 글 불러오는 함수
function loadRecentlyViewedPosts() {
  const recentPosts =
    JSON.parse(sessionStorage.getItem('recentlyViewedPosts')) || [];
  renderRecentlyViewed(recentPosts);
}

// 관심 작가, 최근 본 글, 관심 글 데이터를 페이지에 렌더링하는 함수들
function renderInterestedAuthors(authors) {
  const ulElement = document.querySelector('.interested-authors__ul');
  ulElement.innerHTML = '';

  authors.forEach(author => {
    const li = document.createElement('li');
    li.classList.add('interested-author-item');
    li.innerHTML = `
      <img src="${author.image}" alt="${author.name}의 이미지" />
      <p>${author.name}</p>
    `;
    ulElement.appendChild(li);
  });
}

function renderRecentlyViewed(posts) {
  const cardsElement = document.querySelector('.recently-viewed .cards');
  cardsElement.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
      <a href="${post.url}">
        <img src="${post.image}" alt="${post.title}" />
      </a>
      <h3>${post.title}</h3>
      <p><em>by</em> ${post.author}</p>
    `;
    cardsElement.appendChild(card);
  });
}

function renderInterestedPosts(posts) {
  const cardsElement = document.querySelector('.interested-posts .cards');
  cardsElement.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
      <a href="${post.url}">
        <img src="${post.image}" alt="${post.title}" />
      </a>
      <h3>${post.title}</h3>
      <p><em>by</em> ${post.author}</p>
    `;
    cardsElement.appendChild(card);
  });
}

// 최근 본 글을 세션 스토리지에 저장하는 함수
function saveToRecentlyViewed(post) {
  let recentPosts =
    JSON.parse(sessionStorage.getItem('recentlyViewedPosts')) || [];
  recentPosts.unshift(post); // 최근에 본 글이 맨 앞에 위치하도록 추가
  if (recentPosts.length > 10) recentPosts.pop(); // 최대 10개까지만 유지
  sessionStorage.setItem('recentlyViewedPosts', JSON.stringify(recentPosts));
}
