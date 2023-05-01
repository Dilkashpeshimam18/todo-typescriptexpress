import { Router } from "express";
import { Todo } from "../models/todo";
const router = Router()

let todos: Todo[] = []
type RequestBody = { text: string }
type RequestParams = { id: string }

router.get('/', (req, res) => {
    res.status(200).json({ todos: todos })
})

router.post('/add-todo', (req, res) => {
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo)
})

router.put('/edit-todo/:id', (req, res) => {
    const params = req.params as RequestParams
    const id = params.id
    const body = req.body as RequestBody


    const todoIndex = todos.findIndex((todo) => todo.id == id)
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        }

        return res.status(200).json({ message: 'Updated', todos })

    }
    return res.status(404).json({ message: 'Todo not found' })
})

router.delete('delete-todo/:id', (req, res) => {
    const params = req.params as RequestParams
    const id = params.id
    todos = todos.filter((todo) => {
        return todo.id != id
    })
    return res.status(200).json({ message: 'Deleted successfully', todos })
})
export default router