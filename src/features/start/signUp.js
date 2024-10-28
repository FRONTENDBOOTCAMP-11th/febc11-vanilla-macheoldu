import axios from 'axios';

window.addEventListener('load', () => {

  // 필요한 DOM 노드 획득
  // 별명(이름) 영역 DOM 노드
  const $signUpNickname = document.getElementById('signUpNickname');
  const $checkNicknameBtn = document.getElementById('checkNickname');
  const $checkNicknameResult = document.querySelector('.sign-up__valid.nickname');

  // 이메일 영역 DOM 노드
  const $signUpEmail = document.getElementById('signUpEmail');
  const $checkEmailBtn = document.getElementById('checkEmail');
  const $checkEmailResult = document.querySelector('.sign-up__valid.email');

  // 비밀번호 영역 DOM 노드
  const $signUpPw = document.getElementById('signUpPw');
  const $signUpPwCheck = document.getElementById('signUpPwCheck');
  const $checkPwResult = document.querySelector('.sign-up__valid.pw');

  // 회원가입 버튼 노드
  const $signUpBtn = document.querySelector('.type--long:has(#signUpComplete)');

  // 별명, 이메일, 비밀번호 인증 상태 초기값
  let isNicknameValidated = false;
  let isEmailValidated = false;
  let isPwValidated = false;

  // 안내 메시지 출력 함수
  const addMsg = function (node, msg) { node.textContent = msg };
  const hideMsg = function (node) { node.classList.add('hidden') };
  const showMsg = function (node) { node.classList.remove('hidden') };
  const isInvalidMsg = function (node) { node.classList.add('invalid') };
  const isValidMsg = function (node) { node.classList.remove('invalid') };


  // 별명 중복확인 버튼 클릭 이벤트 발생 시 실행 코드
  $checkNicknameBtn.addEventListener('click', function () {
    const userNickname = $signUpNickname.value;
    // 별명 입력 확인 알고리즘
    if (userNickname) {
      // 별명이 입력된 경우, 아래 코드 실행
      axios({
        method: 'get',
        // 요청 헤더에 별명 전송
        url: `/api/users/name`,
        headers: {
          'client-id': 'vanilla03',
          'content-type': 'application/json',
          accept: 'application/json',
        },
        params: {
          name: `${userNickname}`
        }
      }).then(response => {
        if (response.data.ok == 1) {
          // 중복된 별명이 없는 경우 안내 메시지
          addMsg($checkNicknameResult, '사용할 수 있는 별명입니다.');
          isValidMsg($checkNicknameResult);
          // 별명 인증 상태 true
          isNicknameValidated = true;
        }
      }).catch(error => {
        if (error.response.status == 409) {
          // 중복된 이름이 있는 경우 에러 메시지
          const errorMsg = error.response.data.message;
          addMsg($checkNicknameResult, errorMsg);
          isInvalidMsg($checkNicknameResult);
          // 별명 인증 상태 false
          isNicknameValidated = false;
        } else if (error.response.status === 500) {
          // 서버 에러(500) 시 얼럿
          alert(error.response.data.message);
          // 별명 인증 상태 false
          isNicknameValidated = false;
        }
      })

    } else {
      // 별명이 입력되지 않은 경우, 버튼 클릭 시 안내 메시지 출력
      addMsg($checkNicknameResult, '별명을 입력해주세요.');
      isInvalidMsg($checkNicknameResult);

      //별명이 입력되지 않은 경우 인증 상태는 false
      isNicknameValidated = false;
    }
  })

  // 이메일 중복확인 버튼 클릭 이벤트 발생 시 실행 코드
  $checkEmailBtn.addEventListener('click', function () {
    // 이메일 정규 표현식 지정
    const regExEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const userEmail = $signUpEmail.value;
    if (userEmail) {
      if (userEmail.match(regExEmail)) {
        // 올바른 형식의 이메일이 입력된 경우, 아래 코드 실행
        // 이메일 중복확인 API 활용
        axios({
          method: 'get',
          url: '/api/users/email',
          headers: {
            'client-id': 'vanilla03',
            'content-type': 'application/json',
            accept: 'application/json'
          },
          // 이메일 입력란에 입력된 데이터 서버 전송
          params: {
            email: `${userEmail}`,
          }
        }).then(response => {
          // 중복된 이메일 없는 경우, 사용 가능 이메일 안내 메시지 출력
          addMsg($checkEmailResult, '사용할 수 있는 이메일입니다.');
          isValidMsg($checkEmailResult);
          // 이메일 확인 상태값 true 로 변경
          isEmailValidated = true;
        }).catch(error => {
          if (error.response.status === 409) {
            // 중복된 이메일이 존재하는 경우, 에러 메시지 출력
            const invalidEmail = error.response.data.message;
            addMsg($checkEmailResult, invalidEmail);
            isInvalidMsg($checkEmailResult);
            // 이메일 확인 상태값 false
            isEmailValidated = false;
          } else if (error.response.status === 500) {
            // 서버 에러(500) 시 얼럿
            alert(error.response.data.message);
            isEmailValidated = false;
          }
        })
      } else {
        // 올바르지 않은 형식의 이메일이 입력된 경우, 안내 메시지 출력
        addMsg($checkEmailResult, '유효하지 않은 이메일 형식입니다');
        isInvalidMsg($checkEmailResult);
      }

    } else {
      // 이메일 입력란에 입력값 없는 경우 안내 메시지 출력
      addMsg($checkEmailResult, '이메일을 입력해주세요.');
      isInvalidMsg($checkEmailResult);
      // 이메일 확인 상태값 false 
      isEmailValidated = false;
    }
  });

  // 비밀번호 입력 이벤트 발생 시 실행 코드
  $signUpPw.addEventListener('input', function () {
    let userPw = $signUpPw.value;
    // 비밀번호 정규 표현식, 최소 8자 이상, 숫자와 문자는 필수 입력, 특수문자, 대소문자 선택
    const regExPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    // 비밀번호가 정규 표현식의 조건 만족 시
    if (regExPw.test(userPw)) {
      hideMsg($checkPwResult);

      // 비밀번호 확인란 입력 시 발생 이벤트
      $signUpPwCheck.addEventListener('input', function () {
        const userPwCheck = $signUpPwCheck.value;
        if (userPwCheck !== userPw) {
          // 비밀번호와 비밀번호 확인란 입력값 일치하지 않는 경우, 안내 메시지 출력
          addMsg($checkPwResult, '비밀번호가 일치하지 않습니다.');
          showMsg($checkPwResult);
          isInvalidMsg($checkPwResult);
          // 비밀번호 확인 상태값 false
          isPwValidated = false;
        } else {
          // 비밀번호와 비밀번화 확인란 입력값 일치 시, 안내 메시지 출력
          addMsg($checkPwResult, '비밀번호가 일치합니다.');
          showMsg($checkPwResult);
          isValidMsg($checkPwResult);
          // 비밀번호 확인 상태값 true
          isPwValidated = true;
        }
      })
    } else {
      // 비밀번호 입력값이 정규 표현식의 조건을 만족하지 않는 경우, 안내 메시지 출력
      addMsg($checkPwResult, '대소문자, 숫자 조합 8자 이상이어야 합니다.');
      showMsg($checkPwResult);
      isInvalidMsg($checkPwResult);
      // 비밀번호 확인 상태값 false
      isPwValidated = false;
    };
  })

  // 회원가입 버튼 활성화 코드
  window.addEventListener('input', function () {
    if (isNicknameValidated && isEmailValidated && isPwValidated) {
      // 별명, 이메일, 비밀번호 확인 상태값이 모두 true 인 경우, 버튼 활성화 상태로 변경
      $signUpBtn.classList.add('active');
    } else {
      // 별명, 이메일, 비밀번호 확인 상태값 중 하나라도 false 인 경우, 버튼 비활성화 상태로 변경
      $signUpBtn.classList.remove('active');
    }
  })

  // 회원가입 버튼 클릭 이벤트 발생 시 실행 코드
  $signUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!isNicknameValidated && !isEmailValidated) {
      // 별명 및 이메일 중복확인 미실행 시
      if (isNicknameValidated === false) {
        // 별명 중복확인 미실행 시, 안내 메시지 출력, 해당 입력란에 focus
        addMsg($checkNicknameResult, '닉네임 중복확인을 진행해주세요.');
        showMsg($checkNicknameResult);
        isInvalidMsg($checkNicknameResult);
        $signUpNickname.focus();
      }
      if (isEmailValidated === false) {
        // 별명 중복확인 미실행 시, 안내 메시지 출력, 해당 입력란에 focus
        addMsg($checkEmailResult, '이메일 중복확인을 진행해주세요.');
        showMsg($checkEmailResult);
        isInvalidMsg($checkEmailResult);
        $signUpEmail.focus();
      }
    } else {
      // 전체 중복확인 실행 및 모든 입력란에 정확한 형식의 데이터가 입력되었을 경우, 서버에 request 전송
      const signUpNickname = $signUpNickname.value;
      const signUpEmail = $signUpEmail.value;
      const signUpPw = $signUpPw.value;
      // 사용자 입력 데이터 서버 전송
      axios({
        method: 'post',
        url: '/api/users',
        // 요청 헤더
        headers: {
          'client-id': 'vanilla03',
          'content-type': 'application/json',
          accept: 'application/json'
        },
        // 전송 데이터
        data: {
          email: `${signUpEmail}`,
          password: `${signUpPw}`,
          name: `${signUpNickname}`,
          type: 'user',
          // 최초 회원가입 시 디폴트 이미지 추가
          image: 'https://11.fesp.shop/files/vanilla03/no_profile.svg'
        }
      })
        .then(response => {
          // 회원가입 성공 시, 시작하기 메인 화면으로 이동
          window.open('/src/features/start/start.html', '_self');
        })
        .catch(error => {
          // 회원가입 실패 시(500 에러 발생)
          if (error.response.status === 500) {
            // alert 로 에러 메시지 출력
            alert(error.response.message);
          }
        })
    }
  })
})
