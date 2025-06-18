const fLogin = document.getElementById('loginForm');
fLogin.addEventListener('submit', e => {
    e.preventDefault();
    const body = {
        user: fLogin.email.value,
        psw: fLogin.senha.value
    }
    const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': ''},
  body: JSON.stringify(body)
};

fetch('http://localhost:4000/login', options)
  .then(response => response.json())
          .then(response => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                window.location.href = 'home.html';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        })
  .catch(err => console.error(err));
})