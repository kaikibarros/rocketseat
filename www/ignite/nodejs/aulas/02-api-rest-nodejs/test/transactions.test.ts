import { expect,it,beforeAll, afterAll, describe} from 'vitest'
import { app } from '../src/app'
import request from 'supertest'   

describe('Transactions routes', () => {
    beforeAll(async () => {
        await app.ready()
    }) 
    afterAll(async () => {
        await app.close()
    })
// pode ser utilizado o it() ao invés do test()
    it.only('o usuário consegue criar uma nova transação',async () => {
    // fazer chmd http p/ criar uma nova transação
    const response = await request(app.server)
    .post('/transactions')
    .send({
        title: 'Transação de teste',
        amount: 5000,
        type: 'credit',
    })
    // validação
    .expect(201)
    console.log(response.headers)
 }) 
  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
        title: 'Transação de teste',
        amount: 5000,
        type: 'credit',
  })
  const cookies = createTransactionResponse.get('Set-Cookie')

  const listaTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies)
    .expect(200)
    expect(listaTransactionsResponse.body.toEqual([
        expect.objectContaining({
            title: 'Transação de teste',
           amount: 5000,
            })
        ]))
    })
})