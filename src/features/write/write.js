import axios from 'axios';

"use strict";

window.addEventListener('load', function () {

  //로그인되지 않은 경우(세션 스토리지에 로그인 상태 속성 없는 경우), 시작하기 페이지로 이동
  if (!sessionStorage.getItem('login-status')) {
    window.alert('로그인이 필요한 서비스입니다.');
    window.open('/src/features/start/start.html', '_self');
  }

  // 필요 노드 획득
  // 글쓰기 내용 영역
  const $postTitle = document.getElementById('postTitle');
  const $postSubtitle = document.getElementById('postSubtitle');
  const $postContent = document.getElementById('postContent');

  // 글쓰기 상단바 영역
  const $postCancel = document.getElementById('postCancel');
  const $postSave = document.getElementById('postSave');

  // 글쓰기 하단바 영역
  // 글쓰기 파일 첨부 버튼
  const $uploadFile = document.getElementById('uploadFile');
  // 선택한 파일 표시 리스트
  const $fileList = document.querySelector('.file-list');

  // 글쓰기 상단바 취소 클릭 시 이벤트
  $postCancel.addEventListener('click', function () {
    // 작성 중인 내용이 있는 경우 Confirm dialog 출력
    if ($postTitle.value || $postSubtitle.value || $postCancel.value) {
      const confirmCancel = confirm('작성 중인 내용이 있습니다. 작성을 종료하시겠습니까?');
      // 확인 선택 시 글쓰기 취소, 이전 페이지로 이동
      if (confirmCancel) {
        history.back();
      }
    } else {
      // 작성 중인 내용이 없는 경우 바로 이전 페이지로 이동
      history.back();
    }
  })

  // 글쓰기 내용 추가 시 글쓰기 상단바 저장 버튼 활성화
  window.addEventListener('input', function () {
    if ($postTitle.value && $postSubtitle.value && $postContent.value) {
      // 제목, 소제목, 내용란이 모두 입력된 경우, 저장 버튼 활성화
      document.querySelector('.active').classList.remove('hidden');
      document.querySelector('.disabled').classList.add('hidden');
      $postSave.classList.add('confirmSave');
    } else {
      // 모두 입력되지 않은 경우, 저장 버튼 비활성화
      document.querySelector('.active').classList.add('hidden');
      document.querySelector('.disabled').classList.remove('hidden');
      $postSave.classList.remove('confirmSave');
    }
  })

  // 선택한 파일을 하단에 표시
  $uploadFile.addEventListener('change', function (e) {
    // 선택한 파일을 배열로 표시
    const files = Array.from(e.target.files);
    // 파일 리스트 표시
    $fileList.classList.remove('hidden');
    // 배열 내의 파일 데이터 파일 리스트에 출력
    files.forEach(function (file, index) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function () {
          const liNode = document.createElement('li');
          const imgNode = document.createElement('img');
          imgNode.setAttribute('src', reader.result);
          liNode.appendChild(imgNode);
          $fileList.appendChild(liNode);
        }
        reader.readAsDataURL(file);
      }
    })
  })

  // 저장 버튼 클릭 이벤트 발생 시 실행 코드
  $postSave.addEventListener('click', function (e) {
    e.preventDefault();

    // 입력된 데이터 획득
    const title = $postTitle.value;
    const subtitle = $postSubtitle.value;
    const content = $postContent.value;
    const userAccessToken = sessionStorage.getItem('userAccessToken');

    // 업로드된 파일 객체를 배열로 변경
    const selectedFiles = Array.from($uploadFile.files);
    const imageFormData = new FormData();

    // 업로드된 파일을 FormData 에 추가
    selectedFiles.forEach((file) => {
      imageFormData.append(`attach`, file);
    })

    // 저장 버튼 선택 시 Confirm dialog 출력
    if ($postSave.classList.item('confirmSave')) {
      const save = confirm('저장하시겠습니까?');
      // 확인 선택 시
      if (save) {
        // 첨부 파일 서버로 전송
        axios({
          method: 'post',
          url: 'https://11.fesp.shop/files',
          // 요청 헤더
          headers: {
            'client-id': 'vanilla03',
            // multipart/form-data 로 요청
            'Content-Type': 'multipart/form-data',
            accept: 'application/json'
          },
          data: imageFormData
        })
          // 요청 성공 시 실행 코드
          .then(response => {
            const imgPath = [];
            // 파일 데이터에서 이미지 url만 배열에 저장
            for (let i = 0; i < response.data.item.length; i++) {
              imgPath.push(response.data.item[i].path);
            }

            // 서버 요청 전송
            axios({
              method: 'post',
              url: 'https://11.fesp.shop/posts',
              // 요청 header
              headers: {
                'client-id': 'vanilla03',
                'Content-Type': 'application/json',
                accept: 'application/json',
                // 사용자 정보 추가
                'Authorization': `Bearer ${userAccessToken}`
              },
              // 요청 body
              data: {
                type: 'info',
                title: `${title}`,
                extra: {
                  subTitle: `${subtitle}`
                },
                content: `${content}`,
                // 이미지가 포함된 배열을 image 필드로 전달
                image: imgPath
              }
            }).then(response => {
              // 요청 성공 시 안내 alert 출력, 홈 페이지로 이동
              alert('저장을 완료했습니다');
              window.open('/src/features/home/home.html', '_self')
            }).catch(error => {
              // 서버 에러(500) 출력 메시지
              if (error.response.status === 500) {
                const errorMsg = error.response.data.message;
                alert(errorMsg);
              }
            })
          }).catch(error => {
            // 파일 업로드 실페 시 안내 메시지
            alert(error.response.data.message);
          })
      } else {
        // 저장 확인 confirm dialog 에서 취소 선택 시, 이동 없이 현재 페이지 유지
        alert('저장을 취소하였습니다')
      }
    }
  })

})