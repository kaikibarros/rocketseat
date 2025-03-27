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

const app = fastify()   

app.get('/hello', () => { return 'Olá Pessoas!'
})

app.listen({
    port: 3333,

}).then(() => {
    console.log('HTTP Server rodando!')
})


// npm install -D @types/node (necessário para rodar ts e node juntos)
// npm install tsx -D (converte o ts em js de forma automática, sem criar o arquivo ts, só usa em desenvolvimento, não em produção)
// npm in eslint @rocketseat/eslint-config -D
