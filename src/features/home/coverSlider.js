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
    this.currentSlide = 0;
    this.totalSlides = 6;
    this.isAnimating = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 2000; // 2초 간격 .. 1초는 너무 빠른 것 같음

    this.$container = document.querySelector('.cover');
    this.$sliderContainer = null;
    this.slides = [];
  }

  async initialize() {
    try {
      console.log('Initializing CoverSlider...');
      await this.fetchSlideData();
      this.renderSlider();
      this.initializeStyles();
      this.addEventListeners();
      this.updateSlide();
      this.startAutoPlay();
      console.log('Slider initialized successfully');
    } catch (error) {
      console.error('슬라이더 초기화 오류:', error);
    }
  }

  async fetchSlideData() {
    const response = await axios.get(API_CONFIG.URL, {
      headers: API_CONFIG.HEADERS,
    });

    if (!response.data) throw new Error('API 응답 오류');
    this.slides = response.data.item.slice(0, this.totalSlides);
  }

  // HTML 생성
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
                  src="/assets/images/home/hourglass.png" 
                  alt="${slide.title}" 
                  class="cover__image"
                />
                <img 
                  src="/assets/icons/etc/cheer.svg" 
                  class="cover__badge" 
                />
              </figure>
              <div class="cover__support">
                <img 
                  src="/assets/icons/etc/won.svg" 
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

  renderSlider() {
    this.$container.innerHTML = this.createSliderHTML();
    this.$sliderContainer = this.$container.querySelector('.cover__slider');
  }

  initializeStyles() {
    this.applySlideStyles();
    this.applyContainerStyles();
    this.applyProgressStyles();
  }

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

      this.applySlideElementStyles($slide);
    });
  }

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

  startAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }

    this.autoPlayInterval = setInterval(() => {
      if (!this.isAnimating) {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
        this.updateCoverBackground();
      }
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  addEventListeners() {
    this.$container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.$container.addEventListener('mouseleave', () => this.startAutoPlay());
  }

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

  updateProgress() {
    const $steps = document.querySelectorAll('.cover__progress-step');
    $steps.forEach(($step, index) => {
      $step.classList.toggle('active', index === this.currentSlide);
    });

    this.updateProgressStepStyles();

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

  destroy() {
    this.stopAutoPlay();
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
