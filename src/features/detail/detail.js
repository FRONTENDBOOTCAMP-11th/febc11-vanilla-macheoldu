import axios from 'axios';

/**
 * API 설정
 * axios 인스턴스 생성으로 기본 설정을 한 번에 관리
 * - baseURL: API 서버의 기본 주소
 * - headers: 모든 요청에 포함될 기본 헤더
 */
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
  },
});

/**
 * URL에서 게시물 ID를 가져오고 최근 본 게시물을 관리하는 함수
 *
 * 동작 방식:
 * 1. URL의 쿼리 파라미터에서 postId 추출
 * 2. 최근 본 게시물 목록 관리
 *    - 세션 스토리지에서 기존 목록 로드
 *    - 중복 확인 후 새 게시물 추가
 *    - 최대 6개까지만 유지 (오래된 것부터 제거)
 *
 * @returns {string} URL에서 추출한 게시물 ID
 */
const getPostIdFromUrl = function () {
  const params = new URLSearchParams(window.location.search);

  if (params.get('postId')) {
    let postIds = JSON.parse(sessionStorage.getItem('postIds')) || [];

    if (!postIds.includes(params.get('postId'))) {
      postIds.push(params.get('postId'));

      if (postIds.length > 6) {
        postIds.shift();
      }
      sessionStorage.setItem('postIds', JSON.stringify(postIds));
    }
  }

  return params.get('postId');
};

/**
 * 날짜 포맷을 변환하는 유틸리티 함수
 * 서버에서 받은 날짜 형식(YYYY.MM.DD)을
 * 표시용 형식(MMM DD.YYYY)으로 변환
 *
 * @param {string} createdAt - YYYY.MM.DD 형식의 날짜 문자열
 * @returns {string} 'MMM DD.YYYY' 형식으로 변환된 날짜
 *
 * 예시:
 * input: "2024.03.21"
 * output: "Mar 21.2024"
 */
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

/**
 * DOM 요소 선택
 * 게시글 관련 모든 요소들을 미리 선택하여 변수에 저장
 * 반복적인 querySelector 호출을 방지하고 코드 가독성 향상
 */
/**
 * 게시글 관련 DOM 요소
 * 페이지에서 게시글 정보를 표시하는 모든 요소들
 */
const $postCoverImage = document.querySelector('.header__cover-image');
const $postTitle = document.querySelector('.header__title');
const $postSubTitle = document.querySelector('.header__subtitle');
const $postAuthor = document.querySelector('.header__author');
const $postDate = document.querySelector('.header__date');
const $postContent = document.querySelector('.article');
const $postReplyCount = document.querySelector('.comments__count');
const $postLikeCount = document.querySelector('.footer__like-count');
const $postLikeImage = document.querySelector('.footer__like-icon');
const $postLikeButton = document.getElementById('footer__interaction');

/**
 * 작가 정보 관련 DOM 요소
 * 페이지에서 작가 정보를 표시하는 모든 요소들
 */
const $authorNickname = document.querySelector('.new-author__nickname');
const $authorOccupation = document.querySelector('.new-author__occupation');
const $authorImage = document.querySelector('.new-author__image');
const $authorInfo = document.querySelector('.new-author__bio p');
const $authorSubscriberCount = document.querySelector(
  '.new-author__subscriber-count',
);
const $authorSubscribeButton = document.querySelector(
  '.new-author__subscribe-button',
);
const $authorSubscribeButtonImage = document.querySelector(
  '.new-author__subscribe-icon',
);

/**
 * 로그인 체크 함수
 *
 * @returns {boolean} 로그인 상태
 * 로그인되지 않은 경우 로그인 페이지로 리다이렉트
 */
const checkLogin = function () {
  const token = sessionStorage.getItem('userAccessToken');
  if (!token) {
    alert('로그인이 필요합니다');
    window.location.href = '/src/features/start/start.html';
    return false;
  }
  return true;
};

/**
 * 게시물 데이터를 서버에서 가져오는 함수
 * @param {string|number} postId - 가져올 게시물의 ID
 * @returns {Promise<Object>} 게시물 데이터 객체
 */
const getPost = async function (postId) {
  if (!checkLogin()) return;
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data.item;
  } catch (error) {
    console.error('해당 게시물 데이터 가져오기 실패:', error);
  }
};

/**
 * 작가 정보를 서버에서 가져오는 함수
 * @param {string|number} authorId - 작가의 ID
 * @returns {Promise<Object>} 작가 정보 데이터 객체
 */
const getAuthorInfo = async function (authorId) {
  if (!checkLogin()) return;
  try {
    const response = await api.get(`/users/${authorId}`);
    return response.data.item;
  } catch (error) {
    console.error('작가 정보 가져오기 실패:', error);
  }
};

/**
 * 게시물 정보를 화면에 출력하는 함수
 *
 * 동작 과정:
 * 1. URL에서 게시물 ID를 가져옴
 * 2. 서버에서 게시물 데이터를 조회
 * 3. 게시물 기본 정보 표시 (제목, 내용, 이미지 등)
 * 4. 댓글 목록 생성
 * 5. 작가 정보 표시
 */
const printPost = async function () {
  try {
    const postId = getPostIdFromUrl();
    const postData = await getPost(postId);

    // postData가 없는 경우 처리
    if (!postData) {
      console.error('게시물을 찾을 수 없습니다');
      alert('게시물을 찾을 수 없습니다');
      window.location.href = '/src/features/list/list.html';
      return;
    }

    // 게시물 기본 정보 표시
    $postCoverImage.src = api.defaults.baseURL + postData.image;
    $postTitle.textContent = postData.title;
    $postSubTitle.textContent = postData.extra?.subTitle || '';
    $postAuthor.innerHTML = `<em class="header__author-prefix">by</em> ${postData.user.name}`;
    $postDate.textContent = getFormattedDate(postData.createdAt);
    $postContent.innerText = postData.content;
    $postReplyCount.textContent = postData.replies?.length || 0;
    $postLikeCount.textContent = postData.bookmarks || 0;

    /**
     * 댓글 목록 생성 시 map과 join을 사용하는 이유:
     * 1. map: 각 댓글 데이터를 HTML 문자열로 변환
     * 2. join(''): 배열을 하나의 문자열로 합침
     *
     * innerHTML을 한 번만 사용하여 DOM 조작을 최소화
     * -> 성능 최적화 및 리플로우 최소화
     */
    const $replyList = document.querySelector('.comments__list');
    $replyList.innerHTML = '';

    if (
      !postData.replies ||
      !Array.isArray(postData.replies) ||
      postData.replies.length === 0
    ) {
      $replyList.innerHTML =
        '<p style="margin: 5px 5px 10px 0;">첫 번째 댓글을 작성해보세요!</p>';
    } else {
      const createReplyHTML = postData.replies
        .map(reply => {
          if (!reply || !reply.user) return '';
          return `
            <li class="comments__item">
              <div class="comments__user">
                <div class="comments__profile-image-wrapper">
                  <img class="comments__profile-image" 
                       src="${api.defaults.baseURL + reply.user.image}" 
                       alt="${reply.user.name}의 프로필 이미지" />
                </div>
                <div class="comments__user-info">
                  <p class="comments__nickname">${reply.user.name}</p>
                  <time datetime="${reply.createdAt}" class="comments__date">
                    ${getFormattedDate(reply.createdAt)}
                  </time>
                </div>
                <button class="comments__option-button" aria-label="옵션 메뉴 열기">
                  <img class="comments__option-icon" 
                       src="/assets/icons/like_sub/addmore.svg" 
                       alt="옵션 버튼 아이콘" />
                </button>
              </div>
              <div class="comments__content">
                <p>${reply.content}</p>
              </div>
              <div class="comments__reply">
                <button class="comments__reply-button" aria-label="답글 달기">답글달기</button>
              </div>
            </li>
          `;
        })
        .filter(html => html)
        .join('');

      $replyList.innerHTML = createReplyHTML;
    }

    // 작가 정보 가져오기 전에 user._id 체크
    if (!postData.user?._id) {
      console.error('작성자 정보를 찾을 수 없습니다');
      return;
    }

    /**
     * 작가 정보는 게시물 정보를 모두 표시한 후에 마지막으로 가져옴
     * 이유:
     * 1. 사용자가 먼저 보는 게시물 내용을 우선적으로 로드
     * 2. 작가 정보는 스크롤해서 아래로 내려야 보이는 정보이므로 나중에 로드
     * -> 사용자 경험 최적화
     */
    const authorData = await getAuthorInfo(postData.user._id);

    // authorData 체크 추가
    if (!authorData) {
      console.error('작가 정보를 가져올 수 없습니다');
      return;
    }

    $authorNickname.textContent = authorData.name || '이름 없음';
    $authorOccupation.textContent = authorData.extra?.job || '작가';
    $authorImage.src = api.defaults.baseURL + authorData.image;
    $authorInfo.textContent = authorData.info || '';
    $authorSubscriberCount.textContent = authorData.bookmarkedBy?.users || 0;
  } catch (error) {
    console.error('데이터 표시 중 에러:', error);
    alert('게시물을 불러오는 중 오류가 발생했습니다');
  }
};

/**
 * 로그인 관련 설정
 * 세션 스토리지에서 사용자 토큰을 가져와 인증 상태 확인
 */
const token = sessionStorage.getItem('userAccessToken');

/**
 * 현재 로그인한 사용자의 정보를 가져오는 함수
 *
 * 동작 과정:
 * 1. 세션 스토리지에서 로그인한 사용자의 이메일을 가져옴
 * 2. 전체 사용자 목록에서 해당 이메일과 일치하는 사용자를 찾음
 *
 * @returns {Promise<Object|undefined>} 로그인한 사용자의 정보 또는 undefined
 */
const getLoginUser = async function () {
  if (!checkLogin()) return;
  try {
    const userEmail = sessionStorage.getItem('userEmail');
    const response = await api.get('/users');
    const users = response.data.item;
    return users.find(user => user.email === userEmail);
  } catch (error) {
    console.error('현재 로그인한 유저 정보 가져오기 실패:', error);
  }
};

/**
 * 현재 사용자의 구독 상태를 확인하는 함수
 *
 * 동작 과정:
 * 1. 로그인 상태 확인
 * 2. 현재 게시물의 작성자 ID 가져오기
 * 3. 해당 작성자에 대한 구독 상태 확인
 *
 * @returns {Promise<boolean>} 구독 중이면 true, 아니면 false
 */
const checkIsSubscribed = async function () {
  if (!token) {
    return false; // alert 제거 - UI/UX 개선
  }

  try {
    const postId = getPostIdFromUrl();
    const postData = await getPost(postId);
    const targetId = postData.user._id;

    // 에러 처리 추가
    if (!targetId) {
      console.error('작성자 ID를 찾을 수 없습니다');
      return false;
    }

    try {
      const response = await api.get(`/bookmarks/user/${targetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.ok === 1;
    } catch (error) {
      // 404 에러는 정상적으로 처리 - 구독하지 않은 상태
      if (error.response && error.response.status === 404) {
        return false;
      }
      throw error; // 다른 에러는 상위로 전파
    }
  } catch (error) {
    console.error('구독 상태 확인 실패:', error);
    return false;
  }
};

/**
 * 구독 상태를 전환하는 함수
 * 구독 중이면 구독 취소, 구독하지 않았으면 구독 시작
 *
 * 제약 사항:
 * - 로그인이 필요함
 * - 자기 자신을 구독할 수 없음
 *
 * 동작 과정:
 * 1. 로그인 및 본인 확인
 * 2. 현재 구독 상태 확인
 * 3. 상태에 따라 구독/취소 처리
 * 4. UI 업데이트 (아이콘, 구독자 수)
 */
const toggleSubscribe = async function () {
  if (!checkLogin()) return;

  try {
    const postId = getPostIdFromUrl();
    const postData = await getPost(postId);
    const targetId = postData.user._id;

    const loginUser = await getLoginUser();
    if (loginUser._id === targetId) {
      alert('본인을 구독 할 수 없습니다');
      return;
    }

    const isSubscribed = await checkIsSubscribed();

    /**
     * 구독 취소 로직이 복잡해 보이는 이유:
     * 1. 서버 API가 북마크 ID를 필요로 함
     * 2. 북마크 ID를 얻기 위해 전체 북마크 목록을 조회해야 함
     */
    if (!isSubscribed) {
      await api.post(
        '/bookmarks/user',
        { target_id: targetId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      $authorSubscribeButtonImage.src = '/assets/icons/like_sub/sub_green.svg';
    } else {
      const bookmarks = await api.get('/bookmarks/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookmark = bookmarks.data.item.find(
        bookmark => bookmark.user._id === targetId,
      );

      if (bookmark) {
        await api.delete(`/bookmarks/${bookmark._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        $authorSubscribeButtonImage.src = '/assets/icons/like_sub/sub.svg';
      }
    }

    /**
     * 구독자 수 업데이트를 위해 작가 정보를 다시 조회하는 이유:
     * 1. 서버의 최신 데이터를 반영하기 위함
     * 2. 다른 사용자의 구독/취소가 실시간으로 반영됨
     * 3. 프론트엔드에서 직접 계산하면 동시성 문제 발생 가능
     */
    const authorData = await getAuthorInfo(postData.user._id);
    $authorSubscriberCount.textContent = authorData.bookmarkedBy.users;
  } catch (error) {
    console.error('구독 상태 전환 실패:', error);
  }
};

/**
 * 구독 버튼의 초기 상태를 설정하는 함수
 * 현재 구독 상태에 따라 적절한 아이콘을 표시
 */
const setupSubscribeButton = async function () {
  try {
    const isSubscribed = await checkIsSubscribed();

    if (isSubscribed) {
      $authorSubscribeButtonImage.src = '/assets/icons/like_sub/sub_green.svg';
    } else {
      $authorSubscribeButtonImage.src = '/assets/icons/like_sub/sub.svg';
    }
  } catch (error) {
    console.error('구독 버튼 이미지 초기화 실패:', error);
  }
};

/**
 * 현재 게시물의 좋아요 상태를 확인하는 함수
 *
 * 동작 과정:
 * 1. 로그인 상태 확인
 * 2. 사용자의 게시물 북마크 목록 조회
 * 3. 현재 게시물의 북마크 여부 확인
 *
 * @returns {Promise<boolean>} 좋아요 상태
 */
const checkIsPostLiked = async function () {
  if (!token) {
    return false; // alert 제거 - UI/UX 개선
  }
  try {
    const postId = getPostIdFromUrl();
    const response = await api.get('/bookmarks/post', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.item.some(
      bookmark => bookmark.post._id === Number(postId),
    );
  } catch (error) {
    console.error('게시물 좋아요 상태 확인 실패', error);
    return false;
  }
};

/**
 * 좋아요 상태를 전환하는 함수
 *
 * 동작 과정:
 * 1. 로그인 상태 확인
 * 2. 현재 좋아요 상태 확인
 * 3. 상태에 따라 좋아요 추가/제거
 * 4. UI 업데이트 (아이콘, 좋아요 수)
 */
const toggleLike = async function () {
  if (!checkLogin()) return;

  try {
    const postId = getPostIdFromUrl();
    const isPostLiked = await checkIsPostLiked();

    if (!isPostLiked) {
      const response = await api.post(
        '/bookmarks/post',
        { target_id: Number(postId) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.ok === 1) {
        $postLikeImage.src = '/assets/icons/like_sub/like_black.svg';
        /**
         * UI 업데이트 전 지연을 두는 이유:
         * 1. 서버의 데이터 갱신 시간을 고려한 안전장치
         * 2. 사용자의 액션과 UI 업데이트 사이의 자연스러운 전환 제공
         */
        await new Promise(resolve => setTimeout(resolve, 100));
        const updatedPost = await getPost(postId);
        $postLikeCount.textContent = updatedPost.bookmarks;
      }
    } else {
      const likes = await api.get('/bookmarks/post', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const like = likes.data.item.find(
        item => item.post._id === Number(postId),
      );

      if (like) {
        const deleteResponse = await api.delete(`/bookmarks/${like._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (deleteResponse.data.ok === 1) {
          $postLikeImage.src = '/assets/icons/like_sub/like.svg';
          await new Promise(resolve => setTimeout(resolve, 100));
          const updatedPost = await getPost(postId);
          $postLikeCount.textContent = updatedPost.bookmarks;
        }
      }
    }
  } catch (error) {
    console.error('좋아요 상태 전환 실패:', error);
  }
};

/**
 * 좋아요 버튼의 초기 상태를 설정하는 함수
 * 현재 좋아요 상태에 따라 적절한 아이콘을 표시
 */
const setupLikeImage = async function () {
  try {
    const isPostLiked = await checkIsPostLiked();

    if (isPostLiked) {
      $postLikeImage.src = '/assets/icons/like_sub/like_black.svg';
    } else {
      $postLikeImage.src = '/assets/icons/like_sub/like.svg';
    }
  } catch (error) {
    console.error('게시물 좋아요 이미지 초기화 실패:', error);
  }
};

/**
 * 페이지 초기화 함수
 * DOM이 로드되면 실행되는 메인 함수
 *
 * 초기화 과정:
 * 1. 로그인 상태 확인
 * 2. 게시물 데이터 로드 및 표시
 * 3. 사용자 관련 기능 초기화
 * 4. 이벤트 리스너 등록
 */
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 로그인 체크를 가장 먼저 수행
    if (!checkLogin()) {
      return; // 비로그인 상태면 여기서 함수 종료
    }

    // 로그인 상태일 때만 아래 코드 실행
    await printPost();
    await Promise.all([
      getLoginUser(),
      setupSubscribeButton(),
      setupLikeImage(),
    ]);

    // 이벤트 리스너 등록
    $authorSubscribeButton.addEventListener('click', toggleSubscribe);
    $postLikeButton.addEventListener('click', toggleLike);
  } catch (error) {
    console.error('페이지 로드 실패:', error);
  }
});
