// carrinho.js - Arquivo global para funcionalidades do carrinho

// Helpers para carrinho
function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function setCarrinho(c) {
    localStorage.setItem('carrinho', JSON.stringify(c));
}

function atualizarContadorCarrinho() {
    const carrinho = getCarrinho();
    const contador = document.getElementById('contador-carrinho');
    if (contador) contador.innerText = carrinho.reduce((s, p) => s + (p.quantidade || 1), 0);
}

// Função para adicionar ao carrinho (padronizada, baseada na versão que funciona na index.js)
function adicionarAoCarrinho(cardId, quantidade = 1) {
    // cardId pode ser o índice do botão (0,1,2) - vamos converter para o ID real do produto
    const indiceParaId = {
        "0": 1, // brigadeiro
        "1": 3, // pão de mel
        "2": 2  // palha italiana
    };
    
    const idReal = indiceParaId[cardId] || cardId;
    
    fetch("../json/produtolista.json")
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível carregar produtos: ' + response.status);
            return response.json();
        })
        .then(data => {
            const lista = data.lista || [];
            const produto = lista.find(item => Number(item.id) === Number(idReal));

            if (produto) {
                const carrinho = getCarrinho();
                const existente = carrinho.find(item => Number(item.id) === Number(produto.id));
                if (existente) {
                    existente.quantidade = (existente.quantidade || 1) + quantidade;
                } else {
                    carrinho.push({
                        id: produto.id,
                        titulo: produto.titulo,
                        preco: produto.preco,
                        valorNumerico: produto.valorNumerico,
                        quantidade: quantidade,
                        imagem: produto.imagem
                    });
                }
                setCarrinho(carrinho);
                atualizarContadorCarrinho();
                console.debug('Produto adicionado ao carrinho:', produto.titulo);
            } else {
                console.warn('Produto não encontrado ao adicionar ao carrinho. ID:', idReal);
            }
        })
        .catch(err => console.error('Erro ao adicionar ao carrinho:', err));
}

// Função para abrir o carrinho (padronizada, baseada na index.js)
function abrirCarrinho() {
    const carrinho = getCarrinho();
    const lista = document.getElementById('lista-carrinho');
    const total = document.getElementById('total-carrinho');
    lista.innerHTML = '';
    let precoTotal = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = '<p>Seu carrinho está vazio.</p>';
        total.innerText = '';
    } else {
        carrinho.forEach((produto, index) => {
            // div com classe para estilização consistente
            const div = document.createElement('div');
            div.className = 'linha-carrinho';
            
            // garante que todos os campos existam, mesmo que vazios
            const nomeProduto = produto.titulo || produto.nome || 'Produto';
            const precoProduto = produto.preco || 'R$ 0,00';
            const quantidade = produto.quantidade || 1;
            
            div.innerHTML = `
                <span>${nomeProduto} - ${precoProduto} x${quantidade}</span>
                <button class="remover-carrinho" onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            lista.appendChild(div);

            // usa valorNumerico se disponível, senão tenta parsear o preço
            if (typeof produto.valorNumerico === 'number') {
                precoTotal += produto.valorNumerico * quantidade;
            } else {
                const valor = Number(String(produto.preco || '0').replace(/[^0-9,.-]/g, '').replace(',', '.'));
                if (!isNaN(valor)) precoTotal += valor * quantidade;
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
    let carrinho = getCarrinho();
    carrinho.splice(index, 1);
    setCarrinho(carrinho);
    atualizarContadorCarrinho();
    abrirCarrinho(); // Reabre com a lista atualizada
}

function finalizarCompra() {
    const carrinho = getCarrinho();
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
        return;
    }
    window.location.href = "pagamento.html";
}

// Inicializa o contador ao carregar a página
window.onload = atualizarContadorCarrinho;
