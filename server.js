const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pontos-turisticos.html'));
});

app.get('/api/pontos-turisticos', (req, res) => {
    const pontos = [
        {
            id: 1,
            nome: "São João de Caruaru",
            avaliacao: 4.3,
            data: "Quarta Feira, 19 de março",
            hora: "10h da manhã",
            imagem: "imagens/pontos/sao_joao.jpg"
        },
        {
            id: 2,
            nome: "Serra dos Cavalos",
            avaliacao: 5.0,
            data: "Terça-Feira a Domingo",
            hora: "7h ás 16h",
            imagem: "imagens/pontos/serra.jpg"
        },
        {
            id: 3,
            nome: "Morro Bom Jesus",
            avaliacao: 4.8,
            data: "Terça-Feira a Domingo",
            hora: "8h ás 20h",
            imagem: "imagens/pontos/morro.jpg"
        },
        {
            id: 4,
            nome: "Alto do Moura",
            avaliacao: 4.3,
            data: "Todos os Dias",
            hora: "8h ás 18h",
            imagem: "imagens/pontos/alto.jpg"
        },
        {
            id: 5,
            nome: "Feira de Caruaru",
            avaliacao: 4.5,
            data: "Quinta-Feira Sextas-Férias",
            hora: "12h ás 22h",
            imagem: "imagens/pontos/feira.jpg"
        }
    ];
    res.json(pontos);
});

app.get('/api/restaurantes', (req, res) => {
    const restaurantes = [
        {
            id: 1,
            nome: "Tio Armenio",
            avaliacao: 4.5,
            preco: "70 - 100",
            beneficios: ["Serviço de mesa", "Lugares para sentar"],
            imagem: "imagens/restaurantes/tio_armenio.jpg"
        },
        {
            id: 2,
            nome: "Bentu's Restaurante",
            avaliacao: 4.8,
            preco: "40 - 60",
            beneficios: ["Serviço de mesa", "Ótimos coquetéis"],
            imagem: "imagens/restaurantes/bentus.jpg"
        },
        {
            id: 3,
            nome: "Diamante da Serra",
            avaliacao: 4.7,
            preco: "60 - 80",
            beneficios: ["Música ao vivo", "Mesas externas"],
            imagem: "imagens/restaurantes/diamante.jpg"
        },
        {
            id: 4,
            nome: "Restaurante Da Mae Beata",
            avaliacao: 4.6,
            preco: "20 - 40",
            beneficios: ["Entrada de cães", "Bom para assistir esportes"],
            imagem: "imagens/restaurantes/mae_beata.jpg"
        },
        {
            id: 5,
            nome: "Ferreiro Rooftop",
            avaliacao: 4.1,
            preco: "80 - 120",
            beneficios: ["Serviço de mesa", "Lugares para sentar"],
            imagem: "imagens/restaurantes/ferreiro.jpg"
        }
    ];
    res.json(restaurantes);
});

app.get('/api/hoteis', (req, res) => {
    const hoteis = [
        {
            id: 1,
            nome: "Hotel Premium Caruaru",
            avaliacao: 4.7,
            preco: "150 - 200",
            beneficios: ["WiFi Grátis", "Café da Manhã Incluído"],
            imagem: "imagens/hoteis/premium.jpg"
        },
        {
            id: 2,
            nome: "Pousada Aconchego",
            avaliacao: 4.5,
            preco: "80 - 120",
            beneficios: ["Piscina", "Estacionamento"],
            imagem: "imagens/hoteis/aconchego.jpg"
        }
    ];
    res.json(hoteis);
});

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});