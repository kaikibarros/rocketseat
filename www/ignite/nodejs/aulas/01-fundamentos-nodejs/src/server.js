// utiliza o server.js quando for servidores
// index.js é para web

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

const server = http.createServer((req, res) => {
    const {method, url} = req;
    // console.log(method, url)
    if (method == 'GET' && url == '/users') {
        // Early return 
        
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users'){
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })
        return res.writeHead(201).end()
    }
    return res.writeHead(404).end('Not Found')

})
server.listen(3333);