"use strict";
/* 윈도우 로드 이벤트 추가, 페이지 로딩이 완료되면 아래 함수 실행 */
window.addEventListener('load', () => {
  /* 필요한 노드 획득 */
  const $email = document.getElementById('loginEmail');
  const $password = document.getElementById('loginPw');
  const $saveIdPw = document.getElementById('saveIdPw');
  const $loginError = document.querySelector('.login-main__error');
  const $loginBtn = document.getElementById('login');

  // 로그인 버튼 클릭 이벤트 발생 시 실행 함수
  $loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('button click');

    const emailValue = $email.value;
    const passwordValue = $password.value;

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
    }

    console.log(emailValue);

    console.log(passwordValue);

    console.log($saveIdPw.checked);
  })

})