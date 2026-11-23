const repository = require("../repositories/produtosRepository");

class ErroNegocio extends Error {
    constructor(mensagem, status) {
        super(mensagem);
        this.status = status;
    }
}

// Regras de negócio: valem para cadastro e atualização.
function validar({ nome, preco } = {}) {
    if (typeof nome !== "string" || nome.trim().length === 0) {
        throw new ErroNegocio("O nome do produto não pode ser vazio.", 400);
    }
    if (typeof preco !== "number" || !Number.isFinite(preco)) {
        throw new ErroNegocio("O preço deve ser um valor numérico válido.", 400);
    }
    if (preco < 0) {
        throw new ErroNegocio("O preço não pode ser negativo.", 400);
    }
    return { nome: nome.trim(), preco };
}

function idValido(id) {
    const n = Number(id);
    return Number.isInteger(n) ? n : -1;
}

function listar() {
    return repository.listar();
}

function buscarPorId(id) {
    const produto = repository.buscarPorId(idValido(id));
    if (!produto) throw new ErroNegocio("Produto não encontrado.", 404);
    return produto;
}

function criar(dados) {
    return repository.criar(validar(dados));
}

function atualizar(id, dados) {
    buscarPorId(id);
    return repository.atualizar(idValido(id), validar(dados));
}

function remover(id) {
    buscarPorId(id);
    repository.remover(idValido(id));
}

module.exports = { ErroNegocio, listar, buscarPorId, criar, atualizar, remover };
