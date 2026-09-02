const srv = Bun.serve({
    port: 3000,
    routes: {
        "/test":{ 
            GET: () =>new Response("Pare de farmar aura!!!!!_GET"),
            POST: async (req) =>{
                const body = await req.body?.text()
                console.log(body)
                return new Response("Pare de farmar aura!!!!!_POST")
            },
            PUT: () =>new Response("Pare de farmar aura!!!!!_PUT"),
            DELETE: () =>new Response("Pare de farmar aura!!!!!_DELETE"),
        }
    }
})

console.log(`Serevr Running:${srv.url} `)