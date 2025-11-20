document.addEventListener('DOMContentLoaded', () => {
    
    const botaoVoltar = document.querySelector('.seta_voltar');
    const campoBusca = document.getElementById('busca-nome'); 
    const botaoFiltrar = document.getElementById('aplicar-filtro');
    const botaoLimpar = document.getElementById('limpar-filtro');
    const inputAvaliacao = document.getElementById('avaliacao-minima');
    const selectOrdenacao = document.getElementById('ordenar-por');
    const botaoOrdenar = document.getElementById('aplicar-ordenacao');

    const containerHoteis = document.querySelector('.cards-hoteis');

    botaoVoltar.addEventListener('click', () => {
        window.history.back();
    });
    function aplicarFiltro(minimo) {
        const termoBusca = campoBusca.value.toLowerCase();
        
        document.querySelectorAll('.card-hotel').forEach(card => {

            const textoAvaliacao = card.querySelector('.avaliaçao').textContent;
            const match = textoAvaliacao.match(/(\d+\.\d+)/);
            const avaliacaoHotel = match ? parseFloat(match[0]) : 0;
            
            const nomeHotel = card.querySelector('h3').textContent.toLowerCase();
            const nomeBate = nomeHotel.includes(termoBusca);

            if (avaliacaoHotel >= minimo && nomeBate) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none';
            }
        });
    }

    function ordenarHoteis(tipo) {
        let hoteisArray = Array.from(document.querySelectorAll('.card-hotel'));

        hoteisArray.sort((a, b) => {
            if (tipo === 'preco-asc') {
             
                const valorA = parseInt(a.querySelector('.preço strong').textContent);
                const valorB = parseInt(b.querySelector('.preço strong').textContent);
                return valorA - valorB; 
            } else if (tipo === 'avaliacao-desc') {
              
                const valorA = parseFloat(a.querySelector('.avaliaçao').textContent.match(/(\d+\.\d+)/)[0]);
                const valorB = parseFloat(b.querySelector('.avaliaçao').textContent.match(/(\d+\.\d+)/)[0]);
                return valorB - valorA; 
            }
            return 0;
        });

       
        hoteisArray.forEach(card => {
            containerHoteis.appendChild(card);
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
            ordenarHoteis(tipoOrdenacao);
        }
    });

  
    botaoLimpar.addEventListener('click', () => {
        campoBusca.value = ""; 
        inputAvaliacao.value = "4.5"; 
        selectOrdenacao.value = "default";
        
        aplicarFiltro(0); 
    });
    
    aplicarFiltro(parseFloat(inputAvaliacao.value));
});