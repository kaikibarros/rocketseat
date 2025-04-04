import 'dotenv/config'
import {knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
    filename: './db/app.db',
    },
    useNullAsDefault: true,// correção do erro no sqlite
       migrations: {
        extension: 'ts',
        directory: './db/migrations'
       }
}
  
export const knex = setupKnex(config)