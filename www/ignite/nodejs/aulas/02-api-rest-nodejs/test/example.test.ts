import {expect, test } from 'vitest'
import { app } from '../src/app'
// import supertest from 'supertest'

test('o usuário consegue criar uma nova transação', () => {
    // fazer chmd http p/ criar uma nova transação

    // validação
    const respondeStatusCode = 201
    expect(respondeStatusCode).toEqual(201)

})