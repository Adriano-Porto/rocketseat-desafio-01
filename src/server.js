import http from 'node:http'
import { useJson } from './middlewares/json.js'
import { routes } from './routes/routes.js'

const server = http.createServer(async (req, res) => {
    await useJson(req, res)

    const { method, url } = req

    for (const route of routes) {
        if (route.method === method && route.path.test(url)) {
            const routeParams = req.url.match(route.path)
            const {query, ...params} = routeParams.groups
            
            req.params = params
            req.query = query ? extractQueryParams() : {}

            return route.handle(req, res)
        }
    }
    return res.writeHead(404).end()
})

const url = 'localhost'
const port = 3333

server.listen(port, url, (err) => {
    if (err) { 
        return console.error(err)
    }
    return console.log(`Runnning on ${url}:${port}`)

})
       