fetch('/src/features/components/navigation/navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;

    // URL이 홈 페이지인지 확인
    if (window.location.pathname === '/src/features/home/home.html') {
      // 홈 페이지 버튼만 선택하여 스타일 변경
      const homeButton = document.querySelector(
        '.navigation a[href="/src/features/home/home.html"]',
      );

      if (homeButton) {
        const imgElements = homeButton.getElementsByTagName('img');

        if (imgElements.length >= 2) {
          // 첫 번째 이미지 숨김, 두 번째 이미지 표시
          imgElements[0].style.display = 'none';
          imgElements[1].style.display = 'block';
        }
      }
    }
  });
