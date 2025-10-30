const produtos = [
	{
		imagem: "img/brigadeiro.jpg",
		titulo: "Brigadeiro Gourmet de Chocolate",
		descricao:
			"Uma explosão de sabor em cada mordida: nosso brigadeiro gourmet é cremoso por dentro, intenso no sabor e com aquele toque artesanal que derrete na boca. Perfeito pra quem acredita que felicidade vem em forma de bolinha!",
		preco: "R$2,50", // Mantenha para exibição
		valorNumerico: 2.5, // Novo campo para cálculo
	},
	{
		imagem: "img/palhaSemFundo.png",
		titulo: "Palha Italiana Artesanal",
		descricao:
			"Uma delícia de textura única! Feita com brigadeiro gourmet e pedaços crocantes de biscoito amanteigado, nossa palha italiana é o equilíbrio perfeito entre cremosidade e crocância. Finalizada com uma leve camada de açúcar confeiteiro, é impossível comer só uma!",
		preco: "R$6,00",
		valorNumerico: 6.0,
	},
	{
		imagem: "img/paoSemFundo.png",
		titulo: "Pão de Mel Gourmet",
		descricao:
			"Um clássico que aquece o coração! Nosso pão de mel é feito com uma massa fofinha e aromática, recheado com doce de leite cremoso e mergulhado em chocolate meio amargo de alta qualidade. Uma combinação perfeita entre o sabor da infância e o toque sofisticado da confeitaria artesanal.",
		preco: "R$6,00",
		valorNumerico: 6.0,
	},
	{
		imagem: "img/trufa.png",
		titulo: "Trufas Gourmet",
		descricao:
			"Cada trufa é uma explosão de sabor envolta em chocolate nobre e recheios cremosos que conquistam desde o primeiro pedaço. Escolha seu favorito (ou todos!)",
		preco: "R$5,00",
		valorNumerico: 5.0,
	},
	{
		imagem: "img/boloDePote.png",
		titulo: "Bolo de Pote - Ninho com Morango",
		descricao:
			"Uma combinação apaixonante em camadas! Nosso bolo de pote de Ninho com Morango é feito com massa branca fofinha, recheio super cremoso de leite Ninho, geleia de morango e morangos fresquinhos picados, tudo isso finalizado com mais creme e um toque de carinho em cada pote. Doce na medida certa, leve e irresistível — é como um abraço em forma de sobremesa!",
		// Defina uma faixa ou valor médio se for para cálculo
		preco: "R$12,00",
		valorNumerico: 12.0, // Exemplo: Valor médio para cálculo
	},
	{
		imagem: "img/tortaFrango.png",
		titulo: "Torta de Frango Cremosa",
		descricao:
			"Uma explosão de sabor e carinho em cada pedaço! Nossa torta cremosa de frango é feita com massa leve e amanteigada, recheada com um frango desfiado super temperadinho, refogado com ervas e cremosidade na medida certa. Cada fatia é puro conforto, com aquele sabor caseiro que abraça o coração e agrada todos os paladares. Ideal pra um lanchinho especial ou um almoço caprichado!",
		preco: "R$70.00",
		valorNumerico: 70.0, // Novo campo para cálculo
	},
	{
		imagem: "img/brownie.png",
		titulo: "Brownie",
		descricao:
			"Um pedacinho do paraíso em forma de chocolate! Nosso brownie é denso, úmido e com aquele centro molhadinho que derrete na boca. A casquinha crocante por cima contrasta perfeitamente com o interior macio e super chocolatudo, feito com cacau de qualidade e muito amor. Ideal pra acompanhar um café, um sorvetinho ou simplesmente devorar sozinho sem culpa. Porque tem coisa que é feita pra adoçar a vida!",
		preco: "R$7.00",
		valorNumerico: 7.0, // Novo campo para cálculo
	},
	{
		imagem: "img/tortaMorango.png",
		titulo: "Torta de Morango",
		descricao:
			"Leve, cremosa e simplesmente apaixonante! Nossa torta de morango é feita com uma base amanteigada que desmancha na boca, recheada com um creme branco suave e delicado, e coberta com morangos frescos selecionados — tudo finalizado com aquela geleia brilhante que dá o toque de confeitaria dos sonhos. É a sobremesa perfeita pra quem ama o equilíbrio entre o doce e o frescor da fruta. Um clássico que nunca sai de moda!",
		preco: "R$70.00",
		valorNumerico: 70.0, // Novo campo para cálculo
	},
	{
		imagem: "img/quiche.png",
		titulo: "Quiche",
		descricao:
			"Delicada, saborosa e irresistivelmente elegante! Nossa quiche é feita com uma massa leve e amanteigada que abraça um recheio cremoso à base de ovos, creme de leite fresco e queijo — tudo perfeitamente equilibrado com ingredientes selecionados como presunto, espinafre, bacon ou o que há de melhor no seu sabor preferido. Assada até dourar, ela entrega uma explosão de sabores a cada mordida. Ideal para um brunch estiloso, lanche reforçado ou até aquele jantar que pede sofisticação sem complicação.",
		preco: "R$60.00",
		valorNumerico: 60.0, // Novo campo para cálculo
	},
	{
		imagem: "img/tortaLimao.png",
		titulo: "Torta de Limão",
		descricao:
			"Refrescante, cremosa e com aquele azedinho na medida certa! Nossa torta de limão é feita com uma base crocante de biscoito amanteigado, que contrasta perfeitamente com o recheio suave de mousse de limão — leve, aerado e cheio de sabor. Por cima, um toque de chantilly delicado ou merengue maçaricado, finalizado com raspinhas de limão siciliano pra aquele charme visual e aroma irresistível. Uma sobremesa clássica que nunca sai de moda e conquista todos os paladares com sua leveza e sofisticação.",
		preco: "R$60.00",
		valorNumerico: 60.0, // Novo campo para cálculo
	},
	{
		imagem: "img/mousse.png",
		titulo: "Mousse de Chocolate",
		descricao:
			"Uma explosão de sabor e textura! Nosso mousse de chocolate é feito com chocolate nobre, garantindo aquele gostinho intenso e marcante que derrete na boca. Com uma textura leve, aerada e ao mesmo tempo cremosa, ele entrega o equilíbrio perfeito entre doçura e sofisticação. Servido geladinho, é a sobremesa ideal pra quem ama chocolate de verdade e não abre mão de um toque gourmet no dia a dia. Puro prazer em cada colherada!",
		preco: "R$40.00",
		valorNumerico: 40.0, // Novo campo para cálculo
	},
	{
		imagem: "img/orcamento.png",
		titulo: "Orçamento para Festas",
		descricao:
			"Planejando uma comemoração especial? A gente te ajuda a transformar esse momento em algo inesquecível! Montamos orçamentos sob medida para aniversários, chás, confraternizações, eventos corporativos e qualquer ocasião que mereça ser celebrada com muito sabor e carinho.Você escolhe os produtos, os sabores e a quantidade — e nós cuidamos de tudo com aquele toque artesanal e caprichado que todo evento merece! Entre em contato e solicite seu orçamento sem compromisso. Vamos montar juntos uma mesa deliciosa do jeitinho que você sonhou!",
		preco: "Faça um orçamento",
		valorNumerico: 0, // Novo campo para cálculo
	},
];

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

		// Botões de quantidade
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
