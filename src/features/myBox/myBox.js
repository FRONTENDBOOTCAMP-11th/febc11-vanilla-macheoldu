function initializeSlider(slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // 마우스 누를 때 시작 위치 기록
  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  // 마우스를 떼면 드래그 중지
  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  // 드래그가 끝날 때
  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  // 마우스 움직일 때 카드 슬라이드
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });

  // 터치 이벤트 (모바일 대응)
  slider.addEventListener('touchstart', e => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
  });

  slider.addEventListener('touchmove', e => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });
}

// 모든 슬라이더에 적용
const sliders = document.querySelectorAll('.cards');
sliders.forEach(slider => initializeSlider(slider));

// 관심작가 섹션의 슬라이더
const authorSliders = document.querySelectorAll('.interested-authors__ul');
authorSliders.forEach(slider => initializeSlider(slider));
