import {Priority, Task} from './Task'
import {TodoRepository} from "./TodoRepository";

export class TodoInMemoryRepository implements TodoRepository {
  private tasks: Task[]

  constructor() {
    this.tasks = []
  }

  private getTaskIndex(id: number): number {
    return this.getAll().findIndex(task => task.getState().id === id)
  }

  add(task: Task): void {
    this.tasks.push(task)
  }

  getAll(): Task[] {
    return this.tasks
  }

  getByPriority(priority: Priority): Task[] {
    return this.getAll().filter(task => task.getPriority() === priority)
  }

  delete(taskId: number): void {
    const index = this.getTaskIndex(taskId)
    this.tasks = [...this.getAll().splice(0, index), ...this.getAll().splice(index + 1)]
  }
}
