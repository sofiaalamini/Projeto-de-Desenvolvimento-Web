const service = require("../services/produtosService");

const NAO_ENCONTRADO = { erro: "Produto não encontrado." };
const INVALIDO = { erro: "Informe nome e preço válidos." };

function listar(req, res) {
    return res.status(200).json(service.listar());
}

function buscarPorId(req, res) {
    const produto = service.buscarPorId(req.params.id);
    if (!produto) return res.status(404).json(NAO_ENCONTRADO);
    return res.status(200).json(produto);
}

function criar(req, res) {
    const r = service.criar(req.body || {});
    if (r.erro) return res.status(400).json(INVALIDO);
    return res.status(201).json(r.produto);
}

function atualizar(req, res) {
    const r = service.atualizar(req.params.id, req.body || {});
    if (r.erro === "nao_encontrado") return res.status(404).json(NAO_ENCONTRADO);
    if (r.erro) return res.status(400).json(INVALIDO);
    return res.status(200).json(r.produto);
}

function remover(req, res) {
    if (!service.remover(req.params.id)) return res.status(404).json(NAO_ENCONTRADO);
    return res.status(200).json({ mensagem: "Produto excluído com sucesso." });
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
