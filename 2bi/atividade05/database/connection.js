const path = require("path");
const Database = require("better-sqlite3");

// DB_FILE permite usar outro arquivo (ou ":memory:") nos testes.
const arquivo = process.env.DB_FILE || path.join(__dirname, "produtos.db");
const db = new Database(arquivo);

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL CHECK (preco >= 0)
    )
`);

module.exports = db;
