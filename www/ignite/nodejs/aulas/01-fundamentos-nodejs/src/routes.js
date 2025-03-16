import path from 'node:path';
import {Database} from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutPath } from './utils/build-rout-path.js';

const database = new Database();
export const routes = [

    {
    method: 'GET',
    path: buildRoutPath('/users'),
    handler: (req, res)=> {
                 // Early return 
                 const {search} = req.query
                const users = database.select('users', search ? {
                       name: search,
                        email: search,
                } : null)
                 
      
        return res
        .end(JSON.stringify(users))
     }
    },
    {
        method: 'POST',
        path: buildRoutPath('/users'),
        handler: (req, res)=> {
            const {nome, email} = req.body;
                                             
        const user = {
            id: randomUUID(),
            nome, 
            email,
        }                                  
        database.insert('users', user)
        return res.writeHead(201).end()
     }
    },  
    {
        method: 'PUT',
        path: buildRoutPath('/users/:id'),
        handler: (req,res) => {
           const {id} = req.params;
           const {name, email} = req.body
           database.update('users', id, {
            name, 
            email,

           })
            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutPath('/users/:id'),
        handler: (req,res) => {
           const {id} = req.params;
           database.delete('users', id)
            return res.writeHead(204).end()
        }
    }
]
