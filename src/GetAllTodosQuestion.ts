import {Question} from "./Question";
import {TodoRepository} from "./TodoRepository";

export class GetAllTodosQuestion extends Question {
  private tasks: TodoRepository

  constructor(tasks: TodoRepository) {
    super("Listar todas las tareas");
    this.tasks = tasks
  }

  execute() {
    if (this.tasks.getAll().length) {
      console.log(this.tasks.getAll())
    } else {
      console.log("\n No hay tareas creadas \n")
    }
  }
}
