document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //  BOTÃO VOLTAR
    // ============================
    const btnVoltar = document.querySelector(".seta_voltar");
    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => history.back());
    }

    // ============================
    //  BUSCA POR DESTINO
    // ============================
    const campoBusca = document.querySelector(".barra-busca input[type='text']");
    const btnBuscar = document.querySelector(".buscar");

    if (btnBuscar && campoBusca) {
        btnBuscar.addEventListener("click", () => {
            const termo = campoBusca.value.trim().toLowerCase();

            const cards = document.querySelectorAll(".restaurantes-card");
            cards.forEach(card => {
                const nome = card.querySelector(".restaurantes-nome").textContent.toLowerCase();

                card.style.display = nome.includes(termo) ? "block" : "none";
            });
        });
    }

    // ============================
    //  FILTRO DAS ABAS
    // ============================
    const botoesFiltro = document.querySelectorAll(".filtro-botao");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");
        });
    });

    // ============================
    //  CARROSSEL DE IMAGENS
    // ============================

    function criarCarrossel(container) {
        const imagens = container.querySelectorAll("img");
        if (imagens.length <= 1) return;

        let index = 0;

        const wrapper = document.createElement("div");
        wrapper.classList.add("carousel-wrapper");

        const track = document.createElement("div");
        track.classList.add("carousel-track");

        imagens.forEach(img => {
            const clone = img.cloneNode(true);
            clone.classList.add("carousel-img");
            track.appendChild(clone);
        });

        wrapper.appendChild(track);

        const btnPrev = document.createElement("button");
        btnPrev.classList.add("carousel-btn", "prev");
        btnPrev.textContent = "❮";

        const btnNext = document.createElement("button");
        btnNext.classList.add("carousel-btn", "next");
        btnNext.textContent = "❯";

        wrapper.appendChild(btnPrev);
        wrapper.appendChild(btnNext);

        container.innerHTML = "";
        container.appendChild(wrapper);

        function atualizar() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        btnNext.addEventListener("click", () => {
            index = (index + 1) % imagens.length;
            atualizar();
        });

        btnPrev.addEventListener("click", () => {
            index = (index - 1 + imagens.length) % imagens.length;
            atualizar();
        });
    }

    const galerias = document.querySelectorAll(".pontos-turisticos-imagens");
    galerias.forEach(galeria => criarCarrossel(galeria));

    // ============================
    //  IMAGEM FULLSCREEN
    // ============================
    function abrirFullscreen(src) {
        const overlay = document.createElement("div");
        overlay.classList.add("fullscreen-overlay");

        const imagem = document.createElement("img");
        imagem.src = src;

        overlay.appendChild(imagem);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => overlay.remove());
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("carousel-img") ||
            e.target.classList.contains("restaurantes-img")) {

            abrirFullscreen(e.target.src);
        }
    });

    // ============================
    //  ANIMAÇÃO NOS CARDS
    // ============================
    const cards = document.querySelectorAll(".restaurantes-card");

    cards.forEach(card => {
        card.style.transition = "0.3s";

        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.02)";
            card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
        });

        card.addEventListener("mouseout", () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "none";
        });
    });
});
