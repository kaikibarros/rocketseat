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
        let data = this.#database[table] ?? []

        //mecanismo de busca
        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some((key, value) => {
                    return row(key).toLowerCase().includes(value.toLowerCase);

                })
                });
        }
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

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist();
        }
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist();
        }
    }
}