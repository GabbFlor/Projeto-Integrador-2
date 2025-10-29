function carregarFavoritos() {
  // na página de favoritos o container é .produtos-favoritos
  const container = document.querySelector('.produtos-favoritos');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (!container) return;
  container.innerHTML = ''; // limpa o container

  if (favoritos.length === 0) {
    container.innerHTML = '<p>Nenhum produto favoritado ainda 😢</p>';
    return;
  }

  favoritos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('card-produto');
    card.setAttribute('data-id', produto.id);
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.titulo || produto.nome}">
      <h3>${produto.titulo || produto.nome}</h3>
      <p class="preco">${produto.preco}</p>
      <button class="btn-remover">Remover</button>
    `;
    card.querySelector('.btn-remover').addEventListener('click', () => {
      removerFavorito(produto.id);
    });
    container.appendChild(card);
  });
}

function removerFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(prod => String(prod.id) !== String(id));
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  carregarFavoritos();
}

carregarFavoritos();