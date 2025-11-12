document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("pagamentos");
    const metodoPagamentoRadios = document.querySelectorAll('input[name="metodo-pagamento"]');
    const fieldsetCartao = document.getElementById("fieldset-cartao");
    const pixInfo = document.getElementById("pix-info");

    // Elementos do resumo da compra
    const itensResumoDiv = document.getElementById("itens-resumo");
    const resumoValorItensSpan = document.getElementById("resumo-valor-itens");
    const resumoValorFreteSpan = document.getElementById("resumo-valor-frete");
    const resumoTotalGeralSpan = document.getElementById("resumo-total-geral");

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const valorFrete = 14.90; // Exemplo de valor de frete fixo

    // --- Funções de Carregamento e Exibição do Carrinho ---
    function carregarResumoCompra() {
        itensResumoDiv.innerHTML = ''; // Limpa a lista antes de preencher
        let totalItens = 0;

        if (carrinho.length === 0) {
            itensResumoDiv.innerHTML = '<p>Nenhum item no carrinho.</p>';
        } else {
            carrinho.forEach(produto => {
                const quantidade = produto.quantidade || 1; // Usa 1 como padrão se não houver quantidade
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-resumo-compra');
                itemDiv.innerHTML = `
                    <span>${produto.titulo} x${quantidade}</span>
                    <span>${produto.preco}</span> `;
                itensResumoDiv.appendChild(itemDiv);

                // Soma o valor numérico multiplicado pela quantidade
                if (typeof produto.valorNumerico === 'number') {
                    totalItens += produto.valorNumerico * quantidade;
                }
            });
        }

        resumoValorItensSpan.innerText = `R$ ${totalItens.toFixed(2).replace('.', ',')}`;
        // Para este exemplo, o frete é fixo.
        resumoValorFreteSpan.innerText = `R$ ${valorFrete.toFixed(2).replace('.', ',')}`;
        resumoTotalGeralSpan.innerText = `R$ ${(totalItens + valorFrete).toFixed(2).replace('.', ',')}`;
    }

    // --- Lógica de Seleção de Método de Pagamento ---
    function alternarMetodoPagamento() {
        if (document.getElementById('cartao-credito').checked) {
            fieldsetCartao.style.display = 'block'; // Mostra os campos do cartão
            // Garante que os campos sejam required apenas quando visíveis
            fieldsetCartao.querySelectorAll('input, select').forEach(element => element.setAttribute('required', ''));
            pixInfo.style.display = 'none'; // Oculta a info do PIX
        } else if (document.getElementById('pix-option').checked) {
            fieldsetCartao.style.display = 'none'; // Oculta os campos do cartão
            // Remove o atributo required quando os campos estão ocultos para evitar validação desnecessária
            fieldsetCartao.querySelectorAll('input, select').forEach(element => element.removeAttribute('required'));
            pixInfo.style.display = 'block'; // Mostra a info do PIX
        }
    }

    // Adiciona event listeners para os radio buttons
    metodoPagamentoRadios.forEach(radio => {
        radio.addEventListener('change', alternarMetodoPagamento);
    });

    // Inicializa a exibição correta ao carregar a página
    alternarMetodoPagamento();
    carregarResumoCompra();

    // --- Lógica de Validação e Finalização da Compra ---
    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const metodoSelecionado = document.querySelector('input[name="metodo-pagamento"]:checked').value;
        let compraValida = false;

        if (carrinho.length === 0) {
            alert("Não há itens no carrinho para finalizar a compra.");
            return;
        }

        if (metodoSelecionado === 'cartao') {
            compraValida = validarFormularioCartao();
        } else if (metodoSelecionado === 'pix') {
            compraValida = true; // No caso do PIX, a validação é mais simples
        }

        if (compraValida) {
            // Limpa o carrinho após a compra bem-sucedida
            localStorage.removeItem('carrinho');
            // Redireciona para a página de checkout
            window.location.href = "checkout.html";
        } else {
            alert("Por favor, verifique os dados do pagamento.");
        }
    });

    function validarFormularioCartao() {
        const numeroCartao = document.getElementById("numero-cartao").value.trim();
        const nomeTitular = document.getElementById("nome-titular").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        const mes = document.getElementById("mes-validade").value;
        const ano = document.getElementById("ano-validade").value;
        const parcelamento = document.getElementById("parcelamento").value;

        if (!numeroCartao || !nomeTitular || !cpf || !cvv || !mes || !ano || !parcelamento) {
            alert("Por favor, preencha todos os campos obrigatórios do cartão.");
            return false;
        }

        if (!/^\d{16}$/.test(numeroCartao.replace(/\s+/g, ''))) {
            alert("Número do cartão inválido. Deve conter 16 dígitos.");
            return false;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert("CVV inválido. Deve conter 3 dígitos.");
            return false;
        }

        if (!/^\d{11}$/.test(cpf.replace(/[^\d]/g, ''))) {
            alert("CPF inválido. Deve conter 11 dígitos numéricos.");
            return false;
        }

        return true;
    }
});

function voltarAoMenu() {
    window.location.href = "produtos.html"; // Voltando para a página de produtos
}
