import { Router } from "express";
import { Todo } from "../models/todo";
const router=Router()

let todos:Todo[]=[]

router.get('/',(req,res)=>{
    res.status(200).json({todos:todos})
})

router.post('/add-todo',(req,res)=>{
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:req.body.text
    }

    todos.push(newTodo)
})

router.put('/edit-todo/:id',(req,res)=>{
    const id=req.params.id

    const todoIndex=todos.findIndex((todo)=>todo.id==id)
    if(todoIndex>=0){
        todos[todoIndex]={
            id:todos[todoIndex].id,
            text:req.body.text
        }

        return res.status(200).json({message:'Updated',todos})

    }
    return res.status(404).json({message:'Todo not found'})
})

router.delete('delete-todo/:id',(req,res)=>{
    const id=req.params.id
    todos=todos.filter((todo)=>{
        return todo.id !=id
    })
    return res.status(200).json({message:'Deleted successfully',todos})
})
export default router