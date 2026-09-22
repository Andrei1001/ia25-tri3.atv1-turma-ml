//            BANCO DE DADOS     HTTP
// [C]reat    insert             post
// [R]read    select             get
// [U]pdate   update             put
// [U]pdate   update             patch
// [D]elete   delete             delete

import { db } from "./db"

const srv = Bun.serve({
    port: 3000,
    routes: {
        "/user": {
            GET: () => {
                const query = db.query(`SELECT * FROM users`)
                const data = query.all()
                return Response.json(data)
            },

            POST: async (req) => {
                const body = await req.body.json()
                const query = db.query(`
                    INSERT INTO users(username, email, password_hash)
                    VALUES(:username, :email, :password_hash)
                `)
                const dbResp = query.run({
                    ':username': body.username,
                    ':email': body.email,
                    ':password_hash': body.password
                })
                return Response.json({
                    "message": "deu boa garote!",
                    dbResp
                })
            },
        },

        "/user/:id": {
            GET: (req) => {
                const id = req.params.id
                const query = db.query(`SELECT * FROM users WHERE id=:id`)
                const data = query.get({ ':id': id })
                return Response.json(data)
            },

            PUT: async(req) => {
                const body = await req.body.json()
                const query = db.query(`UPDATE users SET username = :username, email = :email, password_hash = :password WHERE id = :id`)
                const dbResp = query.run({
                    ':username': body.username,
                    ':email': body.email,
                    ':password': body.password,
                    ':id': req.params.id
                })
                return Response.json(dbResp)
            },

            DELETE: (req) => {
                const query = db.query(`DELETE FROM users WHERE id=:id`)
                const data = query.run({ ':id': req.params.id })
                return Response.json(data)
            },
        },

        "/mensagem": {
             GET: () => {
                const query2 = db.query(`SELECT * FROM mensagem`)
                const data = query2.all()
                return Response.json(data)
            },

            POST: async (req) => {
                const body = await req.body.json()
                const query2 = db.query(`
                    INSERT INTO mensagem(texto, remetente, data)
                    VALUES(:texto, :remetente, :data)
                `)
                const dbResp = query2.run({
                    ':texto': body.texto,
                    ':remetente': body.remetente,
                    ':data': body.data
                })
                return Response.json({
                    "message": "deu boa garoteaaaaaa!",
                    dbResp
                })
            },
        },

        "/mensagem/:id": {
              GET: (req) => {
                const id = req.params.id
                const query2 = db.query(`SELECT * FROM mensagem WHERE id=:id`)
                const data = query2.get({ ':id': id })
                return Response.json(data)
            },

            PUT: async(req) => {
                const body = await req.body.json()
                const query2 = db.query(`UPDATE mensagem SET texto = :texto, remetente = :remetente, data = :data WHERE id = :id`)
                const dbResp = query2.run({
                    ':texto': body.texto,
                    ':remetente': body.remetente,
                    ':data': body.data,
                    ':id': req.params.id
                })
                return Response.json(dbResp)
            },

            DELETE: (req) => {
                const query2 = db.query(`DELETE FROM mensagem WHERE id=:id`)
                const data = query2.run({ ':id': req.params.id })
                return Response.json(data)
            },
        },
    }
})

console.log(`Servidor em ${srv.url}`)
