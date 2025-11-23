document.addEventListener("DOMContentLoaded", () => {

    function inicializarBotaoVoltar() {
        const btnVoltar = document.querySelector(".seta_voltar");
        if (btnVoltar) {
            btnVoltar.addEventListener("click", () => {
                history.back();
            });
        }
    }

    function inicializarCards() {
        const cards = document.querySelectorAll(".card-restaurante");

        cards.forEach(card => {
            card.style.transition = "all 0.3s ease";
            card.style.cursor = "pointer";

            const btnOferta = card.querySelector(".botao_oferta");
            const titulo = card.querySelector("h3").textContent;

            card.addEventListener("mouseover", () => {
                card.style.transform = "translateY(-12px)";
                card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)";
            });

            card.addEventListener("mouseout", () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "none";
            });

            btnOferta.addEventListener("click", (e) => {
                e.stopPropagation();
                abrirDetalhesRestaurante(titulo);
            });

            card.addEventListener("click", () => {
                abrirDetalhesRestaurante(titulo);
            });
        });
    }

    function abrirDetalhesRestaurante(nomeRestaurante) {
        const mapa = {
            "Tio Armenio": "tio armerio",
            "Bentu's Restaurante": "bentu's",
            "Diamante da serra": "diamante da serra",
            "Restaurante Da Mae Beata": "restaurante mae beata",
            "Ferreiro Rooftop": "ferreiro rooftop"
        };

        const pagina = mapa[nomeRestaurante];
        if (pagina) {
            window.location.href = `${pagina}.index.html`;
        } else {
            alert(`Detalhes de ${nomeRestaurante} em breve!`);
        }
    }

    function inicializarAvaliacao() {
        const avaliacoes = document.querySelectorAll(".avaliaçao");

        avaliacoes.forEach(avaliacao => {
            const texto = avaliacao.textContent;
            const estrelas = parseFloat(texto.match(/\d+\.\d+/)[0]);

            if (estrelas >= 4.7) {
                avaliacao.style.color = "#FFD700";
            } else if (estrelas >= 4.5) {
                avaliacao.style.color = "#FFA500";
            } else if (estrelas >= 4.0) {
                avaliacao.style.color = "#FF8C00";
            } else {
                avaliacao.style.color = "#FF6B6B";
            }

            avaliacao.style.fontWeight = "bold";
        });
    }

    function inicializarFiltroPreco() {
        const container = document.querySelector(".cards-restaurantes");
        const controle = document.createElement("div");
        controle.className = "filtro-preco";
        controle.style.cssText = `
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
            justify-content: center;
        `;

        const opcoes = [
            { label: "Todos", min: 0, max: 999 },
            { label: "R$ 20-40", min: 20, max: 40 },
            { label: "R$ 40-60", min: 40, max: 60 },
            { label: "R$ 60-100", min: 60, max: 100 },
            { label: "R$ 100+", min: 100, max: 999 }
        ];

        opcoes.forEach((opcao, indice) => {
            const btn = document.createElement("button");
            btn.textContent = opcao.label;
            btn.style.cssText = `
                padding: 8px 16px;
                border: 2px solid #ddd;
                background: white;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 500;
            `;

            if (indice === 0) {
                btn.classList.add("ativo");
                btn.style.background = "#FF6B35";
                btn.style.color = "white";
                btn.style.borderColor = "#FF6B35";
            }

            btn.addEventListener("click", () => {
                document.querySelectorAll(".filtro-preco button").forEach(b => {
                    b.style.background = "white";
                    b.style.color = "#333";
                    b.style.borderColor = "#ddd";
                    b.classList.remove("ativo");
                });

                btn.classList.add("ativo");
                btn.style.background = "#FF6B35";
                btn.style.color = "white";
                btn.style.borderColor = "#FF6B35";

                filtrarPorPreco(opcao.min, opcao.max);
            });

            controle.appendChild(btn);
        });

        container.parentElement.insertBefore(controle, container);
    }

    function filtrarPorPreco(min, max) {
        const cards = document.querySelectorAll(".card-restaurante");

        cards.forEach(card => {
            const precoTexto = card.querySelector(".preço").textContent;
            const valores = precoTexto.match(/\d+/g);
            const precoMin = parseInt(valores[0]);
            const precoMax = parseInt(valores[1]);

            if ((precoMin >= min && precoMin <= max) || (precoMax >= min && precoMax <= max)) {
                card.style.display = "block";
                card.style.animation = "fadeIn 0.3s";
            } else {
                card.style.display = "none";
            }
        });
    }

    function inicializarBuscaPorNome() {
        const header = document.querySelector("header");
        const barraAbusca = document.createElement("input");
        barraAbusca.type = "text";
        barraAbusca.placeholder = "Buscar restaurante...";
        barraAbusca.style.cssText = `
            width: 90%;
            max-width: 400px;
            padding: 10px 15px;
            margin: 15px auto;
            display: block;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 16px;
            transition: 0.3s;
        `;

        barraAbusca.addEventListener("focus", () => {
            barraAbusca.style.borderColor = "#FF6B35";
            barraAbusca.style.boxShadow = "0 0 10px rgba(255, 107, 53, 0.2)";
        });

        barraAbusca.addEventListener("blur", () => {
            barraAbusca.style.borderColor = "#ddd";
            barraAbusca.style.boxShadow = "none";
        });

        barraAbusca.addEventListener("input", (e) => {
            const termo = e.target.value.toLowerCase();
            const cards = document.querySelectorAll(".card-restaurante");

            cards.forEach(card => {
                const titulo = card.querySelector("h3").textContent.toLowerCase();
                if (titulo.includes(termo) || termo === "") {
                    card.style.display = "block";
                    card.style.animation = "fadeIn 0.3s";
                } else {
                    card.style.display = "none";
                }
            });
        });

        header.appendChild(barraAbusca);
    }

    function inicializarOrdenacao() {
        const container = document.querySelector(".cards-restaurantes");
        const controleOrdenacao = document.createElement("div");
        controleOrdenacao.className = "ordenacao";
        controleOrdenacao.style.cssText = `
            display: flex;
            gap: 10px;
            margin: 20px 0;
            justify-content: center;
            flex-wrap: wrap;
        `;

        const opcoes = [
            { label: "Melhor Avaliado", tipo: "avaliacao" },
            { label: "Menor Preço", tipo: "preco-asc" },
            { label: "Maior Preço", tipo: "preco-desc" }
        ];

        opcoes.forEach(opcao => {
            const btn = document.createElement("button");
            btn.textContent = opcao.label;
            btn.style.cssText = `
                padding: 8px 16px;
                border: 2px solid #ddd;
                background: white;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 500;
            `;

            btn.addEventListener("click", () => {
                ordenarCards(opcao.tipo);
                document.querySelectorAll(".ordenacao button").forEach(b => {
                    b.style.background = "white";
                    b.style.borderColor = "#ddd";
                });
                btn.style.background = "#FF6B35";
                btn.style.color = "white";
                btn.style.borderColor = "#FF6B35";
            });

            controleOrdenacao.appendChild(btn);
        });

        container.parentElement.insertBefore(controleOrdenacao, container);
    }

    function ordenarCards(tipo) {
        const container = document.querySelector(".cards-restaurantes");
        const cards = Array.from(container.querySelectorAll(".card-restaurante"));

        if (tipo === "avaliacao") {
            cards.sort((a, b) => {
                const avalA = parseFloat(a.querySelector(".avaliaçao").textContent.match(/\d+\.\d+/)[0]);
                const avalB = parseFloat(b.querySelector(".avaliaçao").textContent.match(/\d+\.\d+/)[0]);
                return avalB - avalA;
            });
        } else if (tipo === "preco-asc") {
            cards.sort((a, b) => {
                const precoA = parseInt(a.querySelector(".preço").textContent.match(/\d+/)[0]);
                const precoB = parseInt(b.querySelector(".preço").textContent.match(/\d+/)[0]);
                return precoA - precoB;
            });
        } else if (tipo === "preco-desc") {
            cards.sort((a, b) => {
                const precoA = parseInt(a.querySelector(".preço").textContent.match(/\d+/)[0]);
                const precoB = parseInt(b.querySelector(".preço").textContent.match(/\d+/)[0]);
                return precoB - precoA;
            });
        }

        cards.forEach(card => {
            container.appendChild(card);
            card.style.animation = "slideIn 0.3s";
        });
    }

    function inicializarFavoritos() {
        const cards = document.querySelectorAll(".card-restaurante");

        cards.forEach(card => {
            const titulo = card.querySelector("h3").textContent;
            const btnFav = document.createElement("button");
            btnFav.className = "btn-favoritar";
            btnFav.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.2s;
                z-index: 10;
            `;

            const isFavorito = verificarFavorito(titulo);
            btnFav.textContent = isFavorito ? "❤️" : "🤍";

            btnFav.addEventListener("mouseover", () => {
                btnFav.style.transform = "scale(1.2)";
                btnFav.style.background = "rgba(255, 107, 53, 0.9)";
            });

            btnFav.addEventListener("mouseout", () => {
                btnFav.style.transform = "scale(1)";
                btnFav.style.background = "rgba(255, 255, 255, 0.9)";
            });

            btnFav.addEventListener("click", (e) => {
                e.stopPropagation();
                const novoEstado = !verificarFavorito(titulo);
                salvarFavorito(titulo, novoEstado);
                btnFav.textContent = novoEstado ? "❤️" : "🤍";
            });

            card.style.position = "relative";
            card.appendChild(btnFav);
        });
    }

    function verificarFavorito(nome) {
        const favoritos = JSON.parse(localStorage.getItem("favoritosRestaurantes")) || [];
        return favoritos.includes(nome);
    }

    function salvarFavorito(nome, favoritar) {
        let favoritos = JSON.parse(localStorage.getItem("favoritosRestaurantes")) || [];

        if (favoritar) {
            if (!favoritos.includes(nome)) {
                favoritos.push(nome);
            }
        } else {
            favoritos = favoritos.filter(f => f !== nome);
        }

        localStorage.setItem("favoritosRestaurantes", JSON.stringify(favoritos));
    }

    function inicializarCompartilhamento() {
        const cards = document.querySelectorAll(".card-restaurante");

        cards.forEach(card => {
            const btnCompartilhar = document.createElement("button");
            btnCompartilhar.textContent = "📤";
            btnCompartilhar.className = "btn-compartilhar";
            btnCompartilhar.style.cssText = `
                position: absolute;
                top: 10px;
                left: 10px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.2s;
                z-index: 10;
            `;

            const titulo = card.querySelector("h3").textContent;

            btnCompartilhar.addEventListener("mouseover", () => {
                btnCompartilhar.style.transform = "scale(1.2)";
                btnCompartilhar.style.background = "rgba(255, 107, 53, 0.9)";
            });

            btnCompartilhar.addEventListener("mouseout", () => {
                btnCompartilhar.style.transform = "scale(1)";
                btnCompartilhar.style.background = "rgba(255, 255, 255, 0.9)";
            });

            btnCompartilhar.addEventListener("click", (e) => {
                e.stopPropagation();
                if (navigator.share) {
                    navigator.share({
                        title: titulo,
                        text: `Confira este incrível restaurante: ${titulo}`,
                        url: window.location.href
                    }).catch(erro => console.error("Erro:", erro));
                } else {
                    alert(`Compartilhe: ${titulo}\n${window.location.href}`);
                }
            });

            card.style.position = "relative";
            card.appendChild(btnCompartilhar);
        });
    }

    function adicionarAnimacoes() {
        const style = document.createElement("style");
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    function inicializarSistema() {
        adicionarAnimacoes();
        inicializarBotaoVoltar();
        inicializarCards();
        inicializarAvaliacao();
        inicializarFiltroPreco();
        inicializarBuscaPorNome();
        inicializarOrdenacao();
        inicializarFavoritos();
        inicializarCompartilhamento();
    }

    inicializarSistema();

});