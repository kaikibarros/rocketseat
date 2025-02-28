// utiliza o server.js quando for servidores
// index.js é para web

import {json} from './middlewares/json.js'
import http from 'http'
import { url } from 'inspector';
// import http from 'node:crypto'

// comonJS ==> require
// ESModules ==> import/export (node n suporta)
// preciso colotar type module no package

// GET - BUSCAR INFORMAÇÃO
// POST - CRIAR INFORMAÇÃO
// PUT - ATUALIZAR RECURSO
// PATCH - ATUALIZAR INFORMAÇÃO ESPECÍFICA DE UM RECURSO BACK-END

// Stateful - Stateless

// JSON 

// Cabeçalhos (req/res) => metadados

// HTTP Status Code

const users = []

const server = http.createServer(async (req, res) => {
    const {method, url} = req;
    // console.log(method, url)

    await json(req, res)


    if (method == 'GET' && url == '/users') {
        // Early return 
        
        return res
        .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users'){
        const {nome, email} = req.body;
        users.push({
            id: 1,
            nome, 
            email,
        })
        return res.writeHead(201).end()
    }
    return res.writeHead(404).end('Not Found, deu')

})
server.listen(3333, ()=> console.log("🔥 Servidor rodando na porta 3333, cuida pra cuidaar!"));