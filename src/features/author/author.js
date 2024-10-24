import axios from 'axios';

// API 서버에서 게시물 목록 조회
axios
  .get('/api/users', {
    headers: {
      'client-id': 'vanilla03', // client-id 헤더 추가
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  .then(response => {
    // 응답 데이터에서 첫 번째 항목 가져오기

    const firstItem = response.data.item;
    console.log(firstItem);
    console.log(firstItem[0]);

    const nickname = firstItem.name;
    console.log(nickname);
  })
  .catch(error => {
    // 에러가 발생하면 콘솔에 에러 출력
    console.error('Error fetching data:', error);
  });
