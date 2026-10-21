import { Database } from "bun:sqlite"

const db = new Database("database.sqlite")

const query = db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL
    )
`)

query.run()

const query2 = db.query(`
    CREATE TABLE IF NOT EXISTS mensagem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        texto TEXT NOT NULL,
        remetente TEXT NOT NULL,
        data TEXT NOT NULL
    )
`)

query2.run()

export { db }
