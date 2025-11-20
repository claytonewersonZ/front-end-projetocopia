document.addEventListener('DOMContentLoaded', () => {
    const botaoVoltar = document.querySelector('.seta_voltar');
    const campoBusca = document.getElementById('busca-nome'); 
    const botaoFiltrar = document.getElementById('aplicar-filtro');
    const botaoLimpar = document.getElementById('limpar-filtro');
    const inputAvaliacao = document.getElementById('avaliacao-minima');
    const selectOrdenacao = document.getElementById('ordenar-por');
    const botaoOrdenar = document.getElementById('aplicar-ordenacao');
    const containerPontos = document.querySelector('.cards-pontos-turisticos');

    botaoVoltar.addEventListener('click', () => {
        window.history.back();
    });

    function aplicarFiltro(minimo) {
        const termoBusca = campoBusca.value.toLowerCase();
        
        document.querySelectorAll('.card-pontos-turistico').forEach(card => {
            const textoAvaliacao = card.querySelector('.avaliaçao').textContent;
            const match = textoAvaliacao.match(/(\d+\.\d+)/); 
            const avaliacaoPonto = match ? parseFloat(match[0]) : 0;
            const nomePonto = card.querySelector('h3').textContent.toLowerCase();
            const nomeBate = nomePonto.includes(termoBusca);

            card.style.display = (avaliacaoPonto >= minimo && nomeBate) ? 'flex' : 'none';
        });
    }

    function ordenarPontos(tipo) {
        let pontosArray = Array.from(document.querySelectorAll('.card-pontos-turistico'));

        pontosArray.sort((a, b) => {
            if (tipo === 'avaliacao-desc') {
                const valorA = parseFloat(a.querySelector('.avaliaçao').textContent.match(/(\d+\.\d+)/)[0]);
                const valorB = parseFloat(b.querySelector('.avaliaçao').textContent.match(/(\d+\.\d+)/)[0]);
                return valorB - valorA;
            }
            return 0;
        });

        pontosArray.forEach(card => {
            containerPontos.appendChild(card);
        });
    }

    campoBusca.addEventListener('keyup', () => {
        aplicarFiltro(parseFloat(inputAvaliacao.value));
    });

    botaoFiltrar.addEventListener('click', () => {
        const avaliacaoMinima = parseFloat(inputAvaliacao.value);
        if (!isNaN(avaliacaoMinima)) {
            aplicarFiltro(avaliacaoMinima);
        }
    });

    botaoOrdenar.addEventListener('click', () => {
        const tipoOrdenacao = selectOrdenacao.value;
        if (tipoOrdenacao !== 'default') {
            ordenarPontos(tipoOrdenacao);
        }
    });

    botaoLimpar.addEventListener('click', () => {
        campoBusca.value = "";
        inputAvaliacao.value = "4.0";
        selectOrdenacao.value = "default";
        aplicarFiltro(0);
    });

    aplicarFiltro(parseFloat(inputAvaliacao.value));
});