import inquirer from "inquirer";
import {Question} from "./Question";
import {TodoRepository} from "./TodoRepository";

interface Answer {
  taskId: number
}

export class DeleteTodoQuestion extends Question {
  tasks: TodoRepository

  constructor(tasks: TodoRepository) {
    super("Eliminar una tarea")
    this.tasks = tasks
  }

  private getChoices() {
    return this.tasks.getAll().map(task => ({
      value: task.getState().id,
      name: task.getState().title
    }))
  }

  async execute() {
    const answer: Answer = await inquirer.prompt([{
      type: "list",
      name: "taskId",
      message: "Seleccione la tarea a eliminar",
      choices: this.getChoices()
    }])

    this.tasks.delete(answer.taskId)

    console.log("\n Tarea eliminada \n")
  }

}
