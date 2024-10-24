import axios from 'axios';

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

const handleSort = sortType => {
  // 모든 버튼에서 active 클래스 제거
  const $buttons = document.querySelectorAll('.weekly-serial__option');
  $buttons.forEach($button => $button.classList.remove('active'));

  // 클릭된 버튼에 active 클래스 추가
  const $selectedButton = document.querySelector(
    `[onclick="handleSort('${sortType}')"]`,
  );
  $selectedButton.classList.add('active');
};

// 초기 상태 설정 (최신순 선택)
window.onload = () => {
  handleSort('latest');
};

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTabs);
} else {
  initializeTabs();
}
