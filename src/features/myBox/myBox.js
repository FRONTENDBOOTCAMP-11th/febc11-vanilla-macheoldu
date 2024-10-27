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

// 로그인 요청 (POST /users/login)
axios({
  method: 'post',
  url: '/users/login',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    email: 'u1@market.com', // 실제 입력한 이메일
    password: '11111111', // 실제 입력한 비밀번호
  },
})
  .then(response => {
    const accessToken = response.data.item.token.accessToken;

    // 로그인된 사용자 정보를 가져오기 위한 요청 (GET /users/{_id})
// 로그인 요청 (POST /users/login)
axios({
  method: 'post',
  url: '/users/login',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    email: 'u1@market.com',
    password: '11111111',
  },
})
  .then(response => {
    const accessToken = response.data.item.token.accessToken;
    const bookmarkId = response.data.item.bookmark; // 로그인한 유저의 bookmark ID

    // 북마크한 사용자 정보를 요청 (GET /users/{bookmarkId})
    axios({
      method: 'get',
      url: `/users/${bookmarkId}`, // bookmark ID를 사용하여 유저 정보 요청
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })
      .then(bookmarkResponse => {
        const bookmarkedUser = bookmarkResponse.data.item; // 북마크한 사용자 정보

        // 북마크한 사용자 정보를 <ul>에 추가
        const ulElement = document.querySelector('.interested-authors__ul');
        ulElement.innerHTML = ''; // 기존 목록 초기화

        // 새로운 li 요소 생성 및 사용자 정보 추가
        const li = document.createElement('li');
        li.classList.add('interested-author-item');
        li.innerHTML = `
          <img src="${bookmarkedUser.image}" alt="${bookmarkedUser.name}의 이미지" />
          <p>${bookmarkedUser.name}</p>
        `;
        ulElement.appendChild(li); // <ul>에 li 요소 추가
      })
      .catch(error => {
        console.error('북마크된 사용자 정보 조회 중 오류 발생:', error);
      });
  })
  .catch(error => {
    console.error('로그인 중 오류 발생:', error);
  });
