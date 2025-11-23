// Seletores
const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
const botaoBusca = document.querySelector("#botao-busca");

let dados = [];

// Carregar JSON
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (erro) {
        cardContainer.innerHTML = "<p>Erro ao carregar dados.</p>";
        console.error("Erro:", erro);
    }
}

// Renderização dos cards
function renderizarCards(lista) {
    cardContainer.innerHTML = "";

    if (lista.length === 0) {
        cardContainer.innerHTML = `<p style="padding:20px;color:#4F6F52">Nenhum resultado encontrado.</p>`;
        return;
    }

    lista.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${item.nome}</h2>
            <p><strong>Ano de classificação moderna:</strong> ${item.ano}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `;

        cardContainer.appendChild(card);
    });
}

// Função de busca
function executarBusca() {
    const termo = campoBusca.value.toLowerCase().trim();

    const filtrados = dados.filter(item =>
        item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo)
    );

    renderizarCards(filtrados);
}

// Eventos
botaoBusca.addEventListener("click", executarBusca);

campoBusca.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        executarBusca();
    }
});

// Iniciar ao abrir
carregarDados();
