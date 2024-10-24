fetch('/src/features/components/top-menu/top-menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });