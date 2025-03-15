// utiliza o server.js quando for servidores
// index.js é para web
import {json} from './middlewares/json.js';
import http from 'http';
import { routes } from './routes.js';
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
const server = http.createServer(async (req, res) => {
    const {method, url} = req;
    // console.log(method, url)

    await json(req, res)
    
    const route = routes.find(route => {
        return route.method == method && route.path == url;
    })
    console.log(route)

    if (route){
        return route.handler(req,res)
    }
    return res.writeHead(404).end('Not Found, deu')

})
server.listen(3333, ()=> console.log("🔥 Servidor rodando na porta 3333, cuida pra cuidaar!"));