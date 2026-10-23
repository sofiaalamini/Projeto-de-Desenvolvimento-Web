const assert = require("node:assert/strict");
const app = require("./server");

const servidor = app.listen(0, async () => {
    const base = `http://localhost:${servidor.address().port}/api/produtos`;
    async function requisitar(caminho = "", metodo = "GET", dados) {
        const resposta = await fetch(base + caminho, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: dados === undefined ? undefined : JSON.stringify(dados)
        });
        return [resposta.status, await resposta.json()];
    }

    try {
        assert.deepEqual(await requisitar(), [200, []]);
        const [criado, produto] = await requisitar("", "POST", { nome: "Caderno", preco: 12.5 });
        assert.equal(criado, 201);
        assert.deepEqual(produto, { id: 1, nome: "Caderno", preco: 12.5 });
        assert.deepEqual(await requisitar("/1"), [200, produto]);
        assert.equal((await requisitar("/999"))[0], 404);
        assert.deepEqual(await requisitar("/1", "PUT", { nome: "Caneta", preco: 3 }),
            [200, { id: 1, nome: "Caneta", preco: 3 }]);
        assert.equal((await requisitar("/1", "PUT", { nome: "", preco: -1 }))[0], 400);
        assert.equal((await requisitar("/999", "PUT", { nome: "X", preco: 1 }))[0], 404);
        assert.equal((await requisitar("/999", "DELETE"))[0], 404);
        assert.equal((await requisitar("/1", "DELETE"))[0], 200);
        assert.deepEqual(await requisitar(), [200, []]);
        console.log("Todos os testes das rotas passaram.");
    } catch (erro) {
        console.error(erro);
        process.exitCode = 1;
    } finally {
        servidor.close();
    }
});
