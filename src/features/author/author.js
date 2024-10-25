import axios from 'axios';

const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

async function getUserInfo() {
  try {
    // API 응답 결과
    const response = await api.get('/users/12');
    console.log('API 응답:', response.data);

    // 12번 유저 정보 가져오기
    const userData = response.data.item;
    console.log('드림핑 데이터:', userData);

    // 12번 유저 네임 가져오기
    const $userNickname = document.getElementById('userNickname');
    $userNickname.textContent = userData.name;

    // 12번 유저 직업 가져오기, 직업 없으면 작가로 초기 설정 값
    const $userOccupation = document.getElementById('userOccupation');
    if ($userOccupation) {
      $userOccupation.textContent = userData.extra?.job || '작가';
    }

    // 12번 구독자 수 가져오기, 수 없으면 초기 설정 값
    const $subscriberCount = document.getElementById('subscriberCount');
    if ($subscriberCount) {
      $subscriberCount.textContent = userData.bookmakedBy?.users || 7777;
    }

    // 12번 관심작가 수 가져오기, 수 없으면 초기 설정 값
    const $followingCount = document.getElementById('followingCount');
    if ($followingCount) {
      $followingCount.textContent = userData.bookmark?.users || 7777;
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error);
  }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', getUserInfo);
