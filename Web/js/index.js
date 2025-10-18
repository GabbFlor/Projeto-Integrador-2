const produtosQueridinhos = [
    {
        imagem: 'img/brigadeiro.jpg',
        titulo: 'Brigadeiros',
        descricao: 'Delicados e irresistíveis, nossos brigadeiros são preparados artesanalmente com ingredientes selecionados, garantindo uma textura cremosa e um sabor marcante.',
        preco: 'R$2,50',
        valorNumerico: 2.50
    },
    {
        imagem: 'img/paoSemFundo.png',
        titulo: 'Pão de Mel',
        descricao: 'Elaborado com massa macia e levemente especiada, nosso pão de mel é recheado com doce de leite caseiro e coberto com chocolate nobre.',
        preco: 'R$6,00',
        valorNumerico: 6.00
    },
    {
        imagem: 'img/palhaSemFundo.png',
        titulo: 'Palha Italiana',
        descricao: 'Uma releitura sofisticada de um doce tradicional: brigadeiro cremoso combinado a pedaços crocantes de biscoito, finalizado com um toque de açúcar refinado.',
        preco: 'R$6,00',
        valorNumerico: 6.00
    }
];

// --- Funções para Adicionar ao Carrinho (diretamente) ---

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

// --- Event Listeners para os botões "Adicionar ao Carrinho" ---
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