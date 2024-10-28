import axios from 'axios'
fetch('/src/features/components/top-menu/top-menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    // 필요 노드 획득
    const $startButton = document.querySelector('.brunch__header__start-button');
    const $profileButton = document.querySelector('.brunch__header__profile-button');

    // 세션 스토리지에 저장되어 있는 이메일 정보 획득
    const userEmail = sessionStorage.getItem('userEmail');
    // 세션 스토리지에 이메일이 저장되어 있는 경우(사용자 로그인 상태) 실행 코드
    if (userEmail) {
      axios({
        method: 'get',
        url: '/api/users',
        headers: {
          'client-id': 'vanilla03',
          'content-type': 'application/json',
          accept: 'application/json'
        },
        params: {
          // 이메일 주소로 사용자 정보 획득
          email: `${userEmail}`
        }
      }).then(response => {
        // 서버 요청 결과 데이터 중 이미지 URL 만 획득
        const profileUrl = response.data.item[0].image
        $startButton.classList.add('hidden');
        $profileButton.classList.remove('hidden');
        const imgNode = document.createElement('img');
        imgNode.setAttribute('src', `https://11.fesp.shop${profileUrl}`);
        // 프로필 이미지 버튼 표시
        $profileButton.appendChild(imgNode);
      }).catch(error => {
        // 에러 발생 시 에러 메시지 얼럿으로 출력
        alert(error.response.data.message);
      })
    } else {
      // 로그인 정보 없는 경우(로그인 상태 X) 시작하기 버튼 출력, 시작하기 페이지로 이동
      $startButton.classList.remove('hidden');
      $profileButton.classList.add('hidden');
    }

    // 로그인이 되어 있는 상태에서 프로필 버튼 선택 시 로그아웃 처리
    $profileButton.addEventListener('click', function () {
      alert('로그아웃 되었습니다.');
      sessionStorage.clear();
      location.reload();
    })
  });
