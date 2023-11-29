import { jsonDb as db } from '../database/database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handle(req, res) {
            const tasks = db.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        async handle(req, res) {
            const { title, description } = req.body

            if (!title) { 
                return res.writeHead(400).end(JSON.stringify({error: "invalid title"}))
            }
            if (!description) {
                return res.writeHead(400).end(JSON.stringify({error: "invalid description"}))
            }
            const task = {
                title, 
                description,
                created_at: new Date(),
                completed_at: null,
                updated_at: new Date()
            }
            const taskCreated = await db.insert('tasks', task)
            return res.writeHead(201).end(JSON.stringify(taskCreated))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        async handle(req, res) {
            const newData = req.body
            const { id } = req.params

            const taskUpdated = await db.update('tasks', id, newData)

            if (!taskUpdated) {
                return res.writeHead(400).end(JSON.stringify({error: "task does not exist"}))
            }
            return res.writeHead(200).end(JSON.stringify(taskUpdated))
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id'),
        async handle(req, res) {
            const { id } = req.params

            const newData = { completed_at: new Date()}

            const taskUpdated = await db.update('tasks', id, newData)

            if (!taskUpdated) {
                return res.writeHead(400).end(JSON.stringify({error: "task does not exist"}))
            }
            return res.writeHead(200).end(JSON.stringify(taskUpdated))
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        async handle(req, res) {
            const { id } = req.params
            const taskDeleted = await db.delete('tasks', id)
            if (!taskDeleted) {
                return res.writeHead(400).end(JSON.stringify({error: "task does not exist"}))
            }
            return res.writeHead(202).end(JSON.stringify(taskDeleted))
        }
    }
]