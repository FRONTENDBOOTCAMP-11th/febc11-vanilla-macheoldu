import axios from 'axios';
import CONFIG from './config.js';

/**
 * 슬라이더의 각 슬라이드 배경색 목록
 * - 슬라이드가 변경될 때마다 이 색상들이 순서대로 적용
 */
const BACKGROUND_COLORS = [
  '#E19999',
  '#E1A87A',
  '#E1CD87',
  '#87CF87',
  '#7FB3CC',
  '#B8A3D1',
];

/**
 * API 인스턴스 생성
 * home.js와 동일한 설정 사용
 */
const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: CONFIG.API.HEADERS,
});

/**
 * API 통신에 필요한 설정 정보
 * - URL: server에서 슬라이더 데이터를 가져올 주소
 * - HEADERS : sever와 통신할 때 필요한 인증 정보와 data 형식
 */
const API_CONFIG = {
  URL: 'https://11.fesp.shop/posts?type=info',
  HEADERS: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const utils = {
  getImgUrl: imgPath => `${API_CONFIG.BASE_URL}${imgPath}`,
};

/**
 * 커버 슬라이더 클래스
 *
 * 클래스란?
 * - 연관된 데이터와 함수들을 하나로 묶어서 관리하는 함수
 * - 마치 설계도처럼, 슬라이더의 모든 기능을 정의해놓은 것임.
 */
class CoverSlider {
  /**
   * constructor는 클래스의 초기 설정을 담당
   * 슬라이더에 필요한 기본 값들을 설정
   */
  constructor() {
    // 현재 보여지는 슬라이드 번호 (0부터 시작)
    this.currentSlide = 0;

    // 전체 슬라이드 개수
    this.totalSlides = 6;

    // 슬라이드 애니메이션 진행 중인지 여부
    this.isAnimating = false;

    // 자동 재생을 위한 타이머 저장 변수
    this.autoPlayInterval = null;

    // 자동 재생 간격 (2s = 2000ms)
    this.autoPlayDelay = 2000;

    // DOM 요소 참조 저장
    this.$container = document.querySelector('.cover');
    this.$sliderContainer = null;

    // 슬라이드 데이터를 저장할 배열
    this.slides = [];
  }

  /**
   * 슬라이더 초기화를 위한 메인 함수
   * 슬라이더의 모든 기능을 순차적으로 설정하고 시작합니다
   *
   * 초기화 순서:
   * 1. 슬라이드 데이터 가져오기
   * 2. HTML 구조 렌더링
   * 3. 스타일 초기화
   * 4. 이벤트 리스너 설정
   * 5. 첫 슬라이드 표시
   * 6. 자동 재생 시작
   */
  async initialize() {
    try {
      // 1. 서버에서 슬라이드 데이터 가져오기
      await this.fetchSlideData();

      // 2. 슬라이더 HTML 구조 생성 및 렌더링
      this.renderSlider();

      // 3. 모든 요소의 스타일 초기화
      this.initializeStyles();

      // 4. 마우스 이벤트 등 이벤트 리스너 추가
      this.addEventListeners();

      // 5. 첫 번째 슬라이드 표시
      this.updateSlide();

      // 6. 자동 슬라이드 재생 시작
      this.startAutoPlay();
    } catch (error) {
      console.error('슬라이더 초기화 오류:', error);
      throw error; // 상위 호출자에게 에러를 전파하여 적절한 처리 유도
    }
  }

  /**
   * server에서 슬라이더 data를 가져오는 함수
   * axios를 사용해 API를 호출하고 결과를 받아옴
   */
  async fetchSlideData() {
    const response = await api.get('/posts?type=info');

    if (!response.data) throw new Error('API 응답 오류');

    // 전체 data 중 필요한 만큼만 잘라서 사용
    this.slides = response.data.item.slice(0, this.totalSlides);
  }

  /**
   * 슬라이더의 HTML 구조를 생성하는 함수
   * 서버에서 받아온 데이터를 바탕으로 슬라이더의 모든 요소를 만듦
   */
  createSliderHTML() {
    return `
      <div class="cover__content">
        <div class="cover__slider" role="region" aria-label="책 표지 슬라이더">
          ${this.slides
            .map(
              (slide, index) => `
            <div class="cover__slide" data-index="${index}">
              <h1 class="cover__title">${slide.title}</h1>
              <p class="cover__author"><em>by</em> ${slide.user.name}</p>
              <figure class="cover__image-wrapper">
                <img 
                  src="${slide.image?.[0] ? `${CONFIG.API.BASE_URL}${slide.image[0]}` : '/assets/images/home/hourglass.png'}" 
                  alt="${slide.title}" 
                  class="cover__image"
                  onerror="this.src='/assets/images/home/hourglass.png'"
                />
                <img 
                  src="/assets/icons/etc/cheer.svg" 
                  class="cover__badge"
                  onerror="this.style.display='none'"
                />
              </figure>
              <div class="cover__support">
                <img 
                  src="/assets/icons/etc/won.svg" 
                  alt="응원 아이콘" 
                  class="cover__support-icon"
                  onerror="this.style.display='none'"
                />
                <span class="cover__support-count">${slide.repliesCount}명이 응원</span>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
        <!-- 진행 상태 표시 영역 -->
        <div class="cover__progress">
          <div class="cover__progress-steps">
            ${Array(this.totalSlides)
              .fill(0)
              .map(
                (_, i) =>
                  `<div class="cover__progress-step ${i === 0 ? 'active' : ''}"></div>`,
              )
              .join('')}
          </div>
          <span class="cover__progress-text">1 / ${this.totalSlides}</span>
        </div>
      </div>
    `;
  }

  // 생성된 HTML을 실제 DOM에 추가하는 함수
  renderSlider() {
    this.$container.innerHTML = this.createSliderHTML();
    this.$sliderContainer = this.$container.querySelector('.cover__slider');
  }

  /**
   * 모든 style 초기화를 관리하는 함수
   * 각각의 요소별로 스타일을 적용
   */
  initializeStyles() {
    this.applySlideStyles();
    this.applyContainerStyles();
    this.applyProgressStyles();
  }

  /**
   * 각 슬라이드의 style을 적용하는 함수
   * css 스타일을 JS로 직접 적용
   */
  applySlideStyles() {
    const $slideElements = document.querySelectorAll('.cover__slide');

    $slideElements.forEach($slide => {
      $slide.style.cssText = `
        flex: 0 0 360px;
        width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 55px 0 28px;
        color: white;
      `;

      // 슬라이드 내부 요소들의 style 적용
      this.applySlideElementStyles($slide);
    });
  }

  /**
   * 슬라이드 내부 각 요소의 스타일을 적용하는 함수
   * 제목, 작가명, 이미지, 뱃지 등 각 요소별로 style 설정
   */
  applySlideElementStyles($slide) {
    const $title = $slide.querySelector('.cover__title');
    $title.style.cssText = `
      font-size: var(--font-size-xxl);
      font-weight: 300;
      line-height: 1.41;
      margin: 0;
    `;

    const $author = $slide.querySelector('.cover__author');
    $author.style.cssText = `
      font-size: 12px;
      line-height: 1.33;
      margin-top: 10.5px;
      margin-bottom: 66px;
    `;

    const $imageWrapper = $slide.querySelector('.cover__image-wrapper');
    $imageWrapper.style.cssText = `
      position: relative;
      display: inline-block;
    `;

    const $image = $slide.querySelector('.cover__image');
    $image.style.cssText = `
      width: 135px;
      height: 190px;
    `;

    const $badge = $slide.querySelector('.cover__badge');
    $badge.style.cssText = `
      position: absolute;
      top: -5px;
      right: 0;
      width: 29px;
      height: 32px;
    `;

    const $support = $slide.querySelector('.cover__support');
    $support.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 38px;
    `;

    const $supportIcon = $slide.querySelector('.cover__support-icon');
    $supportIcon.style.cssText = `
      margin-right: 4px;
      width: 21px;
      height: 21px;
    `;

    const $supportCount = $slide.querySelector('.cover__support-count');
    $supportCount.style.cssText = `
      font-size: 14px;
    `;
  }

  applyContainerStyles() {
    this.$container.style.cssText = `
      overflow: hidden;
      position: relative;
      width: 360px;
      background-color: ${BACKGROUND_COLORS[0]};
      color: var(--white);
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    `;

    this.$sliderContainer.style.cssText = `
      position: relative;
      display: flex;
      transition: transform 0.3s ease;
      width: ${this.totalSlides * 360}px;
    `;
  }

  applyProgressStyles() {
    const $progress = document.querySelector('.cover__progress');
    $progress.style.cssText = `
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
    `;

    const $progressSteps = document.querySelector('.cover__progress-steps');
    $progressSteps.style.cssText = `
      display: flex;
      gap: 1px;
    `;

    this.updateProgressStepStyles();

    const $progressText = document.querySelector('.cover__progress-text');
    $progressText.style.cssText = `
      font-size: 11px;
      margin-left: 3px;
      color: white;
    `;
  }

  /**
   * 자동 재생을 시작하는 함수
   * 일정 시간마다 다음 슬라이드로 자동으로 넘어감
   */
  startAutoPlay() {
    // 이미 실행 중인 타이머가 있다면 제거
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }

    // 새로운 타이머 설정
    this.autoPlayInterval = setInterval(() => {
      if (!this.isAnimating) {
        // 다음 슬라이드 번호 계산 (마지막 슬라이드면 처음으로)
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
        this.updateCoverBackground();
      }
    }, this.autoPlayDelay);
  }

  /**
   * 자동 재생을 멈추는 함수
   * 주로 마우스가 슬라이더 위에 있을 때 호출
   */
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  /**
   * Event Listeners를 추가하는 함수
   * 마우스가 슬라이더 위에 있을 때와 벗어났을 때의 동작을 정의
   */
  addEventListeners() {
    // 마우스가 슬라이더 위로 오면 자동 재생 멈춤
    this.$container.addEventListener('mouseenter', () => this.stopAutoPlay());
    // 마우스가 슬라이더를 벗어나면 자동 재생 시작
    this.$container.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  /**
   * 슬라이드를 업데이트하는 함수
   * 현재 슬라이드를 화면에 표시하고 관련 요소들을 update
   */
  updateSlide() {
    this.isAnimating = true;

    // 현재 슬라이드 위치로 이동하기 위한 계산
    const translateX = -(this.currentSlide * (100 / this.totalSlides));

    // 부드러운 이동 애니메이션 적용
    this.$sliderContainer.style.transition = 'transform 0.5s ease';
    this.$sliderContainer.style.transform = `translateX(${translateX}%)`;

    // 진행 상태 표시 update
    this.updateProgress();

    // 애니메이션 완료 후 상태 update
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  /**
   * 진행 상태 표시를 업데이트 하는 함수
   * 현재 몇 번째 슬라이드인지 표시
   */
  updateProgress() {
    // 진행 상태 표시 update
    const $steps = document.querySelectorAll('.cover__progress-step');
    $steps.forEach(($step, index) => {
      $step.classList.toggle('active', index === this.currentSlide);
    });

    this.updateProgressStepStyles();

    // 텍스트로 현재 슬라이드 번호 표시
    const $progressText = document.querySelector('.cover__progress-text');
    $progressText.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
  }

  updateProgressStepStyles() {
    const $progressStepElements = document.querySelectorAll(
      '.cover__progress-step',
    );
    $progressStepElements.forEach($step => {
      $step.style.cssText = `
        width: 20px;
        height: 1px;
        background-color: white;
        opacity: ${$step.classList.contains('active') ? '1' : '0.3'};
      `;
    });
  }

  updateCoverBackground() {
    this.$container.style.backgroundColor =
      BACKGROUND_COLORS[this.currentSlide];
  }

  /**
   * 슬라이더 정리(제거) 함수
   * 페이지를 벗어날 때 등에 호출되어 자원을 정리함
   */
  destroy() {
    this.stopAutoPlay();
  }
}

/**
 * 슬라이더를 시작하는 초기화 함수
 * 이 함수를 호출하면 슬라이더가 동작하기 시작함
 */
const initializeCoverSlider = async () => {
  console.log('cover 슬라이더 초기화 중');
  const slider = new CoverSlider();
  await slider.initialize();
  console.log('cover 슬라이더 초기화 완료');
};

export { initializeCoverSlider };
