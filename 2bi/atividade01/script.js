const botao = document.querySelector("#carregar");
const mensagem = document.querySelector("#mensagem");
const grade = document.querySelector("#produtos");
const formatoPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" });

function criarCard(produto) {
    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("img");
    imagem.src = produto.thumbnail;
    imagem.alt = produto.title;
    imagem.loading = "lazy";

    const conteudo = document.createElement("div");
    conteudo.className = "card-conteudo";

    const categoria = document.createElement("p");
    categoria.className = "categoria";
    categoria.textContent = produto.category;

    const nome = document.createElement("h2");
    nome.textContent = produto.title;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = formatoPreco.format(produto.price);

    conteudo.append(categoria, nome, preco);
    card.append(imagem, conteudo);
    return card;
}

async function carregarProdutos() {
    botao.disabled = true;
    grade.replaceChildren();
    mensagem.classList.remove("erro");
    mensagem.textContent = "Carregando produtos...";

    try {
        const response = await fetch("https://dummyjson.com/products?limit=12");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const dados = await response.json();
        if (!Array.isArray(dados.products)) {
            throw new Error("Resposta inválida da API");
        }

        grade.replaceChildren(...dados.products.map(criarCard));
        mensagem.textContent = dados.products.length ? "" : "Nenhum produto encontrado.";
    } catch (erro) {
        console.error("Falha ao carregar produtos:", erro);
        mensagem.classList.add("erro");
        mensagem.textContent = "Não foi possível carregar os produtos. Tente novamente.";
    } finally {
        botao.disabled = false;
    }
}

botao.addEventListener("click", carregarProdutos);
