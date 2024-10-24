fetch('/src/features/components/navigation/navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation').innerHTML = data;
  });