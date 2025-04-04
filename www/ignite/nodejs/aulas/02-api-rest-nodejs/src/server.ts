// interface User{
//     birthYear: number
// }

// function calcularIdadeUser(user: User){
//     return new Date().getFullYear() - user.birthYear
// }

// // calcularIdadeUser('Diego')
// // calcularIdadeUser({})
// calcularIdadeUser({
//     birthYear: 1992
// })

// // RUNTIME TYYPE CHECKING
// // Static type checkin

// framework
import fastify from 'fastify';
import { knex } from './database';

const app = fastify()   

app.get('/hello',async () => {
      const tables = await knex('sqlite_schema').select('*')
    //  const transactions = await knex('transactions')
    .select('*') 
    
   
    return tables
})

app.listen({
    port: 3333,

}).then(() => {
    console.log('HTTP Server rodando!')
})

// npm install -D @types/node (necessário para rodar ts e node juntos)
// npm install tsx -D (converte o ts em js de forma automática, sem criar o arquivo ts, só usa em desenvolvimento, não em produção)
// npm in eslint @rocketseat/eslint-config -D
// npm install knex sqlite3
// npm install -g httpie
// npm install knex -g 
// migration CLI
// npx knex migrate:make create-transactions 
                                                                                                                                                                                                                                                                                                                                                                                                   
/* CORREÇÃO DE BUG COM O CREATE-DOCUMENTS
-npm install ts-node --save-dev
-node --require ts-node/register ./node_modules/knex/bin/cli.js migrate:make create-documents
*/

/* CORREÇÃO DE BUG COM O MIOGRATE: LATEST
-  npm run knex -- migrate: latest ( código original)
- node --require ts-node/register ./node_modules/knex/bin/cli.js migrate: latest
*/

// choco install httpie
// npm i dotenv
//  npm i zod