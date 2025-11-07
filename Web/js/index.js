// Event Listeners para os botões "Adicionar ao Carrinho" (específico da página index)
document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionarCarrinho = document.querySelectorAll('.btn-adicionar-carrinho'); // Seleciona todos os botões com a classe btn-adicionar-carrinho

    botoesAdicionarCarrinho.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const id = event.currentTarget.dataset.id; // Pega o data-id do botão clicado
            if (id !== undefined) { // Garante que o data-id existe
                adicionarAoCarrinho(parseInt(id)); // Converte para número e chama a função global
            }
        });
    });
});