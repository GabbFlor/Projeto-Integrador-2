function formatarPreco(valor) {
  if (valor == null) return '';
  const num = typeof valor === 'number' ? valor : Number(String(valor).replace(/[^0-9,\.]/g, '').replace(',', '.'));
  if (Number.isNaN(num)) return String(valor);
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarEstrelas(avaliacao) {
  // Avaliação de 1 a 5; renderiza estrelas preenchidas/vazias
  let estrelas = '';
  for (let i = 1; i <= 5; i++) {
    estrelas += i <= avaliacao ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
  }
  return estrelas;
}

function carregarAvaliacoes() {
  const container = document.querySelector('.produtos-avaliados');
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

  if (!container) return;
  container.innerHTML = ''; // Limpa o container

  if (avaliacoes.length === 0) {
    container.innerHTML = '<p class="sem-avaliacoes">Nenhuma avaliação ainda 😢</p>';
    return;
  }

  avaliacoes.forEach(produto => {
    const item = document.createElement('div');
    item.className = 'produto-card';
    item.setAttribute('data-id', produto.id);

    item.innerHTML = `
      <img src="${produto.imagem || '../img/sem-imagem.png'}" alt="${produto.titulo || produto.nome}" />
      <div class="produto-info">
        <div class="linha-superior">
          <h3 class="produto-titulo">${produto.titulo || produto.nome || 'Produto'}</h3>
          <div class="icones-superiores">
            <button class="btn-remover-avaliacao" title="Remover avaliação">
              <i class="bi bi-trash"></i>
            </button>
            <button class="btn-adicionar-carrinho" title="Adicionar ao carrinho">
              <i class="bi bi-cart2"></i>
            </button>
          </div>
        </div>
        <div class="estrelas">${renderizarEstrelas(produto.avaliacao || 0)}</div>
        <p class="preco">${formatarPreco(produto.preco)}</p>
      </div>
    `;

    const btnRemover = item.querySelector('.btn-remover-avaliacao');
    btnRemover.addEventListener('click', () => removerAvaliacao(produto.id));

    const btnCarrinho = item.querySelector('.btn-adicionar-carrinho');
    btnCarrinho.addEventListener('click', () => {
      if (typeof window.abrirCarrinho === 'function') {
        window.abrirCarrinho();
      } else if (typeof abrirCarrinho === 'function') {
        abrirCarrinho();
      } else {
        console.warn('Função abrirCarrinho() não encontrada.');
      }
    });

    container.appendChild(item);
  });
}

function removerAvaliacao(id) {
  const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
  const novasAvaliacoes = avaliacoes.filter(prod => String(prod.id) !== String(id));
  localStorage.setItem('avaliacoes', JSON.stringify(novasAvaliacoes));

  const card = document.querySelector(`.produto-card[data-id="${id}"]`);
  if (card) card.remove();

  if (novasAvaliacoes.length === 0) {
    document.querySelector('.produtos-avaliados').innerHTML = '<p class="sem-avaliacoes">Nenhuma avaliação ainda 😢</p>';
  }
}

document.addEventListener('DOMContentLoaded', carregarAvaliacoes);