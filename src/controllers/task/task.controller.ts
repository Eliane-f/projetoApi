import { Request, Response } from 'express'
import Task from '../../models/Task.entity'

export default class TaskController {
  static async store (req: Request, res: Response) {
    const { title, completed } = req.body

    if (!title) {
      return res.status(400).json({ error: 'O título é obrigatório' })
    }

    const task = new Task()
    task.title = title
    task.completed = completed ?? false
    await task.save()

    return res.status(201).json(task)
  }

  static async index(req: Request, res: Response){
    const tasks = await Task.find()
    return res.status(200).json(tasks)
  }

  static async show(req: Request, res: Response){
    const{ id } = req.params  // igual a  --  const id = req.params.id
    if(!id || isNaN(Number(id))){
      return res.status(400).json({error: 'o id é obrigatorio'})
    }
    const task = await Task.findOneBy({id: Number(id)})

    if(!task){
      return res.status(404).json({error: 'Não encontrado'})
    }

    return res.json(task)
  }

  static async delete(req: Request, res:Response){
    const{ id } = req.params  // igual a  --  const id = req.params.id
    if(!id || isNaN(Number(id))){
      return res.status(400).json({error: 'o id é obrigatorio'})
    }

    const task = await Task.findOneBy({id: Number(id)})

    if(!task){
      return res.status(404).json({error: 'Não encontrado'})
    }

    task.remove()
    return res.status(204).send()
  }


  static async update (req:Request, res:Response){
    const { id } = req.params
    const { title, completed } = req.body

    if(!title){
        return res.status(400).json({ error: 'O título é obrigatório' })
    }

    if(completed === undefined){
        return res.status(400).json({ error: 'O completado é obrigatório' })
    }
    
    if(!id || isNaN(Number(id))) {
        return res.status(400).json({ error: 'O id é obrigatório' })
    }
    
    const task = await Task.findOneBy({id: Number(id)})
    if (!task) {
      return res.status(404).json({ error: 'Task não encontrada' })
    }
    
    task.title = title
    task.completed = completed
    await task.save()

    return res.json(task)
  }
}