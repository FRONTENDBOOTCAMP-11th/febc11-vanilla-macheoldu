'use strict';

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 작가 정보 가져오기

async function getUserInfo() {
  // userId 파라미터 추가
  try {
    // URL에서 유저 ID 가져오기
    const params = new URLSearchParams(window.location.search);
    // URL에 userId가 없으면 기본값 12 사용
    const userId = params.get('userId') || 12; // URL에서 userId 파라미터 값 가져옴

    // userId가 있으면 해당 유저 정보 가져오기
    if (userId) {
      // API 응답 결과 - 동적 userId 사용
      const response = await api.get(`/users/${userId}`);
      console.log('API 응답:', response.data);

      // 유저 정보 가져오기
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
        $subscriberCount.textContent = userData.bookmakedBy?.users || 77;
      }

      // 관심작가 수 가져오기, 없으면 기본 값 설정
      const $followingCount = document.getElementById('followingCount');
      if ($followingCount) {
        $followingCount.textContent = userData.bookmark?.users || 777;
      }
    } else {
      console.log('userId가 없습니다');
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
  }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', getUserInfo);
