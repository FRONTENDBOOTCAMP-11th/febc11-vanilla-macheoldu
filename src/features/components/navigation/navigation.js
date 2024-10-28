fetch('/src/features/components/navigation/navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;

    // 현재 위치한 페이지에 따라 버튼이 변경되어 출력
    const currentPage = window.location.pathname;
    const page = currentPage.split("/").pop().replace(".html", "");
    document.querySelectorAll("nav a").forEach(anchor => {
      if (anchor.getAttribute("data-page") === page) {
        anchor.querySelector('figure .default').classList.add('hidden');
        anchor.querySelector('figure .current').classList.remove('hidden');
      }
    })
  });
