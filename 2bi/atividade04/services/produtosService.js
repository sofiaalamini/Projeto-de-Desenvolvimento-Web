const data = require("../data/produtos");

function dadosValidos({ nome, preco } = {}) {
    return typeof nome === "string" && nome.trim().length > 0 &&
        typeof preco === "number" && Number.isFinite(preco) && preco >= 0;
}

function listar() {
    return data.produtos;
}

function buscarPorId(id) {
    return data.produtos.find((p) => p.id === Number(id)) || null;
}

function criar(dados) {
    if (!dadosValidos(dados)) return { erro: "dados_invalidos" };
    const produto = { id: data.gerarId(), nome: dados.nome.trim(), preco: dados.preco };
    data.produtos.push(produto);
    return { produto };
}

function atualizar(id, dados) {
    const produto = buscarPorId(id);
    if (!produto) return { erro: "nao_encontrado" };
    if (!dadosValidos(dados)) return { erro: "dados_invalidos" };
    produto.nome = dados.nome.trim();
    produto.preco = dados.preco;
    return { produto };
}

function remover(id) {
    const indice = data.produtos.findIndex((p) => p.id === Number(id));
    if (indice === -1) return false;
    data.produtos.splice(indice, 1);
    return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
