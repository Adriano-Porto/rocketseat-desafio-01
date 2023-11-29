import { randomUUID as uuid } from 'node:crypto'
import fs from 'node:fs/promises'

const absolutePath = import.meta.url

class DatabaseJson {
    constructor() {
        this.database = {}
        this.path = new URL('db.json', import.meta.url)
        this.#init()
    }

    async #init() {
        try {
            this.database = JSON.parse(await fs.readFile(this.path , 'utf-8'))
        } catch (err){
            if (err.code == 'ENOENT') {
                await fs.writeFile(this.path , JSON.stringify(this.database), 'utf-8')
            } else {
                return console.error(err)
            }
        }
    }

    async #persist() {
        await fs.writeFile(this.path , JSON.stringify(this.database))
    }

    async insert(table, data) {
        data = {id: uuid(), ...data}

        if (this.database[table]) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }
        await this.#persist()

        return data
    }

    async update(table, id, newData) {
        const oldDataIndex = this.database[table].findIndex(value => value.id === id)
        const oldData = this.database[table][oldDataIndex]
        if (!oldData) {
            return null
        }
        const data = {}
        for (const prop in oldData) {
            if (newData[prop]) {
                data[prop] = newData[prop]
            } else {
                data[prop] = oldData[prop]
            }
        }
        if (data.updated_at) {
            data.updated_at = new Date()
        }

        this.database[table][oldDataIndex] = data
        await this.#persist()

        return data
    }

    async delete(table, id) {
        const deleteIndex = this.database[table].findIndex(value => value.id === id)
        if (deleteIndex === -1 ) {
            return null
        }
        const deletedData = this.database[table].splice(deleteIndex, 1)
        await this.#persist()
        return deletedData
    }

    select(table) {
        return this.database[table]
    }

}

const jsonDb = new DatabaseJson()
export { jsonDb }