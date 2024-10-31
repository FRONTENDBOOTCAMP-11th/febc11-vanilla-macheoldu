import { utils } from '../utils.js';

/**
 * 요일별 연재 관리 클래스
 * 요일 탭을 관리하고 연재 컨텐츠를 표시하는 기능을 담당
 */
export class WeeklyPostsManager {
  constructor() {
    this.$tabButtons = document.querySelectorAll('.weekly-serial__tab');
    this.$postsList = document.querySelector('.weekly-serial__list');
  }

  /**
   * 초기화 함수
   * - 현재 요일 설정
   * - 이벤트 리스너 등록
   */
  init() {
    this.setCurrentDay();
    this.setupEventListeners();
  }

  // 현재 요일 설정
  setCurrentDay() {
    const currentDay = utils.getCurrentDay();
    const $currentTab = document.querySelector(`[data-day="${currentDay}"]`);
    if ($currentTab) {
      this.selectTab($currentTab);
    }
  }

  // 탭 선택 시 스타일 변경
  selectTab($selectedButton) {
    // 모든 탭의 선택 상태 해제
    this.$tabButtons.forEach($tab => {
      $tab.setAttribute('aria-selected', 'false');
      $tab.classList.remove('active');
      $tab.style.borderBottom = 'none';
    });

    // 선택된 탭 스타일 적용
    $selectedButton.setAttribute('aria-selected', 'true');
    $selectedButton.classList.add('active');
    $selectedButton.style.borderBottom = '2px solid var(--point-color)';
  }

  // 이벤트 리스너 설정
  setupEventListeners() {
    // 탭 클릭 이벤트
    this.$tabButtons.forEach($button => {
      $button.addEventListener('click', () => {
        this.selectTab($button);
      });
    });

    // 정렬 옵션 버튼 클릭 이벤트
    const $optionButtons = document.querySelectorAll('.weekly-serial__option');
    $optionButtons.forEach($button => {
      $button.addEventListener('click', () => {
        // 모든 버튼 기본 스타일로
        $optionButtons.forEach($btn => {
          $btn.classList.remove('active');
          $btn.style.fontWeight = 'normal';
        });

        // 선택된 버튼 강조
        $button.classList.add('active');
        $button.style.fontWeight = 'bold';
      });
    });
  }
}
