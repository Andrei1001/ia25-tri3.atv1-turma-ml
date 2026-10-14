import frontend from "./index.html"
import db from "./db"

const loggedUsers: any = {}

const srv = Bun.serve({
    port: 3000,
    routes: {
        "/": frontend,

        "/cliente": {
            GET: () => {
                const query = db.query("SELECT * FROM cliente")
                const data = query.all()
                return Response.json(data)
            },
            POST: async (req) => {
                const body = await req.body?.json()
                const query = db.query(`
                    INSERT INTO cliente(nome, email)
                    VALUES(:nome, :email)
                `)
                const data = query.run({
                    ":nome": body.nome,
                    ":email": body.email
                })
                return Response.json(data)
            },
        },

        "/user":{
            POST:async (req) => {
                const body = await req.body?.json()
                const query = db.query(`INSERT into user(username, password_hash)
                    VALUES(:username, :password_hash)
                    `)
                const hash = await Bun.password.hash(body.password)
                const data =  query.run({
                        "username": body.username,
                        "password_hash": hash
                    })
                return Response.json("",{status:501})
            }
        },

        "/login": {
            POST: async (req) => {
                const body = await req.body?.json()
                const query = db.query(`SELECT * FROM user 
                    WHERE username=:username 
                    AND password_hash = :password_hash
                    LIMIT 1
                    `)
                    const data: any = query.get({
                        ":username": body.username,
                    })
                    const hash = data.password_hash
                    const isMath = await Bun.password.verify(body.password, hash)
                    loggedUsers[data.id] = data
                    return Response.json(isMath)
            }
        }
    }
})

console.log(`Server running on ${srv.url}`)