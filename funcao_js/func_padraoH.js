document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //  BOTÃO VOLTAR
    // ============================
    const btnVoltar = document.querySelector(".seta_voltar");

    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => {
            history.back();
        });
    }

    // ============================
    //  SISTEMA DE BUSCA (PADRÃO)
    // ============================
    const campoDestino = document.querySelector(".barra-busca input[type='text']");
    const dataEntrada = document.querySelector(".barra-busca input[type='date']:first-of-type");
    const dataSaida = document.querySelector(".barra-busca input[type='date']:last-of-type");
    const btnBuscar = document.querySelector(".buscar");

    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {

            const destino = campoDestino?.value.trim() || "";
            const entrada = dataEntrada?.value || "";
            const saída = dataSaida?.value || "";

            if (!destino) {
                alert("Digite um destino.");
                return;
            }

            if (!entrada || !saída) {
                alert("Selecione as datas.");
                return;
            }

            if (entrada > saída) {
                alert("A data de entrada não pode ser maior que a de saída.");
                return;
            }

            alert(`Buscando hotéis em: ${destino}`);
        });
    }

    // ============================
    //  FILTRO DE ABAS (UNIVERSAL)
    // ============================
    const botoesFiltro = document.querySelectorAll(".filtro-botao");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {

            // remove ativo dos outros
            botoesFiltro.forEach(btn => btn.classList.remove("ativo"));
            botao.classList.add("ativo");

            console.log(`Aba selecionada: ${botao.textContent}`);
        });
    });

    // ============================
    //  FULLSCREEN DE IMAGEM
    // ============================
    const imagens = document.querySelectorAll(".hoteis-img");

    imagens.forEach(img => {
        img.addEventListener("click", () => {
            abrirImagemFullscreen(img.src);
        });
    });

    function abrirImagemFullscreen(src) {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.cursor = "zoom-out";
        overlay.style.zIndex = "9999";

        const imagem = document.createElement("img");
        imagem.src = src;
        imagem.style.maxWidth = "90%";
        imagem.style.maxHeight = "90%";
        imagem.style.borderRadius = "10px";

        overlay.appendChild(imagem);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });
    }

    // ============================
    //  EFEITO HOVER NOS CARDS
    // ============================
    const cards = document.querySelectorAll(".hoteis-card");

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
