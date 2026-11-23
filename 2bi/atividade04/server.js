const express = require("express");
const produtosRoutes = require("./routes/produtosRoutes");

const app = express();
app.use(express.json());

app.use("/api/produtos", produtosRoutes);

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
