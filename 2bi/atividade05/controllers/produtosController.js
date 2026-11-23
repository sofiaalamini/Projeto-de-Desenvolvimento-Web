const service = require("../services/produtosService");

// Executa a ação e converte erros de negócio em respostas HTTP.
function tratar(acao) {
    return (req, res) => {
        try {
            return acao(req, res);
        } catch (erro) {
            if (erro instanceof service.ErroNegocio) {
                return res.status(erro.status).json({ erro: erro.message });
            }
            console.error(erro);
            return res.status(500).json({ erro: "Erro interno." });
        }
    };
}

module.exports = {
    listar: tratar((req, res) => res.status(200).json(service.listar())),
    buscarPorId: tratar((req, res) => res.status(200).json(service.buscarPorId(req.params.id))),
    criar: tratar((req, res) => res.status(201).json(service.criar(req.body))),
    atualizar: tratar((req, res) => res.status(200).json(service.atualizar(req.params.id, req.body))),
    remover: tratar((req, res) => {
        service.remover(req.params.id);
        return res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    })
};
