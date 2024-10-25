'use strict';

import axios from 'axios';

// API 설정
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// URL에서 userId 가져오는 함수
const getUserIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('userId') || 10; // 기본값 12로 통일
};

// 작가 정보 가져오기
async function getUserInfo() {
  try {
    const userId = getUserIdFromUrl(); // 공통 함수 사용

    if (userId) {
      const response = await api.get(`/users/${userId}`);
      const userData = response.data.item;
      console.log('유저 데이터:', userData);

      // 유저 네임 가져오기
      const $userNickname = document.getElementById('userNickname');
      $userNickname.textContent = userData.name;

      // 유저 직업 가져오기
      const $userOccupation = document.getElementById('userOccupation');
      if ($userOccupation) {
        $userOccupation.textContent = userData.extra?.job || '작가';
      }

      // 유저 이미지 가져오기
      const $profileImage = document.getElementById('profileImage');
      if ($profileImage) {
        $profileImage.src = api.defaults.baseURL + userData.image;
      }

      // 구독자 수 가져오기 , 없으면 기본 값 설정
      const $subscriberCount = document.getElementById('subscriberCount');
      if ($subscriberCount) {
        $subscriberCount.textContent = userData.bookmakedBy?.users || 0;
      }

      // 관심작가 수 가져오기, 없으면 기본 값 설정
      const $followingCount = document.getElementById('followingCount');
      if ($followingCount) {
        $followingCount.textContent = userData.bookmark?.users || 0;
      }
    } else {
      console.log('userId가 없습니다');
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
  }
}

// 유저 게시물 가져오기
async function getUserPost() {
  try {
    const userId = getUserIdFromUrl(); // 공통 함수 사용

    if (userId) {
      const response = await api.get(`/posts/users/${userId}?type=info`);

      if (response.status === 200) {
        const posts = response.data?.item;

        // ul 요소 선택
        const articleList = document.querySelector('.article-list');

        // 기존 내용 비우기
        articleList.innerHTML = '';

        // 각 게시물을 HTML로 변환하여 삽입
        posts.forEach(post => {
          // "2024.10.21 01:45:25" 형식에서 날짜 부분만 추출
          const dateOnly = post.createdAt.split(' ')[0];
          const [year, month, day] = dateOnly.split('.');

          const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          const formattedDate = `${months[parseInt(month) - 1]} ${day}.${year}`;

          const articleHTML = `
            <li class="article article--featured">
              <h3 class="article__title">${post.title}</h3>
              <p class="article__excerpt">
                <span class="article__subtitle">${post.extra.subTitle}</span>
                | ${post.content.substring(0, 100)}...
              </p>
              <div class="article__meta">
                <span class="article__comments">댓글 ${post.repliesCount} ·</span>
                <time class="article__date" datetime="${year}-${month}-${day}">
                  ${formattedDate}
                </time>
              </div>
            </li>
          `;

          articleList.innerHTML += articleHTML;
        });
      } else {
        console.error('API 요청이 실패했습니다. 상태 코드:', response.status);
      }
    } else {
      console.log('userId가 없습니다.');
    }
  } catch (error) {
    console.error('유저 게시물을 가져오는 중 에러 발생:', error);
  }
}

// 페이지 로드 시 두 함수 모두 실행
document.addEventListener('DOMContentLoaded', () => {
  getUserInfo();
  getUserPost();
});
