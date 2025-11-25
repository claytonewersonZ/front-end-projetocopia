document.addEventListener("DOMContentLoaded", () => {
    inicializarFiltros();
    inicializarBusca();
    inicializarCards();
    inicializarScrollSuave();
    mostrarTotalOfertas();
    carregarSugestoesPesquisa();
});


function inicializarFiltros() {
    const botoes = document.querySelectorAll(".botao-filtro");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            removerAtivo();
            botao.classList.add("ativo");

            const filtro = extrairCategoria(botao);
            filtrarPorCategoria(filtro);
        });
    });
}

function removerAtivo() {
    document.querySelectorAll(".botao-filtro").forEach(btn => btn.classList.remove("ativo"));
}

function extrairCategoria(botao) {
    return botao.textContent.trim().toLowerCase();
}

function filtrarPorCategoria(categoria) {
    const cards = document.querySelectorAll(".card");
    let encontrou = false;

    cards.forEach(card => {
        const nome = card.querySelector("h3").textContent.toLowerCase();

        if (nome.includes(categoria)) {
            card.style.display = "block";
            animarCard(card);
            encontrou = true;
        } else {
            card.style.display = "none";
        }
    });

    mostrarMensagemNenhumResultado(encontrou);
}


function inicializarBusca() {
    const barra = document.querySelector(".barra-busca input[type='text']");
    const botao = document.querySelector(".buscar");

    barra.addEventListener("keyup", () => {
        buscarDestino(barra.value);
        salvarHistoricoPesquisa(barra.value);
    });

    botao.addEventListener("click", () => {
        buscarDestino(barra.value);
        salvarHistoricoPesquisa(barra.value);
    });
}

function buscarDestino(termo) {
    termo = termo.toLowerCase();
    const cards = document.querySelectorAll(".card");
    let encontrou = false;

    cards.forEach(card => {
        const cidade = card.querySelector("p").textContent.toLowerCase();
        const nome = card.querySelector("h3").textContent.toLowerCase();

        if (cidade.includes(termo) || nome.includes(termo)) {
            card.style.display = "block";
            animarCard(card);
            encontrou = true;
        } else {
            card.style.display = "none";
        }
    });

    mostrarMensagemNenhumResultado(encontrou);
}


function carregarSugestoesPesquisa() {
    const input = document.querySelector(".barra-busca input[type='text']");
    const container = document.createElement("div");
    container.className = "sugestoes";
    input.parentElement.appendChild(container);

    const cards = document.querySelectorAll(".card");
    const nomes = [...cards].map(c => c.querySelector("h3").textContent);

    input.addEventListener("input", () => {
        container.innerHTML = "";
        const filtro = input.value.toLowerCase();

        if (!filtro) return;

        const sugestões = nomes.filter(n => n.toLowerCase().includes(filtro));

        sugestões.forEach(s => {
            const item = document.createElement("div");
            item.className = "sugestao-item";
            item.textContent = s;
            item.addEventListener("click", () => {
                input.value = s;
                buscarDestino(s);
                container.innerHTML = "";
            });
            container.appendChild(item);
        });
    });
}



function salvarHistoricoPesquisa(valor) {
    if (!valor.trim()) return;

    let historico = JSON.parse(localStorage.getItem("pesquisas")) || [];

    if (!historico.includes(valor)) {
        historico.push(valor);
        localStorage.setItem("pesquisas", JSON.stringify(historico));
    }
}


function inicializarCards() {
    const botoes = document.querySelectorAll(".botao");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const nome = botao.parentElement.querySelector("h3").textContent;
            abrirDetalhes(nome);
        });
    });
}

function abrirDetalhes(nome) {
    console.log("Abrindo:", nome);
    // window.location.href = `detalhes.html?item=${encodeURIComponent(nome)}`;
}


function animarCard(card) {
    card.style.opacity = 0;
    setTimeout(() => {
        card.style.transition = "0.3s";
        card.style.opacity = 1;
    }, 50);
}

function mostrarMensagemNenhumResultado(encontrou) {
    let msg = document.querySelector(".nenhum-resultado");

    if (!msg) {
        msg = document.createElement("h3");
        msg.className = "nenhum-resultado";
        msg.style.textAlign = "center";
        msg.style.marginTop = "20px";
        document.body.appendChild(msg);
    }

    msg.textContent = encontrou ? "" : "Nenhum resultado encontrado.";
}


function inicializarScrollSuave() {
    document.querySelectorAll("nav button").forEach(btn => {
        btn.addEventListener("click", () => {
            window.scrollTo({
                top: 400,
                behavior: "smooth"
            });
        });
    });
}


function mostrarTotalOfertas() {
    const total = document.querySelectorAll(".card").length;

    const titulo = document.querySelector(".titulo");
    if (titulo) {
        const info = document.createElement("span");
        info.style.fontSize = "14px";
        info.style.marginLeft = "10px";
        info.style.color = "#666";
        info.textContent = `(${total} opções disponíveis)`;
        titulo.appendChild(info);
    }
}
