import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

// --------------tipos de testes:
// unitários: testam uma unidade específica do código, como uma função ou um método.
// integração: testam a interação entre diferentes partes do código, como funções ou módulos.
// ponta a ponta: simulando o comportamento do usuário final.
// existem outros tipos de testes, como testes de carga, testes de segurança, etc.
// front-end: abre pag ina, faz login, clica no botão, verifica se o texto está correto.
// back-end: faz uma requisição para a API, verifica se o status code é 200, verifica se o corpo da resposta está correto.

// pirâmide de testes: E2E (não dependem de nehm tecnologia, nem de arquitetura)
// 2000 testes -> testes E2E -> 16min

// --------------

// Cookies (manter contexto entre requisições)
// 

export async function transactionsRoutes (app: FastifyInstance){
    app.addHook('preHandler', async (request, reply) => {
        
    })

app.get ('/', 
    {
        preHandler:[checkSessionIdExists],
    },
    async (request, reply) =>{
   const {sessionId} = request.cookies
    const transactions = await knex('transactions')
    .where('session_id', sessionId)
    .select()

    return {  transactions}
})
app.get('/:id', 
    {
    preHandler:[checkSessionIdExists],
    },
    async (request)=> {
    const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
    })    

    const {id} = getTransactionParamsSchema.parse(request.params)
    const {sessionId} = request.cookies
    const transaction = await knex('transactions')
    .where('id', id)
    .andWhere('session_id', sessionId).first
    return { transaction }
})

app.get('/summary', 
    {
    preHandler:[checkSessionIdExists],
    }, 
async(request)=> {
    const {sessionId} = request.cookies
    const summary = await knex('transactions')
    .where('session_id', sessionId)
    .sum('amount', {as: 'amount'})
    .first()
    
    return {summary}
})
app.post('/', {
    preHandler:[checkSessionIdExists],
    },
async (request, reply) => {
    const createTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
    })
    const {title, amount, type} = createTransactionBodySchema.parse(request.body)
    
    let sessionId = request.cookies.sessionId
    
    if(!sessionId){
        sessionId = randomUUID()
        reply.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days dica de clean code
        })
    }

     await knex('transactions').insert({
        // id: randomUUID(), // não é necessário, pois o banco de dados já gera um id
        session_id: sessionId,
        title,
        amount: type == 'credit' ? amount: amount * -1,
    })
    return reply.status(201).send()
})
} 

// const tables = await knex('sqlite_schema').select('*')
    //  const transactions = await knex('transactions')
    // .select('*') 