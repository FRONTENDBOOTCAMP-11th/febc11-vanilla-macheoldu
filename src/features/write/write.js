import axios from 'axios';

"use strict";

window.addEventListener('load', function () {

  //로그인되지 않은 경우(세션 스토리지에 로그인 상태 속성 없는 경우), 시작하기 페이지로 이동
  if (!sessionStorage.getItem('login-status')) {
    window.alert('로그인이 필요한 서비스입니다.');
    window.open('/src/features/start/start.html', '_self');
  }

  const $postTitle = document.getElementById('postTitle');
  const $postSubtitle = document.getElementById('postSubtitle');
  const $postContent = document.getElementById('postContent');

  const $postCancel = document.getElementById('postCancel');
  const $postSave = document.getElementById('postSave');

  const $uploadFile = document.getElementById('uploadFile');
  const $fileList = document.querySelector('.file-list');

  $postCancel.addEventListener('click', function () {
    if ($postTitle.value || $postSubtitle.value || $postCancel.value) {
      const cancel = confirm('작성 중인 내용이 있습니다. 작성을 종료하시겠습니까?');
      if (cancel) {
        history.back();
      }
    } else {
      history.back();
    }
  })

  window.addEventListener('input', function () {
    if ($postTitle.value && $postSubtitle.value && $postContent.value) {
      document.querySelector('.active').classList.remove('hidden');
      document.querySelector('.disabled').classList.add('hidden');
      $postSave.classList.add('confirmSave');
    } else {
      document.querySelector('.active').classList.add('hidden');
      document.querySelector('.disabled').classList.remove('hidden');
      $postSave.classList.remove('confirmSave');
    }
  })

  $uploadFile.addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    $fileList.classList.remove('hidden');
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
      window.selectedFiles = files;
    })
  })

  $postSave.addEventListener('click', function (e) {
    e.preventDefault();
    const title = $postTitle.value;
    const subtitle = $postSubtitle.value;
    const content = $postContent.value;
    const userAccessToken = sessionStorage.getItem('userAccessToken');
    const userRefreshToken = sessionStorage.getItem('userRefreshToken');

    console.dir(window.selectedFiles);

    if ($postSave.classList.item('confirmSave')) {
      const save = confirm('저장하시겠습니까?');
      if (save) {
        const formData = new FormData();
        formData.append('type', 'info');
        formData.append('title', `${title}`);
        formData.append('extra[subTitle]', `${subtitle}`);
        formData.append('content', `${content}`);

        if (window.selectedFiles && window.selectedFiles.length > 0) {
          for (let i = 0; i < window.selectedFiles.length; i++) {
            formData.append('image', window.selectedFiles[i]);
          }
        }

        axios({
          method: 'post',
          url: '/api/posts',
          headers: {
            'client-id': 'vanilla03',
            'Content-Type': 'application/json',
            accept: 'application/json',
            'Authorization': `Bearer ${userAccessToken}`
          },
          data: formData
        }).then(response => {
          alert('저장을 완료했습니다');
          console.log(window.selectedFiles);
        }).catch(error => {
          if (error.response.status === 500) {
            const errorMsg = error.response.data.message;
            alert(errorMsg);
          }
        })

        console.log($postTitle.value);
        console.log($postSubtitle.value);
        console.log($postContent.value);
        console.log(formData);
      } else {
        alert('저장을 취소하였습니다')
      }
    }

  })


})