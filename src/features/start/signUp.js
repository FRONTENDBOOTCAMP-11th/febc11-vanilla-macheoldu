import axios from 'axios';

window.addEventListener('load', () => {

  // 필요한 노드 획득
  const $signUpNickname = document.getElementById('signUpNickname');
  const $checkNicknameBtn = document.getElementById('checkNickname');
  const $checkNicknameResult = document.querySelector('.nickname');
  const $signUpEmail = document.getElementById('signUpEmail');
  const $checkEmailBtn = document.getElementById('checkEmail');
  const $checkEmailResult = document.querySelector('.email');

  const $signUpPw = document.getElementById('signUpPw');
  const $signUpPwCheck = document.getElementById('signUpPwCheck');

  const $signUpBtn = document.getElementById('signUpComplete')

  $signUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log($signUpNickname.value);
  })

})
