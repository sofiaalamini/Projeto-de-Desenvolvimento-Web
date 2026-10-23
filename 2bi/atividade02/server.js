const express = require("express");

const app = express();
app.use(express.json());

const produtos = [];
let proximoId = 1;

function buscarProduto(id) {
    return produtos.find((produto) => produto.id === Number(id));
}

function dadosValidos({ nome, preco }) {
    return typeof nome === "string" && nome.trim().length > 0 &&
        typeof preco === "number" && Number.isFinite(preco) && preco >= 0;
}

app.post("/api/produtos", (req, res) => {
    if (!dadosValidos(req.body || {})) {
        return res.status(400).json({ erro: "Informe nome e preço válidos." });
    }

    const produto = {
        id: proximoId++,
        nome: req.body.nome.trim(),
        preco: req.body.preco
    };
    produtos.push(produto);
    return res.status(201).json(produto);
});

app.get("/api/produtos", (req, res) => {
    return res.status(200).json(produtos);
});

app.get("/api/produtos/:id", (req, res) => {
    const produto = buscarProduto(req.params.id);
    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }
    return res.status(200).json(produto);
});

app.put("/api/produtos/:id", (req, res) => {
    const produto = buscarProduto(req.params.id);
    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }
    if (!dadosValidos(req.body || {})) {
        return res.status(400).json({ erro: "Informe nome e preço válidos." });
    }

    produto.nome = req.body.nome.trim();
    produto.preco = req.body.preco;
    return res.status(200).json(produto);
});

app.delete("/api/produtos/:id", (req, res) => {
    const indice = produtos.findIndex((produto) => produto.id === Number(req.params.id));
    if (indice === -1) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    produtos.splice(indice, 1);
    return res.status(200).json({ mensagem: "Produto excluído com sucesso." });
});

// JSON malformado não deve resultar em uma página de erro HTML.
app.use((erro, req, res, next) => {
    if (erro instanceof SyntaxError && erro.status === 400 && "body" in erro) {
        return res.status(400).json({ erro: "JSON inválido." });
    }
    return next(erro);
});

if (require.main === module) {
    const porta = process.env.PORT || 3000;
    app.listen(porta, () => console.log(`Servidor em http://localhost:${porta}`));
}

module.exports = app;
