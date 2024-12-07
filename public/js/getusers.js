fetch('/users')
  .then(response => response.json())
  .then(data => {
    console.log('Users:', data);
  })
  .catch(error => console.error('Error fetching items:', error));
