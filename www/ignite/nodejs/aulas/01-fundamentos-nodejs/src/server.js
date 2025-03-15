// utiliza o server.js quando for servidores
// index.js é para web
import {json} from './middlewares/json.js';
import http from 'http';
import { routes } from './routes.js';

// Query Parameters: URL Stateful -> filtro de informações não sensíveis (paginação)
// Route Parameters: Identificação de recurso
// Request Bodyy: Envio de informações de um formulário (HTTPs)

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

    await json(req, res)
    
    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })
    console.log(route)

    if (route){
        const routeParams = req.url.match(route.path)
        req.params = {...routeParams.groups}
        return route.handler(req,res)
    }
    return res.writeHead(404).end('Not Found, deu')

})
server.listen(3333, ()=> console.log("🔥 Servidor rodando na porta 3333, cuida pra cuidaar!"));