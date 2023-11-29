# About
An CRUD application developed with node's native module http for Tasks with support for sending tasks by csv. Developed as a challange for the Rocketseat Ignite course

# Run

```npm install```
```npm start'```

The default url is localhost:3333

## Routes

Task Structure:

```json
    {
	"title": "Fazer Desafio 1",
	"description": "Programar a API REST do Desafio 1"
    }		
```

- POST: localhost:3333/tasks
- GET: localhost:3333/tasks
- PUT: localhost:3333/tasks/:id
- PATCH: localhost:3333/tasks/:id
- DELETE: localhost:3333/tasks/:id