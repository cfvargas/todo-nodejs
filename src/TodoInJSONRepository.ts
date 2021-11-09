import fs from 'fs'
import * as path from "path";
import {TodoRepository} from "./TodoRepository";
import {Task, Priority} from "./Task";

interface TaskJSON {
  title: string
  description: string
  priority: Priority
}

export class TodoInJSONRepository implements TodoRepository {
  private tasks: Task[]
  private readonly filePath = path.resolve(__dirname, '../tasks.json')

  constructor() {
    this.tasks = this.getTasksFromFile()
  }

  private getTasksFromFile() {
    return JSON.parse(fs.readFileSync(this.filePath).toString())
      .tasks.map((task: TaskJSON) =>
        //Como creo una nueva tarea que viene desde el JSON?  overload del constructor ask?
        new Task(task.title, task.description, task.priority)
      )
  }

  private saveTasksToLocalFile() {
    fs.writeFileSync(this.filePath, JSON.stringify({
      tasks: this.tasks
    }))
  }

  private getTaskIndex(id: number): number {
    return this.getAll().findIndex(task => task.getState().id === id)
  }

  add(task: Task): void {
    this.tasks = [...this.getAll(), task]
    this.saveTasksToLocalFile()
  }

  delete(taskId: number): void {
    const index = this.getTaskIndex(taskId)
    this.tasks = [...this.getAll().splice(0, index), ...this.getAll().splice(index + 1)]
    this.saveTasksToLocalFile()
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getByPriority(priority: Priority): Task[] {
    return this.getAll().filter(task => task.getPriority() === priority)
  }

}
