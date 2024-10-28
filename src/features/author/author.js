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
const getFormattedDate = function (createdAt) {
  // 날짜와 시간 분리해서 날짜만 가져오기
  const dateOnly = createdAt.split(' ')[0];
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
const $subscribeButton = document.querySelector(
  '.header__subscription-button-image',
);

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
    // console.log('유저(작가) 정보 :', userData);

    // 유저(작가)정보 넣기
    $userNickname.textContent = userData.name;
    $userOccupation.textContent = userData.extra?.job || '작가'; // 없으면 기본 값 작가로 설정
    $subscriberCount.textContent = userData.bookmarkedBy?.users || 123; // 없으면 기본 값으로 설정
    $followingCount.textContent = userData.bookmark?.users || 45; // 없으면 기본 값으로 설정

    // TODO: 이미지 비동기 처리로 변경 예정
    $profileImage.src = api.defaults.baseURL + userData.image;
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
  }
};

// 게시물 클릭 시 상세페이지로 이동하는 함수
const setupPostClickToDetail = function () {
  // 모든 게시물 요소 선택
  const $postItems = document.querySelectorAll('.article');

  // 각 게시물에 클릭 이벤트 추가
  $postItems.forEach(postItem => {
    postItem.addEventListener('click', function () {
      const postId = postItem.dataset.postId;
      window.location.href = `/src/features/detail/detail.html?postId=${postId}`;
    });
  });
};

// 유저(작가) 게시물 가져오는 함수
const getUserPost = async function () {
  try {
    // URL에서 userId 가져오기
    const userId = getUserIdFromUrl();

    // userId를 사용해 해당 유저(작가)의 게시물 데이터를 API에서 가져옴
    const response = await api.get(`/posts/users/${userId}?type=info`);
    const posts = response.data?.item;
    // console.log('유저(작가)의 게시물 :', posts);

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
              | ${post.content}...
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

    // 게시물 클릭 이벤트 함수 호출
    setupPostClickToDetail();
  } catch (error) {
    console.error('유저 게시물을 가져오는 중 에러 발생:', error);
  }
};

// 🚨 구독 기능 구현 - 강제로 로그인 상태 만들기
sessionStorage.setItem('userEmail', 'sparkle@gmail.com');
sessionStorage.setItem(
  'userAccessToken',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjcsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuyKpO2MjO2BtO2VkSIsImVtYWlsIjoic3BhcmtsZUBnbWFpbC5jb20iLCJpbWFnZSI6Ii9maWxlcy92YW5pbGxhMDMvdXNlci1zcGFya2xlcGluZy53ZWJwIiwibG9naW5UeXBlIjoia2FrYW8iLCJpYXQiOjE3MzAwOTU3NTYsImV4cCI6MTczMDE4MjE1NiwiaXNzIjoiRkVTUCJ9.ta3pHKiZxnABOVfUaYD3RwPv99fsfGI1xT-_AD1KfOw',
);

const token = sessionStorage.getItem('userAccessToken');

// (현재 로그인한)유저 정보 가져오기
const getLoginUser = async function () {
  try {
    // 세션에서 현재 로그인한 유저 이메일 가져오기
    const userEmail = sessionStorage.getItem('userEmail');
    console.log('현재 로그인한 이메일: ', userEmail);

    // 전체 유저 목록 불러오기
    const response = await api.get('/users');
    const users = response.data.item;
    console.log('전체 유저 목록: ', users);

    // 전체 유저 중 세션에 등록된 이메일로 현재 로그인한 유저 찾기
    const loginUser = users.find(function (user) {
      return user.email === userEmail;
    });
    console.log('현재 로그인한 유저 정보: ', loginUser);

    return loginUser;
  } catch (error) {
    console.error('현재 로그인한 유저 정보 가져오기 실패:', error);
  }
};

// (현재 페이지의 유저에 대한)구독 상태 확인 함수
const checkIsSubscribed = async function () {
  // 토큰 체크 추가 - 회원만 구독 가능
  if (!token) {
    console.log('로그인이 필요합니다');
    return false;
  }

  try {
    // 현재 페이지의 유저 Id 가져오기
    const targetId = getUserIdFromUrl();

    // 로그인 한 유저가 현재 페이지의 유저 구독 여부 확인
    const response = await api.get(`/bookmarks/user/${targetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // 구독 중이면 1(=true), 구독 아니면 0(=false)
    console.log('현재 페이지 유저에 대한 나의 구독 여부 정보: ', response.data);
    return response.data.ok === 1;
  } catch (error) {
    console.error('구독 상태 확인 실패:', error);
    return false;
  }
};

// 구독 상태를 전환(구독/취소)하는 함수
const toggleSubscribe = async function () {
  if (!token) {
    alert('로그인이 필요합니다');
    return;
  }

  try {
    // URL에서 페이지 유저 Id 가져오기
    const targetId = getUserIdFromUrl();
    // 구독 상태 확인
    const isSubscribed = await checkIsSubscribed();

    // 구독X 상태
    if (!isSubscribed) {
      // 구독하기
      await api.post(
        '/bookmarks/user',
        { target_id: targetId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // 구독 이미지 변경
      $subscribeButton.src = 'src/assets/icons/like_sub/sub_green.svg';
    } else {
      // 구독 취소하기
      await api.delete(`/bookmarks/${targetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      $subscribeButton.src = '../../assets/icons/like_sub/sub.svg';
    }
  } catch (error) {
    console.error('구독 상태 전환 실패:', error);
  }
};

// 이벤트 리스너 - 페이지 로드 시 실행될 함수들
document.addEventListener('DOMContentLoaded', function () {
  getUserInfo();
  getUserPost();
  getLoginUser();
  checkIsSubscribed();
  toggleSubscribe();
});
