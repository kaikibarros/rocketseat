// existens it que estão incompletos

import { expect, it, beforeAll, afterAll, describe, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import { app } from "../src/app";
import request from "supertest";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => { 
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback");
    execSync("npm run knex migrate:latest");
  });
  // pode ser utilizado o it() ao invés do test()
  it("should be able to get a specific transaction", async () => {
    // fazer chmd http p/ criar uma nova transação
    const response = await request(app.server)
      .post("/transactions")
      .send({
        title: "Transação de teste",
        amount: 5000,
        type: "credit",
      })
      // validação
      .expect(201);
    console.log(response.headers);
  });
  it("should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Transação de teste",
        amount: 5000,
        type: "credit",
      });
    const cookies = createTransactionResponse.get("Set-Cookie");

    const listaTransactionsResponse = await request(app.server)
      .get("/transactions")
      // .set('Cookie', cookies)
      .expect(200);

      const transactionId = listaTransactionsResponse.body.transactions[0].id;

      const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
    //   .set("Cookie", cookies)
      .expect(200);
      
    expect(
      getTransactionResponse.body.transaction).toEqual([
        expect.objectContaining({
          title: "Transação de teste",
          amount: 5000,
        }),
      ])
  })

  it("should be able to get the summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Transação de teste",
        amount: 5000,
        type: "credit",
      });
    const cookies = createTransactionResponse.get("Set-Cookie");

    const listaTransactionsResponse = await request(app.server)
      .get("/transactions")
      // .set('Cookie', cookies)
      .expect(200);

      const transactionId = listaTransactionsResponse.body.transactions[0].id;

      const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
    //   .set("Cookie", cookies)
      .expect(200);
      
    expect(
      getTransactionResponse.body.transaction).toEqual([
        expect.objectContaining({
          title: "Transação de teste",
          amount: 5000,
        }),
      ])
  })
})
