document.addEventListener("DOMContentLoaded", () => {

    function inicializarBotaoVoltar() {
        const btnVoltar = document.querySelector(".seta_voltar");

        if (btnVoltar) {
            btnVoltar.addEventListener("click", () => {
                history.back();
            });
        }
    }

    function inicializarBuscaAvancada() {
        const campoDestino = document.querySelector(".barra-busca input[type='text']");
        const dataEntrada = document.querySelector(".barra-busca input[type='date']:nth-of-type(1)");
        const dataSaida = document.querySelector(".barra-busca input[type='date']:nth-of-type(2)");
        const btnBuscar = document.querySelector(".buscar");

        if (!btnBuscar) return;

        btnBuscar.addEventListener("click", () => {
            const destino = campoDestino?.value.trim() || "";
            const entrada = dataEntrada?.value || "";
            const saida = dataSaida?.value || "";

            const validacao = validarBusca(destino, entrada, saida);
            if (!validacao.sucesso) {
                alert(validacao.mensagem);
                return;
            }

            salvarBuscaRecente({
                destino: destino,
                dataEntrada: entrada,
                dataSaida: saida,
                data: new Date().toLocaleString("pt-BR")
            });

            console.log("✓ Busca realizada com sucesso!");
            console.log(`Destino: ${destino} | Entrada: ${entrada} | Saída: ${saida}`);
        });
    }

    function validarBusca(destino, entrada, saida) {
        if (!destino || destino.length < 3) {
            return { sucesso: false, mensagem: "Digite um destino válido (mínimo 3 caracteres)." };
        }

        if (!entrada || !saida) {
            return { sucesso: false, mensagem: "Selecione ambas as datas." };
        }

        if (entrada > saida) {
            return { sucesso: false, mensagem: "A data de entrada não pode ser maior que a de saída." };
        }

        const diasDiferenca = Math.floor((new Date(saida) - new Date(entrada)) / (1000 * 60 * 60 * 24));
        if (diasDiferenca < 1) {
            return { sucesso: false, mensagem: "A estadia deve ter pelo menos 1 noite." };
        }

        return { sucesso: true };
    }

    function salvarBuscaRecente(dadosBusca) {
        try {
            let buscasRecentes = JSON.parse(localStorage.getItem("buscasRecentes")) || [];
            buscasRecentes.unshift(dadosBusca);
            buscasRecentes = buscasRecentes.slice(0, 5);
            localStorage.setItem("buscasRecentes", JSON.stringify(buscasRecentes));
        } catch (erro) {
            console.error("Erro ao salvar busca:", erro);
        }
    }

    function inicializarFiltros() {
        const botoesFiltro = document.querySelectorAll(".filtro-botao");

        if (botoesFiltro.length === 0) return;

        botoesFiltro[0]?.classList.add("ativo");

        botoesFiltro.forEach((botao, indice) => {
            botao.addEventListener("click", () => {
                botoesFiltro.forEach(btn => btn.classList.remove("ativo"));
                botao.classList.add("ativo");

                console.log(`📌 Filtro selecionado: ${botao.textContent.trim()}`);

                carregarConteudoFiltro(botao.textContent.trim(), indice);
            });
        });
    }

    function carregarConteudoFiltro(filtro, indice) {
        const conteudoExemplo = {
            "Visão Geral": "Mostrando visão geral do local...",
            "Informações e Preços": "Mostrando preços e informações...",
            "Comodidades": "Mostrando comodidades disponíveis...",
            "Informações Importantes e Pequenas": "Mostrando informações adicionais..."
        };

        console.log(conteudoExemplo[filtro] || "Conteúdo não definido");
    }

    function inicializarGaleria() {
        const imagens = document.querySelectorAll(".pontos-turisticos-img");

        if (imagens.length === 0) return;

        imagens.forEach((img, indice) => {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                abrirGaleriaFullscreen(imagens, indice);
            });

            img.addEventListener("mouseover", () => {
                img.style.transform = "scale(1.05)";
                img.style.opacity = "0.9";
                img.style.transition = "0.2s";
            });

            img.addEventListener("mouseout", () => {
                img.style.transform = "scale(1)";
                img.style.opacity = "1";
            });
        });
    }

    function abrirGaleriaFullscreen(imagens, indiceInicial) {
        let indiceAtual = indiceInicial;

        const overlay = document.createElement("div");
        overlay.className = "galeria-overlay";
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const container = document.createElement("div");
        container.style.cssText = `
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        `;

        const imgElemento = document.createElement("img");
        imgElemento.src = imagens[indiceAtual].src;
        imgElemento.style.cssText = `
            max-width: 90%;
            max-height: 85%;
            border-radius: 10px;
            object-fit: contain;
        `;

        const btnAnterior = criarBotaoNavegacao("❮", () => {
            indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
            imgElemento.src = imagens[indiceAtual].src;
            atualizarContador();
        });

        const btnProximo = criarBotaoNavegacao("❯", () => {
            indiceAtual = (indiceAtual + 1) % imagens.length;
            imgElemento.src = imagens[indiceAtual].src;
            atualizarContador();
        });

        const contador = document.createElement("div");
        contador.style.cssText = `
            position: absolute;
            bottom: 20px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            background: rgba(0, 0, 0, 0.6);
            padding: 10px 20px;
            border-radius: 20px;
        `;

        function atualizarContador() {
            contador.textContent = `${indiceAtual + 1} / ${imagens.length}`;
        }

        atualizarContador();

        const btnFechar = document.createElement("button");
        btnFechar.textContent = "✕";
        btnFechar.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 28px;
            cursor: pointer;
            z-index: 10001;
            transition: 0.2s;
        `;

        btnFechar.addEventListener("mouseover", () => {
            btnFechar.style.background = "rgba(255, 0, 0, 1)";
            btnFechar.style.transform = "scale(1.1)";
        });

        btnFechar.addEventListener("mouseout", () => {
            btnFechar.style.background = "rgba(255, 0, 0, 0.8)";
            btnFechar.style.transform = "scale(1)";
        });

        btnFechar.addEventListener("click", () => overlay.remove());

        container.appendChild(btnAnterior);
        container.appendChild(imgElemento);
        container.appendChild(btnProximo);
        container.appendChild(contador);
        container.appendChild(btnFechar);

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        const fecharComESC = (e) => {
            if (e.key === "Escape") {
                overlay.remove();
                document.removeEventListener("keydown", fecharComESC);
            }
        };
        document.addEventListener("keydown", fecharComESC);
    }

    function criarBotaoNavegacao(texto, callback) {
        const btn = document.createElement("button");
        btn.textContent = texto;
        btn.style.cssText = `
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.6);
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            font-size: 30px;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.2s;
            z-index: 10001;
        `;

        btn.addEventListener("mouseover", () => {
            btn.style.background = "rgba(0, 0, 0, 0.9)";
        });

        btn.addEventListener("mouseout", () => {
            btn.style.background = "rgba(0, 0, 0, 0.6)";
        });

        btn.addEventListener("click", callback);

        if (texto === "❮") btn.style.left = "20px";
        if (texto === "❯") btn.style.right = "20px";

        return btn;
    }

    function inicializarEfeitosCards() {
        const cards = document.querySelectorAll(".pontos-turisticos-card");

        cards.forEach(card => {
            card.style.transition = "all 0.3s ease";

            card.addEventListener("mouseover", () => {
                card.style.transform = "translateY(-8px)";
                card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
            });

            card.addEventListener("mouseout", () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "none";
            });
        });
    }

    function inicializarCompartilhamento() {
        const btnCompartilhar = document.querySelector(".btn-compartilhar");

        if (btnCompartilhar) {
            btnCompartilhar.addEventListener("click", () => {
                const titulo = document.querySelector(".pontos-turisticos-nome")?.textContent || "Confira este local!";
                const url = window.location.href;

                if (navigator.share) {
                    navigator.share({
                        title: titulo,
                        text: "Confira este incrível ponto turístico!",
                        url: url
                    }).catch(erro => console.error("Erro ao compartilhar:", erro));
                } else {
                    alert(`Compartilhe: ${url}`);
                }
            });
        }
    }

    function inicializarFavoritos() {
        const btnFavorito = document.querySelector(".btn-favoritar");

        if (btnFavorito) {
            const nomeLocal = document.querySelector(".pontos-turisticos-nome")?.textContent || "Local";
            const isFavorito = verificarFavorito(nomeLocal);

            atualizarBotaoFavorito(btnFavorito, isFavorito);

            btnFavorito.addEventListener("click", () => {
                const novoEstado = !verificarFavorito(nomeLocal);
                salvarFavorito(nomeLocal, novoEstado);
                atualizarBotaoFavorito(btnFavorito, novoEstado);
            });
        }
    }

    function verificarFavorito(nome) {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        return favoritos.includes(nome);
    }

    function salvarFavorito(nome, favoritar) {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        if (favoritar) {
            if (!favoritos.includes(nome)) {
                favoritos.push(nome);
            }
        } else {
            favoritos = favoritos.filter(f => f !== nome);
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    function atualizarBotaoFavorito(btn, isFavorito) {
        if (isFavorito) {
            btn.textContent = "❤️ Favorito";
            btn.style.color = "red";
        } else {
            btn.textContent = "🤍 Adicionar aos Favoritos";
            btn.style.color = "gray";
        }
    }

    function inicializarSistema() {
        inicializarBotaoVoltar();
        inicializarBuscaAvancada();
        inicializarFiltros();
        inicializarGaleria();
        inicializarEfeitosCards();
        inicializarCompartilhamento();
        inicializarFavoritos();
    }

    inicializarSistema();

});