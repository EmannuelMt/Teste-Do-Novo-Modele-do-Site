// Abrir/Fechar Cards do Cardápio
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});


// Seleciona elementos do formulário e da lista de comentários
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');
const ratingStars = document.querySelectorAll('.rating .star');
const ratingInput = document.getElementById('rating');

// Adiciona funcionalidade às estrelas de avaliação
ratingStars.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    ratingInput.value = value;

    // Atualiza a aparência das estrelas
    ratingStars.forEach(s => {
      if (s.getAttribute('data-value') <= value) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
});

// Adiciona funcionalidade ao formulário
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Captura os dados do formulário
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const rating = ratingInput.value;
  const comment = document.getElementById('comment').value;

  // Cria um novo item de comentário
  const commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');

  // Adiciona o nome
  const nameElement = document.createElement('div');
  nameElement.classList.add('name');
  nameElement.textContent = name;
  commentItem.appendChild(nameElement);

  // Adiciona a avaliação
  const ratingElement = document.createElement('div');
  ratingElement.classList.add('rating');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = '★';
    if (i <= rating) {
      star.style.color = '#FF6B35';
    } else {
      star.style.color = '#ccc';
    }
    ratingElement.appendChild(star);
  }
  commentItem.appendChild(ratingElement);

  // Adiciona o comentário
  const textElement = document.createElement('div');
  textElement.classList.add('text');
  textElement.textContent = comment;
  commentItem.appendChild(textElement);

  // Adiciona o comentário à lista
  commentsList.appendChild(commentItem);

  // Limpa o formulário
  commentForm.reset();
  ratingInput.value = 0;
  ratingStars.forEach(star => star.classList.remove('active'));
});
