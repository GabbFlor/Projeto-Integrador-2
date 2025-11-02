function formatarPreco(valor) {
  if (valor == null) return '';
  const num = typeof valor === 'number' ? valor : Number(String(valor).replace(/[^0-9,\.]/g, '').replace(',', '.'));
  if (Number.isNaN(num)) return String(valor);
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function carregarFavoritos() {
  const container = document.querySelector('.produtos-favoritos');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (!container) return;
  container.innerHTML = '';

  if (favoritos.length === 0) {
    container.innerHTML = '<p class="sem-favoritos">Nenhum produto favoritado ainda 😢</p>';
    return;
  }

  favoritos.forEach(produto => {
    const item = document.createElement('div');
    item.className = 'produto-card';
    item.setAttribute('data-id', produto.id);

    item.innerHTML = `
      <img src="${produto.imagem || '../img/sem-imagem.png'}" alt="${produto.titulo || produto.nome}" />
      <div class="produto-info">
        <div class="linha-superior">
          <h3 class="produto-titulo">${produto.titulo || produto.nome || 'Produto'}</h3>
          <div class="icones-superiores">
            <button class="btn-favorito favorito-ativo" title="Remover dos favoritos">
              <i class="bi bi-heart-fill"></i>
            </button>
            <button class="btn-adicionar-carrinho" title="Adicionar ao carrinho">
              <i class="bi bi-cart2"></i>
            </button>
          </div>
        </div>
        <p class="preco">${formatarPreco(produto.preco)}</p>
      </div>
    `;

    const btnRemover = item.querySelector('.btn-favorito');
    btnRemover.addEventListener('click', () => removerFavorito(produto.id));

    const btnCarrinho = item.querySelector('.btn-adicionar-carrinho');
    btnCarrinho.addEventListener('click', () => {
      // Adiciona o produto ao carrinho
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const produtoParaCarrinho = {
        id: produto.id,
        titulo: produto.titulo || produto.nome,
        preco: produto.preco,
        valorNumerico: parseFloat(String(produto.preco).replace(/[^\d,]/g, '').replace(',', '.')),
        imagem: produto.imagem || '../img/sem-imagem.png'
      };
      
      carrinho.push(produtoParaCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      
      // Mostra alerta de sucesso
      alert(`${produtoParaCarrinho.titulo} foi adicionado ao carrinho!`);
      
      // Atualiza o contador do carrinho
      if (typeof window.atualizarContadorCarrinho === 'function') {
        window.atualizarContadorCarrinho();
      }
    });

    container.appendChild(item);
  });
}

function removerFavorito(id) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const novosFavoritos = favoritos.filter(prod => String(prod.id) !== String(id));
  localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));

  const card = document.querySelector(`.produto-card[data-id="${id}"]`);
  if (card) card.remove();

  if (novosFavoritos.length === 0) {
    document.querySelector('.produtos-favoritos').innerHTML = '<p class="sem-favoritos">Nenhum produto favoritado ainda 😢</p>';
  }
}

document.addEventListener('DOMContentLoaded', carregarFavoritos);

// Funções para Adicionar ao Carrinho (diretamente) 

function adicionarProdutoQueridinhoAoCarrinho(productId) {
    const produtoParaAdicionar = produtosQueridinhos[productId];

    if (produtoParaAdicionar) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produtoParaAdicionar); // Adiciona o produto ao carrinho
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert(`${produtoParaAdicionar.titulo} foi adicionado ao carrinho!`);
        atualizarContadorCarrinho(); // Atualiza o contador no cabeçalho
    }
}

// Event Listeners para os botões "Adicionar ao Carrinho" 
document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionarCarrinho = document.querySelectorAll('.card-btn'); // Seleciona todos os botões com a classe card-btn

    botoesAdicionarCarrinho.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const productId = event.currentTarget.dataset.id; // Pega o data-id do botão clicado
            if (productId !== undefined) { // Garante que o data-id existe
                adicionarProdutoQueridinhoAoCarrinho(parseInt(productId)); // Converte para número e chama a função
            }
        });
    });
});


function abrirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-carrinho');
    const total = document.getElementById('total-carrinho');
    lista.innerHTML = '';
    let precoTotal = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = '<p>Seu carrinho está vazio.</p>';
        total.innerText = '';
    } else {
        carrinho.forEach((produto, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <span>${produto.titulo} - ${produto.preco}</span>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            lista.appendChild(div);

            if (typeof produto.valorNumerico === 'number') {
                precoTotal += produto.valorNumerico;
            }
        });
        total.innerText = `Total: R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    }

    document.getElementById('modal-carrinho').style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'none';
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    abrirCarrinho(); // Reabre com a lista atualizada
}

function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
        return;
    }
    window.location.href = "pagamento.html";
}

function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contador = document.getElementById('contador-carrinho');
    if (contador) contador.innerText = carrinho.length;
}

window.onload = atualizarContadorCarrinho; // Atualiza o contador ao carregar a página