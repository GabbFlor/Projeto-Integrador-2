// Script para trocar o ícone do coração ao favoritar
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.heart').forEach(function(heart) {
    heart.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = heart.closest('.card');
      const id = card.getAttribute('data-id');
      const icon = heart.querySelector('i');
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      if (icon.classList.contains('bi-heart')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        if (!favoritos.includes(id)) favoritos.push(id);
      } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        favoritos = favoritos.filter(favId => favId !== id);
      }
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    });
  });

  // Ao carregar, marca os favoritos já salvos
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  document.querySelectorAll('.card').forEach(function(card) {
    const id = card.getAttribute('data-id');
    const heart = card.querySelector('.heart');
    const icon = heart.querySelector('i');
    if (favoritos.includes(id)) {
      icon.classList.remove('bi-heart');
      icon.classList.add('bi-heart-fill');
    } else {
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
    }
  });
});

// Função para alternar favorito nos cards de produto
    document.querySelectorAll('.heart').forEach(function(heart) {
      heart.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = heart.closest('.card');
        const id = card.getAttribute('data-id');
        heart.classList.toggle('favorito-ativo');
        // Atualiza favoritos no localStorage
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (heart.classList.contains('favorito-ativo')) {
          if (!favoritos.includes(id)) favoritos.push(id);
        } else {
          favoritos = favoritos.filter(favId => favId !== id);
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      });
    });
    // Ao carregar, marca os favoritos já salvos
    window.addEventListener('DOMContentLoaded', function() {
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      document.querySelectorAll('.card').forEach(function(card) {
        const id = card.getAttribute('data-id');
        if (favoritos.includes(id)) {
          card.querySelector('.heart').classList.add('favorito-ativo');
        }
    });
});




