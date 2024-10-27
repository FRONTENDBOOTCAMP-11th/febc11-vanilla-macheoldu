import axios from 'axios';

// 배경색 리스트 상수
const BACKGROUND_COLORS = [
  '#E19999',
  '#E1A87A',
  '#E1CD87',
  '#87CF87',
  '#7FB3CC',
  '#B8A3D1',
];

// API 설정 상수
const API_CONFIG = {
  URL: 'https://11.fesp.shop/posts?type=info',
  HEADERS: {
    'client-id': 'vanilla03',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

class CoverSlider {
  constructor() {
    // 슬라이더 상태 관련 속성
    this.currentSlide = 0;
    this.totalSlides = 6;
    this.isAnimating = false;
    this.isDragging = false;

    // DOM 요소
    this.$container = document.querySelector('.cover');
    this.$sliderContainer = null;

    // 터치/마우스 이벤트 관련 속성
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.mouseStartX = 0;
    this.mouseEndX = 0;

    // 슬라이드 데이터
    this.slides = [];
  }

  // 슬라이더 초기화
  async initialize() {
    try {
      console.log('Initializing CoverSlider...');
      await this.fetchSlideData();
      this.renderSlider();
      this.initializeStyles();
      this.addEventListeners();
      this.updateSlide();
      console.log('Slider initialized successfully');
    } catch (error) {
      console.error('슬라이더 초기화 오류:', error);
    }
  }

  // 슬라이드 데이터 가져오기
  async fetchSlideData() {
    const response = await axios.get(API_CONFIG.URL, {
      headers: API_CONFIG.HEADERS,
    });

    if (!response.data) throw new Error('API 응답 오류');
    this.slides = response.data.item.slice(0, this.totalSlides);
  }

  // 슬라이더 HTML 생성
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
                  src="/src/assets/images/home/hourglass.png" 
                  alt="${slide.title}" 
                  class="cover__image"
                />
                <img 
                  src="/src/assets/icons/etc/cheer.svg" 
                  class="cover__badge" 
                />
              </figure>
              <div class="cover__support">
                <img 
                  src="/src/assets/icons/etc/won.svg" 
                  alt="응원 아이콘" 
                  class="cover__support-icon" 
                />
                <span class="cover__support-count">${slide.repliesCount}명이 응원</span>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
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

  // 슬라이더 렌더링
  renderSlider() {
    this.$container.innerHTML = this.createSliderHTML();
    this.$sliderContainer = this.$container.querySelector('.cover__slider');
  }

  // 스타일 초기화
  initializeStyles() {
    this.applySlideStyles();
    this.applyContainerStyles();
    this.applyProgressStyles();
  }

  // 슬라이드 요소 스타일 적용
  applySlideStyles() {
    const $slideElements = document.querySelectorAll('.cover__slide');

    $slideElements.forEach($slide => {
      // 슬라이드 기본 스타일
      $slide.style.cssText = `
        flex: 0 0 360px;
        width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 55px 0 28px;
        color: white;
      `;

      // 슬라이드 내부 요소 스타일 적용
      this.applySlideElementStyles($slide);
    });
  }

  // 슬라이드 내부 요소 스타일 적용
  applySlideElementStyles($slide) {
    // 제목 스타일
    const $title = $slide.querySelector('.cover__title');
    $title.style.cssText = `
      font-size: var(--font-size-xxl);
      font-weight: 300;
      line-height: 1.41;
      margin: 0;
    `;

    // 작가 이름 스타일
    const $author = $slide.querySelector('.cover__author');
    $author.style.cssText = `
      font-size: 12px;
      line-height: 1.33;
      margin-top: 10.5px;
      margin-bottom: 66px;
    `;

    // 이미지 관련 스타일
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

    // 응원 정보 스타일
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

  // 컨테이너 스타일 적용
  applyContainerStyles() {
    // 메인 컨테이너 스타일
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

    // 슬라이더 컨테이너 스타일
    this.$sliderContainer.style.cssText = `
      position: relative;
      display: flex;
      transition: transform 0.3s ease;
      width: ${this.totalSlides * 360}px;
    `;
  }

  // 프로그레스 바 스타일 적용
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

  // 프로그레스 스텝 스타일 업데이트
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

  // 이벤트 리스너 추가
  addEventListeners() {
    this.addTouchEventListeners();
    this.addMouseEventListeners();
  }

  // 터치 이벤트 리스너
  addTouchEventListeners() {
    this.$container.addEventListener(
      'touchstart',
      e => {
        this.touchStartX = e.touches[0].clientX;
        this.touchEndX = e.touches[0].clientX;
      },
      { passive: true },
    );

    this.$container.addEventListener(
      'touchmove',
      e => {
        if (this.isAnimating) return;
        this.touchEndX = e.touches[0].clientX;
        this.moveSlider(this.touchStartX - this.touchEndX);
      },
      { passive: true },
    );

    this.$container.addEventListener('touchend', () => {
      if (this.isAnimating) return;
      const diff = this.touchStartX - this.touchEndX;
      this.handleTouchEnd(diff);
    });
  }

  // 터치 종료 처리
  handleTouchEnd(diff) {
    if (Math.abs(diff) > 50) {
      if (diff > 0 && this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++;
      } else if (diff < 0 && this.currentSlide > 0) {
        this.currentSlide--;
      }
    }
    this.updateSlide();
  }

  // 마우스 이벤트 리스너
  addMouseEventListeners() {
    this.$container.addEventListener('mousedown', e => {
      this.handleMouseDown(e);
    });

    this.$container.addEventListener('mousemove', e => {
      this.handleMouseMove(e);
    });

    const handleMouseUp = () => {
      this.handleMouseUp();
    };

    this.$container.addEventListener('mouseup', handleMouseUp);
    this.$container.addEventListener('mouseleave', handleMouseUp);
  }

  // 마우스 다운 이벤트 처리
  handleMouseDown(e) {
    this.isDragging = true;
    this.mouseStartX = e.clientX;
    this.mouseEndX = e.clientX;
    this.$container.style.cursor = 'grabbing';
  }

  // 마우스 이동 이벤트 처리
  handleMouseMove(e) {
    if (!this.isDragging || this.isAnimating) return;
    e.preventDefault();
    this.mouseEndX = e.clientX;
    this.moveSlider(this.mouseStartX - this.mouseEndX);
  }

  // 마우스 업 이벤트 처리
  handleMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.$container.style.cursor = 'grab';
    this.handleSlideChange(this.mouseStartX - this.mouseEndX);
  }

  // 슬라이더 이동
  moveSlider(diff) {
    const movePercent = (diff / 360) * (100 / this.totalSlides);
    const currentTransform = -this.currentSlide * (100 / this.totalSlides);

    // 경계값 체크
    if (
      (this.currentSlide === -1 && movePercent < 0) ||
      (this.currentSlide === this.totalSlides && movePercent > 0)
    ) {
      return;
    }

    this.$sliderContainer.style.transform = `translateX(${currentTransform - movePercent}%)`;
  }

  // 슬라이드 변경 처리
  handleSlideChange(diff) {
    const threshold = 360 * 0.3;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && this.currentSlide < this.totalSlides) {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      } else if (diff < 0 && this.currentSlide >= 0) {
        this.currentSlide =
          this.currentSlide - 1 < 0 ? 5 : this.currentSlide - 1;
      }
      this.updateCoverBackground();
    }

    this.updateSlide();
  }

  // 슬라이드 업데이트
  updateSlide() {
    this.isAnimating = true;
    const translateX = -(this.currentSlide * (100 / this.totalSlides));

    this.$sliderContainer.style.transition = 'transform 0.5s ease';
    this.$sliderContainer.style.transform = `translateX(${translateX}%)`;

    this.updateProgress();

    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  // 프로그레스 업데이트
  updateProgress() {
    const $steps = document.querySelectorAll('.cover__progress-step');
    $steps.forEach(($step, index) => {
      $step.classList.toggle('active', index === this.currentSlide);
    });

    this.updateProgressStepStyles();

    const $progressText = document.querySelector('.cover__progress-text');
    $progressText.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
  }

  // 배경색 업데이트
  updateCoverBackground() {
    this.$sliderContainer.style.backgroundColor =
      BACKGROUND_COLORS[this.currentSlide];
  }
}

// 초기화 함수
const initializeCoverSlider = async () => {
  console.log('Initializing Cover Slider...');
  const slider = new CoverSlider();
  await slider.initialize();
  console.log('Cover Slider initialization complete');
};

export { initializeCoverSlider };