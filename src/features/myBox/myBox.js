const { default: axios } = require('axios');

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
    axios({
      method: 'get',
      url: `/users/${response.data.item._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`, // Bearer 방식의 인증
        Accept: 'application/json',
      },
    })
      .then(userResponse => {
        const userData = userResponse.data.item;
        const bookmarkedUsers = userData.bookmark.users;

        // 북마크한 사용자 수가 4명을 넘으면 4명까지만 자르기
        const displayedUsers = bookmarkedUsers.slice(0, 4);

        // 북마크한 사용자 정보를 <ul>에 추가
        const ulElement = document.querySelector('.interested-authors__ul');
        ulElement.innerHTML = ''; // 기존 목록을 초기화

        displayedUsers.forEach(bookmarkedUser => {
          const li = document.createElement('li');
          li.classList.add('interested-author-item');

          // 이미지와 이름을 li 요소에 추가
          li.innerHTML = `
        <img src="${bookmarkedUser.image}" alt="${bookmarkedUser.name}의 이미지" />
        <p>${bookmarkedUser.name}</p>
      `;

          ulElement.appendChild(li); // <ul>에 li 요소 추가
        });
      })
      .catch(error => {
        console.error('사용자 정보 조회 중 오류 발생:', error);
      });
  })
  .catch(error => {
    console.error('로그인 중 오류 발생:', error);
  });
