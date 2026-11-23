// Camada de dados: armazenamento em memória dos produtos.
const produtos = [];
let proximoId = 1;

function gerarId() {
    return proximoId++;
}

module.exports = { produtos, gerarId };
