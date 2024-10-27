import axios from 'axios';

// API 설정
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
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
const $postTitle = document.querySelector('.header__title');
const $postSubTitle = document.querySelector('.header__subtitle');
const $postAuthor = document.querySelector('.header__author');
const $postDate = document.querySelector('.header__date');
const $postContent = document.querySelector('.article');
const $postReplyCount = document.querySelector('.comments__count');

// 게시물 데이터 가져오는 함수
const getPost = async function (postId) {
  try {
    const response = await api.get(`/posts/${postId}?type=info`);
    console.log('게시물 데이터:', response.data.item);
    return response.data.item;
  } catch (error) {
    console.error('게시물 데이터 가져오기 실패:', error);
  }
};

// 작가 정보 가져오는 함수
const getAuthorInfo = async function (authorId) {
  try {
    const response = await api.get(`/users/${authorId}`);
    console.log('작가 데이터:', response.data.item);
    return response.data.item;
  } catch (error) {
    console.error('작가 정보 가져오기 실패:', error);
  }
};

// 게시물 출력하는 함수
const printPost = async function () {
  try {
    const postId = getPostIdFromUrl();
    if (!postId) {
      console.error('게시물 ID가 없습니다');
      return;
    }

    // 1. 게시물 데이터 가져오기
    const postData = await getPost(postId);

    // 2. 작가 정보 가져오기
    const authorData = await getAuthorInfo(postData.user._id);

    // 3. 화면에 데이터 표시
    $postTitle.textContent = postData.title || '제목 없음';
    $postSubTitle.textContent = postData.extra?.subTitle || '';
    $postAuthor.innerHTML = `<em class="header__author-prefix">by</em> ${authorData.name || '작성자 없음'}`;
    $postDate.textContent = getFormattedDate(postData.createdAt);
    $postContent.innerHTML = postData.content || '내용 없음';
    $postReplyCount.textContent = postData.replies.length || '0';

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
    const repliesHTML = postData.replies
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
                  src="../../assets/icons/like_sub/addmore.svg"
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

    $replyList.innerHTML = repliesHTML;
  } catch (error) {
    console.error('데이터 표시 중 에러:', error);
  }
};

// 이벤트 리스너 - 페이지 로드 시 실행될 함수들
document.addEventListener('DOMContentLoaded', function () {
  printPost();
});
