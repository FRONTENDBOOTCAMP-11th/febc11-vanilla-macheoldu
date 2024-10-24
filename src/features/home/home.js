import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://11.fesp.shop',
  headers: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 현재 요일 가져오기 (0: 일요일, 1: 월요일, ...)
const getCurrentDay = () => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const today = new Date().getDay();
  return days[today];
};

// Today's Pick 렌더링 함수
const renderTodaysPick = posts => {
  const postsHTML = posts
    .slice(0, 10)
    .map((post, index) => {
      const description =
        post.content
          .replace(/<[^>]*>/g, '')
          .trim()
          .slice(0, 100) + '...';

      // 이미지 경로를 index + 1을 사용하여 생성
      const imgNum = index + 1;
      const imgPath = `/src/assets/images/home/pick${imgNum}.png`;

      return `
      <li class="main__todays-pick__item">
        <div class="main__todays-pick__info">
          <div class="main__todays-pick__text">
            <h3 class="main__todays-pick__item-title">
              ${post.title}
            </h3>
            <p class="main__todays-pick__author">
              <em style="font-family: Georgia">by</em> ${post.user.name}
            </p>
            <p class="main__todays-pick__description">
              ${description}
            </p>
          </div>
          <img
            src="${imgPath}"
            alt="${post.title}"
            class="main__todays-pick__image"
            onerror="this.src='/src/assets/images/home/pick1.png'"
          />
        </div>
      </li>
    `;
    })
    .join('');

  const container = document.querySelector('.main__todays-pick__list');
  if (container) {
    container.innerHTML = postsHTML;
  }
};

// 모든 탭 버튼을 선택하고 이벤트를 설정하는 함수
const initializeTabs = () => {
  const $tabButtons = document.querySelectorAll('.weekly-serial__tab');

  // 탭 선택 함수
  const selectTab = $selectedButton => {
    $tabButtons.forEach($tab => {
      $tab.setAttribute('aria-selected', 'false');
    });
    $selectedButton.setAttribute('aria-selected', 'true');
  };

  // 각 탭 버튼에 클릭 이벤트 리스너 추가
  $tabButtons.forEach($button => {
    $button.addEventListener('click', () => {
      selectTab($button);
    });
  });

  // 현재 요일 탭 선택
  const currentDay = getCurrentDay();
  const $currentTab = document.querySelector(`[data-day="${currentDay}"]`);
  if ($currentTab) {
    selectTab($currentTab);
  }
};

// Today's pick 데이터 가져오기
const fetchTodaysPick = async () => {
  try {
    const response = await api.get('/posts?type=info');
    const posts = response.data.item;
    renderTodaysPick(posts);
  } catch (error) {
    console.error("Error fetching Today's Pick:", error);
  }
};

/// 페이지 로드 시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchTodaysPick);
} else {
  fetchTodaysPick();
}

export default fetchTodaysPick;
