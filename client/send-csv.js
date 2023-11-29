import { Parser } from 'csv-parse'
import { createReadStream } from 'node:fs'

async function send() {
    const readStream = new createReadStream('./tasks.csv')
    const parser = new Parser({columns:true})

    readStream.pipe(parser)

    for await(const chunck of parser) {
        console.log(chunck)
        fetch('http://localhost:3333/tasks', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(chunck),
            signal: null,
            duplex: 'half'
        }).then(response => {
            return response.text()
        }).then(data => console.log(data))
    }
}
send()