let produtos = []; // será preenchido pelo JSON

/* ================== HELPERS ================== */
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function parsePrecoBRL(str) {
  // espera "R$12,00" ou "R$2,50" e retorna number
  if (!str) return 0;
  return Number(String(str).replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
}

/* ================ CARRINHO (localStorage) ================ */
function getCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}
function setCarrinho(c) {
  localStorage.setItem("carrinho", JSON.stringify(c));
}
function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  const carrinho = getCarrinho();
  if (contador) contador.innerText = carrinho.reduce((s, p) => s + (p.quantidade || 1), 0);
}

/* ================ MODAIS ================ */
function mostrarModalProduto(prod) {
  if (!prod) return;
  const modal = $("#modal");
  if (!modal) return;
  $("#modal-img").src = prod.imagem || "";
  $("#modal-titulo").innerText = prod.titulo || "";
  $("#modal-descricao").innerText = prod.descricao || "";
  $("#modal-preco").innerText = prod.preco || "";
  modal.style.display = "flex";
  window.produtoAtualModal = prod;
}

function fecharModal() {
  const modal = $("#modal");
  if (!modal) return;
  modal.style.display = "none";
  window.produtoAtualModal = null;
}

function mostrarModalOrcamento(prod) {
  if (!prod) return;
  const modal = $("#modal-orcamento");
  if (!modal) return;
  $("#modal-orcamento-img").src = prod.imagem || "";
  $("#modal-orcamento-titulo").innerText = prod.titulo || "";
  $("#modal-orcamento-descricao").innerText = prod.descricao || "";
  $("#modal-orcamento-preco").innerText = prod.preco || "";
  modal.style.display = "flex";
}

/* ================ ABRIR / FECHAR CARRINHO ================ */
function abrirCarrinho() {
  const modal = $("#modal-carrinho");
  const lista = $("#lista-carrinho");
  const totalSpan = $("#total-carrinho");
  if (!modal || !lista || !totalSpan) return;

  const carrinho = getCarrinho();
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalSpan.innerText = "";
  } else {
    let precoTotal = 0;
    carrinho.forEach((item, idx) => {
      const p = produtos.find(x => x.id === item.id) || item;
      const precoUnit = (typeof p.valorNumerico === "number") ? p.valorNumerico : parsePrecoBRL(p.preco);
      precoTotal += precoUnit * (item.quantidade || 1);

      const div = document.createElement("div");
      div.className = "linha-carrinho";
      div.innerHTML = `
        <span>${p.titulo} - ${p.preco} x${item.quantidade || 1}</span>
        <div>
          <button class="remover-carrinho" data-index="${idx}">Remover</button>
        </div>
      `;
      lista.appendChild(div);
    });
    totalSpan.innerText = `Total: R$ ${precoTotal.toFixed(2).replace(".", ",")}`;
    $all(".remover-carrinho", lista).forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = Number(btn.dataset.index);
        let carr = getCarrinho();
        carr.splice(i, 1);
        setCarrinho(carr);
        atualizarContadorCarrinho();
        abrirCarrinho(); // re-renderiza
      });
    });
  }

  modal.style.display = "flex";
}

function fecharCarrinho() {
  const modal = $("#modal-carrinho");
  if (!modal) return;
  modal.style.display = "none";
}

/* ================ ADICIONAR AO CARRINHO ================ */
function adicionarAoCarrinho(id, quantidade = 1) {
  const carrinho = getCarrinho();
  const existente = carrinho.find(item => item.id === id);
  if (existente) {
    existente.quantidade = (existente.quantidade || 1) + quantidade;
  } else {
    carrinho.push({ id, quantidade });
  }
  setCarrinho(carrinho);
  atualizarContadorCarrinho();
}

/* ================ FAVORITOS (localStorage) ================ */
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}
function setFavoritos(arr) {
  localStorage.setItem("favoritos", JSON.stringify(arr));
}
function isFavorito(id) {
  return getFavoritos().includes(id);
}
function toggleFavorito(id) {
  const fav = getFavoritos();
  const exists = fav.includes(id);
  const novo = exists ? fav.filter(x => x !== id) : [...fav, id];
  setFavoritos(novo);
  atualizarContadorFavoritos();
  return !exists;
}
function atualizarContadorFavoritos() {
  const el = document.getElementById("contador-favoritos");
  if (el) el.innerText = getFavoritos().length;
}

/* ================ RENDER / INICIALIZAÇÃO DE EVENTOS ================ */
function inicializarEventosNosCards(root = document) {
  // - imagens abrem modal
  $all(".card", root).forEach(card => {
    const dataId = card.getAttribute("data-id");
    const id = dataId ? Number(dataId) : null;

    // --- sincroniza estado do coração ao renderizar ---
    const heartEl = card.querySelector(".heart");
    if (heartEl && id !== null) {
      const icHeart = heartEl.querySelector("i");
      const fav = isFavorito(id);
      heartEl.classList.toggle("favoritado", fav);
      if (icHeart) {
        icHeart.classList.toggle("bi-heart-fill", fav);
        icHeart.classList.toggle("bi-heart", !fav);
      }
    }

    // imagem -> modal
    const img = card.querySelector("img");
    if (img) {
      img.style.cursor = "pointer";
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        if (id !== null) {
          const p = produtos.find(x => x.id === id) || null;
          if (p && p.titulo && /orcamento/i.test(p.titulo)) {
            mostrarModalOrcamento(p);
          } else {
            mostrarModalProduto(p || { titulo: card.querySelector("h2, h3")?.innerText });
          }
        } else {
          // fallback: tenta abrir modal com texto do card
          mostrarModalProduto({ titulo: card.querySelector("h2, h3")?.innerText || "" });
        }
      });
    }

	// botão favorito (ícone dentro .heart ou .btn-favorito)
    if (heartEl) {
      heartEl.style.cursor = "pointer";
      heartEl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (id === null) return;
        const agoraFavorito = toggleFavorito(id);
        heartEl.classList.toggle("favoritado", agoraFavorito);
        const ic = heartEl.querySelector("i");
        if (ic) {
          ic.classList.toggle("bi-heart-fill", agoraFavorito);
          ic.classList.toggle("bi-heart", !agoraFavorito);
        }
      });
    }

    // botões de quantidade
    const btnsQuant = card.querySelectorAll(".btn-quantidade, .btn-menos, .btn-mais");
    if (btnsQuant && btnsQuant.length > 0) {
      btnsQuant.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const span = card.querySelector(".quantidade");
          if (!span) return;
          const txt = span.textContent.trim();
          let valor = parseInt(txt, 10) || 1;
          const isPlus = btn.textContent.includes("+") || btn.classList.contains("btn-mais");
          const isMinus = btn.textContent.includes("-") || btn.classList.contains("btn-menos");
          if (isPlus) valor++;
          if (isMinus) valor--;
          if (valor < 1) valor = 1;
          span.textContent = valor;
        });
      });
    }

    // botão adicionar ao carrinho
    const btnAdd = card.querySelector(".btn-adicionar-carrinho, .btn-adicionar");
    if (btnAdd) {
      btnAdd.addEventListener("click", (e) => {
        e.stopPropagation();
        const qtdSpan = card.querySelector(".quantidade");
        const qtd = qtdSpan ? (parseInt(qtdSpan.textContent, 10) || 1) : 1;
        const dataId = card.getAttribute("data-id");
        const id = dataId ? Number(dataId) : null;

        if (id !== null) {
          adicionarAoCarrinho(id, qtd);
          const produto = produtos.find(p => p.id === id);
          if (produto) {
            // mostra modal leve de confirmação se preferir (aqui usamos alert pra compat)
            alert(`${qtd}x ${produto.titulo} adicionado(s) ao carrinho.`);
          } else {
            alert("Produto adicionado ao carrinho.");
          }
        } else {
          alert("Produto sem ID. Verifique o atributo data-id no card.");
        }
      });
    }
  });
}

/* ================ RENDER DINÂMICO (caso não haja cards estáticos) ================ */
function criarCardDOM(produto) {
  const div = document.createElement("div");
  div.className = "card";
  div.setAttribute("data-id", produto.id);
  div.innerHTML = `
    <div class="heart"><i class="bi bi-heart"></i></div>
    <img src="${produto.imagem}" alt="${produto.titulo}">
    <h2>${produto.titulo}</h2>
    <span class="preco">${produto.preco}</span>
    <div class="quantidade-container">
      <button class="btn-quantidade">-</button>
      <span class="quantidade">1</span>
      <button class="btn-quantidade">+</button>
    </div>
    <button class="btn-adicionar-carrinho">Adicionar ao Carrinho</button>
  `;
  return div;
}

/* ================ CARREGAR PRODUTOS E LIGAR TUDO ================ */
function carregarProdutos() {
  fetch("../json/produtolista.json")
    .then(r => {
      if (!r.ok) throw new Error("Erro no fetch: " + r.status);
      return r.json();
    })
    .then(data => {
      produtos = data.lista || [];

      // se já há cards estáticos (ex.: gerados no HTML), apenas inicializa os eventos
      const containerStatic = document.querySelector(".container") || document.querySelector(".produtos-container");
      const cardsStatic = containerStatic ? containerStatic.querySelectorAll(".card") : null;

      if (containerStatic && cardsStatic && cardsStatic.length > 0) {
        // garante que data-id dos cards correspondem aos IDs do JSON (opcional)
        // inicializa listeners nos cards existentes
        inicializarEventosNosCards(containerStatic);
      } else {
        // cria um container novo se não existir
        const container = containerStatic || document.createElement("div");
        if (!containerStatic) {
          container.className = "container";
          document.querySelector("main")?.appendChild(container);
        }
        container.innerHTML = "";
        produtos.forEach(p => container.appendChild(criarCardDOM(p)));
        inicializarEventosNosCards(container);
      }

      // ligar botões de fechar modais globais (se existirem)
      $all(".fechar").forEach(btn => btn.addEventListener("click", () => {
        fecharModal();
        fecharModalOrcamento();
        fecharCarrinho();
      }));

      // abrir carrinho pelo ícone (caso exista um elemento que chama abrirCarrinho via onclick no HTML, deixamos a função global)
      window.abrirCarrinho = abrirCarrinho;
      window.fecharCarrinho = fecharCarrinho;
      window.mostrarModal = (id) => {
        const p = produtos.find(x => x.id === id);
        mostrarModalProduto(p);
      };
      window.mostrarModalOrcamento = (id) => {
        const p = produtos.find(x => x.id === id);
        mostrarModalOrcamento(p);
      };

      // atualiza contador
      atualizarContadorCarrinho();
    })
    .catch(err => {
      console.error("Erro ao carregar produtos:", err);
      // mesmo se falhar no fetch, tenta inicializar listeners se houver cards estáticos
      const container = document.querySelector(".container") || document.querySelector(".produtos-container");
      if (container) inicializarEventosNosCards(container);
    });

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

// atualiza contador de favoritos ao carregar a página
window.addEventListener("load", atualizarContadorFavoritos);

/* ================ UTILIDADES MODAL ORÇAMENTO ================ */
function fecharModalOrcamento() {
  const modal = $("#modal-orcamento");
  if (!modal) return;
  modal.style.display = "none";
}

/* ================ START ================ */
window.addEventListener("load", carregarProdutos);