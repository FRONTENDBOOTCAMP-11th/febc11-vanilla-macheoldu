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
  return params.get('userId') || 10;
};

//  Utility 함수 - 날짜 함수, 유저(작가)게시물 함수 안에서 사용
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
    $subscriberCount.textContent = userData.bookmarkedBy.users;
    $followingCount.textContent = userData.bookmark.users;

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

// (현재 페이지 유저에 대한)구독 상태 확인 함수
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
    alert('로그인이 필요한 서비스입니다. 로그인하시겠습니까?');
    return;
  }

  try {
    // URL에서 페이지 유저 Id 가져오기
    const targetId = getUserIdFromUrl();

    // 현재 로그인한 사용자 정보 가져오기
    const loginUser = await getLoginUser();
    // 현재 로그인 한 유저의 페이지인지도 확인 - 본인 구독 금지
    if (loginUser._id === targetId) {
      alert('본인을 구독 할 수 없습니다');
      return;
    }

    // 구독 상태 확인
    const isSubscribed = await checkIsSubscribed();

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
      $subscribeButton.src = '/assets/icons/like_sub/sub_green.svg';
    } else {
      // 구독 취소하기
      // 1. 로그인 한 유저의 북마크 목록 가져오기
      const bookmarks = await api.get('/bookmarks/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('로그인한 유저의 전체 북마크 목록:', bookmarks);

      // 2. 현재 페이지의 유저와 매칭되는 북마크 찾기
      const bookmark = bookmarks.data.item.find(function (bookmark) {
        return bookmark.user._id === targetId;
      });
      console.log('현재 페이지 유저의 북마크:', bookmark);

      if (bookmark) {
        // 3. 찾은 북마크의 Id로 삭제 요청
        await api.delete(`/bookmarks/${bookmark._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // 구독 취소 이미지 변경
        $subscribeButton.src = '/assets/icons/like_sub/sub.svg';
      }
    }

    // 서버와 동기화를 위해 작가 정보 갱신
    await getUserInfo();
  } catch (error) {
    console.error('구독 상태 전환 실패:', error);
  }
};

// 구독 상태에 따라 버튼 이미지를 표시해주는 함수
const setupSubscribeButton = async function () {
  try {
    // 현재 구독 상태 확인
    const isSubscribed = await checkIsSubscribed();

    // 구독 상태에 따라 초기 이미지 설정
    if (isSubscribed) {
      $subscribeButton.src = '/assets/icons/like_sub/sub_green.svg';
    } else {
      $subscribeButton.src = '/assets/icons/like_sub/sub.svg';
    }
  } catch (error) {
    console.error('구독 버튼 이미지 초기화 실패:', error);
  }
};

// 이벤트 리스너 - 페이지 로드 시 실행될 함수들
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 1. 페이지 로드 시 필요한 모든 데이터 병렬로 가져옴 - 모든 작업 시간 단축
    await Promise.all([
      getUserInfo(),
      getUserPost(),
      getLoginUser(),
      setupSubscribeButton(), // 구독 버튼의 초기 상태 설정해주는 함수
    ]);

    // 구독 버튼 초기 상태 설정해주는 함수 때문에 위치 중요
    $subscribeButton.addEventListener('click', toggleSubscribe);
  } catch (error) {
    console.error('페이지 로드 실패:', error);
  }
});
