// {"users": [array]}
import fs from 'node:fs/promises';
const databasePath = new URL ('./src/db.json', import.meta.url)

export class Database{
    #database = { }

    // gerar um database vazio
    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data => {
        this.#database = JSON.parse(data)
        })
        .catch(()=> {
            this.#persist()
        })
    }
    

    #persist() {
        fs.writeFile('databasePath', JSON.stringify(this.#database))
    }

    // #database = { } faz com que seja uma propriedade privada
    select(table){
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table]
        )){
            this.#database[table].push(data)
        } else{
            this.#database[table] = [data]
        }

        this.#persist();
        return data
    }
}