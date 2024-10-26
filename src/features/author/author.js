import axios from 'axios';

// API 설정
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
  },
});

// Utility 함수
// Utility 함수 - URL에서 userId 가져오는 함수
const getUserIdFromUrl = function () {
  const params = new URLSearchParams(window.location.search);
  return params.get('userId') || 10; // 없으면 기본 값 10으로 설정
};

//  Utility 함수 - 날짜 함수, 유저(작가)게시물 가져오는 함수 안에서 사용
// cratedAt는 post.createdAt 값을 받음
const getFormattedDate = function (cratedAt) {
  // 날짜와 시간 분리해서 날짜만 가져오기
  const dateOnly = cratedAt.split(' ')[0];
  // 날짜를 년, 월, 일로 분리
  const [year, month, day] = dateOnly.split('.');
  // 월 숫자를 영문으로 바꾸기 위한 배열
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  // 원하는 형식으로 날짜 조합
  return `${months[parseInt(month) - 1]} ${day}.${year}`;
};

// DOM 요소 선택
// DOM 요소 선택 - 유저(작가)의 프로필 관련 DOM 요소
const $userNickname = document.querySelector('.header__user-nickname');
const $userOccupation = document.querySelector('.header__user-occupation');
const $profileImage = document.querySelector('.header__profile-image');
const $subscriberCount = document.querySelector('.header__subscriber-count');
const $followingCount = document.querySelector('.header__following-count');
// const $subscribeButton = document.querySelector(
//   'header__subscription-button-image',
// );

// DOM 요소 선택 - 유저(작가)의 게시물 관련 DOM 요소
const $postList = document.querySelector('.article-list');

// 유저(작가)정보 가져오는 함수
const getUserInfo = async function () {
  try {
    // URL에서 userId 가져오기
    const userId = getUserIdFromUrl();

    // userId를 사용해 해당 유저(작가)의 정보를 API에서 가져옴
    const response = await api.get(`/users/${userId}`);
    const userData = response.data.item;
    console.log(userData);

    // 유저(작가)정보 넣기
    $userNickname.textContent = userData.name;
    $userOccupation.textContent = userData.extra?.job || '작가'; // 없으면 기본 값 작가로 설정
    $subscriberCount.textContent = userData.bookmakedBy?.users || 123; // 없으면 기본 값으로 설정
    $followingCount.textContent = userData.bookmark?.users || 45; // 없으면 기본 값으로 설정

    // TODO: 이미지 비동기 처리로 변경 예정
    $profileImage.src = api.defaults.baseURL + userData.image;
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
  }
};

// 유저(작가) 게시물 가져오는 함수
const getUserPost = async function () {
  try {
    // URL에서 userId 가져오기
    const userId = getUserIdFromUrl();

    // userId를 사용해 해당 유저(작가)의 게시물 데이터를 API에서 가져옴
    const response = await api.get(`/posts/users/${userId}?type=info`);
    const posts = response.data?.item;
    // console.log(posts);

    // 게시물 목록 초기화
    $postList.innerHTML = '';

    // 게시물 HTML 생성 및 자료 넣기
    $postList.innerHTML = posts
      .map(post => {
        // formatDate 함수로 날짜 변환
        const formattedDate = getFormattedDate(post.createdAt);

        // TODO:  <p class="article__excerpt"> - post.content 데이터 수정 필요
        return `
          <li class="article article--featured" data-post-id="${post._id}">
            <h3 class="article__title">${post.title}</h3>
            <p class="article__excerpt">
              <span class="article__subtitle">${post.extra.subTitle}</span>
              | ${post.content.substring(0, 100)}...
            </p>
            <div class="article__meta">
              <span class="article__comments">댓글 ${post.repliesCount} ·</span>
              <time class="article__date" datetime="${post.createdAt}">
                ${formattedDate}
              </time>
            </div>
          </li>
        `;
      })
      .join('');

    // 게시물을 클릭하면 상세페이지로 이동 하는 코드
    // 1. article 클래스를 가진 모든 li 요소 선택
    const $postItems = document.querySelectorAll('.article');
    // 2. 각 li 요소에 클릭 이벤트 추가
    $postItems.forEach(postItem => {
      postItem.addEventListener('click', function () {
        // 3. 클릭 된 요소의 data-post-id 값 가져오기
        const postId = postItem.dataset.postId;
        // 4. datail 페이지로 이동 (postId를 쿼리스트링으로 전달)
        window.location.href = `/src/features/detail/detail.html?postId=${postId}`;
      });
    });
  } catch (error) {
    console.error('유저 게시물을 가져오는 중 에러 발생:', error);
  }
};

// 이벤트 리스너
// 이벤트 리스너 - 페이지 로드 시 실행될 함수들
document.addEventListener('DOMContentLoaded', function () {
  getUserInfo();
  getUserPost();
});
