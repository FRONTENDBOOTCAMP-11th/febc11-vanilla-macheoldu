import axios from 'axios';

window.addEventListener('load', () => {

  // 필요한 노드 획득
  const $signUpNickname = document.getElementById('signUpNickname');
  const $checkNicknameBtn = document.getElementById('checkNickname');
  const $checkNicknameResult = document.querySelector('.sign-up__valid.nickname');

  const $signUpEmail = document.getElementById('signUpEmail');
  const $checkEmailBtn = document.getElementById('checkEmail');
  const $checkEmailResult = document.querySelector('.sign-up__valid.email');

  const $signUpPw = document.getElementById('signUpPw');
  const $signUpPwCheck = document.getElementById('signUpPwCheck');
  const $checkPwResult = document.querySelector('.sign-up__valid.pw')

  const $signUpBtn = document.getElementById('signUpComplete')

  let isNicknameValidated = false;
  let isEmailValidated = false;
  let isPwValidated = false;

  $checkNicknameBtn.addEventListener('click', function () {
    console.log('check nickname button clicked');
    const userNickname = $signUpNickname.value;
    if (userNickname) {
      $checkNicknameResult.textContent = '사용할 수 있는 닉네임입니다.';
      $checkNicknameResult.classList.remove('invalid');
      isNicknameValidated = true;
    } else {
      $checkNicknameResult.textContent = '닉네임을 입력해주세요.';
      $checkNicknameResult.classList.add('invalid');
      isNicknameValidated = false;
    }
  })

  $checkEmailBtn.addEventListener('click', function () {
    console.log('check email button clicked');
    const regExEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const userEmail = $signUpEmail.value;
    if (userEmail) {
      if (userEmail.match(regExEmail)) {
        console.log('유효한 이메일입니다.')
        axios({
          method: 'get',
          url: '/api/users/email',
          headers: {
            'client-id': 'vanilla03',
            'content-type': 'application/json',
            accept: 'application/json'
          },
          params: {
            email: `${userEmail}`,
          }
        }).then(response => {
          $checkEmailResult.textContent = '사용할 수 있는 이메일입니다.';
          $checkEmailResult.classList.remove('invalid');
        }).catch(error => {
          if (error.response.status === 409) {
            const invalidEmail = error.response.data.message;
            $checkEmailResult.textContent = invalidEmail;
            $checkEmailResult.classList.add('invalid');
          }
        })
      } else {
        console.log('유효하지 않은 이메일 형식입니다.');
        $checkEmailResult.textContent = '유효하지 않은 이메일 형식입니다';
        $checkEmailResult.classList.add('invalid');
      }
      console.log(userEmail);
      isEmailValidated = true;
    } else {
      $checkEmailResult.textContent = '이메일을 입력해주세요.'
      $checkEmailResult.classList.add('invalid');
      isEmailValidated = false;
    }
  });

  $signUpPw.addEventListener('change', function () {
    const userPw = $signUpPw.value;
    const regExPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    if (regExPw.test(userPw)) {
      console.log('valid password');
      $checkPwResult.classList.add('hidden');
    } else {
      $checkPwResult.textContent = '대소문자, 숫자 조합 8자 이상이어야 합니다.';
      $checkPwResult.classList.remove('hidden');
    };
  })
  $signUpPwCheck.addEventListener('change', function () {
    const userPw = $signUpPw.value;
    const userPwCheck = $signUpPwCheck.value;
    if (userPwCheck !== userPw) {
      $checkPwResult.textContent = '비밀번호가 일치하지 않습니다.'
      $checkPwResult.classList.remove('hidden');
      $checkPwResult.classList.add('invalid');
    } else {
      $checkPwResult.textContent = '비밀번호가 일치합니다.'
      $checkPwResult.classList.remove('hidden');
      $checkPwResult.classList.remove('invalid');
      isPwValidated = true;
    }
  })

  window.addEventListener('change', function () {
    if (isNicknameValidated && isEmailValidated && isPwValidated) {
      $signUpBtn.classList.add('active');
    }
  })

  $signUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('sign-up complete button clicked');
    if (isNicknameValidated && isEmailValidated) {
      console.log($signUpNickname.value, $signUpEmail.value);
    } else {
      console.log('닉네임과 이메일 중복확인을 진행해주세요')
    }
  })

})
