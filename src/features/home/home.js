fetch('/src/assets/components/top-menu/top-menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

fetch('/src/assets/components/navigation/navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;
  });
