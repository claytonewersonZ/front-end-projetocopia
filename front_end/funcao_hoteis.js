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



/css/

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Estilo para a barra de cabeçalho */
.titulo {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.seta_voltar {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-right: 15px;
}
.titulo_central {
    display: flex;
    align-items: center;
    font-size: 1.2em;
}
.icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    filter: invert(100%); /* Para ícones pretos em fundo azul */
}

/* Estilos para os Controles */
.controles-filtro {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.controles-filtro input, 
.controles-filtro select, 
.controles-filtro button {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.controles-filtro button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
}
.controles-filtro button:hover {
    background-color: #0056b3;
}

/* Estilos para o Container de Hotéis */
.cards-hoteis {
    display: flex; 
    flex-wrap: wrap;
    gap: 25px; 
    padding: 20px;
    justify-content: flex-start;
}

/* Estilos para Cada Cartão de Hotel */
.card-hotel {
    width: 300px; 
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex; 
    flex-direction: column;
    /* Adiciona transição para suavizar o desaparecimento/aparecimento */
    transition: all 0.3s ease-in-out; 
}
.hotel-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
}
.preço strong {
    font-size: 1.5em;
    color: #28a745;
}
.botao_oferta {
    margin-top: auto; 
    padding: 10px;
    background-color: #ffc107;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}