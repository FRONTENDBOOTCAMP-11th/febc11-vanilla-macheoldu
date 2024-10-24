import axios from 'axios';

"use strict";
/* 윈도우 로드 이벤트 추가, 페이지 로딩이 완료되면 아래 함수 실행 */
window.addEventListener('load', () => {
  /* 필요한 노드 획득 */
  const $email = document.getElementById('loginEmail');
  const $password = document.getElementById('loginPw');
  const $saveIdPw = document.getElementById('saveIdPw');
  const $loginError = document.querySelector('.login-main__error');
  const $loginBtn = document.getElementById('login');
  let loginStatus = false;

  // 로그인 버튼 클릭 이벤트 발생 시 실행 함수
  $loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('button click');

    const emailValue = $email.value;
    const passwordValue = $password.value;
    const regExId = `^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`

    if (!emailValue) {
      // 이메일 또는 이메일과 비밀번호 모두 입력하지 않고 로그인 버튼 선택 시 안내 메시지 출력
      $loginError.classList.remove('hidden');
      $loginError.innerText = `이메일을 입력해주세요.`;
      $email.focus;

      // 이메일 입력란에 내용을 입력되고, blur 경우, 에러 메시지 숨김 처리
      $email.addEventListener('blur', function () {
        if (this.value) {
          $loginError.classList.add('hidden');
        };
      });
    } else if (!passwordValue) {
      // 비밀번호만 입력하지 않고 로그인 버튼 선택 시 안내 메시지 출력
      $loginError.classList.remove('hidden');
      $loginError.innerText = `비밀번호를 입력해주세요.`;

      // 비밀번호 입력란에 내용이 입력되고, blur 경우, 에러 메시지 숨김 처리
      $password.addEventListener('blur', function () {
        if (this.value) {
          $loginError.classList.add('hidden');
        }
      })
    } else if (!emailValue.match(regExId)) {
      // 이메일 형식 유효성 검사
      $loginError.classList.remove('hidden');
      $loginError.innerText = '올바른 형식의 이메일을 입력해주세요.'
    } else {
      // 입력된 이메일 비번으로 로그인 시도
      const login = function (userEmail, userPassword) {
        axios({
          // client header
          method: 'post',
          url: 'https://11.fesp.shop/users/login',
          headers: {
            'client-id': 'vanilla03',
            'content-type': 'application/json',
            accept: 'application/json'
          },
          // 로그인 버튼 클릭 시 데이터 전송 및 검증
          data: {
            email: `${userEmail}`,
            password: `${userPassword}`
          }
        })
          // 로그인 성공 시, 홈 페이지로 이동
          .then(response => {
            console.log(response.data);
            window.open('/src/features/home/home.html', '_self');
            loginStatus = true;
          })
          .catch(error => {
            if (error.response.status === 403) {
              // 로그인 실패 case 1. 잘못된 정보(403 error)
              console.log(error.response.data.message);
              $loginError.classList.remove('hidden');
              $loginError.textContent = error.response.data.message;
            } else if (error.response.status === 500) {
              // 로그인 실패 case 2. 서버 에러(500 error)
              $loginError.classList.remove('hidden');
              $loginError.textContent = error.response.data.message;
            }
          })
      }

      login(emailValue, passwordValue);
    }

    console.log(emailValue);

    console.log(passwordValue);

    console.log($saveIdPw.checked);

    console.log(loginStatus);
  });
})