import {Priority, Task} from "./Task";

export interface TodoRepository {
  getAll(): Task[]

  getByPriority(priority: Priority): Task[]

  add(task: Task): void

  delete(taskId: number): void
}
