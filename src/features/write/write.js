import axios from 'axios';

"use strict";

window.addEventListener('load', function () {

  //로그인되지 않은 경우(세션 스토리지에 로그인 상태 속성 없는 경우), 시작하기 페이지로 이동
  if (!sessionStorage.getItem('login-status')) {
    window.open('/src/features/start/start.html', '_self');
  }

  const $postTitle = document.getElementById('postTitle');
  const $postSubtitle = document.getElementById('postSubtitle');
  const $postContent = document.getElementById('postContent');
  const $postSave = document.getElementById('postSave');

  $postSave.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('post saved');
    console.log($postTitle.value);
    console.log($postSubtitle.value);
    console.log($postContent.value);

    let userName;
    let userIdNum;
    let userData = [userName, userIdNum];

    axios({
      method: 'get',
      url: `/api/users?email=${sessionStorage.getItem('userEmail')}`,
      headers: {
        'client-id': 'vanilla03',
        'content-type': 'application/json',
        accept: 'application/json',
      }
    })
      .then(response => {
        let userName = response.data.item[0].name;
        let userIdNum = response.data.item[0]._id;
        let userData = [userName, userIdNum];
        console.log(userData);
        return userData
      })
      .catch(error => console.log(error.response.data));

    console.log(userData);
  })


})