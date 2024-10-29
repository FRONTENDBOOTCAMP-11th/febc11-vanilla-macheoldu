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

//기능 구현
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

    // li node 생성
    const li = document.createElement('li');
    li.classList.add('interested-author-item');
    // 사용자 프로필 정보 node 생성
    li.innerHTML = `
      <img src="https://11.fesp.shop${bookmarkAuthorImage}" alt="${bookmarkAuthorName}의 이미지" />
      <p>${bookmarkAuthorName}</p>
    `;
    // ul 태그에 추가
    ulElement.appendChild(li);
  }
};

// 좋아요 누른 글 표시

//
if (!userId) {
  //
  alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
  window.location.href = '/src/features/start/start.html';
} else {
  loadMyBoxData(userId);
  // loadRecentlyViewedPosts(); // 세션에서 최근 본 글 불러오기
}
function loadMyBoxData(userId) {
  // 관심 작가 북마크 데이터 요청
  axios({
    method: 'get',
    url: `/api/users/${userId}/bookmarks`, // 사용자 북마크 데이터 호출 API
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
// // 세션 스토리지에서 최근 본 글 불러오는 함수
// function loadRecentlyViewedPosts() {
//   const recentPosts =
//     JSON.parse(sessionStorage.getItem('recentlyViewedPosts')) || []; //구현 될지 모르겟음
//   renderRecentlyViewed(recentPosts);
// }

// 관심 작가, 최근 본 글, 관심 글 데이터를 페이지에 렌더링하는 함수들
