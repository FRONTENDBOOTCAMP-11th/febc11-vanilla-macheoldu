import axios from 'axios';

// API 설정
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    // Authorization: `Bearer ${token}`,
  },
});

// Utility 함수
// Utility 함수 - URL에서 postId 가져오는 함수
const getPostIdFromUrl = function () {
  const params = new URLSearchParams(window.location.search);
  return params.get('postId');
};

// Utility 함수 - 날짜 함수
const getFormattedDate = function (createdAt) {
  const dateOnly = createdAt.split(' ')[0];
  const [year, month, day] = dateOnly.split('.');
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
  return `${months[parseInt(month) - 1]} ${day}.${year}`;
};

// DOM 요소 선택
const $postCoverImage = document.querySelector('.header__cover-image');
const $postTitle = document.querySelector('.header__title');
const $postSubTitle = document.querySelector('.header__subtitle');
const $postAuthor = document.querySelector('.header__author');
const $postDate = document.querySelector('.header__date');
const $postContent = document.querySelector('.article');
const $postReplyCount = document.querySelector('.comments__count');

// 해당 게시물 데이터 가져오는 함수
const getPost = async function (postId) {
  try {
    const response = await api.get(`/posts/${postId}`);
    // console.log('해당 게시물 데이터:', response.data.item);
    return response.data.item;
  } catch (error) {
    console.error('해당 게시물 데이터 가져오기 실패:', error);
  }
};

// 해당 게시물 작가 정보 가져오는 함수 - 필요 없는듯!
const getAuthorInfo = async function (authorId) {
  try {
    const response = await api.get(`/users/${authorId}`);
    // console.log('해당 게시물 작가 데이터:', response.data.item);
    return response.data.item;
  } catch (error) {
    console.error('작가 정보 가져오기 실패:', error);
  }
};

// 게시물 출력하는 함수
const printPost = async function () {
  try {
    const postId = getPostIdFromUrl();

    // 1. 게시물 데이터 가져오기
    const postData = await getPost(postId);
    console.log('해당 게시물 확인:', postData);

    // 2. 작가 정보 가져오기 - by게시물 데이터 user._id - 근데 필요 없는듯!
    const authorData = await getAuthorInfo(postData.user._id);
    console.log('작가 정보 데이터 확인:', authorData);

    // 3. 화면에 데이터 표시
    // ⭐️ - 게시글에 image 넣어서 자료 셋팅 할 것
    $postCoverImage.src = api.defaults.baseURL + postData.image;
    $postTitle.textContent = postData.title;
    $postSubTitle.textContent = postData.extra.subTitle;
    $postAuthor.innerHTML = `<em class="header__author-prefix">by</em> ${authorData.name}`;
    $postDate.textContent = getFormattedDate(postData.createdAt);
    $postContent.innerHTML = postData.content;
    $postReplyCount.textContent = postData.replies.length;

    // 4. 댓글 목록 생성 - 목록 초기화
    const $replyList = document.querySelector('.comments__list');
    $replyList.innerHTML = '';

    // 댓글이 없는 경우
    if (!postData.replies || postData.replies.length === 0) {
      $replyList.innerHTML =
        '<p style="margin: 5px 5px 10px 0;">첫 번째 댓글을 작성해보세요!</p>';
      return;
    }

    // 댓글이 있는 경우, 댓글 목록 생성
    const createReplyHTML = postData.replies
      .map(
        reply => `
          <li class="comments__item">
            <div class="comments__user">
              <div class="comments__profile-image-wrapper">
                <img
                  class="comments__profile-image"
                  src="${api.defaults.baseURL + reply.user.image}"
                  alt="${reply.user.name}의 프로필 이미지"
                />
              </div>
              <div class="comments__user-info">
                <p class="comments__nickname">${reply.user.name}</p>
                <time datetime="${reply.createdAt}" class="comments__date">
                  ${getFormattedDate(reply.createdAt)}
                </time>
              </div>
              <button class="comments__option-button" aria-label="옵션 메뉴 열기">
                <img
                  class="comments__option-icon"
                  src="/assets/icons/like_sub/addmore.svg"
                  alt="옵션 버튼 아이콘"
                />
              </button>
            </div>
            <div class="comments__content">
              <p>${reply.content}</p>
            </div>
            <div class="comments__reply">
              <button class="comments__reply-button" aria-label="답글 달기">
                답글달기
              </button>
            </div>
          </li>
        `,
      )
      .join('');

    $replyList.innerHTML = createReplyHTML;
  } catch (error) {
    console.error('데이터 표시 중 에러:', error);
  }
};

// // 새로운 유저 관련 요소
// const $newUserNickname = document.querySelector('.new-author__nickname');
// const $newUserOccupation = document.querySelector('.new-author__occupation');
// const $newUserImage = document.querySelector('.new-author__image');
// const $newUserInfo = document.querySelector('.new-author__bio p');
// const $newUserSubscriberCount = document.querySelector(
//   '.new-author__subscriber-count',
// );
// const $newUserSubscribeButton = document.querySelector(
//   '.new-author__subscribe-button',
// );
// const $newUserSubscribeButtonImage = document.querySelector(
//   '.new-author__subscribe-icon',
// );

// // Utility 함수 - URL에서 userId 가져오는 함수
// const getUserIdFromUrl = function () {
//   const params = new URLSearchParams(window.location.search);
//   return params.get('userId') || 10; // 없으면 기본 값 10으로 설정
// };

// // 새로운 유저 정보 가져오는 함수
// const getUserInfo = async function () {
//   try {
//     // URL에서 userId 가져오기
//     const userId = getUserIdFromUrl();

//     // userId를 사용해 해당 유저(작가)의 정보를 API에서 가져옴
//     const response = await api.get(`/users/${userId}`);
//     const userData = response.data.item;
//     // console.log('유저(작가) 정보 :', userData);

//     // 유저(작가)정보 넣기
//     $newUserNickname.textContent = userData.name;
//     $newUserOccupation.textContent = userData.extra?.job || '작가';
//     $newUserInfo.textContent = userData.info;
//     $newUserSubscriberCount.textContent = userData.bookmarkedBy.users;

//     // TODO: 이미지 비동기 처리로 변경 예정
//     $newUserImage.src = api.defaults.baseURL + userData.image;
//   } catch (error) {
//     console.error('유저 정보를 가져오는 중 에러 발생:', error);
//   }
// };

// // 🚨 구독 기능 구현 - 강제로 로그인 상태 만들기
// sessionStorage.setItem('userEmail', 'sparkle@gmail.com');
// sessionStorage.setItem(
//   'userAccessToken',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjcsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuyKpO2MjO2BtO2VkSIsImVtYWlsIjoic3BhcmtsZUBnbWFpbC5jb20iLCJpbWFnZSI6Ii9maWxlcy92YW5pbGxhMDMvdXNlci1zcGFya2xlcGluZy53ZWJwIiwibG9naW5UeXBlIjoia2FrYW8iLCJpYXQiOjE3MzAwOTU3NTYsImV4cCI6MTczMDE4MjE1NiwiaXNzIjoiRkVTUCJ9.ta3pHKiZxnABOVfUaYD3RwPv99fsfGI1xT-_AD1KfOw',
// );

// const token = sessionStorage.getItem('userAccessToken');

// // (현재 로그인한)유저 정보 가져오기
// const getLoginUser = async function () {
//   try {
//     // 세션에서 현재 로그인한 유저 이메일 가져오기
//     const userEmail = sessionStorage.getItem('userEmail');
//     console.log('현재 로그인한 이메일: ', userEmail);

//     // 전체 유저 목록 불러오기
//     const response = await api.get('/users');
//     const users = response.data.item;
//     console.log('전체 유저 목록: ', users);

//     // 전체 유저 중 세션에 등록된 이메일로 현재 로그인한 유저 찾기
//     const loginUser = users.find(function (user) {
//       return user.email === userEmail;
//     });
//     console.log('현재 로그인한 유저 정보: ', loginUser);

//     return loginUser;
//   } catch (error) {
//     console.error('현재 로그인한 유저 정보 가져오기 실패:', error);
//   }
// };

// // (현재 페이지 유저에 대한)구독 상태 확인 함수
// const checkIsSubscribed = async function () {
//   // 토큰 체크 추가 - 회원만 구독 가능
//   if (!token) {
//     console.log('로그인이 필요합니다');
//     return false;
//   }

//   try {
//     // 현재 페이지의 유저 Id 가져오기
//     const targetId = getUserIdFromUrl();

//     // 로그인 한 유저가 현재 페이지의 유저 구독 여부 확인
//     const response = await api.get(`/bookmarks/user/${targetId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // 구독 중이면 1(=true), 구독 아니면 0(=false)
//     console.log('현재 페이지 유저에 대한 나의 구독 여부 정보: ', response.data);
//     return response.data.ok === 1;
//   } catch (error) {
//     console.error('구독 상태 확인 실패:', error);
//     return false;
//   }
// };

// // 구독 상태를 전환(구독/취소)하는 함수
// const toggleSubscribe = async function () {
//   if (!token) {
//     alert('로그인이 필요합니다');
//     return;
//   }

//   try {
//     // URL에서 페이지 유저 Id 가져오기
//     const targetId = getUserIdFromUrl();

//     // 현재 로그인한 사용자 정보 가져오기
//     const loginUser = await getLoginUser();
//     // 현재 로그인 한 유저의 페이지인지도 확인 - 본인 구독 금지
//     if (loginUser._id === targetId) {
//       alert('본인을 구독 할 수 없습니다');
//       return;
//     }

//     // 구독 상태 확인
//     const isSubscribed = await checkIsSubscribed();

//     if (!isSubscribed) {
//       // 구독하기
//       await api.post(
//         '/bookmarks/user',
//         { target_id: targetId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       // 구독 이미지 변경
//       $newUserSubscribeButtonImage.src = '/assets/icons/like_sub/sub_green.svg';
//     } else {
//       // 구독 취소하기
//       // 1. 로그인 한 유저의 북마크 목록 가져오기
//       const bookmarks = await api.get('/bookmarks/user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('로그인한 유저의 전체 북마크 목록:', bookmarks);

//       // 2. 현재 페이지의 유저와 매칭되는 북마크 찾기
//       const bookmark = bookmarks.data.item.find(function (bookmark) {
//         return bookmark.user._id === targetId;
//       });
//       console.log('현재 페이지 유저의 북마크:', bookmark);

//       if (bookmark) {
//         // 3. 찾은 북마크의 Id로 삭제 요청
//         await api.delete(`/bookmarks/${bookmark._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // 구독 취소 이미지 변경
//         $newUserSubscribeButtonImage.src = '/assets/icons/like_sub/sub.svg';
//       }
//     }

//     // 서버와 동기화를 위해 작가 정보 갱신
//     await getUserInfo();
//   } catch (error) {
//     console.error('구독 상태 전환 실패:', error);
//   }
// };

// // 구독 상태에 따라 버튼 이미지를 표시해주는 함수
// const setupSubscribeButton = async function () {
//   try {
//     // 현재 구독 상태 확인
//     const isSubscribed = await checkIsSubscribed();

//     // 구독 상태에 따라 초기 이미지 설정
//     if (isSubscribed) {
//       $newUserSubscribeButtonImage.src = '/assets/icons/like_sub/sub_green.svg';
//     } else {
//       $newUserSubscribeButtonImage.src = '/assets/icons/like_sub/sub.svg';
//     }
//   } catch (error) {
//     console.error('구독 버튼 이미지 초기화 실패:', error);
//   }
// };

// 이벤트 리스너 - 페이지 로드 시 실행될 함수들
document.addEventListener('DOMContentLoaded', function () {
  printPost();
  // getUserInfo();
  // setupSubscribeButton();
  // $newUserSubscribeButton.addEventListener('click', toggleSubscribe);
});
