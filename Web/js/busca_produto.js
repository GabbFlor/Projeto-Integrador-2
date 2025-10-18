// ...existing code...
(function () {
    const INPUT_ID = "buscar";
    const STORAGE_KEY = "searchQuery";
    const DEBOUNCE_MS = 250;

    const campoBusca = document.querySelector(`#${INPUT_ID}`);
    if (!campoBusca) return;

    // util
    const normalize = s => (s || "").toString().trim().toLowerCase();
    const debounce = (fn, wait) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    };

    function getCards() {
        return Array.from(document.querySelectorAll(".card"));
    }

    function matchesCard(card, query) {
        if (!query) return true;
        const name = normalize(card.dataset.name || card.querySelector("h2")?.textContent);
        const category = normalize(card.dataset.category);
        const tags = normalize(card.dataset.tags || "");
        return name.includes(query) || category.includes(query) || tags.split(",").some(t => t.includes(query));
    }

    function applyFilter(value) {
        const q = normalize(value);
        const cards = getCards();
        cards.forEach(card => {
            if (matchesCard(card, q)) {
                card.classList.remove("invisivel");
            } else {
                card.classList.add("invisivel");
            }
        });
        // Persist para passar entre páginas se necessário
        try { sessionStorage.setItem(STORAGE_KEY, value || ""); } catch (e) {}
    }

    const debouncedApply = debounce(e => applyFilter(e.target.value), DEBOUNCE_MS);

    campoBusca.addEventListener("input", function (e) {
        debouncedApply(e);
    });

    // Se pressionar Enter: em index.html redireciona para produtos.html com query; em produtos apenas aplica
    campoBusca.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const q = campoBusca.value.trim();
            // se já estamos em produtos.html, apenas aplica
            if (!/produtos/i.test(window.location.pathname)) {
                // redireciona para produtos.html com query param
                const url = new URL(window.location.href);
                url.pathname = url.pathname.replace(/\/?$/, "/"); // normalize
                window.location.href = `produtos.html?q=${encodeURIComponent(q)}`;
            } else {
                applyFilter(q);
            }
        }
    });

    // Se clicar no ícone de busca (se existir), realiza a mesma ação do Enter
    const searchIcon = document.querySelector(".search-icon");
    if (searchIcon) {
        searchIcon.style.cursor = "pointer";
        searchIcon.addEventListener("click", () => {
            const q = campoBusca.value.trim();
            if (!/produtos/i.test(window.location.pathname)) {
                window.location.href = `produtos.html?q=${encodeURIComponent(q)}`;
            } else {
                applyFilter(q);
            }
        });
    }

    // Ao carregar a página: se houver query param ou sessionStorage, preencher input e aplicar filtro
    function initFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const qParam = params.get("q") || "";
        const saved = sessionStorage.getItem(STORAGE_KEY) || "";
        const initial = qParam || saved;
        if (initial) {
            campoBusca.value = initial;
            applyFilter(initial);
        }
    }

    // aplica imediatamente (caso já haja cards na página)
    initFromQuery();

})();