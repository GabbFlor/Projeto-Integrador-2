function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const lista = document.getElementById('lista-carrinho');
  let total = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio 😢</p>";
    return;
  }

  lista.innerHTML = '';
  carrinho.forEach((produto, index) => {
    total += parseFloat(produto.preco.replace('R$ ', '').replace(',', '.'));
    lista.innerHTML += `
      <div class="item-carrinho">
        <img src="${produto.imagem}" width="80" />
        <div>
          <h3>${produto.titulo}</h3>
          <p>${produto.preco}</p>
          <button onclick="removerItem(${index})">Remover</button>
        </div>
      </div>
    `;
  });

  document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
  atualizarCarrinho();
}

function finalizarCompra() {
  localStorage.removeItem('carrinho');
  alert('Compra finalizada com sucesso! A Tuty já tá separando seus docinhos 😍');
  window.location.href = 'index.html';
}

window.onload = carregarCarrinho;
