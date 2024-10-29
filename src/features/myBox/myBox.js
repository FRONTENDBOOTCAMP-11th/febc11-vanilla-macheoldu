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

function loadMyBoxData() {
  const userId = sessionStorage.getItem('userIdNum'); // 사용자 ID 가져오기

  // 사용자의 북마크 목록 조회

  // ===============tset=========================
  axios
    .get(`/api/users/${userId}/bookmarks`, {
      headers: {
        'client-id': 'vanilla03',
      },
    })
    .then(response => {
      console.log(response.data);
      // if (response.data.ok) {
      //   renderBookmarks(response.data.item); // 데이터 렌더링
      // } else {
      //   console.error("북마크 로드 실패:", response.data.message);
      // }
    })
    .catch(error => {
      console.log(error.response.data);
      // if (error.response?.status === 401) {
      //   sessionStorage.clear();
      //   window.location.href = "/src/features/start/start.html";
      // }
    });
}
loadMyBoxData();
/**
 * ----------------
 * 기능구현 코드
 * ----------------
 */

// 내 북마크 데이터 로드
document.addEventListener('DOMContentLoaded', function () {
  const loginStatus = sessionStorage.getItem('login-status');
  const userId = sessionStorage.getItem('userIdNum');

  // 로그인 상태 확인
  if (!loginStatus || !userAccessToken) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = '/src/features/start/start.html';
    return;
  }

  loadMyBoxData(userId);
});

// 내 북마크 데이터 로드
function loadMyBoxData(userId) {
  const userId = sessionStorage.getItem('userId'); // 사용자 ID 가져오기

  // 사용자의 북마크 목록 조회
  axios
    .get(`/api/users/${userId}/bookmarks`, {
      headers: {
        'client-id': 'vanilla03',
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.data.ok) {
        renderBookmarks(response.data.item); // 데이터 렌더링
      } else {
        console.error('북마크 로드 실패:', response.data.message);
      }
    })
    .catch(error => {
      console.log(error.response.data);
      if (error.response?.status === 401) {
        sessionStorage.clear();
        window.location.href = '/src/features/start/start.html';
      }
    });
}

// 북마크 렌더링
function renderBookmarks(bookmarks) {
  const bookmarksContainer = document.querySelector('.bookmarks-container');
  bookmarksContainer.innerHTML = '';

  // 각 북마크 타입에 따라 분기
  ['user', 'product', 'post'].forEach(type => {
    if (bookmarks[type]) {
      bookmarks[type].forEach(item => {
        let html = '';
        switch (type) {
          case 'user':
            html = `
              <div class="bookmark-item">
                <img src="${item.user.image}" alt="${item.user.name}">
                <span>${item.user.name}</span>
                <p>${item.memo}</p>
              </div>`;
            break;
          case 'product':
            html = `
              <div class="bookmark-item">
                <img src="${item.product.mainImages[0].path}" alt="${item.product.name}">
                <span>${item.product.name}</span>
                <p>${item.memo}</p>
              </div>`;
            break;
          case 'post':
            html = `
              <div class="bookmark-item">
                <h3>${item.post.title}</h3>
                <p>${item.memo}</p>
              </div>`;
            break;
        }
        bookmarksContainer.innerHTML += html;
      });
    }
  });
}

// 북마크 추가 예시 함수
function addBookmark(type, targetId, memo) {
  const token = sessionStorage.getItem('userAccessToken');
  const clientId = sessionStorage.getItem('userClientId');

  axios
    .post(
      `https://11.fesp.shop/bookmarks/${type}`,
      {
        target_id: targetId,
        memo: memo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'client-id': clientId,
        },
      },
    )
    .then(response => {
      if (response.data.ok) {
        console.log('북마크 추가 성공:', response.data.item);
        loadMyBoxData(token, clientId); // 북마크 목록 새로고침
      } else {
        console.error('북마크 추가 실패:', response.data.message);
      }
    })
    .catch(error => {
      console.error('북마크 추가 실패:', error);
    });
}
