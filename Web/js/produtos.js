let produtoAtual = null;

function mostrarModal(id) {
	const p = produtos[id];
	produtoAtual = p;
	document.getElementById("modal-img").src = p.imagem;
	document.getElementById("modal-titulo").innerText = p.titulo;
	document.getElementById("modal-descricao").innerText = p.descricao;
	document.getElementById("modal-preco").innerText = p.preco;
	document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
	document.getElementById("modal").style.display = "none";
}

function adicionarAoCarrinho() {
	let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	// Adiciona o produto completo, incluindo o valorNumerico
	carrinho.push(produtoAtual);
	localStorage.setItem("carrinho", JSON.stringify(carrinho));
	alert(`${produtoAtual.titulo} foi adicionado ao carrinho!`);
	fecharModal();
	atualizarContadorCarrinho();
}

// NOVAS FUNÇÕES para o MODAL DE ORÇAMENTO
function mostrarModalOrcamento(id) {
	const p = produtos[id]; // Pega os dados do produto de orçamento
	// não usar 'produtoAtual' aqui, pois ele é para o carrinho
	document.getElementById("modal-orcamento-img").src = p.imagem;
	document.getElementById("modal-orcamento-titulo").innerText = p.titulo;
	document.getElementById("modal-orcamento-descricao").innerText = p.descricao;
	document.getElementById("modal-orcamento-preco").innerText = p.preco; // Exibe "Faça um Orçamento"
	document.getElementById("modal-orcamento").style.display = "flex";
}

function fecharModalOrcamento() {
	document.getElementById("modal-orcamento").style.display = "none";
}

function irParaOrcamento() {
	// Redireciona para a página de contato/orçamento
	window.location.href = "formulario.html";
	fecharModalOrcamento(); // Fecha o modal após o redirecionamento
}

function abrirCarrinho() {
	const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	const lista = document.getElementById("lista-carrinho");
	const total = document.getElementById("total-carrinho");
	lista.innerHTML = "";
	let precoTotal = 0;

	if (carrinho.length === 0) {
		lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
		total.innerText = "";
	} else {
		carrinho.forEach((produto, index) => {
			const div = document.createElement("div");
			// Exibição do preço original e da quantidade
			div.innerHTML = `
                <span>${produto.titulo} - ${produto.preco} x${
				produto.quantidade || 1
			}</span>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
			lista.appendChild(div);

			// Soma usando o novo campo valorNumerico
			if (typeof produto.valorNumerico === "number") {
				precoTotal += produto.valorNumerico * (produto.quantidade || 1);
			}
		});
		total.innerText = `Total: R$ ${precoTotal.toFixed(2).replace(".", ",")}`; // Formatação para BRL
	}

	document.getElementById("modal-carrinho").style.display = "flex";
}

function fecharCarrinho() {
	document.getElementById("modal-carrinho").style.display = "none";
}

function removerDoCarrinho(index) {
	let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	carrinho.splice(index, 1);
	localStorage.setItem("carrinho", JSON.stringify(carrinho));
	atualizarContadorCarrinho(); // Atualiza o contador após remover
	abrirCarrinho(); // reabre com a lista atualizada
}

function finalizarCompra() {
	const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	if (carrinho.length === 0) {
		alert(
			"Seu carrinho está vazio. Adicione produtos antes de finalizar a compra."
		);
		return; // Impede o redirecionamento se o carrinho estiver vazio
	}

	// Redireciona para a página de pagamento
	window.location.href = "pagamento.html";
}

function atualizarContadorCarrinho() {
	const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	const contador = document.getElementById("contador-carrinho");
	if (contador) contador.innerText = carrinho.length;
}

window.onload = atualizarContadorCarrinho; // Atualiza o contador ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".card").forEach((card) => {
		const id = parseInt(card.getAttribute("data-id"));
		if (isNaN(id) || !produtos[id]) return;

		// Clique na imagem abre modal
		const img = card.querySelector("img");
		if (img) {
			img.style.cursor = "pointer";
			img.addEventListener("click", function (e) {
				e.stopPropagation();
				if (id === 11) {
					mostrarModalOrcamento(id);
				} else {
					mostrarModal(id);
				}
			});
		}

		// Botões de quantidade - Contador produtos no card
		const btns = card.querySelectorAll(".btn-quantidade");
		btns.forEach((btn) => {
			btn.addEventListener("click", function (e) {
				e.stopPropagation();
				const span = card.querySelector(".quantidade");
				let valor = parseInt(span.textContent, 10);
				if (btn.textContent === "+") valor++;
				if (btn.textContent === "-") valor--;
				if (valor < 1) valor = 1;
				span.textContent = valor;
			});
		});

		// Botão adicionar ao carrinho
		const btnAdd = card.querySelector(".btn-adicionar-carrinho");
		if (btnAdd) {
			btnAdd.addEventListener("click", function (e) {
				e.stopPropagation();
				const quantidade = parseInt(
					card.querySelector(".quantidade").textContent,
					10
				);
				adicionarAoCarrinhoCard(produtos[id], quantidade);
			});
		}
	});
});

// Função para adicionar ao carrinho a partir do card
function adicionarAoCarrinhoCard(produto, quantidade) {
	let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	let id = produtos.findIndex((p) => p.titulo === produto.titulo);
	let existente = carrinho.find((p) => p && p.id === id);
	if (existente) {
		existente.quantidade = (existente.quantidade || 0) + quantidade;
	} else {
		carrinho.push({ ...produto, quantidade, id });
	}
	localStorage.setItem("carrinho", JSON.stringify(carrinho));
	atualizarContadorCarrinho();
	alert(`Adicionado ao carrinho: ${quantidade}x ${produto.titulo}`);
}

// Ajustar exibição do carrinho para mostrar quantidade
function abrirCarrinho() {
	const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
	const lista = document.getElementById("lista-carrinho");
	const total = document.getElementById("total-carrinho");
	lista.innerHTML = "";
	let precoTotal = 0;

	if (carrinho.length === 0) {
		lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
		total.innerText = "";
	} else {
		carrinho.forEach((produto, index) => {
			const div = document.createElement("div");
			div.innerHTML = `
                <span>${produto.titulo} - ${produto.preco} x${
				produto.quantidade || 1
			}</span>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
			lista.appendChild(div);
			if (typeof produto.valorNumerico === "number") {
				precoTotal += produto.valorNumerico * (produto.quantidade || 1);
			}
		});
		total.innerText = `Total: R$ ${precoTotal.toFixed(2).replace(".", ",")}`;
	}
	document.getElementById("modal-carrinho").style.display = "flex";
}

(function () {
	function c() {
		var b = a.contentDocument || a.contentWindow.document;
		if (b) {
			var d = b.createElement("script");
			d.innerHTML =
				"window.__CF$cv$params={r:'98d0fbe0c4794e11',t:'MTc2MDIxMzI0OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
			b.getElementsByTagName("head")[0].appendChild(d);
		}
	}
	if (document.body) {
		var a = document.createElement("iframe");
		a.height = 1;
		a.width = 1;
		a.style.position = "absolute";
		a.style.top = 0;
		a.style.left = 0;
		a.style.border = "none";
		a.style.visibility = "hidden";
		document.body.appendChild(a);
		if ("loading" !== document.readyState) c();
		else if (window.addEventListener)
			document.addEventListener("DOMContentLoaded", c);
		else {
			var e = document.onreadystatechange || function () {};
			document.onreadystatechange = function (b) {
				e(b);
				"loading" !== document.readyState &&
					((document.onreadystatechange = e), c());
			};
		}
	}
})();
