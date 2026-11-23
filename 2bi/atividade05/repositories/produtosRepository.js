const db = require("../database/connection");

function listar() {
    return db.prepare("SELECT id, nome, preco FROM products ORDER BY id").all();
}

function buscarPorId(id) {
    return db.prepare("SELECT id, nome, preco FROM products WHERE id = ?").get(id) || null;
}

function criar({ nome, preco }) {
    const info = db.prepare("INSERT INTO products (nome, preco) VALUES (?, ?)").run(nome, preco);
    return buscarPorId(info.lastInsertRowid);
}

function atualizar(id, { nome, preco }) {
    const info = db.prepare("UPDATE products SET nome = ?, preco = ? WHERE id = ?").run(nome, preco, id);
    return info.changes > 0 ? buscarPorId(id) : null;
}

function remover(id) {
    return db.prepare("DELETE FROM products WHERE id = ?").run(id).changes > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
