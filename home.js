const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/index.html';
}

const usuario = JSON.parse(atob(token.split('.')[1]));

document.querySelector('header h2').innerHTML = usuario.name
document.querySelector('header img').src = usuario.avatar

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
};

fetch('http://localhost:4000/posts', options)
    .then(response => {
        if (response.status === 401) {
            alert('Token inválido ou expirado. Faça login novamente.');
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
        return response.json();
    })
    .then(posts => {
        const container = document.getElementById('postsContainer');
        posts.forEach(post => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <p>${post.date}</p>
                <p>${post.views}👁 ${post.likes}❤</p>
            `;
            container.appendChild(div);
        });
    })
.catch(err => console.error(err));


function sair(){
    window.localStorage.removeItem('token');
    window.location.reload();
}