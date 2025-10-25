(function () {
  function getFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
  }
  function setFavoritos(arr) {
    localStorage.setItem("favoritos", JSON.stringify(arr));
  }
  function removerFavorito(id) {
    const fav = getFavoritos().filter(x => x !== id);
    setFavoritos(fav);
    render();
  }

  function parsePreco(p) {
    if (!p) return "";
    return p;
  }

  function render() {
    const container = document.getElementById("favoritos-container");
    if (!container) return;
    container.innerHTML = "<p>Carregando...</p>";

    const favIds = getFavoritos();
    if (favIds.length === 0) {
      container.innerHTML = "<p>Você não tem favoritos ainda.</p>";
      return;
    }

    fetch("../json/produtolista.json")
      .then(r => r.ok ? r.json() : Promise.reject("Falha ao buscar produtos"))
      .then(data => {
        const produtos = data.lista || [];
        const itens = produtos.filter(p => favIds.includes(p.id));
        if (itens.length === 0) {
          container.innerHTML = "<p>Produtos favoritados não encontrados.</p>";
          return;
        }
        container.innerHTML = "";
        itens.forEach(p => {
          const div = document.createElement("div");
          div.className = "fav-card";
          div.innerHTML = `
            <img src="${p.imagem || '../img/placeholder.png'}" alt="${p.titulo}" />
            <div class="fav-info">
              <h3>${p.titulo}</h3>
              <p class="preco">${parsePreco(p.preco)}</p>
              <div class="fav-actions">
                <a href="produtos.html" class="btn-voltar">Ver produtos</a>
                <button class="btn-remover" data-id="${p.id}">Remover</button>
              </div>
            </div>
          `;
          container.appendChild(div);
        });

        // attach remove handlers
        container.querySelectorAll(".btn-remover").forEach(btn => {
          btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            removerFavorito(id);
          });
        });
      })
      .catch(err => {
        container.innerHTML = "<p>Erro ao carregar favoritos.</p>";
        console.error(err);
      });
  }

  window.addEventListener("load", render);
})();