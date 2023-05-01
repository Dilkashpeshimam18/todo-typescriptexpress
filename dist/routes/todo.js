"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});
router.post('/add-todo', (req, res) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
});
router.put('/edit-todo/:id', (req, res) => {
    const params = req.params;
    const id = params.id;
    const body = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        };
        return res.status(200).json({ message: 'Updated', todos });
    }
    return res.status(404).json({ message: 'Todo not found' });
});
router.delete('delete-todo/:id', (req, res) => {
    const params = req.params;
    const id = params.id;
    todos = todos.filter((todo) => {
        return todo.id != id;
    });
    return res.status(200).json({ message: 'Deleted successfully', todos });
});
exports.default = router;
