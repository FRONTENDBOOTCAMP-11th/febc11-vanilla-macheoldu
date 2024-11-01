import axios from 'axios';

function initializeSlider(slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

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
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

const sliders = document.querySelectorAll('.cards');
sliders.forEach(slider => initializeSlider(slider));

const authorSliders = document.querySelectorAll('.interested-authors__ul');
authorSliders.forEach(slider => initializeSlider(slider));

/**
 * ==================
 * =====기능구현=====
 * ==================
 */

// 사용 DOM 노드 획득
const ulElement = document.querySelector('.interested-authors__ul');

// 세션 스토리지에 저장되어 있는 사용자 id 획득
const userId = sessionStorage.getItem('userIdNum');

// 관심 작가 렌더링 함수
const renderInterestedAuthors = function (bookmarkedAuthors) {
  ulElement.innerHTML = '';

  // 구독한 작가 배열 내의 데이터 개수만큼 반복분 실행
  for (let i = 0; i < bookmarkedAuthors.length; i++) {
    let bookmarkAuthorName = bookmarkedAuthors[i].user.name; // 구독한 작가 이름 추출
    let bookmarkAuthorImage = bookmarkedAuthors[i].user.image; // 구독한 작가 프사 추출
    let bookmarkAuthorId = bookmarkedAuthors[i].user._id; //
    // li node 생성
    const li = document.createElement('li');
    li.classList.add('interested-author-item');
    // 사용자 프로필 정보 node 생성
    li.innerHTML = `<a href="/src/features/author/author.html?userId=${bookmarkAuthorId}">
      <img src="https://11.fesp.shop${bookmarkAuthorImage}" alt="${bookmarkAuthorName}의 이미지" />
      <p>${bookmarkAuthorName}</p>
      </a>
    `;
    // ul 태그에 추가
    ulElement.appendChild(li);
  }
};
//관심글 랜더링 함수
const renderInterestedPosts = function (post) {
  const cardsElement = document.querySelector('.interested-posts .cards');
  cardsElement.innerHTML = '';

  for (let i = 0; i < post.length; i++) {
    const Interestedinfo = post[i];
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `
      <a href="/src/features/detail/detail.html?postId=${Interestedinfo.post._id}"> 
        <img src="https://11.fesp.shop${Interestedinfo.post.image || '/files/vanilla03/no_profile.svg'}" />
      </a>
      <h3>${Interestedinfo.post.title}</h3>
      <p><em>by</em> ${Interestedinfo.post.user.name}</p>
    `;
    cardsElement.appendChild(card);
  }
};

if (!userId) {
  //
  alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
  window.location.href = '/src/features/start/start.html';
} else {
  loadMyBoxData(userId);
  loadInterestedPosts(userId);
}

function loadMyBoxData(userId) {
  // 관심 작가 북마크 데이터 요청
  axios({
    method: 'get',
    url: `https://11.fesp.shop/users/${userId}/bookmarks`, // 사용자 북마크 데이터 호출 API
    headers: { 'client-id': 'vanilla03' },
  })
    .then(response => {
      // 데이터 저장
      const bookmarkedAuthors = response.data.item.user;
      const likedPosts = response.data.item.info; //추후에 info를 post 로 수정할 가능성 있음
      renderInterestedAuthors(bookmarkedAuthors);

      // data 획득 test 용 콘솔
      console.log(response.data.item);
      console.log(bookmarkedAuthors);
      console.log(likedPosts);
      console.log(bookmarkedAuthors);
    })
    .catch(error => alert('관심 작가 로드 오류:', error));
}

// 최근 본 게시글을 렌더링하는 함수
function loadInterestedPosts(userId) {
  axios({
    method: 'get',
    url: `https://11.fesp.shop/users/${userId}/bookmarks`, // 사용자의 관심 글 API
    headers: { 'client-id': 'vanilla03' },
  })
    .then(response => {
      const interestedPosts = response.data.item.post; // 관심 글 데이터
      console.log(interestedPosts); // 데이터 구조 확인용
      renderInterestedPosts(interestedPosts); // 관심 글 렌더링
    })
    .catch(error => alert('관심 글 로드 오류:', error));
}

// 각 postId에 해당하는 게시글 정보를 불러와 화면에 표시하는 함수
function renderRecentlyViewedPosts() {
  const cardsElement = document.querySelector('.recently-viewed .cards');
  cardsElement.innerHTML = ''; // 기존 내용을 초기화

  // 세션 스토리지에서 최근 본 postId 배열 가져오기
  const postIds = JSON.parse(sessionStorage.getItem('postIds')) || [];
  // 배열 확인
  console.log('최근 본 postIds 배열:', postIds);

  let postId;
  // 각 postId로 게시글 정보를 가져와 렌더링
  for (let i = 0; i < postIds.length; i++) {
    postId = postIds[i];

    // 서버나 API로부터 게시글 정보를 가져오는 예시
    axios({
      method: 'get',
      url: `https://11.fesp.shop/posts/${postId}`,
      headers: {
        'client-id': 'vanilla03',
      },
    })
      .then(response => {
        const post = response.data;

        console.log(post);
        // 새로운 카드 요소 생성 및 내용 추가
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <a href="/src/features/detail/detail.html?postId=${post.item._id}">
            <img src="https://11.fesp.shop${post.item.image[0]}" alt="${post.item.title}" />
          </a>
          <div class="cards__text">
            <h3>${post.item.title}</h3>
            <p><em>by</em> ${post.item.user.name}</p>
          </div>
        `;

        // <div class="cards">에 카드 추가
        cardsElement.appendChild(card);
      })
      .catch(error => console.error(`Error loading post ${postId}:`, error));
  }
}

// 페이지 로드 시 최근 본 게시글 렌더링
document.addEventListener('DOMContentLoaded', () => {
  renderRecentlyViewedPosts();
});

//내브런치
// API를 호출하여 게시글 데이터를 가져오는 함수
const getMyPosts = function () {
  axios({
    method: 'get',
    url: `https://11.fesp.shop/posts/users/${userId}?type=info`,
    headers: {
      'client-id': 'vanilla03',
    },
  })
    .then(response => {
      const myPostsArray = response.data.item;
      renderMyBrunchPosts(myPostsArray); // 데이터 배열을 렌더링 함수에 전달
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        alert(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
      }
    });
};

// 게시글을 화면에 렌더링하는 함수
function renderMyBrunchPosts(posts) {
  const brunchSection = document.querySelector('.my-brunch-info');
  brunchSection.innerHTML = '';
  // 기존 콘텐츠 초기화
  // brunchSection.innerHTML = `
  //   <div class="section-title">
  //     <h2>내 브런치</h2>
  //     <span class="arrow">
  //       <a href="#">
  //         <img src="/src/assets/icons/actions/view-more.svg" />
  //       </a>
  //     </span>
  //   </div>
  // `;

  // posts 배열을 순회하며 게시글 요소 생성 및 데이터 삽입
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    // 게시글 요소를 생성하고 데이터 삽입
    const postElement = document.createElement('div');
    postElement.classList.add('brunch-info');

    postElement.innerHTML = `
    <a href="/src/features/detail/detail.html?postId=${post._id}">
    <h3>${post.title}</h3>
      <p>${post.extra.subTitle}</p>
      <p>${post.createdAt}</p>
    </a>  
    `;

    // my-brunch 섹션에 생성한 요소 추가
    brunchSection.appendChild(postElement);
  }
}

// 페이지가 로드되면 게시글 데이터를 불러오고 렌더링
document.addEventListener('DOMContentLoaded', () => {
  getMyPosts(); // 페이지 로드시 getMyPosts 호출
});
