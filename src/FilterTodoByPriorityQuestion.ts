import inquirer from "inquirer";
import {Question} from "./Question";
import {Priority, Task} from "./Task";
import {TodoRepository} from "./TodoRepository";

interface Answer {
  priority: Priority
}

export class FilterTodoByPriorityQuestion extends Question {
  tasks: TodoRepository

  constructor(tasks: TodoRepository) {
    super("Filtrar por prioridad")
    this.tasks = tasks
  }

  async execute() {
    const answer: Answer = await inquirer.prompt([{
      type: "list",
      name: "priority",
      message: "Seleccione una prioridad",
      choices: Task.getPriorities()
    }])

    const tasks = this.tasks.getByPriority(answer.priority)

    console.log(tasks)
  }

}
